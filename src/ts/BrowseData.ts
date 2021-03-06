import {YoutubeMusicAPI} from "./YoutubeMusic";
// import * as fs from "fs";
import {Video} from "./Video";
import {getPlayList, PlayList} from "./PlayList";

export const getBrowseData = async (api: YoutubeMusicAPI) : Promise<BrowseData> => {
    let data = (await api.getBrowse())['data']
    return parseBrowseData(data)
}

export const parseBrowseData = (data:any) : BrowseData => {
    let tab = data['contents']['singleColumnBrowseResultsRenderer']['tabs'][0]
    let sections = tab['tabRenderer']['content']['sectionListRenderer']['contents']
    // fs.writeFileSync('./browseSections.json', JSON.stringify(sections))
    let browse = new BrowseData()

    for (let content in sections) {
        if (sections[content]['musicCarouselShelfRenderer'] === undefined) {
            console.log("skipped in BrowseData 1")
            continue
        }

        for (let renderer in sections[content]['musicCarouselShelfRenderer']['contents']) {
            let render = sections[content]['musicCarouselShelfRenderer']['contents'][renderer]['musicTwoRowItemRenderer']
            if (render === undefined) {
                console.log("skipped in BrowseData 2")
                continue
            }
            browse.addEntry(new BrowseDataEntry(render))
        }
    }

    browse.setContinuation(tab['tabRenderer']['content']['sectionListRenderer']['continuations'][0]['nextContinuationData']['continuation'])

    return browse
}

/**
 * NON USABLE
 * @param data
 * @param api
 */

export const getContinuation = async (data: BrowseData, api: YoutubeMusicAPI) => {
    if (data.continuation === null) return undefined
    let res = (await api.getContinuation(data.continuation))['data']
    // fs.writeFileSync('./browseContinuationsRes.json', JSON.stringify(res))
    let tab = res['contents']['singleColumnBrowseResultsRenderer']['tabs'][0]
    let sections = tab['tabRenderer']['content']['sectionListRenderer']['contents']
    // fs.writeFileSync('./browseSections.json', JSON.stringify(sections))
    let browse = new BrowseData()

    for (let content in sections) {
        if (sections[content]['musicCarouselShelfRenderer'] === undefined) {
            console.log("skipped in BrowseData 1")
            continue
        }

        for (let renderer in sections[content]['musicCarouselShelfRenderer']['contents']) {
            let render = sections[content]['musicCarouselShelfRenderer']['contents'][renderer]['musicTwoRowItemRenderer']
            if (render === undefined) {
                console.log("skipped in BrowseData 2")
                continue
            }
            browse.addEntry(new BrowseDataEntry(render))
        }
    }

    browse.setContinuation(tab['tabRenderer']['content']['sectionListRenderer']['continuations'][0]['nextContinuationData']['continuation'])
    return browse
}

export class BrowseData {
    contents: Array<BrowseDataEntry> = []
    continuation: null | string = null

    constructor() {
    }

    addEntry(e: BrowseDataEntry) {
        this.contents.push(e)
    }

    setContinuation(id: string) {
        this.continuation = id
    }

    getContinuationID(): string | undefined {
        if (this.continuation !== null) {
            return this.continuation
        }

        return undefined
    }

    getContinuationData(api: YoutubeMusicAPI) {
        return getContinuation(this, api)
    }
}

export class BrowseDataEntry {
    json: JSON = JSON.parse('{}')
    thumbnails: Array<any> = []
    title = ""
    subTitle = ""
    videoID = ""
    playlistID = ""
    video: Video | null = null
    playlist: PlayList | null = null

    constructor(json: JSON) {
        this.json = json
    }

    getThumbnails(): Array<any> {
        if (this.thumbnails.length !== 0) {
            return this.thumbnails
        }

        // @ts-ignore
        this.thumbnails = this.json['thumbnailRenderer']['musicThumbnailRenderer']['thumbnail']['thumbnails']
        return this.thumbnails
    }

    getTitle(): string {
        if (this.title !== "") {
            return this.title
        }

        // @ts-ignore
        this.title = this.json['title']['runs'][0]['text']
        return this.title
    }

    getSubTitle(): string {
        if (this.subTitle !== "") {
            return this.subTitle
        }

        // @ts-ignore
        let ar = this.json['subtitle']['runs']
        let s = ""
        for (let c of ar) {
            s += c['text']
        }
        this.subTitle = s
        return this.subTitle
    }

    isWatchPointExist(): boolean {
        // @ts-ignore
        return this.json['navigationEndpoint']['watchEndpoint'] !== undefined
    }

    getVideoID(): string {
        if (this.videoID !== "") {
            return this.videoID
        }
        // @ts-ignore
        if (this.isWatchPointExist()) {
            // @ts-ignore
            this.videoID = this.json['navigationEndpoint']['watchEndpoint']['videoId']
        } else {
            this.videoID = ""
        }
        return this.videoID
    }

    getPlayListID(): string {
        if (this.playlistID !== "") {
            return this.playlistID
        }

        if (this.isWatchPointExist()) {
            // @ts-ignore
            this.playlistID = this.json['navigationEndpoint']['watchEndpoint']['playlistId']
        } else {
            this.playlistID = ""
        }

        return this.playlistID
    }

    getVideo(): Video {
        if (this.video !== null) {
            return this.video
        }

        this.video = new Video(this.getVideoID())

        return this.video
    }

    async getPlayList(api: YoutubeMusicAPI): Promise<null | PlayList> {
        if (this.playlist !== null) {
            return this.playlist
        }

        if (this.isWatchPointExist()) {
            this.playlist = await getPlayList(this.getPlayListID(), api)
        } else {
            this.playlist = null
        }

        return this.playlist
    }
}
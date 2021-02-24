import {YoutubeMusicAPI} from "./YoutubeMusic";
import * as fs from "fs";
import {Video} from "./Video";
import {getPlayList, PlayList} from "./PlayList";

export const getBrowseData = async (api: YoutubeMusicAPI) => {
    let data = (await api.getBrowse())['data']
    // fs.writeFileSync('./browseRes.json', JSON.stringify(data))
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

    return browse
}

export class BrowseData {
    contents: Array<BrowseDataEntry> = []

    constructor() {
    }

    addEntry(e: BrowseDataEntry) {
        this.contents.push(e)
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

    getVideoID(): string {
        if (this.videoID !== "") {
            return this.videoID
        }

        // @ts-ignore
        this.videoID = this.json['navigationEndpoint']['watchEndpoint']['videoId']
        return this.videoID
    }

    getPlayListID(): string {
        if (this.playlistID !== "") {
            return this.playlistID
        }

        // @ts-ignore
        this.playlistID = this.json['navigationEndpoint']['watchEndpoint']['playlistId']
        return this.playlistID
    }

    getVideo(): Video {
        if (this.video !== null) {
            return this.video
        }

        this.video = new Video(this.getVideoID())

        return this.video
    }

    async getPlayList(api: YoutubeMusicAPI): Promise<PlayList> {
        if (this.playlist !== null) {
            return this.playlist
        }

        this.playlist = await getPlayList(this.getPlayListID(), api)
        return this.playlist
    }
}
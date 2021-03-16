import {YoutubeMusicAPI} from "./YoutubeMusic";
import {safeString} from "./Util";

export const getBrowse = async (api: YoutubeMusicAPI, dist: BROWSE_DIST): Promise<BrowseData> => {
    let data = (await getBrowseData(api, dist))['data']
    return parseBrowseData(data)
}

export enum BROWSE_DIST {
    home = "FEmusic_home",
    browse = "FEmusic_explore",
    library = "FEmusic_liked_playlists"
}

export const getBrowseData = (api: YoutubeMusicAPI, dist: BROWSE_DIST) => {
    let data = {
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "0.1",
                "hl": "ja",
                "gl": "JP",
                "experimentIds": [],
                "experimentsToken": "",
                "browserName": "Firefox",
                "browserVersion": "87.0",
                "osName": "Windows",
                "osVersion": "10.0",
                "platform": "DESKTOP",
                "utcOffsetMinutes": 540,
                "locationInfo": {"locationPermissionAuthorizationStatus": "LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED"},
                "musicAppInfo": {
                    "musicActivityMasterSwitch": "MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE",
                    "musicLocationMasterSwitch": "MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE",
                    "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_UNKNOWN"
                }
            },
            "capabilities": {},
            "request": {"internalExperimentFlags": [], "sessionIndex": "1"},
            "activePlayers": {},
            "user": {"enableSafetyMode": false}
        }, "browseId": dist
    }
    return api.post('browse', data, false, '&alt=json')
}

export const parseBrowseData = (data: any): BrowseData => {
    let browse = new BrowseData()
    let renderer = data['contents']['singleColumnBrowseResultsRenderer']
    let tab = renderer['tabs'][0]
    let tabRenderer = tab['tabRenderer']
    browse.setTitle(safeString(tabRenderer['title']))
    let sectionListRenderer = tabRenderer['content']['sectionListRenderer']
    let listContents = sectionListRenderer['contents']
    for (let musicCarouselShelfRenderer of listContents) {
        let row = new BrowseRow()
        row.setTitle(musicCarouselShelfRenderer['musicCarouselShelfRenderer']['header']['musicCarouselShelfBasicHeaderRenderer']['title']['runs'][0]['text'])
        for (let musicTwoRowItemRenderer of musicCarouselShelfRenderer['musicCarouselShelfRenderer']['contents']) {
            let entry = new BrowseEntry()

            entry.setTitle(safeString(musicTwoRowItemRenderer['musicTwoRowItemRenderer']['title']['runs'][0]['text']))

            let subTitle = ''
            for (let s of musicTwoRowItemRenderer['musicTwoRowItemRenderer']['subtitle']['runs']) {
                subTitle += s['text']
            }
            entry.setSubTitle(subTitle)
            if (musicTwoRowItemRenderer['musicTwoRowItemRenderer']['navigationEndpoint']['watchEndpoint'] !== undefined) {
                entry.setVideoID(safeString(musicTwoRowItemRenderer['musicTwoRowItemRenderer']['navigationEndpoint']['watchEndpoint']['videoId']))
                entry.setPlayListID(safeString(musicTwoRowItemRenderer['musicTwoRowItemRenderer']['navigationEndpoint']['watchEndpoint']['playlistId']))
            }
            for (let thumbnail of musicTwoRowItemRenderer['musicTwoRowItemRenderer']['thumbnailRenderer']['musicThumbnailRenderer']['thumbnail']['thumbnails']) {
                entry.addThumbnail(thumbnail['url'])
            }

            row.addContents(entry)
        }
        browse.addContents(row)
    }

    return browse
}

export class BrowseData {
    title = ''
    continuation: Array<string> = []
    contents: Array<BrowseRow> = []

    setTitle(str: string) {
        this.title = str
    }

    getTitle(): string {
        return this.title
    }

    addContinuation(str: string) {
        this.continuation.push(str)
    }

    getContinuation(): Array<string> {
        return this.continuation
    }

    addContents(e: BrowseRow) {
        this.contents.push(e)
    }

    getContents(): Array<BrowseRow> {
        return this.contents
    }
}

export class BrowseRow {
    title = ''
    contents: Array<BrowseEntry> = []

    setTitle(str: string) {
        this.title = str
    }

    getTitle(): string {
        return this.title
    }

    addContents(e: BrowseEntry) {
        this.contents.push(e)
    }

    getContents(): Array<BrowseEntry> {
        return this.contents
    }
}

export class BrowseEntry {
    title = ''
    subTitle = ''
    videoID = ''
    playlistId = ''
    thumbnails: Array<string> = []

    setTitle(str: string) {
        this.title = str
    }

    getTitle(): string {
        return this.title
    }

    setSubTitle(str: string) {
        this.subTitle = str
    }

    getSubTitle(): string {
        return this.subTitle
    }

    setVideoID(str: string) {
        this.videoID = str
    }

    getVideoID(): string {
        return this.videoID
    }

    setPlayListID(str: string) {
        this.playlistId = str
    }

    getPlayListID(): string {
        return this.playlistId
    }

    addThumbnail(str: string) {
        this.thumbnails.push(str)
    }

    getThumbnails(): Array<string> {
        return this.thumbnails
    }
}
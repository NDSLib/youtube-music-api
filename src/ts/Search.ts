import {YoutubeMusicAPI} from './YoutubeMusic'
import * as fs from "fs";

export const getSearch = async (api: YoutubeMusicAPI, query: string): Promise<Array<SearchEntry>> => {
    let data = await getSearchData(api, query)
    // @ts-ignore
    return parseSearchData(data['data'])
}

export const getSearchData = async (api: YoutubeMusicAPI, query: string) => {
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
                "browserVersion": "86.0",
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
        },
        "query": query,
        "suggestStats": {
            "validationStatus": "VALID",
            "parameterValidationStatus": "VALID_PARAMETERS",
            "clientName": "youtube-music",
            "searchMethod": "ENTER_KEY",
            "inputMethod": "KEYBOARD",
            "originalQuery": query,
            "availableSuggestions": [{"index": 0, "type": 25}, {"index": 1, "type": 0}, {
                "index": 2,
                "type": 0
            }, {"index": 3, "type": 0}, {"index": 4, "type": 0}, {"index": 5, "type": 0}, {"index": 6, "type": 0}],
            "zeroPrefixEnabled": true,
            "firstEditTimeMsec": 8701,
            "lastEditTimeMsec": 17822
        }
    }
    return await api.post('search', data, false, '&alt=json')
}

export const parseSearchData = (data: any): Array<SearchEntry> => {
    let contents = data['contents']['sectionListRenderer']['contents']
    let arr: Array<SearchEntry> = []
    for (let e in contents) {
        arr.push(new SearchEntry(contents[e]))
    }
    return arr
}

/**
 * In Raw Json , this equals to musicShelfRenderer
 */
export class SearchEntry {
    json = {}

    constructor(json: any) {
        this.json = json['musicShelfRenderer']
    }

    getTitle(): string {
        // @ts-ignore
        return this.json['title']['runs'][0]['text']
    }

    getItems(): Array<SearchItem> {
        let arr: Array<SearchItem> = []
        // @ts-ignore
        for (let i of this.json['contents']) {
            arr.push(new SearchItem(i['musicResponsiveListItemRenderer']))
        }
        return arr
    }
}

/**
 * In Raw Json , this equals to musicResponsiveListItemRenderer
 */
export class SearchItem {
    json = {}

    constructor(json: any) {
        this.json = json
    }

    getThumbnailUrl(): string {
        // @ts-ignore
        return this.json['thumbnail']['musicThumbnailRenderer']['thumbnail']['thumbnails']
    }

    getTitle(): string {
        // @ts-ignore
        return this.json['flexColumns'][0]['musicResponsiveListItemFlexColumnRenderer']['text']['runs'][0]['text']
    }

    getSubTitle(): string {
        let arr = ''
        // @ts-ignore
        for (let s of this.json['flexColumns'][1]['musicResponsiveListItemFlexColumnRenderer']['text']['runs']) {
            // @ts-ignore
            arr += s['text']
        }
        return arr
    }

    getBaseViewBranch() {
        // @ts-ignore
        if (this.json['playlistItemData'] !== undefined) {
            // @ts-ignore
            return this.json['playlistItemData']
        }
        return undefined
    }

    getVideoID(): string | undefined{
        if (this.getBaseViewBranch() === undefined) return undefined
        // @ts-ignore
        return this.getBaseViewBranch()['videoId']
    }

    getPlayListID(): string | undefined{
        if (this.getBaseViewBranch() === undefined) return undefined
        // @ts-ignore
        return this.getBaseViewBranch()['playlistId']
    }

    isVideo(): boolean {
        return this.getVideoID() !== undefined
    }

    isPlayList(): boolean {
        return this.getPlayListID() !== undefined
    }
}
const axios = require('axios')
const video_js = require('./Video')

// @ts-ignore
import Video from './Video.js'
import {AdaptiveFormatsJSON, FormatsJSON} from './JSONCollection'

export class YoutubeMusicAPI {
    playerData = {
        "videoId": "Rkrm5foi188",
        "playlistId": "RDAMVMRkrm5foi188",
        "context": {
            "client": {
                "hl": "ja",
                "gl": "JP",
                "visitorData": "CgtnWXVtd0c1eUZUOCizjbGBBg%3D%3D",
                "clientName": "WEB_REMIX",
                "clientVersion": "0.1",
                "osName": "Windows",
                "osVersion": "10.0",
                "platform": "DESKTOP",
                "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                "userInterfaceTheme": "USER_INTERFACE_THEME_DARK",
                "clientScreen": "WATCH_FULL_SCREEN",
                "playerType": "UNIPLAYER",
                "tvAppInfo": {"livingRoomAppMode": "LIVING_ROOM_APP_MODE_UNSPECIFIED"}
            },
            "user": {"lockedSafetyMode": false},
            "request": {"useSsl": true, "internalExperimentFlags": [], "consistencyTokenJars": []},
            "clickTracking": {"clickTrackingParams": "CO0BEKCzAhgAIhMI193Jzrnv7gIVg4XCCh05Ywxl"},
            "clientScreenNonce": "MC41MzI4NjczNzg1MjA0ODg0",
            "adSignalsInfo": {
                // "params": [
                // {"key": "dt", "value": "1613514422701"}, {
                //     "key": "flash",
                //     "value": "0"
                // }, {"key": "frm", "value": "0"}, {"key": "u_tz", "value": "540"}, {
                //     "key": "u_his",
                //     "value": "4"
                // }, {"key": "u_java", "value": "false"}, {"key": "u_h", "value": "1080"}, {
                //     "key": "u_w",
                //     "value": "1920"
                // }, {"key": "u_ah", "value": "1040"}, {"key": "u_aw", "value": "1920"}, {
                //     "key": "u_cd",
                //     "value": "24"
                // }, {"key": "u_nplug", "value": "0"}, {"key": "u_nmime", "value": "0"}, {
                //     "key": "bc",
                //     "value": "31"
                // }, {"key": "bih", "value": "966"}, {"key": "biw", "value": "1903"}, {
                //     "key": "brdim",
                //     "value": "-1928,-331,-1928,-331,1920,-323,1936,1056,1920,966"
                // }, {"key": "vis", "value": "1"}, {"key": "wgl", "value": "true"}, {
                //     "key": "ca_type",
                //     "value": "image"
                // }]
            }
        },
        "playbackContext": {
            "contentPlaybackContext": {
                "html5Preference": "HTML5_PREF_WANTS",
                "lactMilliseconds": "27",
                "referer": "https://music.youtube.com/",
                "signatureTimestamp": 18669,
                "autoCaptionsDefaultOn": false,
                "liveContext": {"startWalltime": "0"}
            }
        },
        "cpn": "isAtEBxDCnGENsfx"
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
        'Accept': '*/*',
        'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
        'Content-Type': 'application/json',
        'Authorization': 'SAPISIDHASH 1613514453_4f36c22cb48286e16a34c27b6d8c14475a0cf590',
        'X-Goog-AuthUser': '1',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Referer': 'https://music.youtube.com/watch?v=Rkrm5foi188&list=RDAMVMRkrm5foi188',
        'Cookie': 'VISITOR_INFO1_LIVE=gYumwG5yFT8; CONSENT=YES+JP.ja+202001; SID=6gfW18qBD-XygZ1f7zwjNGdeal7WlgKlvhp1gUdz3i1fIWzpnRY9F5hYPucdGOhzRoJTog.; __Secure-3PSID=6gfW18qBD-XygZ1f7zwjNGdeal7WlgKlvhp1gUdz3i1fIWzpVFAGof-lV8ldYz9ry5vmnA.; HSID=Aa1nhmAXl9YD4eo1N; SSID=ADWy5fQPU-6EKg_Pf; APISID=zSE_nTBkGhFW0QSZ/ALHgW0Q5AyyuY7x3b; SAPISID=qrIvLm_YnZJ28xJv/AZ4AV_tqLJE7OU7jU; __Secure-3PAPISID=qrIvLm_YnZJ28xJv/AZ4AV_tqLJE7OU7jU; LOGIN_INFO=AFmmF2swRQIhAMzQW5JUmaz3lHeKo8BavzLtmQHz0s42d4hkM5IjeKWSAiASnkiXpmL7e3yWj2MfddTfbJTDjKhcyYBdu76B2qY6pA:QUQ3MjNmeHNPbnc2SU9weVBVVnpoOThDWXoycFpVamxSaWlIWVBab05pNTE3dHRHdGVBN2dnOVY5dlhjdUduNm5ISWMybWRKLUg3b2t6M2pWaktGZlhuRkVNLWxXSTNLSUNjUjJkcEdUM0VEeGZYc2lWTXdLZmNHai1NNFpuQXZmZ3M3MGlyWkJ3OEhwbUZfLTg0VHN5RXRucWc5VlRoUzFBc1Z0eEZjc00xMGRLaXdnWXhoQVdN; SIDCC=AJi4QfFrNH-LPF_gxtEaQBtZ2a9alzbWzoOD3ly9Tm43mQfOrI3-xMNuCFfH75LG3zZDJ9LrOMM; __Secure-3PSIDCC=AJi4QfEHwVO12LyxzRVttDiNQSehAHnyLINQjkT60YEULpbzX8ni3jPR_WRahzT3fgFUB0xT6Jyj; PREF=f6=400&volume=5&tz=Asia.Tokyo; wide=1; YSC=loSq1Jnr_u4; ST-1kthr94=csn=MC41MzI4NjczNzg1MjA0ODg0&itct=CO0BEKCzAhgAIhMI193Jzrnv7gIVg4XCCh05Ywxl&watch_params=wAEB',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'TE': 'Trailers',
    }

    nextData = {
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
            "clickTracking": {"clickTrackingParams": "COEBEKCzAhgBIhMIoZPI3sjv7gIVKNdMAh1qRwjw"},
            "activePlayers": [{"playerContextParams": "Q0FFU0FnZ0I="}],
            "user": {"enableSafetyMode": false}
        },
        "enablePersistentPlaylistPanel": true,
        "tunerSettingValue": "AUTOMIX_SETTING_NORMAL",
        "videoId": "1U7KFKO5GPo",
        "playlistId": "RDAMVM1U7KFKO5GPo",
        "params": "wAEB",
        "watchEndpointMusicSupportedConfigs": {"watchEndpointMusicConfig": {"musicVideoType": "MUSIC_VIDEO_TYPE_OMV"}},
        "isAudioOnly": true
    }

    browseData = {
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
        }, "browseId": "FEmusic_home"
    }


    searchData = {
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
        "query": "マオ",
        "suggestStats": {
            "validationStatus": "VALID",
            "parameterValidationStatus": "VALID_PARAMETERS",
            "clientName": "youtube-music",
            "searchMethod": "ENTER_KEY",
            "inputMethod": "KEYBOARD",
            "originalQuery": "マオ",
            "availableSuggestions": [{"index": 0, "type": 25}, {"index": 1, "type": 0}, {
                "index": 2,
                "type": 0
            }, {"index": 3, "type": 0}, {"index": 4, "type": 0}, {"index": 5, "type": 0}, {"index": 6, "type": 0}],
            "zeroPrefixEnabled": true,
            "firstEditTimeMsec": 8701,
            "lastEditTimeMsec": 17822
        }
    }

    k: String = ''


    /**
     * @param key(string)
     */
    constructor(key: String) {
        this.k = key
    }

    async player(videoId: String) {
        let data = JSON.parse(JSON.stringify(this.playerData))
        data['videoId'] = videoId
        return await axios.post(`https://music.youtube.com/youtubei/v1/player?key=${this.k}`, data, {headers: this.headers})
    }

    async getFormats(videoId: String): Promise<FormatsJSON | null> {
        let res = await this.player(videoId)
        if (res['data']['streamingData'] === undefined) {
            return null
        }
        return new FormatsJSON(res['data']['streamingData']['formats'])
    }

    async getAdaptiveFormats(videoId: String): Promise<AdaptiveFormatsJSON> {
        let res = await this.player(videoId)
        return new AdaptiveFormatsJSON(res['data']['streamingData']['adaptiveFormats'])
    }

    async next(videoId: String) {
        let data = JSON.parse(JSON.stringify(this.nextData))
        data['videoId'] = videoId
        return await axios.post(`https://music.youtube.com/youtubei/v1/next?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    async browse() {
        return await axios.post(`https://music.youtube.com/youtubei/v1/browse?alt=json&key=${this.k}`, this.browseData, {headers: this.headers})
    }

    async getBrowseData(): Promise<BrowseData> {
        return new BrowseData(await this.browse());
    }

    async search(query: String) {
        let data = JSON.parse(JSON.stringify(this.searchData))
        data['query'] = query
        return await axios.post(`https://music.youtube.com/youtubei/v1/search?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    // PlayList

    async searchVideos(query: String): Promise<Array<Video>> {
        let data = await this.search(query)
        let c = data['data']['contents']['sectionListRenderer']['contents']
        let videos = []
        for (let i in c) {
            let d = c[i]['musicShelfRenderer']['contents']
            for (let l in d) {
                if (d[l]['musicResponsiveListItemRenderer']['playlistItemData'] !== undefined) {
                    videos.push(new video_js.Video(d[l]['musicResponsiveListItemRenderer']['playlistItemData']['videoId']))
                }
            }
        }
        return videos
    }


    async getPlayList(playListId: string) {
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
                "clickTracking": {"clickTrackingParams": "CM4BEKCzAhgAIhMIh6D89oWC7wIVqtlMAh1WwQQN"},
                "activePlayers": {},
                "user": {"enableSafetyMode": false}
            },
            "enablePersistentPlaylistPanel": true,
            "tunerSettingValue": "AUTOMIX_SETTING_NORMAL",
            "videoId": "B1gaZv8P-1w",
            "playlistId": "RDAMVMB1gaZv8P-1w",
            "params": "wAEB",
            "watchEndpointMusicSupportedConfigs": {"watchEndpointMusicConfig": {"musicVideoType": "MUSIC_VIDEO_TYPE_UGC"}},
            "isAudioOnly": true
        }

        data['playlistId'] = playListId

        return axios.post(`https://music.youtube.com/youtubei/v1/next?alt=json&key=${this.k}`,data,{headers:this.headers})
    }
}

class BrowseData {
    json: any = {}

    constructor(json: any) {
        this.json = json['data']

    }

    getTabs(): Array<Tab> {
        let data = this.json['contents']['singleColumnBrowseResultsRenderer']['tabs']

        let r: Array<any> = []
        for (let t in data) {
            // @ts-ignore
            r[t] = new Tab(data[t])
        }
        return r
    }
}

export class Tab {
    json: JSON = JSON.parse('{}')

    constructor(json: any) {
        this.json = json['tabRenderer']
    }

    getContents(): Array<VideoItem> | null {

        // @ts-ignore
        if (this.json['content']['sectionListRenderer']['contents'] !== undefined) {
            // @ts-ignore
            let data = this.json['content']['sectionListRenderer']['contents']
            let r = []
            for (let o in data) {
                if (data[o]['musicCarouselShelfRenderer'] === undefined) {
                    // console.log("Tab:Contents:Skipped!")
                } else {
                    for (let m in data[o]['musicCarouselShelfRenderer']['contents']) {

                        r.push(new VideoItem(data[o]['musicCarouselShelfRenderer']['contents'][m]))
                    }
                }
            }
            return r
        }
        return null
    }
}

export class VideoItem {
    json: JSON = JSON.parse('{}')
    video: Video | null = null

    constructor(json: JSON) {
        // これはTSがバカ
        // @ts-ignore
        this.json = json['musicTwoRowItemRenderer']
        console.log(`contents`)
        // @ts-ignore
        console.log(this.json['navigationEndpoint']['browseEndpoint'])
        // @ts-ignore
        if (this.json['navigationEndpoint']['watchEndpoint'] === undefined) {
            console.log("getVideoID NULL")
        } else {
            // @ts-ignore
            this.video = new Video(this.json['navigationEndpoint']['watchEndpoint']['videoId'])
        }
    }

    getThumbnails() {
        // @ts-ignore
        return this.json['thumbnailRenderer']['musicThumbnailRenderer']['thumbnail']['thumbnails']
    }

    getTitleObject() {
        // @ts-ignore
        return this.json['title']['runs']
    }

    getSubTitleObject() {
        // @ts-ignore
        return this.json['subtitle']['runs']
    }

    getTitle(): String {
        let data = this.getTitleObject()
        let s = ""
        for (let o in data) {
            s += data[o]['text']
        }
        return s
    }

    getSubTitle(): String {
        let data = this.getSubTitleObject()
        let s = ""
        for (let o in data) {
            s += data[o]['text']
        }
        return s
    }

    getVideoID(): string | null {
        // @ts-ignore
        if (this.json['navigationEndpoint']['watchEndpoint'] === undefined) {
            console.log("getVideoID NULL")
            return null
        }
        // @ts-ignore
        return this.json['navigationEndpoint']['watchEndpoint']['videoId']
    }

    getVideo(): Video | null {
        return this.video
    }

    getPlayListID() {
        // @ts-ignore
        return this.json['navigationEndpoint']['watchEndpoint']['playlistId']
    }
}

module.exports = {YoutubeMusicAPI}
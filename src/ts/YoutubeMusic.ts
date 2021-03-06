const axios = require('axios')
const video_js = require('./Video')
const sha1 = require('sha1')

import {Video} from './Video'
import {BrowseData, getBrowseData} from './BrowseData'
import {getPlayList, PlayList} from './PlayList'
import {AdaptiveFormatsJSON, FormatsJSON, parseAdaptiveFormats, parseFormats} from './JSONCollection'

export class YoutubeMusicAPI {

    playerData = {
        "videoId": "mwnu2aP0Q8g",
        "context": {
            "client": {
                "hl": "ja",
                "gl": "JP",
                "remoteHost": "113.39.146.225",
                "deviceMake": "",
                "deviceModel": "",
                "visitorData": "CgtnWXVtd0c1eUZUOCjQ5I2CBg%3D%3D",
                "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0,gzip(gfe)",
                "clientName": "WEB_REMIX",
                "clientVersion": "0.1",
                "osName": "Windows",
                "osVersion": "10.0",
                "originalUrl": "https://music.youtube.com/",
                "platform": "DESKTOP",
                "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                "timeZone": "Asia/Tokyo",
                "browserName": "Firefox",
                "browserVersion": "87.0",
                "screenWidthPoints": 1920,
                "screenHeightPoints": 966,
                "screenPixelDensity": 1,
                "screenDensityFloat": 1,
                "utcOffsetMinutes": 540,
                "userInterfaceTheme": "USER_INTERFACE_THEME_LIGHT",
                "playerType": "UNIPLAYER",
                "tvAppInfo": {"livingRoomAppMode": "LIVING_ROOM_APP_MODE_UNSPECIFIED"},
                "clientScreen": "WATCH_FULL_SCREEN"
            },
            "user": {"lockedSafetyMode": false},
            "request": {"useSsl": true, "internalExperimentFlags": [], "consistencyTokenJars": []},
            "clickTracking": {"clickTrackingParams": "CMsBEKCzAhgAIhMI-qWhytKb7wIV08VMAh2-Rg6k"},
            "clientScreenNonce": "MC42OTIxOTg1MTM3NzEyMTA0",
            "adSignalsInfo": {
                "params": [{"key": "dt", "value": "1615032914708"}, {
                    "key": "flash",
                    "value": "0"
                }, {"key": "frm", "value": "0"}, {"key": "u_tz", "value": "540"}, {
                    "key": "u_his",
                    "value": "3"
                }, {"key": "u_java", "value": "false"}, {"key": "u_h", "value": "1080"}, {
                    "key": "u_w",
                    "value": "1920"
                }, {"key": "u_ah", "value": "1040"}, {"key": "u_aw", "value": "1920"}, {
                    "key": "u_cd",
                    "value": "24"
                }, {"key": "u_nplug", "value": "0"}, {"key": "u_nmime", "value": "0"}, {
                    "key": "bc",
                    "value": "31"
                }, {"key": "bih", "value": "966"}, {"key": "biw", "value": "1903"}, {
                    "key": "brdim",
                    "value": "-1928,-331,-1928,-331,1920,-323,1936,1056,1920,966"
                }, {"key": "vis", "value": "1"}, {"key": "wgl", "value": "true"}, {"key": "ca_type", "value": "image"}]
            }
        },
        "playbackContext": {
            "contentPlaybackContext": {
                "html5Preference": "HTML5_PREF_WANTS",
                "lactMilliseconds": "35",
                "referer": "https://music.youtube.com/",
                "signatureTimestamp": 18690,
                "autoCaptionsDefaultOn": false,
                "liveContext": {"startWalltime": "0"},
                "playerWidthPixels": 402,
                "playerHeightPixels": 226
            }
        },
        "cpn": "aS88h3HE_NboJOqm",
        "playlistId": "RDAMVMmwnu2aP0Q8g",
        "captionParams": {}
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
        'Accept': '*/*',
        'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
        'Content-Type': 'application/json',
        'Authorization': 'SAPISIDHASH 1615033007_15cb87896bc56f28896f174584a64007a8c893f5',
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
    k: String = 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30'

    generateHeader(isAuthed:boolean) {
        let data = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0',
            'Accept': '*/*',
            'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Content-Length': '730',
            'X-Goog-Visitor-Id': 'CgtnWXVtd0c1eUZUOCiV-I2CBg%3D%3D',
            'X-Goog-AuthUser': '1',
            'X-Goog-PageId': 'undefined',
            'x-origin': 'https://music.youtube.com',
            'X-YouTube-Client-Name': '67',
            'X-YouTube-Client-Version': '0.1',
            'X-YouTube-Device': 'cbr=Firefox&cbrver=87.0&ceng=Gecko&cengver=87.0&cos=Windows&cosver=10.0&cplatform=DESKTOP',
            'X-Youtube-Identity-Token': 'QUFFLUhqbDdLeWc3YmJ3czFMNWQxSEYzOTc3Njc5eGJEd3w=',
            'X-YouTube-Page-CL': '360176471',
            'X-YouTube-Page-Label': 'youtube.music.web.client_20210301_00_RC00',
            'X-YouTube-Utc-Offset': '540',
            'X-YouTube-Time-Zone': 'Asia/Tokyo',
            'X-YouTube-Ad-Signals': 'dt=1615035414765&flash=0&frm&u_tz=540&u_his=2&u_java&u_h=1080&u_w=1920&u_ah=1040&u_aw=1920&u_cd=24&u_nplug&u_nmime&bc=31&bih=966&biw=1903&brdim=-1928%2C-331%2C-1928%2C-331%2C1920%2C-323%2C1936%2C1056%2C1920%2C966&vis=1&wgl=true&ca_type=image',
            'Origin': 'https://music.youtube.com',
            'DNT': '1',
            'Referer': 'https://music.youtube.com/',
            'Connection': 'keep-alive',
            'Cookie': 'VISITOR_INFO1_LIVE=gYumwG5yFT8; CONSENT=YES+JP.ja+202001; SID=6gfW18qBD-XygZ1f7zwjNGdeal7WlgKlvhp1gUdz3i1fIWzpnRY9F5hYPucdGOhzRoJTog.; __Secure-3PSID=6gfW18qBD-XygZ1f7zwjNGdeal7WlgKlvhp1gUdz3i1fIWzpVFAGof-lV8ldYz9ry5vmnA.; HSID=Aa1nhmAXl9YD4eo1N; SSID=ADWy5fQPU-6EKg_Pf; APISID=zSE_nTBkGhFW0QSZ/ALHgW0Q5AyyuY7x3b; SAPISID=qrIvLm_YnZJ28xJv/AZ4AV_tqLJE7OU7jU; __Secure-3PAPISID=qrIvLm_YnZJ28xJv/AZ4AV_tqLJE7OU7jU; LOGIN_INFO=AFmmF2swRgIhAKzRuRStAny-o8fPopm7GXShM8fkOrb_uIdKQ0e6xbCFAiEA8GboMMaSmvq6TvTddKNdLsT1hBKrBgSTaU8sejr3NPY:QUQ3MjNmelBUcThfX2FSa1h4N1FMTS1MOXVESVBnd1lZVU5yQXlSTHYycG1MTDZuM2ZUVEVxdDQ0Vm1ZLXZ0UktoT2pXMzNrVGJSdU40OWpBUWhUOFM5ODlFNUdRQWgtNTR1b0J2bC1yRzVVSHYzcXdTeW11RjNhYXE0Q0EtaTVpWEdoWVljMy1pV1V4OGxMTTlZc0s0czg0UmZKOTRDOXQxS2pXSkFLYnlKcVJFUHo2bFVNWE5j; SIDCC=AJi4QfHYZjWnbdkRALiQLBPlFjPyXGy2XUkiaoVt2tBs2K4ZEF68gcLCTB_5U4Te8VVzeUhz6fI; __Secure-3PSIDCC=AJi4QfEigd_MUkT5ZM-j9Ff7RMVQc3p6eS5LI5449ECEB2pwjYtb9yDFGmAvNBjdNATlK1QnfbqR; PREF=f6=80800&volume=20&tz=Asia.Tokyo&repeat=NONE; YSC=loSq1Jnr_u4; wide=1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'TE': 'Trailers'
        }
        if(isAuthed){
            // @ts-ignore
            data['Authorization'] = `SAPISIDHASH ${sha1(new Date().getTime() + " " + "SAPISID" + " " + "https://music.youtube.com/")}`
        }
        return data
    }

    async post(
        endPoint: string,
        data: any,
        isAuthed:boolean,
        tags?: string
    ) {
        return await axios.post(`https://music.youtube.com/youtubei/v1/${endPoint}?key=${this.k}${tags}`, data, {headers: this.generateHeader(isAuthed)})
    }

    async player(videoId: String) {
        let data = JSON.parse(JSON.stringify(this.playerData))
        data['videoId'] = videoId
        return await axios.post(`https://music.youtube.com/youtubei/v1/player?key=${this.k}`, data, {headers: this.headers})
    }

    async getFormats(videoId: String): Promise<FormatsJSON | null> {
        let res = await this.player(videoId)
        return parseFormats(res)
    }

    async getAdaptiveFormats(videoId: String): Promise<AdaptiveFormatsJSON> {
        let res = await this.player(videoId)
        return parseAdaptiveFormats(res)
    }

    async next(videoId: String) {
        let data = JSON.parse(JSON.stringify(this.nextData))
        data['videoId'] = videoId
        return await axios.post(`https://music.youtube.com/youtubei/v1/next?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    // async browse() {
    //     return await axios.post(`https://music.youtube.com/youtubei/v1/browse?alt=json&key=${this.k}`, this.browseData, {headers: this.headers})
    // }

    // async getBrowseData(): Promise<BrowseData> {
    //     return new BrowseData(await this.browse());
    // }

    async search(query: String) {
        let data = JSON.parse(JSON.stringify(this.searchData))
        data['query'] = query
        return await axios.post(`https://music.youtube.com/youtubei/v1/search?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    // PlayList

    async searchVideos(query: String): Promise<Array<Video>> {
        let data = await this.search(query)
        return this.parseSearchResults(data['data'])
    }

    parseSearchResults(data: any): Array<Video> {
        let c = data['contents']['sectionListRenderer']['contents']
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
        return axios.post(`https://music.youtube.com/youtubei/v1/next?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    async getPlayListData(id: string): Promise<PlayList> {
        return await getPlayList(id, this)
    }

    async getBrowse() {
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
            }, "browseId": "FEmusic_home"
        }

        return await axios.post(`https://music.youtube.com/youtubei/v1/browse?alt=json&key=${this.k}`, data, {headers: this.headers})
    }

    async getBrowseData(): Promise<BrowseData> {
        return await getBrowseData(this)
    }

    async getContinuation(continuation: string) {
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
            }
        }

        return await axios.post(`https://music.youtube.com/youtubei/v1/browse?alt=json&type=next&key=${this.k}&ctoken=${continuation}&continuation=${continuation}`, data, {headers: this.headers})
    }
}

/*class BrowseData {
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
*/
module.exports = {YoutubeMusicAPI}
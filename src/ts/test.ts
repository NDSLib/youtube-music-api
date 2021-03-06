import {Video} from './Video'
import open from "open";
import {getPlayList} from "./PlayList";
import {getBrowseData} from "./BrowseData";
// import * as fs from "fs";
import axios from "axios";

const youtubeMusicAPI = require('./YoutubeMusic')
const video_js = require('./Video')
const video = new video_js.Video('1tk1pqwrOys')
const api = new youtubeMusicAPI.YoutubeMusicAPI()

async function main() {
    let next = await video.next(api)

    // 直リン取得
    // PASSED!
    // let player = await video.getFormats(api)
    // console.log('format res')
    // console.log(player?.getFormatURL())
    console.log((await api.player('1tk1pqwrOys'))['data']['streamingData'])

    // 動画IDからサムネイル取得
    // PASSED!
    // let detail = await video.getVideoDetail(api)
    // console.log(`Title:${detail.getTitle()}`)
    // for (let t in detail.getThumbnails()) {
    //     console.log(`Thumbnail${t}:${detail.getThumbnails()[t]['url']}`)
    // }

    // 検索
    // let search: Array<Video> = await api.searchVideos('マオ')
    // for (let i in search) {
    //     let detail = await search[i].getVideoDetail(api)
    //     console.log(`Title:${detail.getTitle()}`)
    //     for (let t in detail.getThumbnails()) {
    //         console.log(`Thumbnail${t}:${detail.getThumbnails()[t]['url']}`)
    //     }
    //     console.log(`link:${(await search[i].getFormats(api))?.getFormatURL()}`)
    // }

    // プレイリスト内の動画一覧
    // let data = await getPlayList('RDAMVMliAryLiZeqI',api)
    // for (const it of data.videos) {
    //     console.log(`Title:${it.getTitle()}`)
    //     console.log(`VideoID:${it.getVideoID()}`)
    //     let video = it.getAsVideo()
    //     console.log(`Link:${(await video.getFormats(api))?.getFormatURL()}`)
    //     console.log()
    // }

    //新Browse
    // let browse = await getBrowseData(api)
    // browse.contents.forEach((it) => {
    //     console.log(`Title:${it.getTitle()}`)
    //     console.log(`SubTitle:${it.getSubTitle()}`)
    //     console.log(`VideoID:${it.getVideoID()}`)
    //     console.log(`PlayListID:${it.getPlayListID()}`)
    // })
    // console.log(`Continuation ID:${browse.getContinuationID()}`)
    // let continuation = await browse.getContinuationData(api)
    // console.log(continuation)

}

main().then(r => console.log('END'))
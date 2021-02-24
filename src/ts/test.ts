import {Video} from './Video'
import open from "open";
import {Tab, VideoItem} from './YoutubeMusic'
import {getPlayList} from "./PlayList";
import {getBrowseData} from "./BrowseData";

const youtubeMusicAPI = require('./YoutubeMusic')
const video_js = require('./Video')
const video = new video_js.Video('xrDruN69QCw')
const k = require('./config').key
const api = new youtubeMusicAPI.YoutubeMusicAPI(k)

async function main() {
    let next = await video.next(api)

    // 直リン取得
    // let player = await video.getFormats(api)
    // console.log('format res')
    // console.log(player[0]['url'])

    // 動画IDからサムネイル取得
    // let detail = await video.getVideoDetail(api)
    // console.log(`Title:${detail.getTitle()}`)
    // for (let t in detail.getThumbnails()) {
    //     console.log(`Thumbnail${t}:${detail.getThumbnails()[t]['url']}`)
    // }

    // 現在使用不可
    // let browse = await api.getBrowseData()
    // let contents: Array<VideoItem> | null = browse.getTabs()[0].getContents()
    // YoutubeMusicでいくところの、ホームに表示されるサムネイル・タイトル・サブタイトル・動画直リン

    // for (let i in browse.getTabs()[0].getContents()) {
    //     console.log(`${parseInt(i) + 1}本目:`)
    //     console.log('VideoId:' + browse.getTabs()[0].getContents()[i].getVideoID())
    //     let video = await browse.getTabs()[0].getContents()[i].getVideo()
    //     if(video !== null){
    //         let link = video.getFormats(api)
    //         if (link !== null) {
    //             console.log('PlayLink:' + link[0]['url'])
    //             console.log('Thumbnails:')
    //             for (let o in browse.getTabs()[0].getContents()[i].getThumbnails()) {
    //                 console.log(`Thumbnail[${o}]:` + browse.getTabs()[0].getContents()[i].getThumbnails()[o]['url'])
    //             }
    //             console.log('Title:' + browse.getTabs()[0].getContents()[i].getTitle())
    //             console.log('SubTitle:' + browse.getTabs()[0].getContents()[i].getSubTitle())
    //         }
    //     }else{
    //         console.log('Video Null')
    //     }
    //     console.log('')
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

    // console.log("Opening First One...")
    // let video_link: string = (await search[0].getFormats(api)).getFormatURL()
    // await open(video_link)

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
    let browse = await getBrowseData(api)
    browse.contents.forEach((it) => {
        console.log(`Title:${it.getTitle()}`)
        console.log(`SubTitle:${it.getSubTitle()}`)
        // console.log(`VideoID:${it.getVideoID()}`)
        // console.log(`PlayListID:${it.getPlayListID()}`)
    })
}

main().then(r => console.log('END'))
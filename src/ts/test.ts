// import * as fs from "fs";
import {BROWSE_DIST, getBrowse} from "./Browse";
import {getSearch} from "./Search";

// const youtubeMusicAPI = require('./YoutubeMusic')
// const video_js = require('./Video')
// const video = new video_js.Video('1tk1pqwrOys')
// const api = new youtubeMusicAPI.YoutubeMusicAPI()
//
// async function main() {
// let next = await video.next(api)

// 直リン取得
// PASSED!
// let player = await video.getFormats(api)
// console.log('format res')
// console.log(player?.getFormatURL())
// console.log((await api.player('1tk1pqwrOys'))['data']['streamingData'])

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

// }
//
// main().then(r => console.log('END'))


async function searchTest(query: string) {
    const youtube = require('./YoutubeMusic')
    const api = new youtube.YoutubeMusicAPI()
    let data = await getSearch(api, query)
    // @ts-ignore
    // console.log(data['data'])


    data.forEach((it)=>{
        console.log(`SearchEntry Title:${it.getTitle()}`)
    //     it.getItems()
    //         .filter((i)=>{
    //             return i.isVideo()
    //         })
    //         .forEach((i)=>{
    //         console.log(`SearchItem Title:${i.getTitle()}`)
    //         console.log(`SearchItem SubTitle:${i.getSubTitle()}`)
    //         console.log(`SearchItem VideoId:${i.getVideoID()}`)
    //     })
    })

    data.filter((it) => {
        return it.getTitle() === '動画'
    })
        .forEach((it) => {
            let i = it.getFirstItem()
            console.log(`SearchItem Title:${i.getTitle()}`)
            console.log(`SearchItem SubTitle:${i.getSubTitle()}`)
            console.log(`SearchItem VideoId:${i.getVideoID()}`)
        })
}

searchTest('マオ').then(r => {
    console.log('END')
})

// async function browseTest() {
//     const youtube = require('./YoutubeMusic')
//     const api = new youtube.YoutubeMusicAPI()
//     let data = await getBrowse(api, BROWSE_DIST.home)
//     console.log(`BrowseTitle:${data.getTitle()}`)
//     data.getContents().forEach((it)=>{
//         console.log(`BrowseRow Title:${it.getTitle()}`)
//         it.getContents().forEach((i)=>{
//             console.log(`BrowseEntry Title:${i.getTitle()}`)
//             console.log(`BrowseEntry VideoID:${i.getVideoID()}`)
//         })
//     })
// }
//
// browseTest().then(()=>{
//     console.log('END!')
// })
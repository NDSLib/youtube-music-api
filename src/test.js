const youtubeMusicAPI = require('./YoutubeMusic')
const video_js = require('./Video')
const video = new video_js.Video('xrDruN69QCw')
const key = require('./config').key
const api = new youtubeMusicAPI.YoutubeMusicAPI(key)

async function main() {
    let next = await video.next(api)

    // 直リン取得
    let player = await video.getFormats(api)
    console.log('format res')
    console.log(player[0]['url'])

    // 動画IDからサムネイル取得
    let detail = await video.getVideoDetail(api)
    console.log(`Title:${detail.getTitle()}`)
    for (let t in detail.getThumbnails()) {
        console.log(`Thumbnail${t}:${detail.getThumbnails()[t]['url']}`)
    }

    let browse = await api.getBrowseData()
    // YoutubeMusicでいくところの、ホームに表示されるサムネイル・タイトル・サブタイトル

    for (let i in browse.getTabs()[0].getContents()) {
        console.log(`${i + 1}本目`)
        console.log(browse.getTabs()[0].getContents()[i].getThumbnails())
        console.log(browse.getTabs()[0].getContents()[i].getTitle())
        console.log(browse.getTabs()[0].getContents()[i].getSubTitle())
    }
}

main().then(r => console.log('END'))
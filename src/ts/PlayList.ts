import {YoutubeMusicAPI} from "./YoutubeMusic";
// import * as fs from "fs";
import {Video} from "./Video";

export const getPlayList = async (playListId: string, api: YoutubeMusicAPI): Promise<PlayList> => {
    let data = (await api.getPlayList(playListId))['data'] //歌詞は1
    return parsePlayList(data)
}

export const parsePlayList = (d:any) : PlayList => {
    let data = d['contents']['singleColumnMusicWatchNextResultsRenderer']['tabbedRenderer']['watchNextTabbedResultsRenderer']['tabs'][0] //歌詞は1
    let playList = new PlayList()
    if (data['tabRenderer']['title'] !== "次の曲") {
        console.log("WARN:getPlayList:次の曲取得できず")
    }
    let playlistPanelRenderer = data['tabRenderer']['content']['musicQueueRenderer']['content']['playlistPanelRenderer']
    console.log(`PlayListTitle:${playlistPanelRenderer['title']}`)
    playList.setTitle(playlistPanelRenderer['title'])
    let contents = playlistPanelRenderer['contents']
    // fs.writeFileSync('./playlistContents.json', JSON.stringify(contents))
    for (let i in contents) {
        let video = contents[i]['playlistPanelVideoRenderer']
        playList.addEntry(new PlayListEntry(video))
    }
    return playList
}

export class PlayList {
    // Don't use this,
    videos: Array<PlayListEntry> = []
    title: string = ""

    // Use getPlayList
    constructor() {
    }

    addEntry(entry: PlayListEntry) {
        this.videos.push(entry)
    }

    setTitle(t: string) {
        this.title = t
    }

    getTitle() {
        return this.title
    }
}

export class PlayListEntry {
    json: JSON = JSON.parse('{}')

    constructor(json: JSON) {
        this.json = json
    }

    title = ""

    getTitle():string{
        if(this.title !== ""){
            return this.title
        }

        // @ts-ignore
        this.title = this.json['title']['runs'][0]['text']
        return this.title
    }

    subTitles = ""

    setSubTitle(s:string){
        this.subTitles = s
    }

    getSubtitle(): string {
        if (this.subTitles !== "") {
            return this.subTitles
        }

        let s = ""
        // @ts-ignore
        for (let i in this.json['longBylineText']) {
            // @ts-ignore
            s += this.json['longBylineText'][i]['text']
        }

        this.subTitles = s
        return s
    }

    thumbnails = []

    getThumbnails():Array<any>{
        if(this.thumbnails.length!==0){
            return this.thumbnails
        }

        // @ts-ignore
        this.thumbnails = this.json['thumbnail']['thumbnails']
        return this.thumbnails
    }

    lengthText = "0:00"

    getLengthText(){
        if(this.lengthText !== "0:00"){
            return this.lengthText
        }

        // @ts-ignore
        this.lengthText = this.json['lengthText']['runs']['text']
        return this.lengthText
    }

    videoId = ""

    getVideoID():string{
        if(this.videoId !== ""){
            return this.videoId
        }

        // @ts-ignore
        this.videoId = this.json['videoId']
        return this.videoId
    }

    getAsVideo() {
        return new Video(this.getVideoID())
    }
}
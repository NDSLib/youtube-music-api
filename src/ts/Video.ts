import {YoutubeMusicAPI} from './YoutubeMusic'

export class Video {
    videoId: String = ''

    /**
     * @param videoId(string)
     */
    constructor(videoId: String) {
        this.videoId = videoId
    }

    async player(api: YoutubeMusicAPI) {
        return await api.player(this.videoId)
    }

    async getFormats(api: YoutubeMusicAPI) {
        return await api.getFormats(this.videoId)
    }

    async getAdaptiveFormats(api: YoutubeMusicAPI) {
        return await api.getAdaptiveFormats(this.videoId)
    }

    async next(api: YoutubeMusicAPI) {
        return await api.next(this.videoId)
    }

    async getVideoDetail(api: YoutubeMusicAPI) {
        let data = await this.player(api)
        return new VideoDetail(data['data']['videoDetails'])
    }
}

class VideoDetail {
    json: any = {}

    constructor(json: any) {
        this.json = json
    }

    getTitle() {
        return this.json['title']
    }

    getVideoID() {
        return this.json['videoId']
    }

    getAuthor() {
        return this.json['author']
    }

    getViewCount() {
        return this.json['viewCount']
    }

    getThumbnails() {
        return this.json['thumbnail']['thumbnails']
    }
}

module.exports = {Video, VideoDetail}
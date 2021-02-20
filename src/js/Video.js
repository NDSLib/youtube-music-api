class Video {
    videoId = ''

    /**
     * @param videoId(string)
     */
    constructor(videoId) {
        this.videoId = videoId
    }

    async player(api){
        return await api.player(this.videoId)
    }

    async getFormats(api) {
        return await api.getFormats(this.videoId)
    }

    async getAdaptiveFormats(api) {
        return await api.getAdaptiveFormats(this.videoId)
    }

    async next(api) {
        return await api.next(this.videoId)
    }

    async getVideoDetail(api){
        let data = await this.player(api)
        return new VideoDetail(data['data']['videoDetails'])
    }
}

class VideoDetail{
    json = {}
    constructor(json) {
        this.json = json
    }

    getTitle(){
        return this.json['title']
    }

    getVideoID(){
        return this.json['videoId']
    }

    getAuthor(){
        return this.json['author']
    }

    getViewCount(){
        return this.json['viewCount']
    }

    getThumbnails(){
        return this.json['thumbnail']['thumbnails']
    }
}

module.exports = {Video,VideoDetail}
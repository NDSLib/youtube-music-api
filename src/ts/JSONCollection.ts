export const parseFormats = (res:any) : null | FormatsJSON => {
    if (res['data']['streamingData'] === undefined) {
        return null
    }
    return new FormatsJSON(res['data']['streamingData']['formats'])
}

export const parseAdaptiveFormats = (res:any) => {
    return new AdaptiveFormatsJSON(res['data']['streamingData']['adaptiveFormats'])
}

export class FormatsJSON {
    json = JSON.parse('{}')

    constructor(json: JSON) {
        this.json = json
    }

    getFormatURL() {
        return this.json[0]['url']
    }
}

export class AdaptiveFormatsJSON {
    json = JSON.parse('{}')

    constructor(json: JSON) {
        this.json = json
    }

    getAdaptiveFormatURLs(): Array<string> {
        let s = []
        for (let i in this.json) {
            s.push(this.json[i]['url'])
        }
        return s
    }
}
import axios from 'axios'

class FaviconService {
    apiURL: string
    constructor() {
        this.apiURL = 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL'
    }
    async getDomain(domain: string, size = 32) {
        return axios({
            url: `${this.apiURL}&url=${domain}&size=${size}`,
            method: 'GET',
            responseType: 'blob'
        }).then(async (response) => {
            const blob = new Blob([response.data])
            return await this.blobToBase64(blob)
        })
                
    }
    async blobToBase64(blob: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.readAsDataURL(blob)
        })
    }
}

export default new FaviconService()
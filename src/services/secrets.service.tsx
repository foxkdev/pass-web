import axios, { Axios } from 'axios'

class SecretService {
    http: Axios
    apiURL: string
    constructor() {
        this.apiURL = 'http://localhost:3000/'
        this.http = axios.create({
            baseURL: this.apiURL
        })
    }
    async getAllSecrets() {
        return this.http.get('secrets')
            .then((response) => {
                return response.data
            })
            .catch((response) => {
                return []
            })
    }

    async getSecret(id: string) {
        return this.http.get(`secrets/${id}`)
            .then((response) => {
                return response.data
            })
            .catch(() => {
                return null
            })
    }

    async getSecretDecrypted(id: string, token: string) {
        return this.http.get(`secrets/${id}/decrypted`, {
            headers: {'token-encryption': token }
        })
            .then((response) => {
                return response.data
            })
            .catch(() => {
                return null
            })
    }

    async updateSecret(id: string, data: any, token: string) {
        return this.http.put(`secrets/${id}`, data, {
            headers: {'token-encryption': token }
        })
            .then((response) => {
                return response.data
            })
            .catch(() => {
                return null
            })
    }

    async getTypes() {
        return this.http.get('secrets/types')
            .then((response) => {
                return response.data
            })
            .catch((response) => {
                return []
            })
    }
    
}

export default new SecretService()
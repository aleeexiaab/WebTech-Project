import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class VideoStore {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getVideos () {
        try {
            const response = await fetch(`${SERVER}/videos`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_VIDEOS_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit("GET_VIDEOS_ERROR")
        }
    }
    async addVideo (video) {
        try {
            const response = await fetch(`${SERVER}/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(video)
            })
            if (!response.ok) {
                throw response
            }
            this.getVideos()
        } catch (err) {
            console.warn(err)
            this.emitter.emit("ADD_VIDEO_ERROR")
        }
    }
    async saveVideo (id, video) {
        try {
            const response = await fetch(`${SERVER}/videos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(video)
            })
            if (!response.ok) {
                throw response
            }
            this.getVideos()
        } catch (err) {
            console.warn(err)
            this.emitter.emit("UPDATE_VIDEO_ERROR")
        }
    }
    async deleteVideo (id) {
        try {
            const response = await fetch(`${SERVER}/videos/${id}`, {
                method: 'DELETE' 
            })
            if (!response.ok) {
                throw response
            }
            this.getVideos()
        } catch (err) {
            console.warn(err)
            this.emitter.emit("DELETE_VIDEO_ERROR")
        }
    }
}

const store = new VideoStore()
export default store
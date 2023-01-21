const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const path = require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sample.db',
    define: {
        timestamps: false
    }
})

const Video = sequelize.define('video', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT
})

const app = express()
app.use(express.static(path.join(__dirname, 'public'))) 
app.use(cors()) 
app.use(express.json())


app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'tables created'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'server error'})
    }
})

// get all videos
app.get('/videos', async (req, res) => {
    try {
        // equivalent to SELECT *
        const videos = await Video.findAll()
        res.status(200).json(videos)
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occurred'})
    }
})

// add a video
app.post('/videos', async (req, res) => {
    try {
        await Video.create(req.body)
        res.status(201).json({ message: 'created'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occurred'})
    }
}) 

// get a specific video
app.get('/videos/:vid', async (req, res) => {
    try {
        // equivalent to SELECT *
        const video = await Video.findByPk(req.params.vid)
        if (video) {
            res.status(200).json(video)
        } else {
            res.status(400).json({ message: 'not found' })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occurred'})
    }
}) 

// modify an existing video
app.put('/videos/:vid', async (req, res) => {
    try {
        // equivalent to SELECT *
        const video = await Video.findByPk(req.params.vid)
        if (video) {
            await video.update(req.body, { fields: ['title', 'content']}) // user doesn't have access to the id 
            res.status(200).json({ message: 'accepted'})
        } else {
            res.status(400).json({ message: 'not found' })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occurred'})
    }
}) 

// delete video
app.delete('/videos/:vid', async (req, res) => {
    try {
        // equivalent to SELECT *
        const video = await Video.findByPk(req.params.vid)
        if (video) {
            await video.destroy() 
            res.status(200).json({ message: 'accepted'})
        } else {
            res.status(400).json({ message: 'not found' })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occurred'})
    }
}) 


app.listen(8080)

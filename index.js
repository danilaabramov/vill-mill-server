import express from 'express'
import fs from 'fs'
import multer from 'multer'
import cors from 'cors'

import mongoose from "mongoose"

import {registerValidation, loginValidation} from './validations.js'

import { handleValidationErrors, checkAuth } from './utils/index.js'

import { UserController, productRoute} from './controllers/index.js'

mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb+srv://danila:220901qwerasdf@cluster0.wiw6q.mongodb.net/vill-mill?retryWrites=true&w=majority")
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json({limit: '1gb'}))
app.use(express.urlencoded({limit: '1gb', extended: true}));
app.use(cors())
app.use('/api/uploads', express.static('uploads'))

app.post('/api/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/api/auth/me', checkAuth, UserController.getMe)

app.use("/api/products", productRoute);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


app.listen(process.env.PORT || 5003, (err) => {
    if (err) return console.log(err)

    console.log('Server OK')
})















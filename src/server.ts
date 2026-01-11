import express, { Request, Response } from 'express'
import eventRoute from './routes/EventRoute'
import path from 'path'
import cors, { CorsOptions } from 'cors'
import multer from 'multer'
import { uploadFile } from './services/UploadFileService'

const webApp = express()
const webPort = 5050
webApp.use(express.static(path.join(process.cwd())))
webApp.listen(webPort, () => {
  console.log(`WebApp listening at http://localhost:${webPort}`)
})

const app = express()
const port = 3000

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5050'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const upload = multer({ storage: multer.memoryStorage() })

app.use(cors(corsOptions))
app.use(express.json())

app.use('/events', eventRoute)

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded.')
    }

    const bucket = 'images'
    const filePath = `uploads/${file.originalname}`

    await uploadFile(bucket, filePath, file)
    res.status(200).send('File uploaded successfully.')
  } catch (error) {
    res.status(500).send('Error uploading file.')
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

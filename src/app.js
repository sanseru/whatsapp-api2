require('./routes')
const { restoreSessions } = require('./sessions')
const { routes } = require('./routes')
const app = require('express')()
const bodyParser = require('body-parser')
const { maxAttachmentSize } = require('./config')
const cors = require('cors');

// Initialize Express app
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }))
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }))
app.use('/', routes)
app.use(cors({
    origin: 'https://mcu.lymancomedika.com',
    methods: 'GET, POST, OPTIONS',  // Pastikan OPTIONS juga diizinkan
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],  // Tambahkan x-api-key di sini
    credentials: true,  // Jika Anda menggunakan cookies atau header autentikasi
}));

restoreSessions()

module.exports = app

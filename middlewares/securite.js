const cors  =require('cors')
const helmet =require('helmet')
const rateLimit =require('express-rate-limit')

//autoriser uniqument les addresses autoriser a acceder a l'API
const corsOptions = cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:5500',  // ← 5500 pas 3500
    'http://localhost:5500'
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
})


//maximun 100 requetes toutes les 15min
const limiter = rateLimit({
    windowMs:15 *60 *1000, //15 minutes
    max: 1000,
    message:{
        erreur:'trop de requetes , reesaie dans 15 min'
    }
})


//protege le serveur contre les attaques web courantes
const casque =helmet ()

module.exports={corsOptions, limiter, casque }
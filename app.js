// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// const {corsOptions, limiter, casque } = require('./middlewares/securite')

// //charger les variables de .env
// dotenv.config()
// //Creer le serveur Express
// const app =express();

// // Servir le dashboard
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// })
// app.use(express.static('public'))

// // securite- a mettre avant toutes les routes
// app.use(casque)
// app.use(limiter)
// app.use(corsOptions)
// app.use(express.json());
// // connexion a mongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(()=>{
//     console.log("MongoDB connecte avec succes")
//   })
//   .catch((err)=> {
//     console.log("Erreur de connexion MongoDB:",err.message)
//   })
//   // Importer les routes
//   const mesuresRoutes = require('./routes/mesures')
//   const alertesRoutes = require('./routes/alertes')
//   const capteursRoutes = require('./routes/capteurs')
//   const statsRoutes =require('./routes/stats')
//   //Brancher les routes
//   app.use('/mesures', mesuresRoutes)
//   app.use('/alertes', alertesRoutes)
//   app.use('/capteurs',capteursRoutes)
//   app.use('/stats',statsRoutes)
//   //demarrer le serveur
//   app.listen(process.env.PORT,"0.0.0.0", () =>{
//     console.log(`Serveur demarer sur le port ${process.env.PORT}`)
//   })


const express  = require("express");
const mongoose = require("mongoose");
const dotenv   = require('dotenv');
const path     = require('path')
const { corsOptions, limiter, casque } = require('./middlewares/securite')

dotenv.config()

const app = express();

// Servir le dashboard
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(casque)
app.use(limiter)
app.use(corsOptions)
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecte avec succes"))
  .catch((err) => console.log("Erreur MongoDB:", err.message))

const mesuresRoutes  = require('./routes/mesures')
const alertesRoutes  = require('./routes/alertes')
const capteursRoutes = require('./routes/capteurs')
const statsRoutes    = require('./routes/stats')

app.use('/mesures',  mesuresRoutes)
app.use('/alertes',  alertesRoutes)
app.use('/capteurs', capteursRoutes)
app.use('/stats',    statsRoutes)

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Serveur demarre sur le port ${process.env.PORT}`)
})








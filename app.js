const express = require('express')
const app =  express()
const bodyParser = require('body-parser') 
const path = require('path')
const socket = require('socket.io')
//Configuring the server
const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log("The server is up and running...")
})
const fs = require('fs')
const io = socket(server)

const activeGames = []
let array = []
let idNum = 0

fs.readdir(path.join(__dirname, '/needed/theCards/essential'), (err, files)=>{
    if(err) return
    array = files
})
//middleware
app.use('/static', express.static('public'))
app.use('/needed', express.static('needed'))
app.use(bodyParser.json())

//Configuring the server

//Setting up the webscoket connection
io.on('connection', (socketI)=>{
    console.log("We have a new connection...")
    socketI.on('message', (message)=>{
        console.log(message)
        io.emit('sent', message)
    })
    socketI.on('shuffleFor2', ()=>{
        const newOrder = shuffle(array)
        let player1 = []
        let player2 = []

        for(let i = 0; i < 18; i++){
            player1[i] = newOrder[i]
            player2[i] = newOrder[i+18]
        }
        io.emit('shuffled', {
            player1: player1,
            player2: player2,
            where: path.join(__dirname, '/needed/theCards/essential')
        })
    })
})


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './index.html'))
})
app.get('/game', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/gaming/gaming.html'))
})
app.get('/game/gameon', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/actualGame/actualGame.html'))
})
app.get('/game/invite', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/invite/invite.html'))
})
app.post('/newgame', (req, res)=>{
    let newGame = {
        admin: req.body.admin,
        numOfPlayers: req.body.numOfPlayers,
        players: [],
        __id: idNum
    }
    idNum++
    console.log(activeGames.push(newGame))
    console.log(activeGames)
    res.send(true)
})



//The gaming logic
//Part1: the Shuffling....

function shuffle(array1) {/*From StackOverFlow*/
    var currentIndex = array1.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array1[currentIndex];
      array1[currentIndex] = array1[randomIndex];
      array1[randomIndex] = temporaryValue;
    }
  
    return array1;
  }
  



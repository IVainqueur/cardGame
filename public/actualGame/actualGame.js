window.onload = ()=>{
    const textBox = document.querySelector('#textBox')
    const textArea = document.querySelector('#textArea')
    const nameOfUser = document.querySelector('#nameOfUser')
    const gameArea = document.querySelector('#game')
    const shuffleBTN = document.querySelector('#shuffle')
    const wStyle = "style = \"color:rgb(12, 99, 57);font-weight:bold;\""
    const socket = io('http://localhost:3000')
    const numOfPlayers = 2
    let shuffled = []
    let isShuffled = false


    textBox.addEventListener('keyup', (e)=>{
        if(e.key == "Enter"){
            socket.emit('message', {
                message: textBox.value,
                user: nameOfUser.value
            })
            
            textBox.value = ''
        }
    })
    shuffleBTN.addEventListener('click', ()=>{
        if(!isShuffled) {
            socket.emit('shuffleFor2', null)
            isShuffled = true
        }else{
            warnEm("Already shuffled!")
        }
    })
    socket.on('sent', (message)=>{
        textArea.innerHTML += `<span ${wStyle}>${message.user}</span>&nbsp;&nbsp;${message.message}<br>`
        textArea.scrollTo(0, textArea.scrollHeight)
    })
    socket.on('shuffled', (sent)=>{
        console.log(sent)
        shuffled = sent.player1
        let x = 0
        for(let i = 0; i < shuffled.length; i++){
            let card = document.createElement('img')
            
            card.classList.add('cardClass')
            document.querySelector('#center').appendChild(card)
            if(i%2 == 0){
                card.classList.add('one')
                card.src = `../../needed/theCards/blackBack.svg`
                card.addEventListener('click', ()=>{
                    // card.style.top = "50%"
                    
                    card.classList.add('test')
                    
                })
                card.style.right = `${x}%`
                card.style.top = `-${card.height/2}px`
                x += .5
            }else{
                card.classList.add('two')
                card.src = `../../needed/theCards/essential/${shuffled[i]}`
                card.addEventListener('click', ()=>{
                    // card.style.bottom = "50%"
                    card.classList.add('test')
                })
                card.style.left = `${x}%`
                card.style.bottom = `-${card.height/2}px`
                x += .5
            }
            
        }
    })



    let colors = ["one1", "two1", "three1", "blank", "center", "blank2", "one2", "two2", "three2"]
    const makeParts = (num)=>{
        for(num; num > 0; num--){
            let part = document.createElement('div')
            // part.innerHTML = "Nigga's part"
            part.classList.add('partClass')
            part.id = colors[num-1]
            // part.style.backgroundColor = "pink"
            gameArea.appendChild(part)
        }
    }
    makeParts(9)

    
    function warnEm(message){
        console.log('Called')
        let warner = document.createElement('div')
        warner.classList.add('warner')
        warner.innerHTML = message
        document.querySelector('body').appendChild(warner)
        console.log(warner)
    }

    //Test adding new game
    const http = new XMLHttpRequest()
    http.open('POST', 'http://localhost:3000/newgame')
    http.setRequestHeader("Content-Type", "application/json")
    let body = {
        "admin":"IV",
        "numOfPlayers": 4
    }
    http.send(JSON.stringify(body))

}
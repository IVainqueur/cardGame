window.onload = ()=>{
    const newGame = document.querySelector('#new')
    const backDrop = document.querySelector('#cover')
    const popOut = document.querySelector('#popOut')
    const invite = document.querySelector('#invite')

    newGame.addEventListener('click', ()=>{
        backDrop.style.display = 'block'
        popOut.style.right = "30px"
    })
    backDrop.addEventListener('click', ()=>{
        backDrop.style.display = 'none'
        popOut.style.right = "-70%"
    })
    invite.addEventListener('click', ()=>{
        window.location = `${window.location.href}/gameon`
    })
}
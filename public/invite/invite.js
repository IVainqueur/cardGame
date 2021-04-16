window.onload = ()=>{
   const acceptBTN = document.querySelector('#accept')
   const declineBTN = document.querySelector('#decline')
   const gameBTN =  document.querySelector('#gameNow')


   acceptBTN.addEventListener('click', ()=>{
       declineBTN.style.display = "none"
       acceptBTN.textContent = "ACCEPTED"
       acceptBTN.style.width = "100%"
   })
   declineBTN.addEventListener('click', ()=>{
       acceptBTN.style.display = "none"
       declineBTN.textContent = "DECLINED"
       declineBTN.style.width = "100%"
   })
   gameBTN.addEventListener('click', ()=>{
       console.log("CAlled Nigga")
        const nameOfUser = document.querySelector('#nameOfUser')
        window.location = `${window.location.href.substring(0, window.location.href.lastIndexOf('invite'))}gameon`
        // const http = new XMLHttpRequest()
        // http.open('GET', 'http://localhost:3000/game/gameon')
        // http.send()
        
        // http.onreadystatechange = (e)=>{
        //     console.log("Triggered:"+ http.readyState)
        //     if(http.readyState == 4 && http.status == 200){
        //         // document.write(http.response)
        //         console.log(http.response)
        //     }
        // }
   })
}
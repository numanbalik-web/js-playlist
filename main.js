const prevButton = document.getElementById("prev")
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//sira
let index

//dongu
let loop = true

//sarki listesi
const songsList = [
    {
        name: "Yalan",
        link: "assets/Candan-Ercetin-Yalan.mp3",
        artist: "Candan Ercetin",
        image: "assets/Candan-Ercetin.jpg.png"
    },
      {
        name: "Tamirci çiraǧi",
        link: "assets/Cem-Karaca-Tamirci-Ciragi.mp3",
        artist: "Cem Karaca",
        image: "assets/Cem-Karaca.jpg.png"
    },
    {
        name: "Bir Güldün",
        link: "assets/Emre-Fel bir güldün.mp3",
        artist: "Emre Fel",
        image: "assets/Emre-Fel.jpg"
    },
    {
        name: "Tükeneceǧiz",
        link: "assets/Sezen-Aksu-Tukenecegiz.mp3",
        artist: "Sezen Aksu",
        image: "assets/Sezen-Aksu.jpg.png"
    },
    {
        name: "Biz Cocukken",
        link: "assets/Tarkan-Biz-Cocukken.mp3",
        artist: "Tarkan",
        image: "assets/Tarkan.jpg.png"
    }
]
//zaman formatla
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0"+second : second
    return `${minute}:${second}`
}


//sarkiyi ata
const setSong = (arrayIndex) => {
    console.log(arrayIndex)

    let {name, link, artist, image} = songsList[arrayIndex]

    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadeddata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playAudio()
    
    playListContainer.classList.add("hide")

}

//sure gectikce
audio.addEventListener("timeupdate",()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)

    let value = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
    currentProgress.style.width = value
})


progressBar.addEventListener("click",(event) => {
    //balangic
    let coordStart = progressBar.getBoundingClientRect().left

    console.log(coordStart)

    let coordEnd = event.clientX

    console.log(coordEnd)

    console.log(progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    console.log(progress)

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    playAudio()

})

//sarki listesi ac
playListButton.addEventListener("click", ()=>{
    playListContainer.classList.remove("hide")
})

//sarki listesini kapat
closeButton.addEventListener("click",()=>{
    playListContainer.classList.add("hide")
})


//sarki bittiginde tetiklenir
audio.onended = () => {
    nextSong()
}



//sarkiyi cal
const playAudio = () =>{
    audio.play()

    playButton.classList.add("hide")
    pauseButton.classList.remove("hide")
}


//sarkiyi durdur
const pauseAudio = () =>{
    audio.pause()

    playButton.classList.remove("hide")
    pauseButton.classList.add("hide")

}

//siradaki sarki
const nextSong = () =>{

    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index = index + 1
        }
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        index = randIndex
    }

    setSong(index)
}


//onceki sarkiya gec
const previousSong = () => {
    if (index > 0) {
        index = index - 1
    } else {
        index = songsList.length - 1
    }

    setSong(index)
}

//ekran tuklendiginde
window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}

//sarki listesi olustur
const initializePlaylist = () => {
    for (const i in songsList){

        playListSongs.innerHTML += 
        `<li class="playlistSong"
            onclick="setSong(${i})">
                <div class="playlist-image-container">
                    <img src="${songsList[i].image}" />
                </div>
                <div class="playlist-song-details">
                    <span id="playlist-song-name">
                        ${songsList[i].name}
                    </span>
                    <span id="playlist-song-artist-album">
                        ${songsList[i].artist}
                    </span>
                </div>
            </li> `
    }
}

//dongu butonuna tiklanilirsa
repeatButton.addEventListener("click",()=>{
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active")
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})

//karistirici tiklanirsa
shuffleButton.addEventListener("click",()=>{
     if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active")
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})


//tiklanama dinleyecileri

//durdur
pauseButton.addEventListener("click",pauseAudio)

//oynat
playButton.addEventListener("click",playAudio)

//siradaki tiklanirsa
nextButton.addEventListener("click",nextSong)

//onceki tiklanirsa
prevButton.addEventListener("click",previousSong)
const audio = document.querySelector('.song');
const playPaused = document.querySelector('.play-paused');
const currentTimeDisplay = document.querySelector('.current');
const endTime = document.querySelector('.end-time');
const contenidoBar = document.querySelector('.contenido-bar');
const progressBar = document.querySelector(".now-bar");
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const cover = document.querySelector('.cover');
const musicName = document.querySelector('.music-name');
const artis = document.querySelector('.singer');

//variavle para saber se esta ativo ou n o reproductor
let play = false;
let musicIndex = 0;

//array das musicas
const musicas = [
    {
        cover: './assets/img/cover-1.png',
        songName: 'Lost in the City Lights',
        singerName: 'Cosmo Sheldrake',
        song: './assets/music/lost-in-city-lights-145038.mp3'
    },
    {
        cover: './assets/img/cover-2.png',
        songName: 'Forest Lullaby',
        singerName: 'Lesfm',
        song: './assets/music/forest-lullaby-110624.mp3'
    }
]

//funcoes

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const currentMinutos = Math.floor(currentTime / 60);
    const currentSegundos = Math.floor(currentTime % 60);
    const totaMinutos = Math.floor(duration / 60);
    const totalSegundos = Math.floor(duration % 60);

    //atuaalizo o tempo na tela 
    currentTimeDisplay.textContent = `${currentMinutos}:${currentSegundos < 10 ? '0' : ''}${currentSegundos}`;

    //verifico se o duration is number
    if (Number.isNaN(duration)) {
        endTime.textContent = '0:00'
    } else {
        //tempo total da musica que esta sendo reproduzida
        endTime.textContent = `${totaMinutos}:${totalSegundos < 10 ? '0' : ''}${totalSegundos}`;
    }
    const progress = Math.floor((currentTime / duration) * 100);
    progressBar.style.width = `${progress}%`;

    if (progressBar.style.width === `100%`) {
        progressBar.style.width = `0%`
        nextAudio();
    }
})

//carrego as informacoes de musica
const loadMusic = (() => {
    cover.src = musicas[musicIndex].cover;
    musicName.textContent = musicas[musicIndex].songName;
    artis.textContent = musicas[musicIndex].singerName;
    audio.src = musicas[musicIndex].song;
});

//atualizo o tempo e a barra de progreso dependendo do lugar aonde for dado click
contenidoBar.addEventListener('click', (e) => {
    const neewWidth = Math.floor(e.offsetX / 3);
    const duration = audio.duration;
    const moveTimeWhithClick = Math.floor(duration * neewWidth) / 100;
    audio.currentTime = `${moveTimeWhithClick}`;
})

//funcao para voltar a musica 
previous.addEventListener('click', () => {
    musicIndex--;
    musicIndex < 0 ? musicIndex = musicas.length - 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    play = false;
    playAudio();
})

//funcao para mudar imagen e para ou pausar a musica
const playAudio = (() => {
    playPaused.src = './assets/Play_fill.svg';
    if (play) {
        playPaused.src = './assets/Play_fill.svg';
        audio.pause();
    } else {
        playPaused.src = './assets/Stop_and_play_fill.svg';
        audio.play();
    }
    play = !play;
})

//chamada a funcao para carregar a musica
const nextAudio = (() => {
    musicIndex++;
    //se musicINdex fo mayor a musicas 
    musicIndex > musicas.length - 1 ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    play = false;
    playAudio();
});

//eventos
next.addEventListener('click', nextAudio);

window.addEventListener('load', () => {
    loadMusic(musicIndex)
})

playPaused.addEventListener('click', playAudio);



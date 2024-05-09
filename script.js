//Variaveis iniciais
localStorage.Rank == undefined ? localStorage.setItem("Rank", "[]") : false;
let rankArray = JSON.parse(localStorage.getItem("Rank"));
const ambienceAudio = new Audio("Electro Light Loop.mp3");
ambienceAudio.loop = true;
ambienceAudio.volume = 0.1;
const startAudio = new Audio("biodynamic-impact-braam-tonal-dark-184276.mp3");
startAudio.volume = 0.4;
const gameAudio = new Audio("Syn Cole - Feel Good (Instrumental) [NCS Purple Remake](MP3_320K).mp3");
gameAudio.volume = 0.2;
gameAudio.loop = true;
const doublePointsAudio = new Audio("rising-funny-game-effect-132474.mp3");
doublePointsAudio.volume = 0.6;
const triplePointsAudio = new Audio("cute-level-up-3-189853.mp3");
triplePointsAudio.volume = 0.6;
const youLoseAudio = new Audio("verloren-89595.mp3");
youLoseAudio.volume = 0.6;
const runTimeAudioBack = new Audio("game-music-loop-5-144569.mp3");
runTimeAudioBack.volume = 0.6;
const runTimeEffect = new Audio("cinematic-boom-6872.mp3");
runTimeEffect.volume = 0.6;
const winRunTimeAudio = new Audio("cute-level-up-3-189853.mp3");
winRunTimeAudio.volume = 0.6;
//Sair do aviso inicial
document.getElementById("alertButton").addEventListener('click', () => {
    ambienceAudio.play();
    document.getElementById("alertContent").style.display = "none";
    document.getElementById("mainHome").style.display = "flex";
});
//Funcao que cria a tabela do rank
function RankConstructor() {
    rankArray.sort((a, b) => b.punctuationPlayer - a.punctuationPlayer);
    localStorage.removeItem("Rank");
    localStorage.setItem("Rank", JSON.stringify(rankArray));
};
document.getElementById("rankButton").addEventListener('click', () => {
    document.getElementById("rankContent").style.display = "flex";
    ViewRank();
});
//Funcao mostra tabela do rank
function ViewRank() {
    document.getElementById("rankSpan").innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("Rank"));
    arr.forEach(e => {
        document.getElementById("rankSpan").innerHTML += `<div class="li-rank">${e.namePlayerRank} | pontuação: ${e.punctuationPlayer}</div>`
    });
};
document.getElementById("exitRank").addEventListener('click', () => document.getElementById("rankContent").style.display = "none");
document.getElementById("clearRank").addEventListener('click', () => {
    localStorage.setItem("Rank", "[]");
    rankArray = JSON.parse(localStorage.getItem("Rank"));
    ViewRank();
});
//Colocar nome do player
document.getElementById("playButton").addEventListener('click', () => document.getElementById("fixedContent").style.display = "flex");
document.getElementById("playButtonConfirm").addEventListener("click", ConfirmPlay);
document.getElementById("fixedContent").addEventListener('keyup', e => e.key == "Enter" ? ConfirmPlay() : false);
let namePlayer;
function ConfirmPlay() {
    namePlayer = document.querySelector("#namePlayer").value;
    if (namePlayer) {
        document.querySelector("#namePlayer").value = "";
        ambienceAudio.pause();
        startAudio.play();
        document.getElementById("namePlayerSpan").innerHTML = namePlayer;
        document.getElementById("mainHome").style.display = "none";
        document.getElementById("fixedContent").style.display = "none";
        document.getElementById("getReadyContent").style.display = "flex";
        setTimeout(
            function () {
                document.getElementById("getReadyContent").style.display = "none";
                document.getElementById("mainGame").style.display = "flex";
                StartGame();
            }
        ,5000);
    };
};
//Variaveis iniciais do jogo
let punctuation = 0;
let randomPercentage;
let systemResponse;
let userResponse;
let secondsCounter;
let hearts;
let typeLevel;
let lastNumber;
document.getElementById("mainGame").addEventListener("keyup", e => {
    if (e.key == "Enter") {
        if (typeLevel == 5) {
            userResponse = document.querySelector("#responseGameInput").value;
            if (userResponse) {
                userResponse == systemResponse ? NextLevelRunTime() : LoseHeartRunTime();
            };
        } else {
            userResponse = document.querySelector("#responseGameInput").value;
            if (userResponse) {
                userResponse == systemResponse ? NextLevel() : LoseHeart();
            };
        };
    };
});
//Funcao que adiciona mais um jogador ao rank
function AddRank() {
    rankArray.push({
        namePlayerRank: namePlayer,
        punctuationPlayer: punctuation,
    });
    RankConstructor();
};
//Funcao que inicia o jogo
function StartGame() {
    document.getElementById("responseGameInput").blur();
    gameAudio.play();
    document.querySelector("#responseGameInput").value = '';
    punctuation = 0;
    hearts = 2;
    GenerateNumber();
    if (typeLevel > 1) {
        if (typeLevel == 5) {
            RunTime();
        } else {
            setTimeout(
                function () {
                    document.getElementById("responseGameInput").focus();
                    CounterGame();
                }
            ,1500);
        };
    } else {
        document.getElementById("responseGameInput").focus();
        CounterGame();
    };
};
//Funcao que passa para proxima conta
function NextLevel() {
    punctuation += typeLevel;
    document.getElementById("responseGameInput").blur();
    document.querySelector("#responseGameInput").value = '';
    clearInterval(counterTimer);
    GenerateNumber();
    if (typeLevel > 1 && typeLevel < 5) {
        setTimeout(
            function () {
                document.getElementById("responseGameInput").focus();
                CounterGame();
                PunctuationVisor();
            }
        ,1500);
    } else if (typeLevel < 2) {
        document.getElementById("responseGameInput").focus();
        CounterGame();
        PunctuationVisor();
    } else {
        RunTime();
    };
};
//Funcoes do modo runtime
let numberQuestions;
function RunTime() {
    numberQuestions = 10;
    runTimeEffect.play();
    gameAudio.pause();
    document.querySelector("#responseGameInput").value = '';
    document.getElementById("responseGameInput").focus();
    document.getElementById("runTime").style.display = "flex";
    document.getElementById("mainGame").style.animation = "anim-back-run-time 3s infinite";
    setTimeout(
        function () {
            document.getElementById("runTime").style.display = "none";
            runTimeAudioBack.currentTime = 0;
            runTimeAudioBack.play();
            CounterRunTime();
            GenerateRunTime();
        }
    ,1500); 
};
let counterSecondsRunTime;
function CounterRunTime() {
    let seconds = 45;
    document.getElementById("counterGame").innerText = seconds;
    counterSecondsRunTime = setInterval(
        function () {
            seconds != 0 ? seconds-- : false; 
            seconds < 10 ? document.getElementById("counterGame").innerText = `0${seconds}` : document.getElementById("counterGame").innerText = seconds;
            seconds == 0 ? FinishGame() : false;
        }
    ,1000);
};
function GenerateRunTime() {         
    let questRunTime = parseInt(Math.random() * 13);
    while (questRunTime == lastNumber) {
        questRunTime = parseInt(Math.random() * 13);
    };
    lastNumber = questRunTime;
    if (questRunTime <= 5 || questRunTime == 10) {
        let powerRunTime = parseInt(Math.random() * 4);
        systemResponse = questRunTime ** powerRunTime;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    ${powerRunTime}
                </div>
                <div class="number">
                    ${questRunTime}
                </div>
            </div>
        `;
    } else {
        systemResponse = questRunTime ** 2;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    2
                </div>
                <div class="number">
                    ${questRunTime}
                </div>
            </div>
        `;
    };    
};
function LoseHeartRunTime() {
    hearts--;
    if (hearts == 1) {
        document.getElementById("heart2").style.animation = "heart-anim 1s ease-in-out";
        document.getElementById("heart2").style.color = "rgb(61, 61, 61)";
    } else {
        document.getElementById("heart1").style.animation = "heart-anim 1s ease-in-out";
        document.getElementById("heart1").style.color = "rgb(61, 61, 61)";
    };
    hearts == 0 ? FinishGame() : NextLevelRunTime();
};
function NextLevelRunTime() {
    --numberQuestions;
    document.querySelector("#responseGameInput").value = '';
    if (numberQuestions == 0) {
        FinishRunTime();
    } else {
        GenerateRunTime();
        document.getElementById("responseGameInput").focus();
    };
};
function FinishRunTime() {
    clearInterval(counterSecondsRunTime);
    hearts = 2;
    document.getElementById("heart2").style.color = "red";
    document.getElementById("heart1").style.color = "red";
    numberQuestions = 10;
    runTimeAudioBack.pause();
    winRunTimeAudio.play();
    document.getElementById("mainGame").style.removeProperty("animation");
    document.getElementById("runTimeWin").style.display = "flex";
    setTimeout(
        function () {
            document.getElementById("runTimeWin").style.display = "none";
            gameAudio.play();
            NextLevel();
        }
    ,1500);
};
//Funcao que gera uma conta aleatoria
function GenerateNumber() {
    randomPercentage = parseInt(Math.random() * 100);
//Run Time    
    if (randomPercentage <= 4) {
        typeLevel = 5;
//Triple points        
    } else if (randomPercentage > 4 && randomPercentage <= 14) {
        secondsCounter = 40;
        document.getElementById("counterGame").innerText = secondsCounter;
        typeLevel = 3;
        document.getElementById("triplePoints").style.display = "flex";
        triplePointsAudio.play();
        setTimeout(
            function () {
                document.getElementById("triplePoints").style.display = "none";
            }
        ,1500);
        let tripleQuest = parseInt(Math.random() * (100 - 36) + 36);
        while (tripleQuest == lastNumber) {
            tripleQuest = parseInt(Math.random() * (100 - 36) + 36);
        };
        lastNumber = tripleQuest;
        systemResponse = tripleQuest ** 2;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    2
                </div>
                <div class="number">
                    ${tripleQuest}
                </div>
            </div>
        `;
//Double points        
    } else if (randomPercentage > 14 && randomPercentage <= 44) {
        secondsCounter = 35;
        document.getElementById("counterGame").innerText = secondsCounter;
        typeLevel = 2;
        document.getElementById("doublePoints").style.display = "flex";
        doublePointsAudio.play();
        setTimeout(
            function () {
                document.getElementById("doublePoints").style.display = "none";
            }
        ,1500);
        let doubleQuest = parseInt(Math.random() * (36 - 13) + 13);
        while (doubleQuest == lastNumber) {
            doubleQuest = parseInt(Math.random() * (36 - 13) + 13);
        };
        lastNumber = doubleQuest;
        systemResponse = doubleQuest ** 2;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    2
                </div>
                <div class="number">
                    ${doubleQuest}
                </div>
            </div>
        `;
//Normal points
    } else {
        secondsCounter = 30;
        document.getElementById("counterGame").innerText = secondsCounter;
        typeLevel = 1;
        let normalQuest = parseInt(Math.random() * 13);
        while (normalQuest == lastNumber) {
            normalQuest = parseInt(Math.random() * 13);
        };
        lastNumber = normalQuest;
        if (normalQuest <= 5 || normalQuest == 10) {
            let power = parseInt(Math.random() * 5);
            systemResponse = normalQuest ** power;
            document.getElementById("questGame").innerHTML = `
                <div class="power-content">
                    <div class="power">
                        ${power}
                    </div>
                    <div class="number">
                        ${normalQuest}
                    </div>
                </div>
            `;
        } else {
            systemResponse = normalQuest ** 2;
            document.getElementById("questGame").innerHTML = `
                <div class="power-content">
                    <div class="power">
                        2
                    </div>
                    <div class="number">
                        ${normalQuest}
                    </div>
                </div>
            `;
        };
    };
};
document.getElementById("confirmButton").addEventListener('click', () => {
    if (typeLevel == 5) {
        userResponse = document.querySelector("#responseGameInput").value;
        if (userResponse) {
            userResponse == systemResponse ? NextLevelRunTime() : LoseHeartRunTime();
        };
    } else {
        userResponse = document.querySelector("#responseGameInput").value;
        if (userResponse) {
            userResponse == systemResponse ? NextLevel() : LoseHeart();
        };
    };
});
//Funcao do cronometro
let counterTimer;
function CounterGame() {
    document.getElementById("counterGame").innerText = secondsCounter;
    counterTimer = setInterval(
        function () {
            secondsCounter--;
            secondsCounter < 10 ? document.getElementById("counterGame").innerText = `0${secondsCounter}` : document.getElementById("counterGame").innerText = secondsCounter;
            secondsCounter == 0 ? LoseHeart() : false;
        }
    ,1000);
};
//Funcao de perder coracao
function LoseHeart() {
    hearts--;
    typeLevel = 0;
    if (hearts == 1) {
        document.getElementById("heart2").style.animation = "heart-anim 1s ease-in-out";
        document.getElementById("heart2").style.color = "rgb(61, 61, 61)";
    } else {
        document.getElementById("heart1").style.animation = "heart-anim 1s ease-in-out";
        document.getElementById("heart1").style.color = "rgb(61, 61, 61)";
    };
    hearts == 0 ? FinishGame() : NextLevel();
};
//Funcao que mostra pontos na tela
function PunctuationVisor() {
    document.getElementById("punctuationGame").innerHTML = punctuation;
};
//Funcao que finaliza o jogo
function FinishGame() {
   document.getElementById("responseGameInput").blur();
    clearInterval(counterTimer);
    clearInterval(counterSecondsRunTime);
    AddRank();
    runTimeAudioBack.pause();
    gameAudio.pause();
    youLoseAudio.play();
    document.getElementById("youLose").style.display = "flex";
    setTimeout(
        function () {
            document.getElementById("mainGame").style.removeProperty("animation");
            document.getElementById("youLose").style.display = "none";
            document.getElementById("alertContent").style.display = "flex";
            document.getElementById("mainGame").style.display = "none";
            document.getElementById("heart2").style.color = "red";
            document.getElementById("heart1").style.color = "red";
            document.getElementById("heart2").style.removeProperty("animation");
            document.getElementById("heart1").style.removeProperty("animation");
        }
    ,4000);
};
//By: Misael Bonifácio Morgado.

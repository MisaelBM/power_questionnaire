//Variaveis iniciais
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
//Sair do aviso inicial
document.getElementById("alertButton").addEventListener('click', () => {
    ambienceAudio.play();
    document.getElementById("alertContent").style.display = "none";
    document.getElementById("mainHome").style.display = "flex";
});
//Colocar nome do player
document.getElementById("playButton").addEventListener('click', () => document.getElementById("fixedContent").style.display = "flex");
document.getElementById("playButtonConfirm").addEventListener("click", ConfirmPlay);
document.getElementById("fixedContent").addEventListener('keyup', e => e.key == "Enter" ? ConfirmPlay() : false);
function ConfirmPlay() {
    let namePlayer = document.querySelector("#namePlayer").value;
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
document.getElementById("mainGame").addEventListener("keyup", e => {
    if (e.key == "Enter") {
        userResponse = document.querySelector("#responseGameInput").value;
        userResponse == systemResponse ? NextLevel() : LoseHeart();
    };
});
//Funcao que inicia o jogo
function StartGame() {
    document.getElementById("responseGameInput").blur();
    gameAudio.play();
    document.querySelector("#responseGameInput").value = '';
    punctuation = 0;
    hearts = 2;
    GenerateNumber();
    if (typeLevel > 1) {
        setTimeout(
            function () {   
                document.getElementById("responseGameInput").focus();
                CounterGame();
            }
        ,1500);
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
                console.log("time")
            }
        ,1500);
    } else if (typeLevel < 5) {
        document.getElementById("responseGameInput").focus();
        CounterGame();
        PunctuationVisor();
    };
};
function RunTime() {
    
};
function CounterRunTime() {

};
function LoseHeartRunTime() {

};
function NextLevelRunTime() {

};
//Funcao que gera uma conta aleatoria
function GenerateNumber() {
    randomPercentage = parseInt(Math.random() * 100);
//Run Time    
    if (false) {
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
        let power = 2;
        systemResponse = tripleQuest ** power;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    ${power}
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
        let power = 2;
        systemResponse = doubleQuest ** power;
        document.getElementById("questGame").innerHTML = `
            <div class="power-content">
                <div class="power">
                    ${power}
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
        let normalQuest = parseInt(Math.random() * 12);
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
            let power = 2;
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
        };
    };
};
document.getElementById("confirmButton").addEventListener('click', () => {
    userResponse = document.querySelector("#responseGameInput").value;
    userResponse == systemResponse ? NextLevel() : LoseHeart();
});
//Funcao do cronometro
let counterTimer;
function CounterGame() {
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
    hearts == 0 ? finishGame() : NextLevel();
};
//Funcao que mostra pontos na tela
function PunctuationVisor() {
    document.getElementById("punctuationGame").innerHTML = punctuation;
};
//Funcao que finaliza o jogo
function finishGame() {
   document.getElementById("responseGameInput").blur();
    clearInterval(counterTimer);
    gameAudio.pause();
    youLoseAudio.play();
    document.getElementById("youLose").style.display = "flex";
    setTimeout(
        function () {
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
//Kaue

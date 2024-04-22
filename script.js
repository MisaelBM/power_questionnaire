const ambienceAudio = new Audio("Electro Light Loop.mp3");
ambienceAudio.loop = true;
ambienceAudio.volume = 0.1;
const startAudio = new Audio("biodynamic-impact-braam-tonal-dark-184276.mp3");
startAudio.volume = 0.4;
const gameAudio = new Audio("Syn Cole - Feel Good (Instrumental) [NCS Purple Remake](MP3_320K).mp3");
gameAudio.volume = 0.4;
gameAudio.loop = true;
document.getElementById("alertButton").addEventListener('click', () => {
    ambienceAudio.play();
    document.getElementById("alertContent").style.display = "none";
    document.getElementById("mainHome").style.display = "flex";
});
document.getElementById("playButton").addEventListener('click', () => document.getElementById("fixedContent").style.display = "flex");
document.getElementById('playButtonConfirm').addEventListener("click", () => {
    let namePlayer = document.querySelector("#namePlayer").value;
    if (namePlayer) {
        ambienceAudio.pause();
        startAudio.play();
        document.getElementById("namePlayerSpan").innerHTML = namePlayer;
        document.getElementById("mainHome").style.display = "none";
        document.getElementById("getReadyContent").style.display = "flex";
        setTimeout(
            function () {
                document.getElementById("getReadyContent").style.display = "none";
                document.getElementById("mainGame").style.display = "flex";
                StartGame();
            }
        , 5000);
    };
});
let punctuation = 0;
let randomPercentage;
let systemResponse;
let userResponse;
let secondsCounter;
let hearts = 2;
let typeLevel;
function StartGame() {
    gameAudio.play();
    document.querySelector("#responseGameInput").textContent = "";
    punctuation = 0;
    GenerateNumber();
    CounterGame();
};
function NextLevel() {
    punctuation += typeLevel;
    document.querySelector("#responseGameInput").textContent = "";
    clearInterval(counterTimer);
    GenerateNumber();
    CounterGame();
    PunctuationVisor();
};
function GenerateNumber() {
    randomPercentage = parseInt(Math.random() * 100);
    if (false) {
        
    } else if (randomPercentage > 4 && randomPercentage <= 14) {
        secondsCounter = 40;
        document.getElementById("counterGame").innerText = secondsCounter;
        typeLevel = 3;
        let tripleQuest = parseInt(Math.random() * (99 - 36) + 100);
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
    } else if (randomPercentage > 14 && randomPercentage <= 44) {
        secondsCounter = 35;
        document.getElementById("counterGame").innerText = secondsCounter;
        typeLevel = 2;
        let doubleQuest = parseInt(Math.random() * (35 - 13) + 36);
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
function PunctuationVisor() {
    document.getElementById("punctuationGame").innerHTML = punctuation;
};
function finishGame() {
    clearInterval(counterTimer);
    document.getElementById("alertContent").style.display = "flex";
    document.getElementById("mainGame").style.display = "none";
};

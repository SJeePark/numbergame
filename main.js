//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 UP!!
// REset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임 종료(더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.

// 유저가 정답을 맞추면 정답 gif 삽입
// 정답을 맞췄으면 게임 리셋
// 못맞췄을 경우 정답과 함께 리셋 가능

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[];
let resultImg = document.querySelector(".main-img");


playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value="";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNum);
}

function play(){ 
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요"
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력했던 숫자야"
        return;
    }

    chances --;
    chanceArea.textContent=`${chances}번 밖에 남지 않았어..!`;
    console.log("chances", chances);

    if(userValue < computerNum){
        resultArea.textContent = "Up!"
    } else if(userValue > computerNum){
        resultArea.textContent = "Down!"
    } else {
        resultArea.textContent = "덕분에 모험을 시작할 수 있게 됐어!"
        chanceArea.textContent = ' '
        resultImg.src = "https://i.pinimg.com/originals/95/5c/31/955c316e93cec1ffad31903d433aa300.gif"
        
    }

    history.push(userValue)
    console.log(history)

    if(chances<1){
        gameOver=true
    }
    if(gameOver==true){
        playButton.disabled = true;
        chanceArea.textContent = '모험을 다시 시작해볼까?'
        resultArea.textContent = `정답은 ${computerNum} 였엉ㅜ^ㅜ`;
        resultImg.src = "https://i.pinimg.com/originals/6d/36/f5/6d36f5ecbbbe293ea9e9dbf49c270142.gif"
        
    }
}

function reset(){
    userInput.value='';
    pickRandomNum();
    chances = 5;
    history =[];
    resultArea.textContent="결과값이 여기 나옵니다";
    chanceArea.textContent= "기회는 5번!";
    gameOver = false
    playButton.disabled = false;
    resultImg.src = "https://i.pinimg.com/originals/f9/5e/fe/f95efe92c56e5f7266db0702a77e1b6e.gif"
}
pickRandomNum();
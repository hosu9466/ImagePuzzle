const leftTime = document.querySelector(".leftTime");
const image = document.querySelector(".image");
const currectMessage = document.querySelector(".currectMessage")
let prePosition = [0,0];
let position = [3,3];
let liList = [[],[],[],[]];
const difficulty = 100;
let rightRoute = [];


window.onkeydown = (k) => {
    console.log(k);
    let key = move(k.keyCode);
    if(key){
        rightRoute.push(key);
    }
}
function move(keycode){
    console.log(keycode);
    let flag = false;
    switch(keycode){
        case 38:
            flag = up();
            break;
        case 40:
            flag = down();
            break;
        case 37:
            flag = left();
            break;
        case 39:
            flag = right();
            break;
    }
    if(flag){
        changeBlock();
        borderCurrentPosition();
        checkAnswer();
        return keycode;
    }
    return false;
}
function borderCurrentPosition(){
    liList[position[0]][position[1]].style.border = "2px solid red";
    liList[prePosition[0]][prePosition[1]].style.border = "2px solid white";
}
function changeBlock(){
    const className = liList[position[0]][position[1]].className;
    liList[position[0]][position[1]].className = liList[prePosition[0]][prePosition[1]].className;
    liList[prePosition[0]][prePosition[1]].className = className;
}
function up(){
    console.log('up');
    if(position[0]-1<0){
        return false;
    }
    prePosition = [...position];
    position[0] = position[0]-1;
    return true;
}
function down(){
    console.log('down')
    if(position[0]+1>3){
        return false;
    }
    prePosition = [...position];
    position[0] = position[0]+1;
    return true;
}
function right(){
    console.log('right')
    if(position[1]+1>3){
        return false;
    }
    prePosition = [...position];
    position[1] = position[1]+1;
    return true;
}
function left(){
    console.log('left')
    if(position[1]-1<0){
        return false;
    }
    prePosition = [...position];
    position[1] = position[1]-1,0;
    return true;
}
function init(){
    for(let i=1; i<=16; i++){
        const li = document.createElement("li");
        //liList[i/4]
        console.log(Math.floor((i-1)/4));
        liList[Math.floor((i-1)/4)].push(li);
        li.setAttribute('class',`image${i}`);
        image.appendChild(li);
    }
    borderCurrentPosition();
    console.log(liList);
    checkAnswer();
}
function answer(){
    console.log("answer");
    var intervalId = setInterval(() => {
        if(rightRoute.length<=0){
            clearInterval(intervalId);
        }
        switch(rightRoute.pop()){
            case 38:
                move(40);
                break;
            case 40:
                move(38);
                break;
            case 37:
                move(39);
                break;
            case 39:
                move(37);
                break;
        }
    }, 100);
}
function start(){
    console.log("start");    
    shuffle(difficulty);
    checkAnswer();
}
function shuffle(difficulty){
    for(let i=0; i<difficulty; i++){
        const randomVal = Math.floor(Math.random()*4+37);
        const keycode = move(randomVal);
        if(keycode){
            rightRoute.push(keycode);
        }
    }
    console.log(rightRoute);
}
function checkAnswer(){
    let flag = true;
    for(let i=1; i<=16; i++){
        const li = liList[Math.floor((i-1)/4)][Math.floor((i-1)%4)];
        if(li.className != `image${i}`){
            flag = false;
            break;
        }
        //console.log(li,li.className,flag);
    }
    if(flag){
        currectMessage.style.display = "block";
    }
    else{
        currectMessage.style.display = "none";
    }
}
init();


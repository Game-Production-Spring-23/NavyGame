const charOneBtn = document.getElementById("charOneAv");
const charTwoBtn = document.getElementById("charTwoAv");
const charThreeBtn = document.getElementById("charThreeAv");
let characterSelection = 0;
let btnSelected = false;



function charOneSelect(){
if (btnSelected == false){
charOneBtn.style.border = "10px solid white";
characterSelection=1;
btnSelected=true;

}
else if(btnSelected == true){
  charTwoBtn.style.border="none";
  charThreeBtn.style.border="none";
  charOneBtn.style.border = "10px solid white";
  characterSelection=1;
  btnSelected=true;

};
}

function charTwoSelect(){
if (btnSelected == false){
charTwoBtn.style.border = "10px solid white";
characterSelection=2;
btnSelected=true;

}
else if(btnSelected == true){
  charOneBtn.style.border="none";
  charThreeBtn.style.border="none";
  charTwoBtn.style.border = "10px solid white";
  characterSelection=2;
  btnSelected=true;
 
};
}

function charThreeSelect(){
if (btnSelected == false){
charThreeBtn.style.border = "10px solid white";
characterSelection=3;
btnSelected=true;

}
else if(btnSelected == true){
  charOneBtn.style.border="none";
  charTwoBtn.style.border="none";
  charThreeBtn.style.border = "10px solid white";
  characterSelection=3;
  btnSelected=true;
  
};
}


charOneBtn.onclick = () => {
charOneSelect();
}

charTwoBtn.onclick = () => {
charTwoSelect();
}

charThreeBtn.onclick = () => {
charThreeSelect();
}

//Listen for hover over start button
const startBtn = document.getElementById("charSelectStart");
startBtn.addEventListener("mouseover", function( event ) {
  //change background image
  startBtn.style.backgroundImage = "url('/assets/images/ui/startBtnHover.png')";
  //change cursor
  startBtn.style.cursor = "pointer";
}, false);




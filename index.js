'use strict';
//Test 1
//returns studentID
function id() {
  return "UP849104";
}

function init() {
  // if your solution needs to add add listeners
  // do so here

  document.getElementById("nick").addEventListener("input", nickChanged);

  //listens for a click, and then the colour of the user position circle is changed
  canvas.addEventListener("click", coloursList);
}

window.addEventListener("load", init);

//Test 2
// updates the leaders board using the "namesOfPlayers" array & "me" parameter
function updateLeaderBoard(namesOfPlayers, me){
  //gets all the names on the leaderboard
  const listOfPlayers = document.getElementById("top10");

  //removes names already on leaderboard
  while(listOfPlayers.firstChild){
    listOfPlayers.removeChild(listOfPlayers.firstChild);
  }

  //loops through "nameOfPlayers" and adds the name to the leader board
  for(const player of namesOfPlayers){
    const newPlayer = document.createElement("li");
    if(player === me){
      // sets the current players name's list item class to 'myself'
      newPlayer.classList.add("myself");
    }
    newPlayer.textContent = player;
    if(listOfPlayers.children.length < 10){
      listOfPlayers.appendChild(newPlayer);
    }
  }
}

//Test 3
// updates content of playerName field
function nickChanged(nameInput){

  const nickName = document.getElementById("nick").value;
  //sets the playerName field to equal what has been inputted by user
  document.getElementById("playername").textContent = nickName;
}

//Test 4
//updates the step variable so that it is the same as the scalerange value
function updateStep(){

  //sets the step value to equal the scalerange value
  step = Number(window.scalerange.value);
}

//Test 5
//gets a number of names from the leadersboard, the number depends on the value of "maxResults"
function leaders(maxResults){
  //gets all the names on the leaderboard
  let playersOnLeaderBoard = document.getElementById("top10").children;
  let listOfPlayers = [];

  //Adds the leaderboard names to a new array, "listOfPlayers"
  for(let i = 0; i < maxResults && i < playersOnLeaderBoard.length; i++){
    listOfPlayers.push(playersOnLeaderBoard[i].textContent);
  }
  return listOfPlayers;
}

//Test 6
//sets the value of "pointer.degrees" using the "pointer.angle" value
function mouseMoved(e) {

  // position of the pointer within the canvas
  pointer.x = (e.pageX - canvas.offsetLeft);
  pointer.y = (e.pageY - canvas.offsetTop);

  // position of the pointer relative to the centre of the canvas
  pointer.xOffset = pointer.x-halfWidth;
  pointer.yOffset = pointer.y-halfHeight;

  // TODO calulate angle and unit vector radius
  // based on mouse.xOffset and mouse.yOffset .
  pointer.radius =
  Math.min(
    Math.sqrt(
      Math.pow(pointer.xOffset,2) +
      Math.pow(pointer.yOffset,2)
    ),
    limitOfAcceleration
  ) / limitOfAcceleration * step;

  pointer.angle = Math.atan2(pointer.yOffset,pointer.xOffset).toFixed(3);

  //calculates the value of "pointer.degrees"
  pointer.degrees = parseInt(pointer.angle * 180 / Math.PI);

  if(pointer.degrees < 0){
    pointer.degrees += 360;
  }

  if(pointer.degrees <= 0){
    pointer.degrees = 359;
  }

  else if(pointer.degrees >= 360){
    pointer.degrees = 0;
  }
  redraw();
}

//Test 7
//draws a circle which is used as the pointer in the game
function drawPointerPos() {

  context.beginPath();
  context.arc(pointer.x, pointer.y, pointer.radius / step * 50, 0, Math.PI * 2, false);

  context.strokeStyle = "black";
  context.stroke();
}

//draws the players position
function drawUserPos() {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height/2, step / 2, 0, Math.PI * 2, false);
  context.strokeStyle = "black";
  context.stroke();

  //the colour of the circle is taken from the colours list
  context.fillStyle = colours[pointer.colIndex];
  context.fill();
}

//goes through the list of colours
function coloursList() {

  //the pointer.colIndex is incremented by 1
  //when the index reaches 3 it is reset back to 0
  pointer.colIndex ++;

  if(pointer.colIndex > 3){
    pointer.colIndex = 0;
  }
}

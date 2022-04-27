let state = {
  player: true, //x e true; 0 e false
  game: [null, null, null, null, null, null, null, null, null],
  finished: false,
  displayPlayer: {
    true: "X",
    false: "0",
  },
  playerImage: {
    true: "x.png",
    false: "0.svg",
  },
};

function play(pos) {
  if (state.finished) {
    newGame();
    return;
  }
  if (state.game[pos] !== null) {
    return;
  }

  let boxes = document.querySelectorAll("#game>.box");
  let box = boxes[pos];
  state.game[pos] = state.player;

  box.innerHTML = `<img src="images/${
    state.playerImage[state.player + ""]
  }" />`;

  if (state.game[0] === state.game[1] && state.game[1] === state.game[2]) {
    showMessage(`Player ${state.displayPlayer[state.player]} has won`);
    state.finished = true;
    return;
  }

  state.player = !state.player;
  showMessage(`It's players ${state.displayPlayer[state.player]}'s turn!`);
  let isDraw = true;
  for (let g of state.game) {
    if (g === null) {
      isDraw = false;
    }
  }
  state.finished = isDraw;
  if (isDraw) {
    showMessage(`It's a draw! Click for new game`);
  }
}
function showMessage(msg) {
  document.querySelector("#gameMessage").innerText = msg;
}

function newGame() {
  showMessage("Joaca un X si 0");
  let boxes = document.querySelectorAll("#game>.box");
  for (let box of boxes) {
    box.innerText = "";
  }
  //alternativa 2
  let images = document.querySelectorAll("#game>.box>img");
  for (let img of images) {
    img.remove();
  }

  //
  state.player = true;
  state.game = [null, null, null, null, null, null, null, null, null];
  state.finished = false;
}

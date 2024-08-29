const container = document.querySelector('.container');
const colors = ['red', 'green', 'blue'];
const ballsInTube = 8;
let isPicked = false;
let tcPicked = null;

let bArr = [];
for(let ci = 0; ci < colors.length; ci++) {
  const tmpArr = [];
  for(let bi = 0; bi < ballsInTube; bi++) {
    const ball = createBall(colors[ci]);
    tmpArr.push(ball);
  }
  bArr[colors[ci]] = tmpArr;
}
let bArrTmp = [...bArr.red, ...bArr.green, ...bArr.blue];
bArrTmp = shuffleArray(bArrTmp);
bArr['red'] = bArrTmp.slice(0, ballsInTube);
bArr['green'] = bArrTmp.slice(ballsInTube, ballsInTube * 2);
bArr['blue'] = bArrTmp.slice(ballsInTube * 2);

function init() {
  container.innerHTML = '';
  colors.map(tc => {
    const tube = createTube(tc);

    bArr[tc].map(bEl => {
      tube.appendChild(bEl);
    });
    container.appendChild(tube);
    tube.addEventListener('click', (e) => tubeClick(tc, tube))
  })
}
init();

function createTube(c) {
  const tube = document.createElement('div');
  tube.classList.add('tube');
  tube.classList.add(`tube-${c}`);
  return tube;
}

function createBall(c) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.classList.add(`ball-${c}`);
  return ball;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function tubeClick(tc, tube) {
  if (isPicked) {
    if (tcPicked !== tc && tube.childNodes.length === 12) {
      alert('The tube is full!');
    }
    else {
      const shiftItem = bArr[tcPicked].shift();
      shiftItem.classList.remove('ball-float');
      bArr[tc].unshift(shiftItem);
      init();
      checkResult();
      isPicked = false;
      tcPicked = null;
    }
  }
  else {
    if (tube.firstChild) {
      tube.firstChild.classList.add('ball-float');
      isPicked = true;
      tcPicked = tc;
    }
  }
}

function checkResult() {
  const tubeRed = document.querySelector('.tube-red');
  const tubeGreen = document.querySelector('.tube-green');
  const tubeBlue = document.querySelector('.tube-blue');

  let tubeRedLength = 0;
  let tubeGreenLength = 0;
  let tubeBlueLength = 0;

  if (tubeRed.lastChild) {
    const redClassName = tubeRed.lastChild.className;
    tubeRedLength = tubeRed.querySelectorAll('.'+redClassName.replace(' ','.')).length;
  }

  if (tubeGreen.lastChild) {
    const greenClassName = tubeGreen.lastChild.className;
    tubeGreenLength = tubeGreen.querySelectorAll('.'+greenClassName.replace(' ','.')).length;
  }

  if (tubeBlue.lastChild) {
    const blueClassName = tubeBlue.lastChild.className;
    tubeBlueLength = tubeBlue.querySelectorAll('.'+blueClassName.replace(' ','.')).length;
  }

  if (
    tubeRedLength === ballsInTube &&
    tubeGreenLength === ballsInTube &&
    tubeBlueLength === ballsInTube
  ) {
    alert('Yeah! you win!!!');
  }
}

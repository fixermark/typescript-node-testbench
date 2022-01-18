const SEGMENT = 100 / 6;
const HEX_HEIGHT_WIDTH_RATIO = 1.1547005;

const MAX_VALUE=0xdd;

const FPS = 24;

let curTime = 0;
let currentValue = 0;
let ascending = true;

function renderBg(color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    const HEIGHT = SEGMENT * 4 / HEX_HEIGHT_WIDTH_RATIO;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    ctx.fillStyle = '#' + color;
    ctx.fillRect(0,0,100,HEIGHT);


    ctx.strokeStyle= "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(SEGMENT, HEIGHT / 2);
    ctx.lineTo(2 * SEGMENT, 0);
    ctx.lineTo(4 * SEGMENT, 0);
    ctx.lineTo(5 * SEGMENT, HEIGHT / 2);
    ctx.lineTo(100, HEIGHT / 2);
    ctx.moveTo(SEGMENT, HEIGHT / 2);
    ctx.lineTo(2 * SEGMENT, HEIGHT);
    ctx.lineTo(4 * SEGMENT, HEIGHT);
    ctx.lineTo(5 * SEGMENT, HEIGHT / 2);
    ctx.stroke();

    const body = document.getElementById('background');
    if (!body) {
        return;
    }
    body.style.background=`url(${canvas.toDataURL()})`;
}

function updateRender() {
    let increment = (MAX_VALUE / 4.0 / FPS);
    if(!ascending) {
        increment = -increment;
    }

    currentValue += increment;
    if (currentValue > MAX_VALUE || currentValue < 0) {
        currentValue = Math.min(MAX_VALUE, Math.max(0, currentValue));
        ascending = !ascending;
    }

    let stringRep = Math.floor(currentValue).toString(16);
    while (stringRep.length < 2) {
        stringRep = '0' + stringRep;
    }

    renderBg(`EEEE${stringRep}`);

    setTimeout(updateRender, 1000/FPS);
}

setTimeout(updateRender, 1000/FPS);

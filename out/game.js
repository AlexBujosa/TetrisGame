import { ctx, Color, SquarePiece, LPiece, LInvPiece, ZPiece, ZInvPiece, TPiece, LinePiece, TypePiece } from "./classes/piece.js";
const widthGame = 506;
const heightGame = 506;
const gravity = 0.01;
var initX = 10, initY = 0;
var rotate = 0;
const pieces = [];
const arrString = [
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
];
let generatePiece = (choosePiece) => {
    var randomNumber = generate();
    var colorPiece = RandomColor(randomNumber);
    var piece;
    switch (choosePiece) {
        case TypePiece.LPiece:
            piece = new LPiece(colorPiece, 31, 1);
            break;
        case TypePiece.LInvPiece:
            piece = new LInvPiece(colorPiece, 31, 1);
            break;
        case TypePiece.ZPiece:
            piece = new ZPiece(colorPiece, 31, 1);
            break;
        case TypePiece.ZInvPiece:
            piece = new ZInvPiece(colorPiece, 31, 1);
            break;
        case TypePiece.SquarePiece:
            piece = new SquarePiece(colorPiece, 31, 1);
            break;
        case TypePiece.LinePiece:
            piece = new LinePiece(colorPiece, 31, 1);
            break;
        case TypePiece.TPiece:
            piece = new TPiece(colorPiece, 31, 1);
            break;
        default:
            piece = new LinePiece(colorPiece);
            break;
    }
    return piece;
};
let confirmXRotation = (piece) => {
    var next_DegrePos = (piece.degrePos + 1) % 4;
    for (let i = 0; i < piece.arrPos[next_DegrePos].length; i++) {
        if (0 > piece.arrPos[next_DegrePos][i].posX || 20 < piece.arrPos[next_DegrePos][i].posX) {
            return true;
        }
    }
    return false;
};
let confirmYRotation = (piece) => {
    var next_DegrePos = (piece.degrePos + 1) % 4;
    for (let i = 0; i < piece.arrPos[next_DegrePos].length; i++) {
        if (0 > piece.arrPos[next_DegrePos][i].posY || 20 < piece.arrPos[next_DegrePos][i].posY) {
            return true;
        }
    }
    return false;
};
let getPieceSquareX = (piece) => {
    let setNum = new Set();
    var current_DegreePos = piece.degrePos;
    for (let i = 0; i < piece.arrPos[current_DegreePos].length; i++) {
        setNum.add(piece.arrPos[current_DegreePos][i].posX);
    }
    const array = [...setNum];
    return array;
};
let showNextPiece = () => {
    clearDetailsGame();
    DetailsGame();
    pieces[1].renderPiece();
};
function clearSquareGame() {
    ctx.clearRect(2, 2, widthGame, heightGame);
}
function clearDetailsGame() {
    ctx.clearRect(600, 3, 300, 400);
}
function generate() {
    return Math.floor(Math.random() * 7 + 1);
}
function DetailsGame() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.strokeRect(600, 3, 300, 400);
    ctx.closePath();
}
function SquareGame() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fillRect(2, 2, 506, 506);
    ctx.closePath();
}
function initGame() {
    for (let i = 0; i < 20; i++) {
        var randomNumber = generate();
        var piece = generatePiece(randomNumber);
        pieces.push(piece);
    }
}
function RandomColor(num) {
    const arrColor = [Color.BLUEDARK, Color.BLUELIGHT, Color.GREEN, Color.ORANGE, Color.PURPLE, Color.RED, Color.YELLOW];
    return arrColor[num - 1];
}
function renderGame() {
    clearSquareGame();
    SquareGame();
    pieces[0].set(initX, initY);
    pieces[0].renderPiece();
    initY = pieces[0].getPosY() + gravity;
    showNextPiece();
    requestAnimationFrame(renderGame);
}
initGame();
document.addEventListener('keydown', (e) => {
    let posXPieceSquare = getPieceSquareX(pieces[0]);
    let NextXRotation = confirmXRotation(pieces[0]);
    let NextYRotation = confirmYRotation(pieces[0]);
    if (e.code == 'ArrowRight' && posXPieceSquare.indexOf(20) == -1) {
        initX += 1;
    }
    else if (e.code == 'ArrowLeft' && posXPieceSquare.indexOf(0) == -1) {
        initX -= 1;
    }
    else if (e.code == 'ArrowDown') {
        var oldPiece = pieces.shift();
        var randomNumber = generate();
        var piece = generatePiece(randomNumber);
        pieces.push(piece);
        rotate = 0;
        initX = 10;
        initY = 0;
        getPieceSquareX(oldPiece);
    }
    else if (e.code == 'KeyR' && !NextXRotation && !NextYRotation) {
        rotate += 1;
        pieces[0].degrePos = rotate % 4;
    }
});
renderGame();

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
export var Color;
(function (Color) {
    Color["BLUELIGHT"] = "#81D4FA";
    Color["BLUEDARK"] = "#304FFE";
    Color["ORANGE"] = "#F9A825";
    Color["YELLOW"] = "#FFEB3B";
    Color["GREEN"] = "#76FF03";
    Color["PURPLE"] = "#AB47BC";
    Color["RED"] = "#E53935";
})(Color || (Color = {}));
export var TypePiece;
(function (TypePiece) {
    TypePiece[TypePiece["NPiece"] = 0] = "NPiece";
    TypePiece[TypePiece["LPiece"] = 1] = "LPiece";
    TypePiece[TypePiece["LInvPiece"] = 2] = "LInvPiece";
    TypePiece[TypePiece["ZPiece"] = 3] = "ZPiece";
    TypePiece[TypePiece["ZInvPiece"] = 4] = "ZInvPiece";
    TypePiece[TypePiece["SquarePiece"] = 5] = "SquarePiece";
    TypePiece[TypePiece["LinePiece"] = 6] = "LinePiece";
    TypePiece[TypePiece["TPiece"] = 7] = "TPiece";
})(TypePiece || (TypePiece = {}));
export class Square {
    constructor(color, PosX = 3, PosY = 3) {
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.width = 24;
        this.height = 24;
    }
    renderSquare() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX, this.PosY, this.width, this.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.PosX, this.PosY, this.width, this.height);
        ctx.closePath();
    }
}
export class Piece {
    constructor(PosX, PosY) {
        this.typePiece = TypePiece.NPiece;
        this.degrePos = 0;
        this.arrPos = [[{ posX: 0, posY: 0 }]];
        this.posX = PosX;
        this.posY = PosY;
    }
    renderPiece() {
    }
    getPosY() {
        return this.posY;
    }
    getPosX() {
        return this.posX;
    }
    set(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}
export class LPiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.LPiece;
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY - 1 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY - 1 }]
        ];
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY));
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY));
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY));
        newSquare3.renderSquare();
    }
}
export class LInvPiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.LInvPiece;
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX - 1, posY: this.PosY + 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX + 1, posY: this.PosY - 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY + 1 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX - 1, posY: this.PosY + 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX + 1, posY: this.PosY - 2 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY + 1 }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY));
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY));
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY));
        newSquare3.renderSquare();
    }
}
export class ZPiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.ZPiece;
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 2, posY: this.PosY + 2 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 3, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX, posY: this.PosY - 2 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 2, posY: this.PosY + 2 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 3, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX, posY: this.PosY - 2 }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY));
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY));
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY));
        newSquare3.renderSquare();
    }
}
export class ZInvPiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.ZInvPiece;
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 3, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 2 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX + 1, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 2 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 3, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 2 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX + 1, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 2 }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * this.arrPos[this.degrePos][1].posY);
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * this.arrPos[this.degrePos][2].posY);
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][3].posX, 3 + 24 * this.arrPos[this.degrePos][3].posY);
        newSquare3.renderSquare();
    }
}
export class LinePiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.LinePiece;
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX, posY: this.PosY + 3 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 3, posY: this.PosY }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX, posY: this.PosY - 3 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 3, posY: this.PosY }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX, posY: this.PosY + 3 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 3, posY: this.PosY }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX, posY: this.PosY - 3 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 3, posY: this.PosY }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY));
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY));
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY));
        newSquare3.renderSquare();
    }
}
export class SquarePiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.SquarePiece;
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX - 1, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 1, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
                { posX: this.PosX - 1, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
                { posX: this.PosX - 1, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
            [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * this.arrPos[this.degrePos][1].posY);
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * this.arrPos[this.degrePos][2].posY);
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][3].posX, 3 + 24 * this.arrPos[this.degrePos][3].posY);
        newSquare3.renderSquare();
    }
}
export class TPiece extends Piece {
    constructor(color, PosX = 10, PosY = 0) {
        super(PosX, PosY);
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.typePiece = TypePiece.TPiece;
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY - 1 }]
        ];
        this.degrePos = 0;
    }
    set(posX, posY) {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos() {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
                { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
                { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
                { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 1 }],
            [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
                { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY - 1 }]
        ];
    }
    getPosY() {
        super.getPosY();
        return this.PosY;
    }
    getPosX() {
        super.getPosX();
        return this.PosX;
    }
    renderPiece() {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY);
        newSquare.renderSquare();
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY));
        newSquare1.renderSquare();
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY));
        newSquare2.renderSquare();
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY));
        newSquare3.renderSquare();
    }
}

export const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
export enum Color {
    BLUELIGHT = '#81D4FA',
    BLUEDARK = '#304FFE',
    ORANGE = '#F9A825',
    YELLOW = '#FFEB3B',
    GREEN = '#76FF03',
    PURPLE = '#AB47BC',
    RED = '#E53935'
}
export enum TypePiece {
    NPiece = 0,
    LPiece = 1,
    LInvPiece = 2,
    ZPiece = 3,
    ZInvPiece = 4,
    SquarePiece = 5,
    LinePiece = 6,
    TPiece = 7,

}

export class Square {
    private width: number = 24
    private height: number = 24
    constructor(private color: Color, private PosX: number = 3, private PosY: number = 3) {
    }
    renderSquare(): void {
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX, this.PosY, this.width, this.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.PosX, this.PosY, this.width, this.height);
        ctx.closePath();
    }
}

export class Piece {
    readonly typePiece: TypePiece = TypePiece.NPiece;
    posX: number;
    posY: number;
    degrePos: number = 0
    arrPos: { posX: number, posY: number }[][] = [[{ posX: 0, posY: 0 }]]
    constructor(PosX: number, PosY: number) {
        this.posX = PosX;
        this.posY = PosY;
    }
    renderPiece(): void {
    }
    getPosY(): number {
        return this.posY;
    }
    getPosX(): number {
        return this.posX;
    }
    set(posX: number, posY: number): void {
        this.posX = posX;
        this.posY = posY;
    }
}

export class LPiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.LPiece
    arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
    { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 2 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 2 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
    { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY - 1 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos()
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
        { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 2 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 2 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
        { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY - 1 }]
        ]
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY))
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY))
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY))
        newSquare3.renderSquare()
    }
}
export class LInvPiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.LInvPiece;
    arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
    { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX - 1, posY: this.PosY + 2 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX + 1, posY: this.PosY - 2 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
    { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY + 1 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos()
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
        { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX - 1, posY: this.PosY + 2 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX + 1, posY: this.PosY - 2 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
        { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 2, posY: this.PosY + 1 }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY))
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY))
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY))
        newSquare3.renderSquare()
    }
}
export class ZPiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.ZPiece;
    arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
    { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
    { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 2, posY: this.PosY + 2 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 3, posY: this.PosY - 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX, posY: this.PosY - 2 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos()
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
        { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
        { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 2, posY: this.PosY + 2 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 3, posY: this.PosY - 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX, posY: this.PosY - 2 }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY))
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY))
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY))
        newSquare3.renderSquare()
    }
}
export class ZInvPiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.ZInvPiece;
    arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 3, posY: this.PosY + 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
    { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 2 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
    { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX + 1, posY: this.PosY - 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
    { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 2 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();

    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY + 1 }, { posX: this.PosX - 3, posY: this.PosY + 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
        { posX: this.PosX - 2, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 2 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
        { posX: this.PosX, posY: this.PosY - 1 }, { posX: this.PosX + 1, posY: this.PosY - 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
        { posX: this.PosX, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 2 }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * this.arrPos[this.degrePos][1].posY)
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * this.arrPos[this.degrePos][2].posY)
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][3].posX, 3 + 24 * this.arrPos[this.degrePos][3].posY)
        newSquare3.renderSquare()
    }
}
export class LinePiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.LinePiece;
    arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
    { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX, posY: this.PosY + 3 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 3, posY: this.PosY }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX, posY: this.PosY - 3 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
    { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 3, posY: this.PosY }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
        { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX, posY: this.PosY + 3 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 3, posY: this.PosY }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX, posY: this.PosY - 3 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
        { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 3, posY: this.PosY }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY))
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY))
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY))
        newSquare3.renderSquare()
    }
}
export class SquarePiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.SquarePiece;
    arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
    { posX: this.PosX - 1, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
    { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
    { posX: this.PosX - 1, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
    [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX, posY: this.PosY },
        { posX: this.PosX - 1, posY: this.PosY + 1 }, { posX: this.PosX, posY: this.PosY + 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 },
        { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY + 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 2, posY: this.PosY },
        { posX: this.PosX - 1, posY: this.PosY - 1 }, { posX: this.PosX - 2, posY: this.PosY - 1 }],
        [{ posX: this.PosX - 1, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * this.arrPos[this.degrePos][1].posY)
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * this.arrPos[this.degrePos][2].posY)
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][3].posX, 3 + 24 * this.arrPos[this.degrePos][3].posY)
        newSquare3.renderSquare()
    }
}
export class TPiece extends Piece {
    readonly typePiece: TypePiece = TypePiece.TPiece;
    arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
    { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
    { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
    { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 1 }],
    [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
    { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY - 1 }]
    ]
    degrePos: number = 0
    constructor(private color: Color, private PosX: number = 10, private PosY: number = 0) {
        super(PosX, PosY);
    }
    set(posX: number, posY: number): void {
        super.set(posX, posY);
        this.PosX = posX;
        this.PosY = posY;
        this.configArrPos();
    }
    configArrPos(): void {
        this.arrPos = [[{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY + 1 },
        { posX: this.PosX, posY: this.PosY + 2 }, { posX: this.PosX + 1, posY: this.PosY + 1 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY },
        { posX: this.PosX - 2, posY: this.PosY }, { posX: this.PosX - 1, posY: this.PosY + 1 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX, posY: this.PosY - 1 },
        { posX: this.PosX, posY: this.PosY - 2 }, { posX: this.PosX - 1, posY: this.PosY - 1 }],
        [{ posX: this.PosX, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY },
        { posX: this.PosX + 2, posY: this.PosY }, { posX: this.PosX + 1, posY: this.PosY - 1 }]
        ]
    }
    getPosY(): number {
        super.getPosY();
        return this.PosY;
    }
    getPosX(): number {
        super.getPosX();
        return this.PosX;
    }
    renderPiece(): void {
        super.renderPiece();
        const newSquare = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][0].posX, 3 + 24 * this.arrPos[this.degrePos][0].posY)
        newSquare.renderSquare()
        const newSquare1 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][1].posX, 3 + 24 * (this.arrPos[this.degrePos][1].posY))
        newSquare1.renderSquare()
        const newSquare2 = new Square(this.color, 3 + 24 * this.arrPos[this.degrePos][2].posX, 3 + 24 * (this.arrPos[this.degrePos][2].posY))
        newSquare2.renderSquare()
        const newSquare3 = new Square(this.color, 3 + 24 * (this.arrPos[this.degrePos][3].posX), 3 + 24 * (this.arrPos[this.degrePos][3].posY))
        newSquare3.renderSquare()
    }
}

export const boardStartState = [["bRook", "bKnight", "bBishop", "bQueen", "bKing", "bBishop", "bKnight", "bRook"],
                                [ "bPawn",  "bPawn",  "bPawn",  "bPawn",  "bPawn",  "bPawn",  "bPawn",  "bPawn" ],
                                [       "",      "",      "",      "",      "",      "",      "",      ""       ],
                                [       "",      "",      "",      "",      "",      "",      "",      ""       ],
                                [       "",      "",      "",      "",      "",      "",      "",      ""       ],
                                [       "",      "",      "",      "",      "",      "",      "",      ""       ],
                                [ "wPawn",  "wPawn",  "wPawn",  "wPawn",  "wPawn",  "wPawn",  "wPawn",  "wPawn" ],
                                ["wRook", "wKnight", "wBishop", "wQueen", "wKing", "wBishop", "wKnight", "wRook"]]

const moveFunctionMap = {"Pawn": pawnMoves,
                        "Knight": knightMoves,
                        "Bishop": bishopMoves,
                        "Rook": rookMoves,
                        "Queen": queenMoves,
                        "King": kingMoves}

export function getValidMoves(square, board) {
    let [row, col] = getRowCol(square)
    let piece = board[row][col].slice(1)
    let func = moveFunctionMap[piece]
    return func(row, col, board)
}

function pawnMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let dir = color === "w" ? -1 : 1
    let opp = color === "w" ? "b" : "w"
    let newRow, newCol
    //Forward
    [newRow, newCol] = [row+dir, col]
    if (inRange(newRow, 8) && !board[newRow][newCol]) {
        moveList.push(getSquare(newRow, newCol))
    }
    //CaptureEast
    [newRow, newCol] = [row+dir, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol))
    }
    //CaptureWest
    [newRow, newCol] = [row+dir, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList
}

function knightMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let newRow, newCol
    //NorthEastOut
    [newRow, newCol] = [row-1, col-2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //NorthEastIn
    [newRow, newCol] = [row-2, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //NorthWestIn
    [newRow, newCol] = [row-2, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //NorthWestOut
    [newRow, newCol] = [row-1, col+2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthEastOut
    [newRow, newCol] = [row+1, col-2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthEastIn
    [newRow, newCol] = [row+2, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthWestIn
    [newRow, newCol] = [row+2, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthWestOut
    [newRow, newCol] = [row+1, col+2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList
}

function bishopMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let newRow, newCol
    //NorthEast
    [newRow, newCol] = [row-1, col-1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow--
        newCol--
    }
    //NorthWest
    [newRow, newCol] = [row-1, col+1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow--
        newCol++
    }
    //SouthEast
    [newRow, newCol] = [row+1, col-1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow++
        newCol--
    }
    //SouthWest
    [newRow, newCol] = [row+1, col+1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow++
        newCol++
    }
    return moveList
}

function rookMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let newRow, newCol
    //North
    [newRow, newCol] = [row-1, col]
    while (inRange(newRow, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow--
    }
    //South
    [newRow, newCol] = [row+1, col]
    while (inRange(newRow, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newRow++
    }
    //East
    [newRow, newCol] = [row, col-1]
    while (inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newCol--
    }
    //West
    [newRow, newCol] = [row, col+1]
    while (inRange(newCol, 8)) {
        if (!board[newRow][newCol]) {
            moveList.push(getSquare(newRow, newCol))
        } else {
            if (board[newRow][newCol][0] !== color) {
                moveList.push(getSquare(newRow, newCol))
            }
            break
        }
        newCol++
    }
    return moveList
}

function queenMoves(row, col, board) {
    return bishopMoves(row, col, board).concat(rookMoves(row, col, board))
}


function kingMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let newRow, newCol
    //NorthEast
    [newRow, newCol] = [row-1, col-1]

    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //North
    [newRow, newCol] = [row-1, col]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //NorthWest
    [newRow, newCol] = [row-1, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //East
    [newRow, newCol] = [row, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //West
    [newRow, newCol] = [row, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthEast
    [newRow, newCol] = [row+1, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //South
    [newRow, newCol] = [row+1, col]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthWest
    [newRow, newCol] = [row, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList
}

export function getRowCol(square) {
    let row = Math.floor(square/8)
    let col = square%8
    return [row, col]
}

function getSquare(row, col) {
    return row*8+col
}

function inRange(x, end, begin=0) {
    return x<end && x>=begin
}

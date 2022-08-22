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

export function getValidMoves(square, board, movedPieces) {
    let [row, col] = getRowCol(square)
    let piece = board[row][col].slice(1)
    let func = moveFunctionMap[piece]
    return func(row, col, board, movedPieces)
}

function pawnMoves(row, col, board) {
    let color = board[row][col][0]
    let moveList = []
    let dir = color === "w" ? -1 : 1
    let opp = color === "w" ? "b" : "w"
    let isPromo = (color === "w" && row === 1) || (color === "b" && row === 6) ? -1 : 1
    let startRow = color === "w" ? 6 : 1
    let newRow, newCol
    //Forward
    [newRow, newCol] = [row+dir, col]
    if (inRange(newRow, 8) && !board[newRow][newCol]) {
        moveList.push(getSquare(newRow, newCol)*isPromo)
        //Forward2
        if (row === startRow && !board[newRow+dir][newCol]) {
            moveList.push(getSquare(newRow+dir, newCol))
        }
    }
    //CaptureEast
    [newRow, newCol] = [row+dir, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol)*isPromo)
    }
    //CaptureWest
    [newRow, newCol] = [row+dir, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol)*isPromo)
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


function kingMoves(row, col, board, movedPieces) {
    let color = board[row][col][0]
    let moveList = []
    let newRow, newCol
    //Castling
    let king = color === "w" ? movedPieces[7][4] : movedPieces[0][4]
    let rightRook = color === "w" ? movedPieces[7][7] : movedPieces[0][7]
    let leftRook = color === "W" ? movedPieces[7][0] : movedPieces[0][0]
    //CastleRight
    if (color === "w") {
        if (king && rightRook && !board[7][5] && !board[7][6]) {
            moveList.push(126)
        } else if (king && leftRook && !board[7][1] && !board[7][2] && !board[7][3]) {
            moveList.push(122)
        }
    } else {
        if (king && rightRook && !board[0][5] && !board[0][6]) {
            moveList.push(70)
        } else if (king && leftRook && !board[0][1] && !board[0][2] && !board[0][3]) {
            moveList.push(66)
        } 
    }
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
    [newRow, newCol] = [row+1, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList
}

export function isInCheck(board, color) {
    let row, col
    for (let i = 0; i<8; i++) {
        for (let j = 0; j<8; j++) {
            if (board[i][j][0] === color && board[i][j].slice(1) === "King") {
                [row, col] = [i, j]
            }
        }
    }
    let opp = color === "w" ? "b" : "w"
    let oppQueen, oppRook, oppBishop, oppKnight, oppPawn, oppKing
    [oppQueen, oppRook, oppBishop, oppKnight, oppPawn, oppKing] = [opp+"Queen", opp+"Rook", opp+"Bishop", opp+"Knight", opp+"Pawn", opp+"King"]
    //North
    [newRow, newCol] = [row-1, col]
    while (inRange(newRow, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppRook || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow--
    }
    //South
    [newRow, newCol] = [row+1, col]
    while (inRange(newRow, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppRook || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow++
    }
    //East
    [newRow, newCol] = [row, col-1]
    while (inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppRook || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newCol--
    }
    //West
    [newRow, newCol] = [row, col+1]
    while (inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppRook || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newCol++
    }
    //NorthEast
    [newRow, newCol] = [row-1, col-1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppBishop || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow--
        newCol--
    }
    //NorthWest
    [newRow, newCol] = [row-1, col+1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppBishop || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow--
        newCol++
    }
    //SouthEast
    [newRow, newCol] = [row+1, col-1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppBishop || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow++
        newCol--
    }
    //SouthWest
    [newRow, newCol] = [row+1, col+1]
    while (inRange(newRow, 8) && inRange(newCol, 8)) {
        if (board[newRow][newCol]){
            if (board[newRow][newCol][0] === color) {
                break
            } else if (board[newRow][newCol] === oppBishop || board[newRow][newCol] == oppQueen) {
                return true
            }
        }
        newRow++
        newCol++
    }
    //NorthEastOut
    [newRow, newCol] = [row-1, col-2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //NorthEastIn
    [newRow, newCol] = [row-2, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //NorthWestIn
    [newRow, newCol] = [row-2, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //NorthWestOut
    [newRow, newCol] = [row-1, col+2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //SouthEastOut
    [newRow, newCol] = [row+1, col-2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //SouthEastIn
    [newRow, newCol] = [row+2, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //SouthWestIn
    [newRow, newCol] = [row+2, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    //SouthWestOut
    [newRow, newCol] = [row+1, col+2]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKnight) {
        return true
    }
    let dir = color === "w" ? -1: 1
    //CaptureEast
    [newRow, newCol] = [row+dir, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppPawn) {
        return true
    }
    //CaptureWest
    [newRow, newCol] = [row+dir, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8)  && board[newRow][newCol] && board[newRow][newCol] === oppPawn) {
        return true
    }
    //NorthEast
    [newRow, newCol] = [row-1, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //North
    [newRow, newCol] = [row-1, col]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //NorthWest
    [newRow, newCol] = [row-1, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //East
    [newRow, newCol] = [row, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //West
    [newRow, newCol] = [row, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //SouthEast
    [newRow, newCol] = [row+1, col-1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //South
    [newRow, newCol] = [row+1, col]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    //SouthWest
    [newRow, newCol] = [row+1, col+1]
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol] && board[newRow][newCol] === oppKing) {
        return true
    }
    return false
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

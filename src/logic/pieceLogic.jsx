/* const moveFunctionMap = {"Pawn": pawnMoves,
                        "Knight": knightMoves,
                        "Bishop": bishopMoves,
                        "Rook": rookMoves,
                        "Queen": queenMoves,
                        "King": kingMoves}



function pawnMoves(row, col, board) {
    let color = board[row][col][0]
    moveList = []
    let dir = color === "w" ? -1 : 1
    let opp = color === "w" ? "b" : "w"
    let newRow, newCol
    //Forward
    newRow = row+dir, newCol = col
    if (inRange(newRow, 8) && !board[newRow][newCol]) {
        moveList.push(getSquare(newRow, newCol))
    }
    //CaptureEast
    newRow = row+dir, newCol = col-1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol))
    }
    //CaptureWest
    newRow = row+dir, newCol = col+1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] === opp) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList
}

function knightMoves() {
    return [15, 16]
}

function bishopMoves(row, col, board) {
    let color = board[row][col][0]
    moveList = []
    let newRow, newCol
    //NorthEast
    newRow = row-1, newCol = col-1
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
    newRow = row-1, newCol = col+1
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
    newRow = row+1, newCol = col-1
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
    newRow = row+1, newCol = col+1
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
    moveList = []
    let newRow, newCol
    //North
    newRow = row-1, newCol = col
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
    newRow = row+1, newCol = col
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
    newRow = row, newCol = col-1
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
    newRow = row, newCol = col+1
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
    let bishopMoves = bishopMoves(row, col, board)
    let rookMoves = rookMoves(row, col, board)
    return bishopMoves.concat(rookMoves)
}

function kingMoves(row, col, board) {
    let color = board[row][col][0]
    moveList = []
    let newRow, newCol
    //NorthEast
    newRow = row-1, newCol = col-1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //North
    newRow = row-1, newCol = col
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //NorthWest
    newRow = row-1, newCol = col+1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //East
    newRow = row, newCol = col-1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //West
    newRow = row, newCol = col+1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthEast
    newRow = row+1, newCol = col-1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //South
    newRow = row+1, newCol = col
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    //SouthWest
    newRow = row+1, newCol = col+1
    if (inRange(newRow, 8) && inRange(newCol, 8) && board[newRow][newCol][0] !== color) {
        moveList.push(getSquare(newRow, newCol))
    }
    return moveList


}

function getSquare(row, col) {
    return row*8+col
}

function inRange(x, end, begin=0) {
    return x<end && x>=begin
} */
import React, { useState, useRef, useEffect } from "react";
import Tile from "./Tile";
import { boardStartState, getValidMoves, getRowCol} from "../logic/logic";
import { getEngineMove } from "../lambda/lambda";


function Chessboard() {
    let boardState = useRef(boardStartState)
    let playerTurn = useRef("w")
    let activePiece = useRef(-1)
    let potentialMoves = useRef([])
    let movedPieces = useRef(Array(8).fill().map(()=>Array(8).fill(1)))


    let grid = []
    for (let i = 0; i<8; i++) {
        for (let j = 0; j<8; j++) {
            let pos = i*8+j
            let piece = boardState.current[i][j]
            let color = i%2 === j%2 ? "gray" : "purple"
            grid.push(<Tile color={color} piece={piece} square={pos} active="" highlight="" key={pos}/>)
        }
    }

    const [board, setBoard] = useState(grid)

    function updateBoard(tilesToChange, pieceMap, colorMap) {
        let newBoard = board.map(tile => {
            if (tilesToChange.includes(parseInt(tile.key))) {
                let pieceKey, pieceVal, colorKey, colorVal
                if (pieceMap[tile.key]) {
                    pieceKey = pieceMap[tile.key][0]
                    pieceVal = pieceMap[tile.key][1]
                } else {
                    pieceKey = "piece"
                    pieceVal = tile.props.piece
                }
                if (colorMap[tile.key]) {
                    colorKey = colorMap[tile.key][0]
                    colorVal = colorMap[tile.key][1]
                } else {
                    pieceKey = "color"
                    pieceVal = tile.props.color
                }
                return <Tile 
                        color={tile.props.color}
                        piece={tile.props.piece}
                        square={tile.key}
                        active={tile.props.active}
                        highlight={tile.props.highlight}
                        key={tile.key}
                        {...{ [pieceKey]: pieceVal}}
                        {...{ [colorKey]: colorVal}}
                        />
            }
            return tile
        })
        setBoard(newBoard)
    }

    function handleActive(square) {
        if (potentialMoves.current.includes(square)) {
            handleMove(square)
        } else if (potentialMoves.current.includes(square+64)) {
            handleCastle(square)
        } else {
            deActivate()
        }
    }

    function handleNotActive(square) {
        let [row, col] = getRowCol(square)
        if (boardState.current[row][col] && boardState.current[row][col][0] === playerTurn.current) {
            activePiece.current = square
            potentialMoves.current = getValidMoves(square, boardState.current, movedPieces.current)
            let tilesToChange = getTilesToChange()
            let pieceMap = {}
            let colorMap = getColorMap(1, tilesToChange)
            updateBoard(tilesToChange, pieceMap, colorMap)
        }
    }

    async function requestEngine() {
        let response = await getEngineMove(boardState.current, movedPieces.current)
        return new Promise(function (resolve, reject) {
            if (response === "K") {
                activePiece.current = 4
                potentialMoves.current = [6, 5]
                resolve(handleCastle(6))
            } else if (response === "Q") {
                activePiece.current = 4
                potentialMoves.current = [2, 3]
                resolve(handleCastle(2))
            } else if (response === "error") {
                console.log("request engine errored")
                reject(changeTurn())
            } else {
                let responseArr = response.split(",")
                let begin = parseInt([responseArr[0]])
                let end = parseInt([responseArr[1]])
                activePiece.current = begin
                potentialMoves.current.push(end)
                resolve(handleMove(end))
            }
        })
    }

    function handleMove(square) {
        let piece = getPieceFromSquare(activePiece.current)
        updateBoardState(activePiece.current, square)
        let pieceMap = getPieceMap(piece, activePiece.current, square)
        deActivate(pieceMap)
        changeTurn()
    }

    function handleCastle(square) {
        let rook, king, rookBegin, rookEnd, kingBegin, kingEnd
        if (square === 2) {
            [rook, king, rookBegin, rookEnd, kingBegin, kingEnd] = ["bRook", "bKing", 0, 3, 4, 2]
        } else if (square === 6) {
            [rook, king, rookBegin, rookEnd, kingBegin, kingEnd] = ["bRook", "bKing", 7, 5, 4, 6]
        } else if (square === 58) {
            [rook, king, rookBegin, rookEnd, kingBegin, kingEnd] = ["wRook", "wKing", 56, 59, 60, 58]
        } else {
            [rook, king, rookBegin, rookEnd, kingBegin, kingEnd] = ["wRook", "wKing", 63, 61, 60, 62]
        }
        updateBoardState(kingBegin, kingEnd)
        updateBoardState(rookBegin, rookEnd)
        let tilesToChange = getTilesToChange()
        tilesToChange.push(rookBegin)
        let pieceMapKing = getPieceMap(king, kingBegin, kingEnd)
        let pieceMapRook = getPieceMap(rook, rookBegin, rookEnd)
        let pieceMap = {...pieceMapKing, ...pieceMapRook}
        console.log(pieceMap)
        console.log(tilesToChange)
        deActivate(pieceMap, tilesToChange)
        changeTurn()
    }

    function deActivate(pieceMap={}, tilesToChange=[]) {
        tilesToChange = tilesToChange.length > 0 ? tilesToChange : getTilesToChange()
        let colorMap = getColorMap(0, tilesToChange)
        activePiece.current = -1
        potentialMoves.current = []
        updateBoard(tilesToChange, pieceMap, colorMap)
    }

    function changeTurn() {
        playerTurn.current = playerTurn.current === "w" ? "b" : "w"
    }

    function getTilesToChange() {
        let tilesToChange = [activePiece.current]
        potentialMoves.current.forEach(pos => {
            if (pos >= 64) {
                pos -= 64
            }
            tilesToChange.push(pos)
        })
        return tilesToChange
    }

    function getPieceMap(piece, begin, end) {
        let pieceMap = {}
        pieceMap[begin.toString()] = ["piece", ""]
        pieceMap[end.toString()] = ["piece", piece]
        return pieceMap
    }

    function getColorMap(sign, tilesToChange) {
        let colorMap = {}
        let val = sign ? "active" : ""
        colorMap[activePiece.current.toString()] = ["active", val]
        val = sign ? "highlight" : ""
        for (let i = 1; i<tilesToChange.length; i++) {
            colorMap[tilesToChange[i].toString()] = ["highlight", val]
        }
        return colorMap
    }

    function getPieceFromSquare(square) {
        let [row, col] = getRowCol(square)
        return boardState.current[row][col]
    }

    function updateBoardState(begin, end) {
        let [bRow, bCol] = getRowCol(begin)
        let [eRow, eCol] = getRowCol(end)
        let piece = boardState.current[bRow][bCol]
        boardState.current[bRow][bCol] = ""
        boardState.current[eRow][eCol] = piece
        movedPieces.current[bRow][bCol] = 0
        movedPieces.current[eRow][eCol] = 0
    }

    function handleClick(e) {
        let square = parseInt(e.target.getAttribute("square"))
        if (activePiece.current === -1){
            handleNotActive(square)
        } else {
            handleActive(square)
        }
    }

    useEffect(() => {
        if (playerTurn.current === "b") {
            requestEngine()
        }
    }, [playerTurn.current])

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 6.25em)',
            gridTemplateRows: 'repeat(8, 6.25em)',
            width: '50em',
            height: '50em'       
        }} onClick={(e) => handleClick(e)}>
            {board}
        </div>
    )
}

export default Chessboard
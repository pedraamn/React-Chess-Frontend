import React, { useState, useRef } from "react";
import Tile from "./Tile";
import { boardStartState, getValidMoves, getRowCol} from "../logic/mainLogic";


function Chessboard() {
    let boardState = useRef(boardStartState)
    let playerTurn = useRef("w")
    let activePiece = useRef(-1)
    let potentialMoves = useRef([])

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

    function updateBoardState(tilesToChange, pieceMap, colorMap) {
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
        let pieceMap, colorMap
        if (potentialMoves.current.includes(square)) {
            let [row, col] = getRowCol(activePiece.current)
            let [newRow, newCol] = getRowCol(square)
            let piece = boardState.current[row][col]
            boardState.current[row][col] = ""
            boardState.current[newRow][newCol] = piece
            pieceMap = getPieceMap(piece, activePiece.current, square)
            playerTurn.current = playerTurn.current === "w" ? "b" : "w"
        }
        let tilesToChange = getTilesToChange()
        pieceMap = pieceMap || {}
        colorMap = getColorMap(0)
        activePiece.current = -1
        potentialMoves.current = []
        updateBoardState(tilesToChange, pieceMap, colorMap)
    }

    function handleNotActive(square) {
        let [row, col] = getRowCol(square)
        if (boardState.current[row][col] && boardState.current[row][col][0] === playerTurn.current) {
            activePiece.current = square
            potentialMoves.current = getValidMoves(square, boardState.current)
            let tilesToChange = getTilesToChange()
            let pieceMap = {}
            let colorMap = getColorMap(1)
            updateBoardState(tilesToChange, pieceMap, colorMap)
        }
    }

    function getTilesToChange() {
        let tilesToChange = [activePiece.current]
        return tilesToChange.concat(potentialMoves.current)
    }

    function getPieceMap(piece, begin, end) {
        let pieceMap = {}
        pieceMap[begin.toString()] = ["piece", ""]
        pieceMap[end.toString()] = ["piece", piece]
        return pieceMap
    }

    function getColorMap(sign) {
        let colorMap = {}
        let val = sign ? "active" : ""
        colorMap[activePiece.current.toString()] = ["active", val]
        val = sign ? "highlight" : ""
        potentialMoves.current.forEach(pos => {
            colorMap[pos.toString()] = ["highlight", val]
        })
        console.log(colorMap)
        return colorMap
    }

    function handleClick(e) {
        let square = parseInt(e.target.getAttribute("square"))
        if (activePiece.current === -1){
            handleNotActive(square)
        } else {
            handleActive(square)
        }
    }

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 100px)',
            gridTemplateRows: 'repeat(8, 100px)',
            width: '800px',
            height: '800px'       
        }} onClick={(e) => handleClick(e)}>
            {board}
        </div>
    )
}

export default Chessboard
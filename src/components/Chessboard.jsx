import React, { useState, useRef, useEffect } from "react";

import Tile from "./Tile";
import { boardStartState, getValidMoves, isInCheck, getRowCol} from "../logic/logic";
import { getEngineMove } from "../lambda/lambda";
import Modal from "react-modal/lib/components/Modal";


function Chessboard() {
    let boardState = useRef(boardStartState)
    let playerTurn = useRef("w")
    let activePiece = useRef(-1)
    let potentialMoves = useRef([])
    let movedPieces = useRef(Array(8).fill().map(()=>Array(8).fill(1)))
    let promoSquare = useRef(-1)
    let lastMove = useRef([])

    const [isPromo, setPromo] = useState(false)


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
        } else if (potentialMoves.current.includes(-square)) {
            handlePromotion(square)
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
                let piece = responseArr[2]
                activePiece.current = begin
                potentialMoves.current.push(end)
                resolve(handleMove(end, piece))
            }
        })
    }

    function handleMove(square, piece="") {
        piece = piece || getPieceFromSquare(activePiece.current)
        updateBoardState(activePiece.current, square, piece)
        let pieceMap = getPieceMap(piece, activePiece.current, square)
        let sq = playerTurn.current === "b" ? square : -1
        deActivate(sq, pieceMap)
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
        let sq = playerTurn.current === "b" ? sq : -1
        deActivate(sq, pieceMap, tilesToChange)
        changeTurn()
    }

    function handlePromotion(square) {
        promoSquare.current = square
        setPromo(true)
    }

    function deActivate(square=-1, pieceMap={}, tilesToChange=[]) {
        tilesToChange = tilesToChange.length > 0 ? tilesToChange : getTilesToChange()
        if (square > -1) {
            tilesToChange = tilesToChange.concat(lastMove.current)
        }
        let colorMap = square > -1 ? paintLastMove(square) : getColorMap(0, tilesToChange)
        activePiece.current = -1
        potentialMoves.current = []
        promoSquare.current = -1
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
            } else if (pos < 0) {
                pos *= -1
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

    function paintLastMove(square) {
        let colorMap = {}
        lastMove.current.forEach(pos => {
            colorMap[pos.toString()] = ["lastMove", ""]
        })
        colorMap[activePiece.current.toString()] = ["lastMove", "lastMove"]
        colorMap[square.toString()] = ["lastMove", "lastMove"]
        lastMove.current = [activePiece.current, square]
        return colorMap

    }

    function getPieceFromSquare(square) {
        let [row, col] = getRowCol(square)
        return boardState.current[row][col]
    }

    function updateBoardState(begin, end, piece="") {
        let [bRow, bCol] = getRowCol(begin)
        let [eRow, eCol] = getRowCol(end)
        piece = piece || boardState.current[bRow][bCol]
        boardState.current[bRow][bCol] = ""
        boardState.current[eRow][eCol] = piece
        movedPieces.current[bRow][bCol] = 0
        movedPieces.current[eRow][eCol] = 0
    } 

    function closeModal(piece) {
        setPromo(false)
        handleMove(promoSquare.current, piece)
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
            <Modal isOpen={isPromo}
            style={{
                content: {
                display: 'flex',
                top: '20em',
                left: '20em',
                right: '20em',
                bottom: '20em',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                }}}>
                <div style={{display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3em'}}>
                    <button><img src={`images/wQueen.png`} style={{width: '6.25em', height: '6.25em'}} onClick={() => closeModal("wQueen") } /></button>
                    <button><img src={`images/wRook.png`} style={{width: '6.25em', height: '6.25em'}} onClick={() => closeModal("wRook") }  /></button>
                    <button><img src={`images/wBishop.png`} style={{width: '6.25em', height: '6.25em'}} onClick={() => closeModal("wBishop") } /></button>
                    <button><img src={`images/wKnight.png`} style={{width: '6.25em', height: '6.25em'}} onClick={() => closeModal("wKnight") } /></button>
                </div>
            </Modal>
        </div>
    )
}

export default Chessboard
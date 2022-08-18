import axios from "axios";

const pieceMappings = {
    "wPawn": "P", "bPawn": "p",
    "wKnight": "N", "bKnight": "n",
    "wBishop": "B", "bBishop": "b",
    "wRook": "R", "bRook": "r",
    "wQueen": "Q", "bQueen": "q",
    "wKing": "K", "bKing": "k",
    "": " "}



export function getEngineMove(board, movedPieces) {
    let fen = getFenFromBoard(board, movedPieces)
    let params = getRequestParams(fen)
    return requestEngineOnLambda(params)

}


function requestEngineOnLambda(params) {
    return new Promise(function (resolve, reject) {
        axios.request(params).then(
            (response) => {
                var result = response.data;
                console.log('Processing Request');
                resolve(result);
            },
                (error) => {
                reject(error);
            }
        );
    });
}

function getRequestParams(fen) {
    const params = {
        method: 'POST',
        url: "https://rgp8k05zq5.execute-api.us-west-1.amazonaws.com/test1stage",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {"boardState": fen}
    }
    return params
}

function getFenFromBoard(board, movedPieces) {
    let fen = ""
    for (let i = 0; i<8; i++) {
        for (let j = 0; j<8; j++) {
            let symbol = pieceMappings[board[i][j]]
            fen += symbol
        }
    }
    fen += "/"
    let wKing, wLeftRook, wRightRook, bKing, bLeftRook, bRightRook
    [wKing, wLeftRook, wRightRook, bKing, bLeftRook, bRightRook] = [movedPieces[7][4], movedPieces[7][0], movedPieces[7][7], movedPieces[0][4], movedPieces[0][0], movedPieces[0][7]]
    if (wKing && wRightRook) {
        fen += "K"
    }
    if (wKing && wLeftRook) {
        fen += "Q"
    }
    if (bKing && bLeftRook) {
        fen += "k"
    }
    if (bKing && bLeftRook) {
        fen += "q"
    }
    fen += "/"
    fen += "b" //for now
    return fen
}
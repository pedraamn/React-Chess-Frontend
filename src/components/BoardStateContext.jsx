import React, {createContext} from "react";

// set the defaults
let boardState = []
for (let i = 0; i<64; i++) {
    boardState.push("")
}

boardState[0] = ["blackRook"]
boardState[7] = ["blackRook"]
boardState[1] = ["blackKnight"]
boardState[6] = ["blackKnight"]
boardState[2] = ["blackBishop"]
boardState[5] = ["blackBishop"]
boardState[3] = ["blackQueen"]
boardState[4] = ["blackKing"]
for (let i = 8; i<16; i++) {
    boardState[i] = ["blackPawn"]
}

for (let i = 48; i<56; i++) {
    boardState[i] = ["whitePawn"]
}
boardState[56] = ["whiteRook"]
boardState[63] = ["whiteRook"]
boardState[57] = ["whiteKnight"]
boardState[62] = ["whiteKnight"]
boardState[58] = ["whiteBishop"]
boardState[61] = ["whiteBishop"]
boardState[59] = ["whiteQueen"]
boardState[60] = ["whiteKing"]

const BoardStateContext = createContext({
  boardState: boardState,
  setBoardState: () => {}
});

export default BoardStateContext;
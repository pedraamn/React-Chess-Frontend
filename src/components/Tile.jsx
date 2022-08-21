import React, { useEffect } from "react";
import { useState } from "react";   


function Tile(props) {
    const colors = {"gray":"#808080", "purple":"#604a8a", "active":"#eded18", "highlight":"#0ff50f", "lastMove":"#1cd9d5"}

    const [piece, setPiece] = useState(props.piece)
    const [color, setColor] = useState(props.active || props.highlight || props.lastMove || props.color)

    useEffect(() => {
        setPiece(props.piece)
        setColor(props.active || props.highlight || props.lastMove || props.color)
    }, [props.piece, props.active, props.highlight, props.lastMove])

    return(
        <div style={{
            width: '6.25em', 
            height: '6.25em', 
            backgroundColor: `${colors[color]}`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '0.0625em solid black'}}
            square={props.square.toString()}>
            {piece && <img src={`images/${piece}.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />}
        </div>
    )
}

export default Tile
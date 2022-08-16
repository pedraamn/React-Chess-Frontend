import React, { useEffect } from "react";
import { useState } from "react";   


function Tile(props) {
    const colors = {"gray":"#808080", "purple":"#604a8a", "active":"#eded18", "highlight":"#0ff50f"}

    const [piece, setPiece] = useState(props.piece)
    const [color, setColor] = useState(props.active || props.highlight || props.color)

    useEffect(() => {
        setPiece(props.piece)
        setColor(props.active || props.highlight || props.color)
    }, [props.piece, props.active, props.highlight])

    return(
        <div style={{
            width: '100px', 
            height: '100px', 
            backgroundColor: `${colors[color]}`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid black'}}
            square={props.square.toString()}>
            {piece && <img src={`images/${piece}.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />}
        </div>
    )
}

export default Tile
import React from "react";
import "./Grid.css"

function Grid({ grid, addXO }) {
    return (
        <div className="grid__main"> 
            <div className="g3x3" id="grid">
                {grid.map((index) => (
                    <div
                        className="sqr game"
                        onClick={(e)=>addXO(e.target)}
                        id={index}
                        key={index}                     
                        tabIndex={-1}      
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Grid;

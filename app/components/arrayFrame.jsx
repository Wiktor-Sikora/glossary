import { useState, useRef, useMemo } from 'react';
import svgRandomize from '../assets/svg/dice.svg'

export function SquareButton({imgSrc, onButtonClick, alt="button"}) {
    return (<button onClick={onButtonClick}
        className="p-1 w-15 hover:scale-110"
    >
        <img className="fill-pink stroke-pink text-pink" src={imgSrc} alt={alt} />
    </button>)
}

export function Element({ id, onElementClick, value, maxValue, state= 1}) {
    let bgColor = "bg-white"
    if (state === 0) {
        bgColor = "bg-white"
    } else if (state === 2) {
        bgColor = "bg-rosepink"
    }

    return (<button onClick={onElementClick}
        className={`w-full ${ bgColor } ${onElementClick !== undefined ? 'hover:bg-dark-rosepink' : ''}`}
        style={{height: value / maxValue * 100 + '%'}} key={id} ></button>)
}

export function ArrayFrame({ algorithm='', arrayLen = 50, maxValue = 50, minValue = 0 }) {
    const [elements, setElements] = useState([
        {value: Math.floor(Math.random() * (maxValue - minValue) + minValue), state: 1},
        {value: Math.floor(Math.random() * (maxValue - minValue) + minValue), state: 1}
    ])


    return (<div className="flex flex-row gap-3 h-72">
        <div className="flex flex-row items-end gap-1 w-full border-blue-magenta border-2 rounded-xl p-3">
            {elements.map(element => (
                <Element key={element.id} value={element.value} maxValue={maxValue} state={element.state} />
            ))}
        </div>
        <div className="flex flex-col gap-3 border-blue-magenta border-2 rounded-xl p-3" >
            <SquareButton imgSrc={svgRandomize} />
        </div>
    </div>)
}
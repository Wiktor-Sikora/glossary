import { useState, useRef, useMemo } from 'react';
import {CgDice5} from "react-icons/cg";

export function getSpacing(arrayLength) {
    if (arrayLength <= 80) {
        return 1
    } else if (arrayLength <= 120) {
        return 0.5
    } else {
        return 0;
    }
}

export function SquareButton({children, onButtonClick, alt="button"}) {
    return (<button onClick={onButtonClick}
        className={`duration-200 ${onButtonClick !== undefined ? 'text-rosepink hover:scale-110' : 'text-blue-magenta'}`}
    >
        {children}
    </button>)
}

export function Element({ id, onElementClick, value, maxValue, state= 1}) {
    const height = useRef((value / maxValue) * 100)
    const bgColor = useMemo(() => {
        if (state === 0) {
            return "bg-blue-magenta"
        } else if (state === 1) {
            return "bg-white"
        } else if (state === 2) {
            return "bg-rosepink"
        } else if (state === 3) {
            return "bg-white outline-4 outline-rosepink outline-dotted"
        }

    }, [state])

    return (<button onClick={onElementClick}
        className={`w-full ${ bgColor } ${onElementClick !== undefined && state !== 2 ? 'hover:bg-dark-rosepink' : ''}`}
        style={{height: height.current+'%'}} key={id} ></button>)
}

export function ArrayComponent({ algorithm='', arrayLen = 50, maxValue = 50, minValue = 0 }) {
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
            <SquareButton imgSrc={<CgDice5 />} alt={"Randomize Array"}/>
        </div>
    </div>)
}
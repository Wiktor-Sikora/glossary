import {useMemo} from "react";

export function Element({id, onElementClick, value, maxValue, state= 1}) {
    const height = useMemo( () =>(value / maxValue) * 100, [value, maxValue])
    const bgColor = useMemo(() => {
        if (state === 0) {
            return "bg-blue-magenta"
        } else if (state === 1) {
            return "bg-white"
        } else if (state === 2) {
            return "bg-rosepink"
        } else if (state === 3) {
            return "bg-white outline-4 outline-rosepink outline-dotted -outline-offset-4"
        }

    }, [state])

    return (<button onClick={onElementClick}
        className={`w-full ${ bgColor } ${onElementClick !== undefined && state !== 2 ? 'hover:bg-dark-rosepink' : ''}`}
        style={{height: height+'%'}} key={id} ></button>)
    }
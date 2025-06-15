export function SquareButton({children, onButtonClick}) {
    return (<button onClick={onButtonClick}
        className={`duration-200 ${onButtonClick !== undefined ? 'text-rosepink hover:scale-110' : 'text-blue-magenta'}`}
    >
        {children}
    </button>)
}

export function RangeInput({description, initialValue, minValue, maxValue, onChange, step=1}) {
    return (<div className="col-span-full w-full flex flex-col gap-1">
        <label className="text-xl w-full font-bold text-rosepink">{description}
            <input className={"w-full bg-navy-blue-magenta border-blue-magenta border-2 rounded-2xl accent-rosepink appearance-none cursor-pointer"}
                   type="range"
                   min={minValue}
                   max={maxValue}
                   step={step}
                   value={initialValue}
                   onChange={onChange}
            />
        </label>
    </div>)
}
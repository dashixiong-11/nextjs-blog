import React, {useRef, useState} from "react";

export const useToast = (delay: number) => {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')
    const time = useRef(null)

    const info = (text: string, callback: Function) => {
        if (visible) return
        setText(text)
        setVisible(true)
        time.current = setTimeout(() => {
            callback()
            setVisible(false)
            clearTimeout(time.current)
        }, delay)

    }
    const view = visible ? <>
        <div className='toast'>
            <div className="toast-wrapper">
                {text}
            </div>
        </div>
        <style jsx>
            {`
                .toast{
                    -webkit-box-shadow: 2px 5px 10px -6px rgba(0,0,0,0.75);
                    -moz-box-shadow: 2px 5px 10px -6px rgba(0,0,0,0.75);
                    box-shadow: 2px 5px 10px -6px rgba(0,0,0,0.75); 
                   position: absolute;
                    z-index: 9;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%,50%);
                    background: #000;
                    opacity: 0.42;
                    border-radius: 4px;
                    color: #fff;
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}
        </style>
    </> : null
    return {view, info}
}
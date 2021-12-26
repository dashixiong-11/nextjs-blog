import React, {useState} from "react";

const Toast = () => {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')

    const info = (text: string) => {
        setText(text)
        setVisible(true)

    }
    const view = visible ? <div>{text}</div> : null
    return {view, info}
}
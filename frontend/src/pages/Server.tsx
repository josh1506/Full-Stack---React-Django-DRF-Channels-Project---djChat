import useWebSocket from "react-use-websocket";
import {useState} from "react";

const socketUrl = 'ws://127.0.0.1:8000/ws/test'

const Server = () => {
    const [inputValue, setInputValue] = useState("")
    const [message, setMessage] = useState("")
    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Connected!")
        },
        onClose: () => {
            console.log("Closed!")
        },
        onError: () => {
            console.log("Error!")
        },
        onMessage: (msg) => {
            setMessage(msg.data)
        }
    })

    const sendInputValue = () => {
        const messageInput = {text: inputValue}
        sendJsonMessage(messageInput)
        setInputValue("")
    }

    return (
        <div>
            <h1>Server</h1>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={sendInputValue}>Send</button>
            <div>Received Data: {message}</div>
        </div>
    )
}

export default Server

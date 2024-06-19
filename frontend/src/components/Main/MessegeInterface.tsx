import useWebSocket from "react-use-websocket";
import {useState} from "react";

const socketUrl = 'ws://127.0.0.1:8000/ws/test'

const MessageInterface = () => {
    const [newMessage, setNewMessage] = useState<string[]>([])
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
            const data = JSON.parse(msg.data)
            setNewMessage(prevState => [...prevState, data.new_message])
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        sendJsonMessage({"type": "message", message})
        setMessage("")
    }

    return (
        <div>
            <h1>MessageInterface</h1>
            {newMessage.map((data, index) => (
                <div key={index} style={{backgroundColor: "salmon", padding: 1, margin: 1, width: "200px"}}>{data}</div>
            ))}
            <form onSubmit={onSubmit}>
                <label>Enter Message:
                    <input type={"text"} value={message} onChange={e => setMessage(e.target.value)}/>
                </label>
                <button type={"submit"}>Send Message</button>
            </form>
        </div>
    )
}

export default MessageInterface

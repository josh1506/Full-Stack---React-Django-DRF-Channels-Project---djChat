import {useState} from "react";

import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";

import useCrud from "../../hooks/useCrud.ts";
import {Server} from "../../@types/server";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

const MessageInterface = () => {
    const {serverId, channelId} = useParams()
    const {fetchData} = useCrud<Server>([], `/messages/?channel_id=${channelId}`)
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState("")

    const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null

    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: async () => {
            try {
                const data = await fetchData()
                setNewMessage([])
                setNewMessage(Array.isArray(data) ? data : [])
                console.log("Connected!")
            } catch (err) {
                console.log(err)
            }
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
            {newMessage.map((data: Message, index: number) => (
                <div key={index} style={{backgroundColor: "salmon", padding: 1, margin: 1, width: "200px"}}>
                    <p>{data.sender}</p>
                    <p>{data.content}</p>
                </div>
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

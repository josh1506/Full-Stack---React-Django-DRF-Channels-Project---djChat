import {useState} from "react";

import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";

import useCrud from "../../hooks/useCrud.ts";
import {Server} from "../../@types/server";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels.tsx";

interface ServerChannelProps {
    data: Server[];
}

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
    const {data} = props
    const {serverId, channelId} = useParams()
    const {fetchData} = useCrud<Server>([], `/messages/?channel_id=${channelId}`)
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState("")
    const server_name = data?.[0]?.name ?? "Server"

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
        <>
            <MessageInterfaceChannels data={data}/>
            {channelId === undefined ? (
                <Box
                    sx={{
                        overflow: "hidden",
                        p: {xs: 0},
                        height: `calc(80vh)`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{textAlign: "center"}}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            letterSpacing={"-0.5px"}
                            sx={{p: 5, maxWidth: "600px"}}
                        >
                            Welcome to {server_name}
                        </Typography>
                        <Typography>
                            {data?.[0]?.description ?? "This is our home"}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <div>
                    <Box
                        sx={{overflow: "hidden", p: 0, height: `calc(100vh - 100px})`}}
                    >
                        <List sx={{width: "100%", bgcolor: "backgroundColor.paper"}}>
                            {newMessage.map((msg: Message, index: number) => (
                                <ListItem key={index} alignItems={"flex-start"}>
                                    <ListItemAvatar>
                                        <Avatar alt={"user image"}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primaryTypographyProps={{fontSize: "12px", variant: "body2"}}
                                        primary={
                                            <Typography
                                                component={"span"}
                                                variant={"body1"}
                                                color={"text.primary"}
                                                sx={{display: "inline", fontWeight: 600}}
                                            >
                                                {msg.sender}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    variant={"body1"}
                                                    style={{
                                                        overflow: "visible",
                                                        whiteSpace: "normal",
                                                        textOverflow: "clip"
                                                    }}
                                                    sx={{
                                                        display: "inline",
                                                        lineHeight: 1.2,
                                                        fontWeight: 400,
                                                        letterSpacing: "-0.2px"
                                                    }}
                                                    component={"span"}
                                                    color={"text.primary"}
                                                >
                                                    {msg.content}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/*<h1>MessageInterface</h1>*/}
                    {/*{newMessage.map((data: Message, index: number) => (*/}
                    {/*    <div key={index} style={{backgroundColor: "salmon", padding: 1, margin: 1, width: "200px"}}>*/}
                    {/*        <p>{data.sender}</p>*/}
                    {/*        <p>{data.content}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {/*<form onSubmit={onSubmit}>*/}
                    {/*    <label>Enter Message:*/}
                    {/*        <input type={"text"} value={message} onChange={e => setMessage(e.target.value)}/>*/}
                    {/*    </label>*/}
                    {/*    <button type={"submit"}>Send Message</button>*/}
                    {/*</form>*/}
                </div>
            )}
        </>
    )
}

export default MessageInterface

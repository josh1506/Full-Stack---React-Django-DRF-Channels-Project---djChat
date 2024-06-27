import {useState} from "react";

import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";

import useCrud from "../../hooks/useCrud.ts";
import {Server} from "../../@types/server";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels.tsx";
import {useTheme} from "@mui/material/styles";
import Scroll from "./Scroll.tsx";

interface SendMessageData {
    type: string;
    message: string;

    [key: string]: any;
}

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
    const theme = useTheme()
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
            setMessage("")
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendJsonMessage({"type": "message", message} as SendMessageData)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
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
                        <Scroll>
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
                        </Scroll>
                    </Box>
                    <Box sx={{position: "sticky", bottom: 0, width: "100%"}}>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                bottom: 0,
                                right: 0,
                                padding: "1rem",
                                backgroundColor: theme.palette.background.default,
                                zIndex: 1
                            }}
                        >
                            <Box sx={{display: "flex"}}>
                                <TextField
                                    minRows={1}
                                    maxRows={4}
                                    sx={{flexGrow: 1}}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    fullWidth
                                    multiline
                                />
                            </Box>
                        </form>
                    </Box>
                </div>
            )}
        </>
    )
}

export default MessageInterface

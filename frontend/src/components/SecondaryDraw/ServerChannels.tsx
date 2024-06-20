import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Link, useParams} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
import {Server} from "../../@types/server";
import server from "../../pages/Server.tsx";

interface Category {
    id: number
    name: string
    description: string
    icon: string
}

interface ServerChannelsProps {
    data: Server[];
}

const ServerChannels = (props: ServerChannelsProps) => {
    const theme = useTheme()
    const {serverId} = useParams()
    const {data} = props
    const serverName = data?.[0]?.name ?? "Server"

    return (
        <>
            <Box sx={{
                height: "50px",
                display: "flex",
                alignItems: "center",
                px: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                position: "sticky",
                top: 0,
                backgroundColor: theme.palette.background.default
            }}>
                <Typography
                    variant={"body1"}
                    style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}
                >
                    {serverName}
                </Typography>
            </Box>
            <List sx={{py: 0}}>
                {data.flatMap((obj) => (
                    obj.channel_server.map((item) => (
                        <ListItem disablePadding key={item.id} sx={{display: "block", maxHeight: "40px"}} dense={true}>
                            <Link
                                to={`/server/${serverId}/${item.id}/`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <ListItemButton sx={{minHeight: 48}}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" textAlign="start" paddingLeft={1}>
                                                {item.name}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                ))}
            </List>
        </>
    )
}

export default ServerChannels

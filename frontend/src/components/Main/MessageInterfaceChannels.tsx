import {Server} from "../../@types/server";
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    ListItemAvatar,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ExploreCategories from "../SecondaryDraw/ExploreCategories.tsx";
import React, {useEffect, useState} from "react";
import ServerChannels from "../SecondaryDraw/ServerChannels.tsx";

interface ServerChannelProps {
    data: Server[]
}

const MessageInterfaceChannels = (props: ServerChannelProps) => {
    const theme = useTheme()
    const {serverId, channelId} = useParams()
    const [sideMenu, setSideMenu] = useState(false)
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))
    const {data} = props
    const channelName = data
        ?.find((server) => server.id === Number(serverId))
        ?.channel_server?.find((channel) => channel.id === Number(channelId))
        ?.name || "Home"

    const toggleDrawer = (open: Boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return
        }
        setSideMenu(open)
    }

    const list = () => (
        <Box
            sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <ServerChannels data={data}/>
        </Box>
    )
    
    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false)
        }
    }, [isSmallScreen])

    return (
        <>
            <AppBar
                sx={{
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
                color="default"
                position={"sticky"}
                elevation={0}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        minHeight: theme.primaryAppBar.height,
                        height: theme.primaryAppBar.height,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{display: {xs: "block", sm: "none"}}}>
                        <ListItemAvatar sx={{minWidth: "40px"}}>
                            <Avatar
                                alt={"Server Icon"}
                                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                                sx={{width: 30, height: 30}}
                            />
                        </ListItemAvatar>
                    </Box>
                    <Typography noWrap component={"div"}>
                        {channelName}
                    </Typography>

                    <Box sx={{flexGrow: 1}}></Box>
                    <Box sx={{display: {xs: "block", sx: "none"}}}>
                        <IconButton color={"inherit"} edge={"end"} onClick={toggleDrawer(true)}>
                            <MoreVertIcon/>
                        </IconButton>
                    </Box>

                    <Drawer anchor={"left"} open={sideMenu} onClose={toggleDrawer(false)}>{list()}</Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default MessageInterfaceChannels

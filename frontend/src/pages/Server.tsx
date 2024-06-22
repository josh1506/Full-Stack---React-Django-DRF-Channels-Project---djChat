import {useEffect} from "react";

import {useNavigate, useParams} from "react-router-dom";
import {Box, CssBaseline} from "@mui/material";

import Main from "./templates/Main.tsx";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import MessageInterface from "../components/Main/MessegeInterface.tsx";
import ServerChannels from "../components/SecondaryDraw/ServerChannels.tsx";
import UserServers from "../components/PrimaryDraw/UserServers.tsx";
import useCrud from "../hooks/useCrud.ts";
import {Server} from "../@types/server";

const Server = () => {
    const navigate = useNavigate()
    const {serverId, channelId} = useParams()

    const {dataCRUD, error, isLoading, fetchData} = useCrud<Server>(
        [],
        `/server/select/?by_server_id=${serverId}`
    )

    if (error !== null && error.message === "404") {
        navigate("/")
        return null
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Check if the channelId is valid by searching for it in the data fetched from the API
    const isChannel = (): Boolean => {
        if (!channelId) {
            return true
        }

        return dataCRUD.some((server) => (
            server.channel_server.some((channel) => (
                channel.id === parseInt(channelId)
            ))
        ))
    }

    useEffect(() => {
        if (!isChannel()) {
            navigate(`/server/${serverId}`)
        }
    }, [isChannel, channelId])

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <UserServers open={false} data={dataCRUD}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ServerChannels data={dataCRUD}/>
            </SecondaryDraw>
            <Main>
                <MessageInterface data={dataCRUD}/>
            </Main>
        </Box>
    )
}

export default Server

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

interface Category {
    id: number
    name: string
    description: string
    icon: string
}

const ServerChannels = () => {
    const theme = useTheme()
    const {serverId} = useParams()
    const {dataCRUD, error, isLoading, fetchData} = useCrud<Category>([], "/server/category/")

    useEffect(() => {
        fetchData()
    }, [])

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
                Explore
            </Box>
            <List sx={{py: 0}}>
                {dataCRUD.map((item) => (
                    <ListItem disablePadding key={item.id} sx={{display: "block"}} dense={true}>
                        <Link
                            to={`/server/${serverId}/${item.name}/`}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <ListItemButton sx={{minHeight: 48}}>
                                <ListItemIcon sx={{minWidth: 0, justifyContent: "center"}}>
                                    <ListItemAvatar sx={{minWidth: "0px"}}>
                                        <img
                                            src={`${MEDIA_URL}${item.icon}`}
                                            alt="server icon"
                                            style={{width: "25px", height: "25px", display: "block", margin: "auto"}}
                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
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
                ))}
            </List>
        </>
    )
}

export default ServerChannels

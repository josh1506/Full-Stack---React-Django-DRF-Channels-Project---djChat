import {Link, useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar, ListItemIcon, ListItemText,
    Typography
} from "@mui/material";
import {MEDIA_URL} from "../../config.ts";

interface Server {
    id: number
    name: string
    description: string
    icon: string
    category: string
    banner: string
}

const ExploreServer = () => {
    const {categoryName} = useParams()
    const url = categoryName ? `/server/select/?category=${categoryName}` : "/server/select/"
    const {dataCRUD, fetchData} = useCrud<Server>([], url)


    useEffect(() => {
        fetchData()
    }, [categoryName])

    console.log("Working")

    return (
        <Container maxWidth="lg">
            <Box sx={{pt: 6}}>
                <Typography
                    variant="h3"
                    noWrap
                    component="h1"
                    sx={{
                        display: {
                            sm: "block",
                            fontWeight: 700,
                            letterSpacing: "-2px",
                            textTransform: "capitalize",
                        }
                    }}
                >
                    {categoryName ? categoryName : "Popular Channels"}
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="h2"
                    color="textSecondary"
                    sx={{display: {sm: "block", fontWeight: 700, letterSpacing: "-1px"}}}
                >
                    {categoryName ? `Channels talking about ${categoryName}` : "Check out some of our popular channels "}
                </Typography>
            </Box>
            <Typography variant="h6" sx={{pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px"}}>
                Recommended Channels
            </Typography>
            <Grid container spacing={{xs: 0, sm: 2}}>
                {dataCRUD.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                        <Card sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "none",
                            backgroundImage: "none"
                        }}>
                            <Link to={`/server/${item.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                <CardMedia
                                    component="img"
                                    image={item.banner ? `${MEDIA_URL}${item.banner}` : "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"}
                                    alt="random"
                                    sx={{display: {xs: "none", sm: "block"}}}
                                />
                                <CardContent sx={{flexGrow: 1, p: 0, "&:last-child": {paddingBottom: 0}}}>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemIcon sx={{minWidth: 0}}>
                                                <ListItemAvatar sx={{minWidth: "50px"}}>
                                                    <Avatar alt="Server Icon" src={`${MEDIA_URL}${item.icon}`}/>
                                                </ListItemAvatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="body2"
                                                        textAlign="start"
                                                        sx={{
                                                            fontWeight: 700,
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap"
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                    >
                                                        {item.category}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ExploreServer

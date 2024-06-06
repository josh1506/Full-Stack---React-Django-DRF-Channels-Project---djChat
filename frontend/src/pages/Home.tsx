import {Box, CssBaseline} from "@mui/material";

import Main from "./templates/Main.tsx";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import PopularChannels from "../components/PrimaryDraw/PopularChannels.tsx";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories.tsx";

const Home = () => {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <PopularChannels open={false}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories/>
            </SecondaryDraw>
            <Main/>
        </Box>
    )
}

export default Home

import {Box, CssBaseline} from "@mui/material";

import Main from "./templates/Main.tsx";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import PopularChannels from "../components/PrimaryDraw/PopularChannels.tsx";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories.tsx";
import ExploreServer from "../components/Main/ExploreServer.tsx";

const Explore = () => {
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
            <Main>
                <ExploreServer/>
            </Main>
        </Box>
    )
}

export default Explore

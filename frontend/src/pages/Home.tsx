import {Box, CssBaseline} from "@mui/material";

import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";

const Home = () => {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                asdasdasd
            </PrimaryDraw>
            <SecondaryDraw/>
        </Box>
    )
}

export default Home

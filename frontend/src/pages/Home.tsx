import {Box, CssBaseline} from "@mui/material";

import Main from "./templates/Main.tsx";
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
            <Main/>
        </Box>
    )
}

export default Home

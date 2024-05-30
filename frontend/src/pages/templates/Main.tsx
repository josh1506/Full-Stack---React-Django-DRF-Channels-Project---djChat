import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import React from "react";

const Main: React.FC = () => {
    const theme = useTheme()

    return (
        <Box sx={{
            mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            flexGrow: 1,
            overflow: "hidden"
        }}>
            {[...Array(100)].map((_, i) => (
                <Typography key={i} paragraph>{i + 1}</Typography>
            ))}
        </Box>
    )
}

export default Main

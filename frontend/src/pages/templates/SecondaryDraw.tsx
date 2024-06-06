import React from "react";

import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import useAxiosWithInterceptor from "../../helpers/jwtinterceptor.ts";

type SecondaryDrawProps = {
    children: React.ReactNode
}

const SecondaryDraw: React.FC = ({children}: SecondaryDrawProps) => {
    const theme = useTheme()
    const jwtAxios = useAxiosWithInterceptor()

    // jwtAxios.get('http://127.0.0.1:8000/api/server/select/')
    //     .then(resp => {
    //         console.log(resp.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    return (
        <Box sx={{
            minWidth: `${theme.secondaryDraw.width}px`,
            mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            borderRight: `1px solid ${theme.palette.divider}`,
            display: {xs: "none", sm: "block"},
            overflow: "auto"
        }}>
            {children}
        </Box>
    )
}

export default SecondaryDraw

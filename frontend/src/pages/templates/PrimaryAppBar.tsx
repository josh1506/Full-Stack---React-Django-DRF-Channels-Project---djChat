import React, {useEffect, useState} from "react";

import MenuIcon from "@mui/icons-material/Menu"
import {AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories.tsx";

const PrimaryAppBar: React.FC = () => {
    const theme = useTheme()

    const [sideMenu, setSideMenu] = useState(false)
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))

    const list = () => (
        <Box
            sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <ExploreCategories/>
        </Box>
    )

    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false)
        }
    }, [isSmallScreen])

    const toggleDrawer = (open: Boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return
        }
        setSideMenu(open)
    }

    return (
        <AppBar sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`
        }}>
            <Toolbar variant="dense" sx={{height: theme.primaryAppBar.height, minHeight: theme.primaryAppBar.height}}>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{mr: 2}}
                                onClick={toggleDrawer(!sideMenu)}>
                        <MenuIcon/>
                    </IconButton>
                </Box>

                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>

                <Link href="/" underline="none" color="inherit">
                    <Typography variant="h6" noWrap component="div"
                                sx={{display: {fontWeight: 700, letterSpacing: "-0.5px"}}}>
                        DJCHAT
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryAppBar

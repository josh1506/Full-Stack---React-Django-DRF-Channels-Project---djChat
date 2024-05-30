import {Box, IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

type Props = {
    open: boolean
    handleDrawerOpen: () => void
    handleDrawerClose: () => void
}

const DrawToggle: React.FC<Props> = ({open, handleDrawerOpen, handleDrawerClose}) => {
    return (
        <Box sx={{height: "50px", display: "flex", justifyContent: "center", placeItems: "center"}}>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
        </Box>
    )
}

export default DrawToggle

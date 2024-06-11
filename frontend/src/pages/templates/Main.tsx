import {ReactNode} from "react";

import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type Props = {
    children: ReactNode
}

const Main: React.FC<Props> = ({children}) => {
    const theme = useTheme()

    return (
        <Box sx={{
            mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            flexGrow: 1,
            overflow: "hidden"
        }}>
            {children}
        </Box>
    )
}

export default Main

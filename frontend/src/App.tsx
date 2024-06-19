import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"

import Home from "./pages/Home.tsx";
import {ThemeProvider} from "@mui/material";
import {createMuiTheme} from "./theme/theme.tsx";

import "./theme/main.css"
import Explore from "./pages/Explore.tsx";
import Server from "./pages/Server.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="/server/:serverId/:channelId?" element={<Server/>}/>
            <Route path="/explore/:categoryName" element={<Explore/>}/>
        </Route>
    )
)

const App: React.FC = () => {
    const theme = createMuiTheme()
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App

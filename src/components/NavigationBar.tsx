/**
 * Fixed navigation bar at the top of the page
 */

import { AppBar, Toolbar, Typography } from "@mui/material"

interface NavBarProps {
    title: string
}

const NavigationBar = ({title = 'Posts'}: NavBarProps) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar
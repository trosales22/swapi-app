import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

export default function CustomAppBar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        SWAPI App
                    </Typography>
                </Toolbar>
            </AppBarStyled>
        </Box>
    );
}

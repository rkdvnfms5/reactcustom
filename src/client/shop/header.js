import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header() {

    return(
        <React.Fragment>
            <AppBar position="fixed" style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                    푸핫 이미지
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
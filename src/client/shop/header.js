import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../../images/logo1.png';

export default function Header() {

    return(
        <React.Fragment>
            <AppBar position="fixed" style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}>
                <Toolbar>
                    <img src={`${Logo}`} style={{height: '64px', cursor:"pointer"}} onClick={() => {location.href='/shop/list'}}/>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
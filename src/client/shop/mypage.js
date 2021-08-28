import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginInfo } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './footer';
import Header from './header';

const useStyles = makeStyles((theme) => ({
    
}));

export default function MyPage() {
    const classes = useStyles();

    useEffect(() => {
        
    }, []);

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <h1>마이페이지</h1>
            <Footer />
        </React.Fragment>
    );
}
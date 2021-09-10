import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://riverblue.tistory.com/" target="_blank">
          Poozim
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    footer_m: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
}));

export default function Footer() {
    const classes = useStyles();

    return(
        <React.Fragment>
            <footer className={isMobile? classes.footer : classes.footer_m}>
              <Typography variant="h6" align="center" gutterBottom>
                This is a project that I developed myself.
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                #RiverBlue #Poohot #Poozim #Beast
              </Typography>
              <Copyright />
            </footer>
        </React.Fragment>
    );
}
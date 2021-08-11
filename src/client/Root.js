import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Shop from './shopRouter';

export default function Root () {
    return(
        <React.Fragment>
            <BrowserRouter>
                <Route path="/shop" component={Shop}/>
            </BrowserRouter>
        </React.Fragment>
        
    )
}
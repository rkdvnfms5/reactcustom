import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Shop from './shopRouter';

export default function Root () {
    return(
        <BrowserRouter>
            <Route path="/shop" component={Shop}/>
        </BrowserRouter>
    )
}
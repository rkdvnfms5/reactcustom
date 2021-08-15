import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Shop from './shopRouter';
import Loader from '../../images/loader.gif';

export default function Root () {
    import ('../../css/style.css');
    return(
        <React.Fragment>
            <BrowserRouter>
                <Route path="/shop" component={Shop}/>
            </BrowserRouter>
            <div id="loading" className="loader">
                <img src={`${Loader}`} />
            </div>
        </React.Fragment>
    )
}
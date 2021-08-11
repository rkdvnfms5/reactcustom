import React from 'react';
import List from './shop/list';
import Insert from './shop/insert';
import {Route, BrowserRouter, useRouteMatch, Redirect, Switch} from 'react-router-dom';

export default function Shop () {
    let { path } = useRouteMatch();
    import ('../../css/shop.css');
    return(
        <BrowserRouter>
            <Route path={`${path}/list`} component={List}/>
            <Route path={`${path}/insert`} component={Insert}/>
        </BrowserRouter>
    )
}
import React from 'react';
import List from './shop/list';
import {Route, BrowserRouter, useRouteMatch} from 'react-router-dom';

export default function Shop () {
    let { path } = useRouteMatch();

    return(
        <BrowserRouter>
            <Route path={`${path}/list`} component={List}/>
        </BrowserRouter>
    )
}
import React from 'react';
import List from './shop/list';
import Insert from './shop/insert';
import View from './shop/view';
import MyPage from './shop/mypage';
import Map from './shop/map';
import Update from './shop/update';
import {Route, BrowserRouter, useRouteMatch, Redirect, Switch} from 'react-router-dom';

export default function Shop () {
    let { path } = useRouteMatch();
    import ('../../css/shop.css');
    return(
        <BrowserRouter>
            <Route exact path={`${path}/list`} component={List}/>
            <Route exact path={`${path}/insert`} component={Insert}/>
            <Route exact path={`${path}/mypage`} component={MyPage}/>
            <Route exact path={`${path}/map`} component={Map}/>
            <Route exact path={`${path}/view/:seq`} component={View}/>
            <Route exact path={`${path}/update/:seq`} component={Update}/>
            <Route exact path = {`${path}`} render={() => <Redirect to={`${path}/list`} />} />
        </BrowserRouter>
    )
}
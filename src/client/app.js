import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Album from './Album';
import Sign from './Sign';
import List from './list';
import View from './view';
import Insert from './insert';

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Route path="/sign" component={Sign}/>
                <Route path="/list" component={List}/>
                <Route path="/view/:seq" component={View}/>
                <Route path="/insert" component={Insert}/>
                <Route path="/album" component={Album}/>
            </BrowserRouter>
        );
    }
}

export default App;
import React from 'react';
import {Route} from 'react-router-dom';
import Album from './Album';
import Sign from './Sign';
import List from './list';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route path="/sign" component={Sign}/>
                <Route path="/list" component={List}/>
                <Route path="/album" component={Album}/>
            </div>
        );
    }
}

export default App;
import React from 'react';
import axios from 'axios';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        axios.get('/boardList')
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <h1>여기는 list</h1>
                <h1>{this.state.res}</h1>
            </div>
        );
    }
}

export default List;
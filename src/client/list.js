import React from 'react';
import axios from 'axios';

class List extends React.Component{

    componentDidMount(){
        axios.get('/boardList')
            .then(function(response){
                console.log(response);
                this.result = response.result;
                
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render(){
        return(
            <div><h1>{this.result}dsad</h1></div>
        );
    }
}

export default List;
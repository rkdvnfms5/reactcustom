import axios from 'axios';

export function getBoardList(){
    return axios.get('/api/board', {
        params : {

        }
    })
}

export function getBoardOne(seq){
    return axios.get('/api/board/'+seq, {
        params : {

        }
    })
}

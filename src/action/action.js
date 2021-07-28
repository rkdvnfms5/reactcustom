import axios from 'axios';

export function getBoardList(){
    return axios.get('/api/board', {
        params : {

        }
    })
}

import axios from 'axios';

export function getBoardList(){
    return axios.get('/api/board', {
        params : {

        }
    })
}

export function getBoardOne(seq){
    return axios.get('/api/board/' + seq)
}

export function insertBoard(board){
    return axios.post('/api/board', board)
}

export function updateBoard(board){
    return axios.put('/api/board/' + board.seq, board)
}

export function deleteBoard(seq){
    return axios.delete('/api/board/' + seq)
}

export function login(member){
    return axios.post("/api/auth/login", {
        params : {
            id : member.id,
            password : member.password
        }
    });
}

export function getLoginInfo(){
    return axios.post("/api/auth/info");
}

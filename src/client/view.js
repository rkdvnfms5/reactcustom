import React, {useState, useEffect} from 'react';
import { getBoardOne } from '../action/action';

export default function View({match}){
    const seq = match.params.seq;
    const [board, setBoard] = useState(null);

    useEffect(() => {
        getBoardOne(seq).then(res => {
            if(res.status == 200){
                setBoard(res.data[0]);
                console.log(res.data[0]);
            }
        })
    }, [])
    return(
        <div>
            <h1>여기는 {seq} View 페이지</h1>
            {
                board ? 
                <div>
                    <span>seq : {board.seq}</span>
                    <span>title : {board.title}</span>
                    <span>content : {board.content}</span>
                    <span>regdate : {board.regdate}</span>
                </div> : null
            }
        </div>
        
    )
    
}
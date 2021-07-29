import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { insertBoard } from '../action/action';

export default function View(){
    //const seq = match.params.seq;
    const [board, setBoard] = useState({
        title : '',
        content : ''
    });
    const history = useHistory();

    const insertHandle = () => {
        if(confirm('등록하시겠습니까?')){
            insertBoard(board).then(res => {
                if(res.status == 200){
                    alert("등록 완료");
                    location.href='/list';
                }
            })
        }
    }

    return(
        <div>
            <h1>여기는 등록 페이지</h1>
            <div>
                <div>
                    <span>title : </span>
                    <input 
                        type="text"
                        value={board.title}
                        onChange = {(e) => setBoard({...board, title : e.target.value})}
                        maxLength = "10"
                    />
                </div>
                <div>
                    <span>content : </span>
                    <input 
                        type="text"
                        value={board.content}
                        onChange = {(e) => setBoard({...board, content : e.target.value})}
                        maxLength = "10"
                    />
                </div>
                <div>
                    <button type="button" onClick={() => insertHandle()}>등록</button>
                    <button type="button" onClick={() => history.goBack()}>목록</button>
                </div>
            </div>
        </div>
        
    )
    
}
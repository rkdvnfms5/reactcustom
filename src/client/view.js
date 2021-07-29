import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getBoardOne, updateBoard, deleteBoard} from '../action/action';

export default function View(){
    //const seq = match.params.seq;
    const [board, setBoard] = useState(null);
    const { seq } = useParams(); //객체 형태의 params 에서 키가 seq인 값을 가져옴
    const history = useHistory();

    useEffect(() => {
        getBoardOne(seq).then(res => {
            if(res.status == 200){
                setBoard(res.data[0]);
            }
        })
    }, [])

    const updateHandle = () => {
        if(confirm('수정하시겠습니까?')){
            updateBoard(board).then(res => {
                if(res.status == 200){
                    alert("수정 완료");
                    location.reload();
                }
            })
        }
    }

    const deleteHandle = () => {
        if(confirm('삭제하시겠습니까?')){
            deleteBoard(seq).then(res => {
                if(res.status == 200){
                    alert("삭제 완료");
                    history.goBack();
                }
            })
        }
    }

    return(
        <div>
            <h1>여기는 {seq} View 페이지</h1>
            {
                board ? 
                <div>
                    <div>
                        <span>seq : </span>
                        <input 
                            type="text"
                            value={board.seq}
                            readOnly="readOnly"
                        />
                    </div>
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
                        <span>regdate : </span>
                        <input 
                            type="text"
                            value={board.regdate}
                            readOnly="readOnly"
                        />
                    </div>
                    <div>
                        <button type="button" onClick={() => deleteHandle()}>삭제</button>
                        <button type="button" onClick={() => updateHandle()}>수정</button>
                        <button type="button" onClick={() => history.goBack()}>목록</button>
                    </div>
                </div> : null
            }
        </div>
        
    )
    
}
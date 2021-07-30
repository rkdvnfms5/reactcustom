import React, {useState, useEffect} from 'react';
import { getBoardList, getBoardOne, getLoginInfo } from '../action/action';

export default function List(props){
    const [boardList, setBoardList] = useState([])
    const [board, setBoard] = useState(null);
    const [loginInfo, setLoginInfo] = useState(null);
    useEffect(() => {
        getBoardList().then(res => {
            if(res.status == 200){
                setBoardList(res.data);
            } else {
                console.log(res.status);
            }
        })
        getLoginInfo().then(res => {
            if(res.status == 200){
                setLoginInfo(res.data);
            }
        })
    }, []); //,[] 안하면 무한루프

    const viewBoard = (seq) => {
        getBoardOne(seq).then(res => {
            if(res.status == 200){
                setBoard(res.data[0]);
                //open Modal
            }
        })
    }
    return (
        <div>
            <h1>리스트 페이지</h1>
            {
                boardList ? boardList.map(board => {
                    return (
                        <div>
                            <a href={"/view/" + board.seq}><span>{board.title}</span> view</a>
                            <button type="button" onClick={() => viewBoard(board.seq)}><span>{board.title}</span></button>
                        </div>
                    )
                }) : null
            }
            <div>
                <a href="/insert">등록</a>
            </div>
            
            <div>
                {
                    loginInfo ? <a href="/api/auth/logout">로그아웃</a> : <a href="/sign">로그인</a>
                }
            </div>
        </div>
    )
}
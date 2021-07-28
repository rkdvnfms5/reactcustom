import React, {useState, useEffect} from 'react';
import { getBoardList, getBoardOne } from '../action/action';

export default function List(props){
    const [boardList, setBoardList] = useState([])
    const [board, setBoard] = useState(null);

    useEffect(() => {
        getBoardList().then(res => {
            console.log(res);
            if(res.status == 200){
                setBoardList(res.data);
            } else {
                console.log(res.status);
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
        </div>
    )
}
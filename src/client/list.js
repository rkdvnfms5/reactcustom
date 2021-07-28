import React, {useState, useEffect} from 'react';
import { getBoardList } from '../action/action';

export default function List(props){
    const [boardList, setBoardList] = useState([])

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

    return (
        <div>
            <h1>리스트 페이지</h1>
            {
                boardList ? boardList.map(board => {
                    return (
                        <div>
                            <span>{board.title}</span>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}
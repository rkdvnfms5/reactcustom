import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginInfo } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import ReorderIcon from '@material-ui/icons/Reorder';
import Footer from './footer';
import Header from './header';

const useStyles = makeStyles((theme) => ({
    
}));

export default function MyPage() {
    const classes = useStyles();

    useEffect(() => {
        
    }, []);

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <div className="navi-left">
                <ul className="menu">
                    <li>
                        <a>내가 등록한 핫집</a>
                    </li>
                    <li>
                        <a>좋아요 핫집</a>
                    </li>
                    <li>
                        <a href="/shop/myinfo">내 정보</a>
                    </li>
                </ul>
            </div>
            <div className="contents60" style={{marginTop:"100px", height:"1000px"}}>
                <div className="my-contents">
                    <h1>내가 등록한 핫집</h1>
                    <div className="shop-list">
                        <div className="shop">
                            <div className="contents-area">
                                <div>
                                    <span className="title">제목이에염 </span>
                                    <span className="category">고기</span>
                                </div>
                                <div>
                                    <Rating
                                    name="rating"
                                    value={4.5}
                                    precision={0.5}
                                    size="small"
                                    disabled
                                    />
                                    <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>4.5</span>
                                    
                                </div>
                                <div className="content">
                                    내용이에염 쮸뿌쮸뿌쮸뿌쮸뿌쮸쀼
                                </div>
                                <div>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <CommentIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                </div>
                            </div>
                            <div className="image-area">
                                <span className="image-view">
                                    <span>NO IMAGE</span>
                                </span>
                            </div>
                            
                        </div>

                        <div className="shop">
                            <div className="contents-area">
                                <div>
                                    <span className="title">제목이에염 </span>
                                    <span className="category">고기</span>
                                </div>
                                <div>
                                    <Rating
                                    name="rating"
                                    value={4.5}
                                    precision={0.5}
                                    size="small"
                                    disabled
                                    />
                                    <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>4.5</span>
                                    
                                </div>
                                <div className="content">
                                    내용이에염 쮸뿌쮸뿌쮸뿌쮸뿌쮸쀼
                                </div>
                                <div>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <CommentIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                    <IconButton style={{fontSize:"17px"}}>
                                        <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                        1
                                    </IconButton>
                                </div>
                            </div>
                            <div className="image-area">
                                <span className="image-view">
                                    <span>NO IMAGE</span>
                                </span>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}
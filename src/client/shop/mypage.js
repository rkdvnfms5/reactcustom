import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginInfo, getShopList, onLoading, offLoading, disableMember, logout} from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import { useInView } from 'react-intersection-observer';
import Footer from './footer';
import Header from './header';
import disableImage from '../../../images/why.jpg';
import $ from 'jquery';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    
}));

export default function MyPage() {
    const classes = useStyles();
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState(null);
    const [shopList, setShopList] = useState([]);
    const [menu, setMenu] = useState("등록한 핫집");
    const [disable, setDisable] = useState(false);
    const [disableInfo, setDisableInfo] = useState({
        seq : 0,
        reason : ''
    });
    const [shop, setShop] = useState({
        memberseq : 0,
        myyn : 'Y',
        mythankyn : 'N',
        order : 'regdate',
        limit : 10,
        offset : 0,
        limityn : 'Y'
    });

    //페이징
    const [ref, inView] = useInView();
    const [offset, setOffset] = useState(0);
    const moreCnt = 10;
    const [more, setMore] = useState(true);

    //모바일 메뉴
    const [anchorEl, setAnchorEl] = useState(null);
    const openSort = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closeSort = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        onLoading();
        getLoginInfo().then(res => {
            if(res.status == 200){
                if(res.data.seq > 0){
                    setLoginInfo(res.data);
                    setDisableInfo({...disableInfo, seq : res.data.seq});
                    setShop({...shop, memberseq : res.data.seq});
                    let memberShop = {...shop, memberseq : res.data.seq};
                    getShopList(memberShop).then(result => {
                        if(result.status == 200){
                            setShopList(result.data);
                        } else {
                            console.log(result.status);
                        }
                    })
                }
                else {
                    //alert("로그인이 필요합니다.");
                    //history.goBack();
                }
            }
        })
        offLoading();
    }, []);

    const myShop = () => {
        if(shop.memberseq == 0){
            alert("로그인이 필요합니다.");
            return;
        }
        setMenu("등록한 핫집");
        let searchShop = {...shop, myyn:'Y', mythankyn:'N'};

        getShopList(searchShop).then(result => {
            if(result.status == 200){
                setShopList(result.data);
            } else {
                console.log(result.status);
            }
        });
    }

    const myThankShop = () => {
        if(shop.memberseq == 0){
            alert("로그인이 필요합니다.");
            return;
        }
        setMenu("좋아요 핫집");
        let searchShop = {...shop, myyn:'N', mythankyn:'Y'};

        getShopList(searchShop).then(result => {
            if(result.status == 200){
                setShopList(result.data);
            } else {
                console.log(result.status);
            }
        });
    }
    
    useEffect(() => {
        onLoading();
        if(inView && more){
          let paging = {...shop, offset : offset + moreCnt};
          getShopList(paging).then(res => {
            if(res.status == 200){
                setShopList([...shopList, ...res.data]);  
                if(res.data.length < moreCnt){
                    setMore(false);
                }
            }
          })
          setOffset(offset + moreCnt);
        }
        offLoading();
    }, [inView])

    const inactive = () =>{
        if(confirm("진짜 탈퇴할겁니까?")){
            if(disableInfo.seq > 0){
                console.log("dd");
                disableMember(disableInfo).then(res => {
                    if(res.status == 200){
                        logout().then(res => {
                            setLoginInfo(null);
                        })
                        alert("탈퇴 완료.");
                        location.href = '/';
                    }
                })
            } else {
                alert("회원 정보가 없습니다.");
            }
            
        }
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <BrowserView>
                <div className="navi-left">
                    <ul className="menu">
                        <li>
                            <a onClick={myShop} style={{cursor:"pointer"}}>등록한 핫집</a>
                        </li>
                        <li>
                            <a onClick={myThankShop} style={{cursor:"pointer"}}>좋아요 핫집</a>
                        </li>
                        
                        <li>
                            <a onClick={(e) => setDisable(true)} style={{cursor:"pointer"}}>회원 탈퇴</a>
                        </li>
                        
                    </ul>
                </div>
                <div className="contents60" style={{marginTop:"100px"}}>
                    <div className="my-contents">
                        <h1 style={{color:"#FF7012"}}>{menu}</h1>
                        <div className="shop-list">
                            {
                                shopList ? shopList.map((shop, index) => (
                                    <React.Fragment key={index}>
                                        {
                                        shopList.length-1 == index?
                                        <div className="shop" onClick={(e) => {location.href="/shop/view/"+shop.seq}} ref={ref}>
                                        <div className="contents-area">
                                            <div>
                                                <span className="title">{shop.title}</span>
                                                <span className="category">{shop.categoryname}</span>
                                            </div>
                                            <div>
                                                <Rating
                                                name="rating"
                                                value={shop.rating}
                                                precision={0.5}
                                                size="small"
                                                disabled
                                                />
                                                <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>{shop.rating}</span>
                                                
                                            </div>
                                            <div className="content">
                                                {shop.content}
                                            </div>
                                            <div>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.views}
                                                </IconButton>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <CommentIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.reviews}
                                                </IconButton>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.thanks}
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="image-area">
                                            <span className="image-view">
                                                {
                                                    shop.thumbnail ? 
                                                    <img src={shop.thumbnail} />
                                                    :   <span>NO IMAGE</span>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                        :
                                        <div className="shop" onClick={(e) => {location.href="/shop/view/"+shop.seq}}>
                                            <div className="contents-area">
                                                <div>
                                                    <span className="title">{shop.title}</span>
                                                    <span className="category">{shop.categoryname}</span>
                                                </div>
                                                <div>
                                                    <Rating
                                                    name="rating"
                                                    value={shop.rating}
                                                    precision={0.5}
                                                    size="small"
                                                    disabled
                                                    />
                                                    <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>{shop.rating}</span>
                                                    
                                                </div>
                                                <div className="content">
                                                    {shop.content}
                                                </div>
                                                <div>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.views}
                                                    </IconButton>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <CommentIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.reviews}
                                                    </IconButton>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.thanks}
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="image-area">
                                                <span className="image-view">
                                                    {
                                                        shop.thumbnail ? 
                                                        <img src={shop.thumbnail} />
                                                        :   <span>NO IMAGE</span>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        }
                                    </React.Fragment>
                                    
                                ))
                                :null
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </BrowserView>
            {/* 모바일 페이지 */}
            <MobileView>
            <div className="contents90 mobile" style={{marginTop:"60px"}}>
                    <div className="my-contents">
                        <div>
                            <h1 style={{color:"#FF7012", display:"inline-block"}}>{menu}</h1>
                            <IconButton onClick={openSort} style={{height: "76px", float:"right"}}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="search-sort"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={closeSort}
                                >
                                <MenuItem onClick={(e) => {myShop(); closeSort();}} selected={menu === '등록한 핫집'}>등록한 핫집</MenuItem>
                                <MenuItem onClick={(e) => {myThankShop(); closeSort();}} selected={menu.order === '좋아요 핫집'}>좋아요 핫집</MenuItem>
                                <MenuItem onClick={(e) => {setDisable(true); closeSort();}} selected={menu.order === '회원 탈퇴'}>회원 탈퇴</MenuItem>
                            </Menu>
                        </div>
                        
                        <div className="shop-list">
                            {
                                shopList ? shopList.map((shop, index) => (
                                    <React.Fragment key={index}>
                                        {
                                        shopList.length-1 == index?
                                        <div className="shop" onClick={(e) => {location.href="/shop/view/"+shop.seq}} ref={ref}>
                                        <div className="contents-area">
                                            <div>
                                                <span className="title">{shop.title}</span>
                                                <span className="category">{shop.categoryname}</span>
                                            </div>
                                            <div>
                                                <Rating
                                                name="rating"
                                                value={shop.rating}
                                                precision={0.5}
                                                size="small"
                                                disabled
                                                />
                                                <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>{shop.rating}</span>
                                                
                                            </div>
                                            <div className="content">
                                                {shop.content}
                                            </div>
                                            <div>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.views}
                                                </IconButton>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <CommentIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.reviews}
                                                </IconButton>
                                                <IconButton style={{fontSize:"17px"}}>
                                                    <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                                    {shop.thanks}
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="image-area">
                                            <span className="image-view">
                                                {
                                                    shop.thumbnail ? 
                                                    <img src={shop.thumbnail} />
                                                    :   <span>NO IMAGE</span>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                        :
                                        <div className="shop" onClick={(e) => {location.href="/shop/view/"+shop.seq}}>
                                            <div className="contents-area">
                                                <div>
                                                    <span className="title">{shop.title}</span>
                                                    <span className="category">{shop.categoryname}</span>
                                                </div>
                                                <div>
                                                    <Rating
                                                    name="rating"
                                                    value={shop.rating}
                                                    precision={0.5}
                                                    size="small"
                                                    disabled
                                                    />
                                                    <span style={{fontSize:"20px", color: '#ED4C00', marginLeft:"10px"}}>{shop.rating}</span>
                                                    
                                                </div>
                                                <div className="content">
                                                    {shop.content}
                                                </div>
                                                <div>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <VisibilityIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.views}
                                                    </IconButton>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <CommentIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.reviews}
                                                    </IconButton>
                                                    <IconButton style={{fontSize:"17px"}}>
                                                        <FavoriteIcon style={{width:"20px", height:"20px"}} />
                                                        {shop.thanks}
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="image-area">
                                                <span className="image-view">
                                                    {
                                                        shop.thumbnail ? 
                                                        <img src={shop.thumbnail} />
                                                        :   <span>NO IMAGE</span>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        }
                                    </React.Fragment>
                                    
                                ))
                                :null
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </MobileView>
            <Footer />
            {
                disable?
                <div id="disableDim">
                    <div className="disablePop">
                        <div className="image_area">
                            <img src={disableImage} style={{maxWidth:"100%"}}/>
                        </div>
                        <TextField
                            id="reason"
                            label="탈퇴 사유"
                            style={{ margin: 8 }}
                            placeholder="탈퇴 사유"
                            helperText=""
                            fullWidth
                            margin="normal"
                            value={disable.reason}
                            inputProps = {{
                                maxLength: 30,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange = {(e) => setDisableInfo({...disableInfo, reason : e.target.value})}
                            style={{marginRight:"10px"}}
                        />
                        <div className="btn_area">
                            <Button variant="contained" onClick={(e) => setDisable(false)} style={{backgroundColor:'red', color:'#fff', width:"80%", height:"40px", fontSize:"20px", marginRight:"10px"}}>닫 기</Button>
                            <Button variant="contained" onClick={(e) => inactive()} style={{backgroundColor:'black', color:'#fff', width:"5%", height:"10px", fontSize:"10px", float:"right"}}>탈퇴</Button>
                        </div>
                    </div>
                </div>
                : null
            }
            
        </React.Fragment>
    );
}
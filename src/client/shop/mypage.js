import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginInfo, getShopList, onLoading, offLoading} from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import ReorderIcon from '@material-ui/icons/Reorder';
import { useInView } from 'react-intersection-observer';
import Footer from './footer';
import Header from './header';

const useStyles = makeStyles((theme) => ({
    
}));

export default function MyPage() {
    const classes = useStyles();
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState(null);
    const [shopList, setShopList] = useState([]);
    const [menu, setMenu] = useState("마이 핫집");
    const [shop, setShop] = useState({
        memberseq : 0,
        myyn : 'Y',
        mythankyn : 'N',
        order : 'regdate',
        limit : 10,
        offset : 0
    });

    //페이징
    const [ref, inView] = useInView();
    const [offset, setOffset] = useState(0);
    const moreCnt = 10;
    const [more, setMore] = useState(true);

    useEffect(() => {
        onLoading();
        getLoginInfo().then(res => {
            if(res.status == 200){
                if(res.data.seq > 0){
                    setLoginInfo(res.data);
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
        setMenu("마이 핫집");
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

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <div className="navi-left">
                <ul className="menu">
                    <li>
                        <a onClick={myShop} style={{cursor:"pointer"}}>마이 핫집</a>
                    </li>
                    <li>
                        <a onClick={myThankShop} style={{cursor:"pointer"}}>좋아요 핫집</a>
                    </li>
                    
                    <li>
                        <a style={{cursor:"pointer"}}>회원 탈퇴</a>
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
            <Footer />
        </React.Fragment>
    );
}
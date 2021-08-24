import React, {useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getLoginInfo, getShopOne, onLoading, offLoading, shopAction, getShopThankLog, insertShopThankLog, deleteShopThankLog, getShopImageList, getReviewList, insertShopReview, updateShopReview, getReviewCount } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './footer';
import Header from './header';
import Rating from '@material-ui/lab/Rating';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DoneIcon from '@material-ui/icons/Done';

import Review from './review';
import Zoom from './zoom';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '70px auto',
      width: '90%'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    property: {
        marginRight: "15px",
        fontSize: "20px",
    },
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
    preview: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width:"50%",
        height:"50px"
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}));

export default function View() {
    const classes = useStyles();
    const { seq } = useParams(); //객체 형태의 params 에서 키가 seq인 값을 가져옴
    const [shop, setShop] = useState(null);
    const [thank, setThank] = useState(false);
    const [imageList, setImageList] = useState([]);
    const viewSlider = useRef();
    const [loginInfo, setLoginInfo] = useState(null);
    const [reviewList, setReviewList] = useState([]);
    const [reviewImageList, setReviewImageList] = useState([]);
    const [previewList, setPreviewList] = useState([]);
    const [index, setIndex] = useState();
    const [zoomList, setZoomList] = useState([]);

    const slickSetting = {
        dots : true,
        infinite : true,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1
    }

    const [review, setReview] = useState({
        shopseq : seq,
        memberseq : 0,
        membername : '',
        comment : '',
        rating : 0.0
    })

    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    useEffect(() => {
        //조회수 ++
        var upViews = {seq : seq, property : "views", action : "plus"};
        shopAction(upViews).then(res => {
            onLoading();
            
            if(res.status == 200){
                getShopOne(seq).then(result => {
                    if(result.status == 200){
                        setShop(result.data[0]);
                        drawMap(result.data[0].address);
                        getShopImageList(seq).then(imgResult => {
                            if(imgResult.status == 200 && imgResult.data.length > 0){
                                setImageList(imgResult.data);
                            }
                        })
                        
                    } else {
                        console.log(result.status);
                    }
                    
                })
            }
            offLoading();
        });

        getLoginInfo().then(res => {
            if(res.status == 200){
                if(res.data != '' && res.data != null && res.data != undefined){
                    setLoginInfo(res.data);
                    setReview({...review, memberseq : res.data.seq, membername : res.data.name});
                    getShopThankLog(res.data.seq, seq).then(result => {
                    if(result.status == 200){
                        if(result.data.length > 0){
                            setThank(true);
                        }
                    }
                })
                }
                
            }
        })

        getReviewList(seq).then(res => {
            if(res.status == 200){
                setReviewList(res.data);
            }
        })

    }, []);

    const drawMap = (address) => {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

                var options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new kakao.maps.LatLng(coords.La, coords.Ma), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };

                var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                //var infowindow = new kakao.maps.InfoWindow({
                //    content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
                //});
                //infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
    
        });   
        
    }

    const closeImageLayer = () => {
        document.getElementById("viewImageDim").classList.remove("on");
    }

    const openImageLayer = (idx) => {
        viewSlider.current.slickGoTo(idx);
        document.getElementById("viewImageDim").classList.add("on");
    }

    const increaFavorit = () => {
        if(loginInfo){
            onLoading();
            let log = {
                memberseq : loginInfo.seq,
                shopseq : shop.seq
            }
            insertShopThankLog(log).then(res => {
                if(res.status == 200){
                    setThank(true);

                    //let upThanks = {seq : seq, property : "thanks", action : "plus"};

                    //shopAction(upThanks).then(propertyRes => {
                     //   if(propertyRes.status==200){
                            getShopOne(seq).then(result => {
                                if(result.status==200){
                                    setShop({...shop, thanks : result.data[0].thanks});
                                }
                            })
                       // }
                   // })
                }
            })
            offLoading();
        } else {
            alert("로그인이 필요합니다.");
        }
    }

    const decreaFavorit = () => {
        onLoading();
        deleteShopThankLog(loginInfo.seq, shop.seq).then(res => {
            if(res.status == 200){
                setThank(false);

                //let downThanks = {seq : seq, property : "thanks", action : "minus"};
                //shopAction(downThanks).then(propertyRes => {
                  //  if(propertyRes.status==200){
                        getShopOne(seq).then(result => {
                            if(result.status==200){
                                setShop({...shop, thanks : result.data[0].thanks});
                            }
                        })
                    //}
                //})
            }
        })
        offLoading()
    }

    const addReview = () => {
        if(!loginInfo){
            alert("로그인이 필요합니다.");
            return;
        }

        getReviewCount(loginInfo.seq, shop.seq).then(res => {
            if(res.status == 200){
                if(res.data[0].count > 0){
                    alert("이미 리뷰를 남긴 맛집입니다.");
                } else {
                    document.getElementById("insertReview").style.display = "block";
                }
            }
        })

        
    }

    const registReview = () => {
        if(review.memberseq == undefined || review.memberseq == null || review.memberseq == 0){
            alert("멤버 정보 에러");
            return;
        }
        if(review.membername == undefined || review.membername == null || review.membername == ''){
            alert("멤버 정보 에러");
            return;
        }
        if(review.rating == undefined || review.rating == null || review.rating == 0.0){
            alert("평점을 입력해주세요.");
            return;
        }
        if(review.comment == undefined || review.comment == null || review.comment == ''){
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        insertShopReview(review).then(res => {
            if(res.status == 200) {
                location.reload();
            }
        })
    }

    const uploadImages = (files) => {
        setReviewImageList(files);
        
        //이미지 미리보기 세팅
        if(files.length > 0){
            let reader;
            let arrayTemp = new Array();
            for(var i=0; i<files.length; i++){
                reader = new FileReader();
                reader.onload = function(e) {
                    arrayTemp.push(e.target.result)
                    setPreviewList([...arrayTemp])
                }
                reader.readAsDataURL(files[i]);
            }
            
        }
    }

    const openZoom = async (list, index) => {
        await setZoomList([...list]);
        await setIndex(index);
    }

    const getZoomList = () => {
        return zoomList;
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <div className="contents70" style={{marginTop:"100px"}}>
                {
                    shop ? <div>
                    <div className="shop-header">
                        <div>
                            <span class="title">{shop.title}</span>
                            {
                                thank? 
                                <span id="favoritBtn" className="favorit on" onClick={decreaFavorit}>
                                    <FavoriteIcon style={{width:"50px", height:"50px"}}/><br></br>
                                    <span style={{fontWeight:"bold"}}>좋아요</span>
                                </span> 
                                : <span id="favoritBtn" className="favorit" onClick={increaFavorit}>
                                    <FavoriteBorderIcon style={{width:"50px", height:"50px"}}/><br></br>
                                    <span style={{fontWeight:"bold"}}>좋아요</span>
                                </span>
                            }
                            <br></br>
                            <Rating
                            name="rating"
                            value={shop.rating}
                            precision={0.5}
                            disabled
                            />
                            <span style={{fontSize:"25px", color: '#ED4C00', marginLeft:"10px"}}>{shop.rating}</span>
                        </div>
                        <div style={{color:"#9b9b9b", marginTop:"13px"}}>
                            <span className={classes.property}>
                                <VisibilityIcon fontSize="small" />{" "}
                                {shop.views}
                            </span>
                            <span className={classes.property}>
                                <CommentIcon fontSize="small" />{" "}
                                {shop.reviews}
                            </span>
                            <span className={classes.property}>
                                <FavoriteIcon fontSize="small" />{" "}
                                {shop.thanks}
                            </span>
                        </div>
                    </div>
                    <div className="shop-body">
                        <table className="table-view" style={{display:"inline-block"}}>
                            <colgroup>
                                <col width="40%" />
                                <col width="*" />
                            </colgroup>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="column">음식 종류</td>
                                    <td>{shop.categoryName}</td>
                                </tr>
                                <tr>
                                    <td className="column">주소</td>
                                    <td>{shop.address} {shop.addressdetail}</td>
                                </tr>
                                <tr>
                                    <td className="column">가격대</td>
                                    <td>{shop.price}</td>
                                </tr>
                                <tr>
                                    <td className="column">추천 메뉴</td>
                                    <td>{shop.menu}</td>
                                </tr>
                                <tr>
                                    <td className="column">설명</td>
                                    <td className="content">{shop.content}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="map" style={{backgroundColor:"green", width:"45%", height:"350px", float:"right", display:"inline-block"}}></div>
                        <br></br>
                        {
                            imageList.length > 0 ? 
                            <div className="imageArea">
                                <Slider {...slickSetting}>
                                {
                                    imageList.map((image, idx) => {
                                        return(
                                            <img src="https://source.unsplash.com/random" onClick={(e) => openImageLayer(idx)}/>
                                        );
                                    }) 
                                }
                                </Slider>
                            </div> : null
                        }
                    </div>
                    <div className="shop-review">
                        <div className="review-title">
                            <span style={{fontSize:"25px", fontWeight:"bold", marginRight:"50px"}}>리뷰 ({shop.reviews})</span>
                            <span style={{float: "right"}}>
                                <span style={{fontSize:"20px", fontWeight:"bold"}}>
                                    평점 {" "} 
                                    <Rating
                                    name="averageRating"
                                    value={shop.avgRating}
                                    precision={0.1}
                                    disabled
                                    size="small"
                                    />
                                    <span style={{color: '#ED4C00', marginLeft:"10px"}}>{shop.avgRating}</span>
                                </span>
                                <span className="addReview" onClick={addReview}>
                                    <CommentIcon style={{width:"30px", height:"30px"}}/><br></br>
                                    <span style={{fontWeight:"bold"}}>리뷰 쓰기</span>
                                </span>
                            </span>
                        </div>
                        {
                            loginInfo ?
                                <div id="insertReview" className="review" style={{display:"none"}}>
                                    <div className="review-profile">
                                        <Avatar src={loginInfo.profile} className={classes.large} style={{margin:"0 auto"}} />
                                        <br></br>
                                        <span style={{fontWeight:"bold"}}>{loginInfo.name}</span>
                                    </div>
                                    <div className="review-content">
                                        <div className="date">
                                            {/* <span style={{marginRight:"10px"}}>{today}</span> */}
                                            <Rating
                                                name=""
                                                value={review.rating}
                                                precision={0.5}
                                                size="small"
                                                onChange = {(e) => setReview({...review, rating : e.target.value})}
                                                style={{marginRight:"5px"}}
                                            />
                                            <span style={{color: "#FF7012", marginRight: "20px"}}>{review.rating}</span>
                                            <span className="caution">* 등록 이후에는 평점 수정이 불가능합니다.</span>
                                        </div>
                                        <div className="content">
                                            <TextField
                                                id=""
                                                label="리뷰"
                                                multiline
                                                variant="filled"
                                                rows={6}
                                                placeholder="리뷰를 입력해주세요."
                                                fullWidth
                                                onChange = {(e) => setReview({...review, comment : e.target.value})}
                                            />
                                        </div>
                                        <div className="footer">
                                            <input
                                                accept="image/*"
                                                className="hidden"
                                                id="attach"
                                                multiple
                                                type="file"
                                                onChange={(e) => uploadImages(e.target.files)}
                                            />
                                            <label htmlFor="attach">
                                                <span className="attach">
                                                    <AttachmentIcon style={{width:"30px", height:"30px"}}/><br></br>
                                                    <span style={{fontWeight:"bold", fontSize:"14px"}}>이미지 첨부</span>
                                                </span>
                                            </label>
                                            {
                                                previewList ? 
                                                <span className="reviewImageArea">
                                                    {previewList.map((preview, index) => {
                                                        if(index < 3){
                                                            return(<span className="reviewImage" onClick={(e) => openZoom(previewList, index)}>
                                                            <img src={preview} />
                                                            {
                                                                previewList.length > 3?
                                                                <span className="more">
                                                                    <span>+{previewList.length-3}</span>
                                                                </span>
                                                                : null
                                                            }
                                                            </span>)
                                                        }
                                                    }
                                                        
                                                    )}
                                                </span>
                                                : null
                                            }
                                            <span className="done" onClick={registReview}>
                                                <DoneIcon style={{width:"30px", height:"30px"}}/><br></br>
                                                <span style={{fontWeight:"bold", fontSize:"14px"}}>등록</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
                        
                        {
                            reviewList ? reviewList.map(review => {
                                return(
                                    <Review 
                                        review={review}
                                        setReviewList={setReviewList}
                                        setShop={setShop}
                                        memberseq={loginInfo? loginInfo.seq : 0}
                                    />
                                )
                            })
                            : null
                        }
                    </div>
                </div>: null
                }
            </div>
            <br></br>
            <Footer />
            <div id="viewImageDim">
                <div className="viewImageBox">
                    <span className="viewImageClose" onClick={closeImageLayer}><CloseIcon style={{width: "50px", height: "50px"}}/></span>
                    <div style={{position:"relative"}}>
                        <Slider ref={viewSlider} {...slickSetting}>
                            {
                                imageList ? imageList.map((image, idx) => {
                                    return(
                                        <img src="https://source.unsplash.com/random" />
                                    );
                                }) : null
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            <Zoom idx={index} imageList={zoomList} getZoomList={getZoomList} />
        </React.Fragment>
    );
}
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from "@material-ui/icons/Search";
import Rating from '@material-ui/lab/Rating';
import { TextField, InputAdornment, InputLabel, FormControl, Select, Button} from "@material-ui/core";
import { getShopList, getLoginInfo, onLoading, offLoading, getCityList} from '../../action/action';
import defaultThumb from '../../../images/default_thumb.png';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import Header from './header';
import $ from 'jquery';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(6),
        minWidth: 120,
    },
    formControl_M: {
        marginRight: theme.spacing(2),
        marginBottom : theme.spacing(2),
        minWidth: 89,
        maxWidth: 100,
    },
    searchArea: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        position: 'fixed',
        zIndex:"1100",
        backgroundColor:"#fafafa",
        top:"63px",
        width:"100%",
    },
    footer_thumb : {
        height:"200px",
    },
    cardContent : {
        padding:"16px 16px 5px 16px",
    },
    goButton : {
        float : "right",
        width : "150px",
        height : "40px",
        color: "#FF7012",
    },  
  }));

const states = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

let globalMarkerList = new Array();
let globalOverlayList = new Array();
let globalClusterer;

export default function Map() {
    const [shopList, setShopList] = useState([]);
    const classes = useStyles();
    const [loginInfo, setLoginInfo] = useState(null);
    const [shop, setShop] = useState({
        state : '서울',
        city : 'all',
        categoryseq : 0,
        search : '',
        order : 'regdate',
        limit : 9,
        offset : 0,
        memberseq : 0,
        limityn : 'N'
        
    });
    const [categoryList, setCategoryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [globalMap, setGlobalMap] = useState(null);

    const [mapInfo, setMapInfo] = useState({
        minLa : 0.0,
        minMa : 0.0,
        maxLa : 0.0,
        maxMa : 0.0,
        centerLa : 127.06513366986843,
        centerMa : 37.493151302091796
    })

    let initMapLevel = 7;

    if(isMobile){
        initMapLevel = 8;
    }

    const [popShop, setPopShop] = useState(null);

    useEffect(() => {
        drawMap();
        if(mapInfo.minLa > 0.0){
            let newShop = {...shop, ...mapInfo}
            getShopList(newShop).then(res => {
                if(res.status == 200){
                    setShopList(res.data);
                    drawMarkerOverlay(res.data);
                }
            })
        }

    }, [mapInfo.centerLa]);

    
    useEffect(() => {
        if(mapInfo.minLa > 0.0){
            let newShop = {...shop, ...mapInfo}
            getShopList(newShop).then(res => {
                if(res.status == 200){
                    setShopList(res.data);
                    drawMarkerOverlay(res.data);
                }
            })
        }
        if(shop.state != ''){
            setCityList(getCityList(shop.state));
        }

        if(shop.categoryseq == 0 && shop.search == ''){
            goCityCoords(shop.state, shop.city);
        }
    }, [shop.state, shop.city, shop.categoryseq]);

    const drawMap = () => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var coords = new kakao.maps.LatLng(mapInfo.centerMa, mapInfo.centerLa);

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(coords.La, coords.Ma), //지도의 중심좌표.
            level: initMapLevel //지도의 레벨(확대, 축소 정도)
        };
        if(globalMap == null || globalMap == undefined){
            let map = new kakao.maps.Map(container, options)
            setGlobalMap(map);

            //위치 변경(타일이 로드될때) 이벤트 등록
            kakao.maps.event.addListener(map, 'tilesloaded', function() {             
                
                // 지도 영역정보를 얻어옵니다 
                var bounds = map.getBounds();
                
                // 영역정보의 남서쪽 정보를 얻어옵니다 
                var swLatlng = bounds.getSouthWest();
                
                // 영역정보의 북동쪽 정보를 얻어옵니다 
                var neLatlng = bounds.getNorthEast();

                // 지도의 중심좌표를 얻어옵니다
                var latlng = map.getCenter();
                setMapInfo({minLa : swLatlng.La, minMa: swLatlng.Ma, maxLa : neLatlng.La, maxMa : neLatlng.Ma, centerLa:latlng.getLng(), centerMa:latlng.getLat()});
            });

            //맨처음 한번 그려주기
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            // 지도의 현재 레벨을 얻어옵니다
            var level = map.getLevel();
                
            // 지도 영역정보를 얻어옵니다 
            var bounds = map.getBounds();
            
            // 영역정보의 남서쪽 정보를 얻어옵니다 
            var swLatlng = bounds.getSouthWest();
            
            // 영역정보의 북동쪽 정보를 얻어옵니다 
            var neLatlng = bounds.getNorthEast();

            // 지도의 중심좌표를 얻어옵니다
            var latlng = map.getCenter();
            setMapInfo({minLa : swLatlng.La, minMa: swLatlng.Ma, maxLa : neLatlng.La, maxMa : neLatlng.Ma, centerLa:latlng.getLng(), centerMa:latlng.getLat()});
        }
        
        
    }

    const drawMarkerOverlay = (markerList) => {
        var level = globalMap.getLevel();
        var clustererLevel = 10;   

        // 기존 클러스터러 삭제
        if(globalClusterer != null && globalClusterer != undefined){
            globalClusterer.clear()
        }

        // 마커 클러스터러를 생성합니다 
        globalClusterer = new kakao.maps.MarkerClusterer({
            map: globalMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: clustererLevel // 클러스터 할 최소 지도 레벨 
        });

        //기존 마커, 오버레이 삭제
        if(globalMarkerList.length > 0){
            globalMarkerList.map((preMarker) => {
                preMarker.setMap(null);
            })
            globalMarkerList = new Array();
        }
        if(globalOverlayList.length > 0){
            globalOverlayList.map((preOverLay) => {
                preOverLay.setMap(null);
            })
            globalOverlayList = new Array();
        }
        //마커, 오버레이 생성
        for(var i=0; i<markerList.length; i++){
            var markerCoords = new kakao.maps.LatLng(markerList[i].coordX, markerList[i].coordY);

            if(level < clustererLevel){    //클러스터가 없을때만
                //마커 생성
                
                
                var marker = new kakao.maps.Marker({
                    map: globalMap,
                    position: markerCoords
                });
                
                globalMarkerList.push(marker);

                //오버레이 생성
                var content = '';
                if(isMobile){
                    content += '<div class="overlay_wrap" onclick="setPopShopInfo(\'' 
                    + markerList[i].title + '\', \'' 
                    + markerList[i].thumbnail + '\', \'' 
                    + markerList[i].categoryName + '\', \'' 
                    + markerList[i].address + '\', \'' 
                    + markerList[i].addressdetail + '\', \'' 
                    + markerList[i].rating + '\', \'' 
                    + markerList[i].views + '\', \'' 
                    + markerList[i].reviews + '\', \'' 
                    + markerList[i].thanks + '\');openPopFooter();">';
                } else {
                    content += '<div class="overlay_wrap" onmouseenter="overlayEnter(this,'+i+')" onmouseleave="overlayOut(this,'+i+')">';
                }
                    
                    content +=  '    <div class="info">';
                    content +=  '        <div class="title">';
                    content +=  '            ' + markerList[i].title + ' <span class="rating">' + markerList[i].rating + '</span>';
                                //'            <div class="close" onclick="closeOverlay('+i+')" title="닫기"></div>' + 
                    content +=  '        </div>';
                    content +=  '        <div class="body">'; 
                    content +=  '            <div class="img">';
                    content +=  '                <img src="' + markerList[i].thumbnail + '" width="73" height="70">';
                    content +=  '           </div>';
                    content +=  '            <div class="desc">';
                    content +=  '                <div class="ellipsis">' + markerList[i].address + ' ' +markerList[i].addressdetail + '</div>';
                    content +=  '                <div class="jibun ellipsis">' + markerList[i].categoryName + '</div>';
                    content +=  '                <div><a href="/shop/view/' + markerList[i].seq + '" target="_blank" class="link">보러가기</a></div>';
                    content +=  '            </div>';
                    content +=  '        </div>';
                    content +=  '    </div>';  
                    content +=  '</div>';
                // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                var overlay = new kakao.maps.CustomOverlay({
                    content: content,
                    map: globalMap,
                    position: markerCoords       
                });

                globalOverlayList.push(overlay);

                // 마커 클릭 이벤트
                kakao.maps.event.addListener(marker, 'click', function() {
                    alert("ddd");
                    console.log(marker);
                    //overlay.setMap(globalMap);
                    
                });

                
                
            }

            //마커 클러스터러
            var clustererOne = new kakao.maps.Marker({
                position : markerCoords
            })
            globalClusterer.addMarker(clustererOne);
        }
        
        //globalClusterer.redraw();
        //END 마커, 오버레이 생성
    }

    const goCityCoords = async (state, city) => {
        var address = state + " " + city;
        var geocoder = new kakao.maps.services.Geocoder();

        if(state != '' && city != '' && city != 'all'){
            geocoder.addressSearch(address, function(result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    
                    if(globalMap != null && globalMap != undefined){
                        globalMap.panTo(coords);
                    }
                } 
        
            }); 
        }

        if(state != '' && (city != '' || city != 'all')){
            var coords;
            var zoom;
            switch(state) {
                case "서울" :
                    coords = new kakao.maps.LatLng(37.49676964823935, 127.02931156685436);
                    zoom = 7;
                    break;
                case "부산" :
                    coords = new kakao.maps.LatLng(35.142185319449396, 129.16218740388842);
                    zoom = 8;
                    break;
                case "대구" :
                    coords = new kakao.maps.LatLng(35.85241902830652, 128.63639296608517);
                    zoom = 7;
                    break;
                case "인천" :
                    coords = new kakao.maps.LatLng(37.44729016900553, 126.72326082893646);
                    zoom = 6;
                    break;
                case "광주" :
                    coords = new kakao.maps.LatLng(35.14528411067406, 126.89526651613156);
                    zoom = 7;
                    break;
                case "대전" :
                    coords = new kakao.maps.LatLng(36.341524359101896, 127.40742511449453);
                    zoom = 6;
                    break;
                case "울산" :
                    coords = new kakao.maps.LatLng(35.53236300528933, 129.33081882392827);
                    zoom = 6;
                    break;
                case "세종" :
                    coords = new kakao.maps.LatLng(36.496259352233636, 127.32992707846697);
                    zoom = 7;
                    break;
                case "경기" :
                    coords = new kakao.maps.LatLng(37.41254069289627, 127.35947693436074);
                    zoom = 10;
                    break;
                case "강원" :
                    coords = new kakao.maps.LatLng(37.655687475437915, 128.61968101071565);
                    zoom = 10;
                    break;
                case "충북" :
                    coords = new kakao.maps.LatLng(36.822777448927276, 127.87891767619114);
                    zoom = 9;
                    break;
                case "충남" :
                    coords = new kakao.maps.LatLng(36.50247529629362, 126.95731583164535);
                    zoom = 9;
                    break;
                case "전북" :
                    coords = new kakao.maps.LatLng(35.7179925984233, 127.3948550712394);
                    zoom = 10;
                    break;
                case "전남" :
                    coords = new kakao.maps.LatLng(34.823118785202034, 127.23942913441141);
                    zoom = 10;
                    break;
                case "경북" :
                    coords = new kakao.maps.LatLng(36.36553686080059, 128.97969700349105);
                    zoom = 10;
                    break;
                case "경남" :
                    coords = new kakao.maps.LatLng(35.259838299285136, 128.55723328709885);
                    zoom = 10;
                    break;
                case "제주" :
                    coords = new kakao.maps.LatLng(33.33814660087908, 126.69699859000352);
                    zoom = 9;
                    break;
                    
            }
            if(globalMap != null && globalMap != undefined){
                globalMap.panTo(coords);
                globalMap.setLevel(zoom);

            }
        }
          
    }

    const goShopPlace = (shop) => {
        if(globalMap != null && globalMap != undefined){
            globalMap.panTo(new kakao.maps.LatLng(shop.coordX, shop.coordY));
        }
    }

    const sideShopEnter = (idx) => {
        document.getElementsByClassName("overlay_wrap")[idx].parentNode.style.zIndex = "";
        document.getElementsByClassName("overlay_wrap")[idx].style.zIndex = 999;
        document.getElementsByClassName("overlay_wrap")[idx].querySelector('.info').style.border = '1px solid #FF7021';
    }

    const sideShopLeave = (idx) => {
        document.getElementsByClassName("overlay_wrap")[idx].parentNode.style.zIndex = 0;
        document.getElementsByClassName("overlay_wrap")[idx].style.zIndex = "";
        document.getElementsByClassName("overlay_wrap")[idx].querySelector('.info').style.border = '';
    }

    

    const closePopFooter = () => {
        document.getElementById("pop-cal").classList.add("off");
        setTimeout(function(){
            document.getElementById("pop-cal").classList.remove("on");
        },500);
    }

    return (
        <React.Fragment>
            <BrowserView>
                <div className="map_wrap">
                    <div className="header_top">
                        <h2>
                            <span className="bold">핫한 푸드, 푸핫</span>
                            <span className="sub">Hot Food :)</span>
                        </h2>
                    </div>
                    <div className="header_nav">
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="search-area">지역</InputLabel>
                                <Select
                                    native
                                    value={shop.state}
                                    label="지역"
                                    labelId="search-area"
                                    onChange={(e) => setShop({...shop, state : e.target.value})}
                                >
                                    {
                                    states.map((state) => {
                                        return(
                                        <option value={state}>{state}</option>
                                        )
                                    })
                                    } 
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="search-city">도시</InputLabel>
                                <Select
                                    native
                                    value={shop.city}
                                    label="도시"
                                    labelId="search-city"
                                    onChange={(e) => setShop({...shop, city : e.target.value})}
                                >
                                    <option value='all'>전체</option>
                                    {
                                    cityList.map((city) => {
                                        return(
                                        <option value={city}>{city}</option>
                                        )
                                    })
                                    } 
                                </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                <InputLabel id="search-category">음식</InputLabel>
                                <Select
                                    native
                                    value={shop.categoryseq}
                                    label="음식"
                                    labelId="search-category"
                                    onChange={(e) => setShop({...shop, categoryseq : e.target.value})}
                                >
                                    <option value={0}>전체</option>
                                    {
                                    categoryList.map((category) => {
                                        return(
                                        <option value={category.seq}>{category.name}</option>
                                        )
                                    })
                                    }
                                </Select>
                                </FormControl>
                                <TextField
                                label="검색"
                                onChange={(e) => setShop({...shop, search : e.target.value})}
                                onKeyPress = {(e) => {
                                    if(e.key == 'Enter'){
                                        getShopList(shop).then(res => {
                                        onLoading();
                                        if(res.status == 200){
                                            setShopList(res.data);
                                            if(res.data.length > 0){
                                                goShopPlace(res.data[0]);
                                            } else {
                                                alert("검색 결과가 없습니다.")
                                            }
                                        }
                                        offLoading();
                                        });
                                        
                                    }
                                    }
                                }
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle search"
                                            edge="end"
                                            onClick={(e) => getShopList(shop).then(res => {
                                                onLoading();
                                                if(res.status == 200){
                                                    setShopList(res.data);
                                                    if(res.data.length > 0){
                                                        goShopPlace(res.data[0]);
                                                    } else {
                                                        alert("검색 결과가 없습니다.")
                                                    }
                                                }
                                                offLoading();
                                            })}
                                        >
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                />
                        </div>
                    </div>
                    <div className="map_body">
                        <div className="map_side">
                            <ul>
                                
                                {
                                    shopList? shopList.map((shop, index) => (
                                        <li>
                                            <a href={`/shop/view/${shop.seq}`} target="_blank">
                                                <div className="side_shop" onMouseEnter={(e) => sideShopEnter(index)} onMouseLeave={(e) => sideShopLeave(index)}>
                                                    <CardMedia
                                                        className="thumb"
                                                        image={shop.thumbnail ? shop.thumbnail:defaultThumb}
                                                        title={shop.title}
                                                    />
                                                    <CardContent className="info">
                                                        <Typography gutterBottom variant="h6" component="h3" style={{whiteSpace:"nowrap", overflow : "hidden", textOverflow : "ellipsis"}}>
                                                            {shop.title}
                                                        </Typography>
                                                        <Typography style={{fontSize:"0.8rem"}}>
                                                            {shop.categoryName}
                                                        </Typography>
                                                        <Typography style={{fontSize:"0.8rem"}}>
                                                            {shop.address}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions className="footer">
                                                        {
                                                            shop.thankyn == 'already' ?
                                                            <IconButton className="favoritList on" aria-label="add to favorites">
                                                            <FavoriteIcon />
                                                            {shop.thanks}
                                                            </IconButton>
                                                            : 
                                                            <IconButton className="favoritList" aria-label="add to favorites">
                                                            <FavoriteIcon />
                                                            {shop.thanks}
                                                            </IconButton>
                                                        }
                                                        <Rating
                                                            name="rating"
                                                            value={shop.rating}
                                                            precision={0.5}
                                                            disabled
                                                            size="small"
                                                            style={{float:"right"}}
                                                        />
                                                        <span style={{color:"#FF7012", fontSize: "16px"}}>{shop.rating}</span>
                                                    </CardActions>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                    
                                    : null
                                }
                            </ul>
                        </div>
                        <div className="map_api">
                            <div id="map" style={{width:"100vw", height:"80vh"}}>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserView>
            {/* 모바일 페이지 */}
            <MobileView>
            <Header />
            <div className="map_wrap mobile">
                <div className={classes.searchArea}>
                    <TextField
                        variant="outlined"
                        label="검색"
                        onChange={(e) => setShop({...shop, search : e.target.value})}
                        onKeyPress = {(e) => {
                            if(e.key == 'Enter'){
                            getShopList(shop).then(res => {
                                onLoading();
                                if(res.status == 200){
                                    setShopList(res.data);
                                    if(res.data.length > 0){
                                        goShopPlace(res.data[0]);
                                    } else {
                                        alert("검색 결과가 없습니다.")
                                    }
                                }
                                offLoading();
                            });
                            
                            }
                        }
                        }
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle search"
                                edge="end"
                                onClick={(e) => getShopList(shop).then(res => {
                                    onLoading();
                                    if(res.status == 200){
                                        setShopList(res.data);
                                        if(res.data.length > 0){
                                            goShopPlace(res.data[0]);
                                        } else {
                                            alert("검색 결과가 없습니다.")
                                        }
                                    }
                                    offLoading();
                                })}
                                >
                                <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        style={{width:"90%"}}
                    />
                </div>
                    
                    <div className="map_body">
                        <div className="map_api">
                            <div id="map" style={{width:"100vw", height:"100vh"}}>
                                
                            </div>
                        </div>
                    </div>
            </div>
            <div id="pop-cal" className="pop-footer-wrap off">
                <div className="dim-click-wrap" onClick={closePopFooter}></div>
                <div className="pop-inner-wrap pop-calendar" style={{height:"70vh"}}>
                    <div className="btn-wrap">
                        <button type="button" className="btn-footer-close" onClick={closePopFooter} style={{outline:"none", border:"0", backgroundColor:"white"}}></button>
                    </div>
                    <div className="pop-inner">
                        <CardMedia
                            id="pop-footer-thumb"
                            className={classes.footer_thumb}
                            image={defaultThumb}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography id="pop-footer-title" gutterBottom variant="h5" component="h2" style={{whiteSpace:"nowrap", overflow : "hidden", textOverflow : "ellipsis"}}>
                              이름
                            </Typography>
                            <Typography id="pop-footer-category">
                              카테고리
                            </Typography>
                            <Typography id="pop-footer-address">
                              주소
                            </Typography>
                            <Rating
                                id="pop-footer-rating"
                                name="rating"
                                value={0}
                                precision={0.5}
                                disabled
                                size="small"
                                style={{marginRight:"10px"}}
                              />
                            <span id="pop-footer-ratingNum" style={{color:"#FF7012", fontSize: "24px"}}>0</span>
                        </CardContent>
                        <CardActions>
                            <IconButton className="favoritList" aria-label="add to favorites">
                                <VisibilityIcon />
                                <span id="pop-footer-views">0</span>
                            </IconButton>
                            <IconButton className="favoritList" aria-label="add to favorites">
                                <CommentIcon />
                                <span id="pop-footer-reviews">0</span>
                            </IconButton>
                            <IconButton className="favoritList" aria-label="add to favorites">
                                <FavoriteIcon />
                                <span id="pop-footer-thanks">0</span>
                            </IconButton>

                            <IconButton className={classes.goButton} aria-label="add to favorites" >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                </div>
            </div>
            </MobileView>
        </React.Fragment>
    )
}
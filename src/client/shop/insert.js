import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { registShop, getLoginInfo, getShopCateogryList } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Footer from './footer';
import Header from './header';
import DaumPostcode from 'react-daum-postcode';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment, InputLabel, FormControl, Select} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

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
    formControl_M: {
        margin: theme.spacing(1),
        minWidth: 89,
    },
    inputTag: {
      border: "0",
      width: "70px",
      outline: "none",
      '&:focus': {
        outline: "none",
      }
    },
    tags: {
        marginRight: "20px",
        display:"inline-block",
    },
    previewImg: {
        width: "500px",
        height: "300px",
    },
}));

var markers = [];
var ps;
var infowindow;
var map;
export default function Insert() {
    const classes = useStyles();
    const [shop, setShop] = useState({
        title : '',
        categoryseq : 0,
        price : '',
        zipcode : '',
        address : '',
        addressdetail : '',
        coordX : 0.0,
        coordY : 0.0,
        menu : '',
        content : '',
        rating : 0.0,
        memberseq : 0,
        register : '',
        category : '',
        tag: ''
    });
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [openAddress, setOpenAddress] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [previewList, setPreviewList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [search, setSearch] = useState('');
    const slickSetting = {
        dots : true,
        infinite : false,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1
    }

    useEffect(() => {
        getShopCateogryList().then(res => {
            if(res.status == 200){
                setCategoryList(res.data);
            } else {
                console.log(res.status);
            }
        })
        getLoginInfo().then(res => {
            if(res.status == 200){
                if(res.data != '' && res.data != null && res.data != undefined){
                    setLoginInfo(res.data);
                    setShop({...shop, memberseq : res.data.seq, register : res.data.name});
                }
                else {
                    //alert("로그인이 필요합니다.");
                    //history.goBack();
                }
            }
        })
        drawKeywordMap();
    }, []);

    /* 키워드 검색 */
    
    const drawKeywordMap = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  
        
        // 지도를 생성합니다    
        map = new kakao.maps.Map(mapContainer, mapOption); 

        // 장소 검색 객체를 생성합니다
        ps = new kakao.maps.services.Places();  
        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        infowindow = new kakao.maps.InfoWindow({zIndex:1});
        
        // 키워드로 장소를 검색합니다
        //searchPlaces();
    }
    
    const searchPlaces = () => {
        var keyword = document.getElementById('keyword').value;

        if(isBrowser){
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
        }
    
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB); 
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다
            if(isBrowser){
                displayPagination(pagination);
            }

        } else if (status === kakao.maps.services.Status.ZERO_RESULT && isBrowser) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR && isBrowser) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    const displayPlaces = (places) => {
        var listEl = document.getElementById('placesList'), 
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(), 
        bounds = new kakao.maps.LatLngBounds(), 
        listStr = '';
        
        // 검색 결과 목록에 추가된 항목들을 제거합니다
        if(isBrowser){
            removeAllChildNods(listEl);
        }

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        
        for ( var i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
            var marker = addMarker(placePosition, i);
            var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, place) {
                var name = place.place_name

                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, name);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
                kakao.maps.event.addListener(marker, 'click', function() {
                    setShop({...shop, address : place.road_address_name});
                });

                if(isMobile){
                    displayInfowindow(marker, name);
                }

                if(isBrowser){
                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, name);
                    };

                    itemEl.onmouseout =  function () {
                        infowindow.close();
                    };
                    itemEl.onclick = function () {
                        setShop({...shop, address : place.road_address_name});
                    }
                }
            })(marker, places[i]);

            if(isBrowser){
                fragment.appendChild(itemEl);
            }
        }

        if(isBrowser){
            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    const getListItem = (index, places) => {
        var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                        '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>'; 
        }
                    
        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                    '</div>';           

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    const addMarker = (position, idx) => {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    const removeMarker = () => {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    const displayPagination = (pagination) => {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i; 

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            //el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    const displayInfowindow = (marker, title) => {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    const removeAllChildNods = (el) => {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

    /* END 키워드 검색 */
    const registHandle = () => {
        if(shop.memberseq == 0){
            alert("로그인이 필요합니다.");
            return;
        }
        if(validateShop()){
            if(confirm('등록하시겠습니까?')){
                
                registShop(shop, imageList).then(res => {
                    if(res.status == 200){
                        alert("등록 완료");
                        location.href='/shop/list';
                    }
                })
            }
        }
    }

    const completePostHandle = (data) => {
        let zipcode = data.zonecode;
        let address = data.address
        setShop({...shop, zipcode : zipcode, address : address});
        setOpenAddress(false);
        drawMap(address, zipcode);
    }

    const drawMap = (address, zipcode) => {
        setOpenMap(true);
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                setShop({...shop, zipcode : zipcode, address : address, coordX : coords.Ma, coordY : coords.La});
                
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

    const validateShop = () => {
        if(shop.rating === 0.0){
            alert("평점을 선택하세요.");
            return false;
        }
        if(shop.title === ''){
            alert("이름을 입력하세요.");
            return false;
        }
        if(shop.categoryseq == 0 && shop.category == ''){
            alert("음식 종류를 선택하세요.");
            return false;
        }
        /*
        if(shop.zipcode === ''){
            alert("우편번호를 입력하세요.");
            return false;
        }*/
        if(shop.address === ''){
            alert("주소를 입력하세요.");
            return false;
        }
        if(shop.content === ''){
            alert("설명을 입력하세요.");
            return false;
        }
        return true;
    }

    const phoneRegExp = (inputVal) => {
        let phoneReg = /[0-9]$/g;
        if(phoneReg.test(inputVal)){
            setShop({...shop, phone : inputVal});
        }
    }

    const uploadImages = (files) => {
        setImageList(files);
        
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

    const addTagList = (tag) => {
        var tagArr = tagList;
        if(tagArr.length > 10){
            alert("태그는 최대 10개 가능합니다.");
        } else {
            tagArr.push(tag);
        }
        setTagList([...tagArr]);

        let tagText = "";
        for(var i=0; i<tagArr.length; i++){
            tagText += ("#" + tagArr[i]);
        }
        setShop({...shop, tag : tagText});
    }

    const removeTagList = (idx) => {
        var tagArr = tagList;
        tagArr.splice(idx, 1);
        setTagList([...tagArr]);

        let tagText = "";
        for(var i=0; i<tagArr.length; i++){
            tagText += ("#" + tagArr[i]);
        }
        setShop({...shop, tag : tagText});
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <BrowserView>
                <div className="basicBox60" style={{}}>
                    <h1>핫집 정보를 입력해주세요.</h1>
                    <br></br>
                    <h2>필수 정보</h2>
                    <Typography component="legend">평점</Typography>
                    <Rating
                        name="rating"
                        value={shop.rating}
                        precision={0.5}
                        onChange={(e) => setShop({...shop, rating : e.target.value})}
                    />
                    <br></br>
                    <TextField
                        id="title"
                        label="핫집 이름"
                        style={{ margin: 8 }}
                        placeholder="핫집 이름"
                        helperText=""
                        fullWidth
                        margin="normal"
                        inputProps = {{
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, title : e.target.value})}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">음식 종류</InputLabel>
                        <Select
                            native
                            labelId="demo-simple-select-helper-label"
                            id = "categoryseq"
                            value = {shop.categoryseq}
                            onChange = {(e) => setShop({...shop, categoryseq : e.target.value})}
                        >
                            <option value={0}>직접 입력</option>
                        {
                            categoryList ? categoryList.map((category, idx) => {
                                return(
                                    <option value={category.seq}>
                                        {category.name}
                                    </option>
                                );
                            }) : null
                        }
                        </Select>
                    </FormControl>
                    {
                        shop.categoryseq == 0 ? 
                        <TextField
                            id=""
                            label="직접 입력"
                            style={{ margin: 8 }}
                            placeholder="직접 입력"
                            helperText=""
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value = {shop.category}
                            onChange = {(e) => setShop({...shop, category : e.target.value})}
                        /> : null
                    }
                    <h4>위치 정보</h4>
                    
                    <div className="keyword_wrap">
                        <div id="map" style={{width:"57vw", height:"60vh", position:"relative", overflow:"hidden"}}></div>

                        <div id="menu_wrap" className="bg_white">
                            <div className="option">
                                <div>
                                    키워드 : <input type="text" id="keyword" size="15" /> 
                                    <button onClick={searchPlaces}>검색하기</button> 
                                </div>
                            </div>
                            <hr></hr>
                            <ul id="placesList"></ul>
                            <div id="pagination"></div>
                        </div>
                    </div>
                    <TextField
                        id="address"
                        label="주소"
                        style={{ margin: 8 }}
                        placeholder="주소"
                        helperText=""
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value = {shop.address}
                        onChange = {(e) => setShop({...shop, address : e.target.value})}
                    />
                    <TextField
                        id="addressdetail"
                        label="상세 주소"
                        style={{ margin: 8 }}
                        placeholder="상세 주소"
                        helperText=""
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, addressdetail : e.target.value})}
                    />
                    <br></br>
                    <TextField
                        id=""
                        label="설명"
                        multiline
                        variant="filled"
                        rows={12}
                        placeholder="설명을 입력해주세요."
                        fullWidth
                        style={{marginLeft:'7px'}}
                        onChange = {(e) => setShop({...shop, content : e.target.value})}
                    />
                    <br></br><br></br><br></br>
                    <h2>선택 정보</h2>
                    <TextField
                        id="price"
                        label="가격대"
                        style={{ margin: 8 }}
                        placeholder="'가격대를 입력해주세요."
                        helperText=""
                        margin="normal"
                        inputProps = {{
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value = {shop.price}
                        onChange = {(e) => setShop({...shop, price : e.target.value})}
                    />
                    <TextField
                        id="menu"
                        label="추천하는 메뉴"
                        style={{ margin: 8 }}
                        placeholder="추천하는 메뉴를 입력해주세요."
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, menu : e.target.value})}
                    />
                    <input
                        accept="image/*"
                        className="hidden"
                        id="thumbnail"
                        multiple
                        type="file"
                        onChange={(e) => uploadImages(e.target.files)}
                    />
                    <label htmlFor="thumbnail">
                        <Button variant="contained" component="div">
                        이미지 업로드
                        </Button>
                    </label>
                    <div className="preview">
                            <Slider {...slickSetting}>
                                {
                                    previewList ? previewList.map((image, idx) => {
                                        return(
                                            <CardMedia image={image} className={classes.previewImg}/>
                                        );
                                    }) : null
                                }
                            </Slider>
                        </div>
                    <br></br><br></br>
                    <div style={{fontSize:"13px"}} id="inputTagArea">
                        {
                            tagList ? tagList.map((tag, index) => {
                                return(
                                    <div className={classes.tags}>{`#${tag}`} 
                                        <a style={{cursor:"pointer"}} onClick={(e) => removeTagList(index)}>X</a>
                                    </div> 
                                )
                            })
                            : null
                        }

                        <span>#</span>
                        <input type="text" id="inputTag" className={classes.inputTag} placeholder="태그입력" 
                            onKeyPress = {(e) => {
                                if(e.key == 'Enter' && e.target.value != ''){
                                    addTagList(e.target.value);
                                    e.target.value = "";
                                    }
                                }
                            } />
                    </div>
                    <br></br><br></br>
                    <Button variant="contained" onClick={() => {registHandle()}} style={{backgroundColor:'#000', color:'#fff', width:"100%", height:"70px", fontSize:"30px"}}> 등 록 하 기 </Button>
                </div>
            </BrowserView>
            {/* 모바일 페이지 */}
            <MobileView>
                <div className="contents90 mobile" style={{marginTop:"100px"}}>
                    <h1>핫집을 등록해주세요.</h1>
                    <br></br>
                    <h2>필수 정보</h2>
                    <Typography component="legend">평점</Typography>
                    <Rating
                        name="rating"
                        value={shop.rating}
                        precision={0.5}
                        onChange={(e) => setShop({...shop, rating : e.target.value})}
                    />
                    <span style={{color:"#FF7012", fontSize: "24px"}}>{shop.rating}</span>
                    <br></br>
                    <TextField
                        id="title"
                        label="핫집 이름"
                        style={{ margin: 8 }}
                        placeholder="핫집 이름"
                        helperText=""
                        fullWidth
                        margin="normal"
                        inputProps = {{
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, title : e.target.value})}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">음식 종류</InputLabel>
                        <Select
                            native
                            labelId="demo-simple-select-helper-label"
                            id = "categoryseq"
                            value = {shop.categoryseq}
                            onChange = {(e) => setShop({...shop, categoryseq : e.target.value})}
                        >
                            <option value={0}>직접 입력</option>
                        {
                            categoryList ? categoryList.map((category, idx) => {
                                return(
                                    <option value={category.seq}>
                                        {category.name}
                                    </option>
                                );
                            }) : null
                        }
                        </Select>
                    </FormControl>
                    {
                        shop.categoryseq == 0 ? 
                        <TextField
                            id=""
                            label="직접 입력"
                            style={{ margin: 8, width:"172px"}}
                            placeholder="직접 입력"
                            helperText=""
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value = {shop.category}
                            onChange = {(e) => setShop({...shop, category : e.target.value})}
                        /> : null
                    }
                    <h4>위치 정보</h4>
                    <TextField
                        id="keyword"
                        label="키워드 검색"
                        style={{width:"100%", marginTop:"-25px", marginBottom:"15px"}}
                        onKeyPress = {(e) => {
                            if(e.key == 'Enter'){
                                searchPlaces();
                                }
                            }
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle search"
                                        edge="end"
                                        onClick={searchPlaces}
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br></br>
                    <div className="keyword_wrap">
                        <div id="map" style={{width:"90vw", height:"50vh", position:"relative", overflow:"hidden"}}></div>
                    </div>
                    
                    <TextField
                        id="address"
                        label="주소"
                        style={{ margin: 8 }}
                        placeholder="지도에 표시된 마커를 눌러주세요"
                        helperText=""
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value = {shop.address}
                        onChange = {(e) => setShop({...shop, address : e.target.value})}
                    />
                    <TextField
                        id="addressdetail"
                        label="상세 주소"
                        style={{ margin: 8 }}
                        placeholder="상세 주소"
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, addressdetail : e.target.value})}
                    />
                    <br></br>
                        
                    <TextField
                        id=""
                        label="설명"
                        multiline
                        variant="filled"
                        rows={12}
                        placeholder="설명을 입력해주세요."
                        fullWidth
                        onChange = {(e) => setShop({...shop, content : e.target.value})}
                    />
                    <br></br><br></br><br></br>
                    <h2>선택 정보</h2>
                    <TextField
                        id="price"
                        label="가격대"
                        style={{ margin: 8 }}
                        placeholder="'가격대를 입력해주세요."
                        helperText=""
                        fullWidth
                        margin="normal"
                        inputProps = {{
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value = {shop.price}
                        onChange = {(e) => setShop({...shop, price : e.target.value})}
                    />
                    <TextField
                        id="menu"
                        label="추천하는 메뉴"
                        style={{ margin: 8 }}
                        placeholder="추천하는 메뉴를 입력해주세요."
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange = {(e) => setShop({...shop, menu : e.target.value})}
                    />
                    <input
                        accept="image/*"
                        className="hidden"
                        id="thumbnail"
                        multiple
                        type="file"
                        onChange={(e) => uploadImages(e.target.files)}
                    />
                    <label htmlFor="thumbnail">
                        <Button variant="contained" component="div">
                        이미지 업로드
                        </Button>
                    </label>
                    <br></br><br></br>
                    <div className="preview">
                            <Slider {...slickSetting}>
                                {
                                    previewList ? previewList.map((image, idx) => {
                                        return(
                                            <CardMedia image={image} className={classes.previewImg}/>
                                        );
                                    }) : null
                                }
                            </Slider>
                        </div>
                    <br></br><br></br>
                    <div style={{fontSize:"13px"}} id="inputTagArea">
                        {
                            tagList ? tagList.map((tag, index) => {
                                return(
                                    <div className={classes.tags}>{`#${tag}`} 
                                        <a style={{cursor:"pointer"}} onClick={(e) => removeTagList(index)}>X</a>
                                    </div> 
                                )
                            })
                            : null
                        }

                        <span>#</span>
                        <input type="text" id="inputTag" className={classes.inputTag} placeholder="태그입력" 
                            onKeyPress = {(e) => {
                                if(e.key == 'Enter' && e.target.value != ''){
                                    addTagList(e.target.value);
                                    e.target.value = "";
                                    }
                                }
                            } />
                    </div>
                    <br></br><br></br>
                    <Button variant="contained" onClick={() => {registHandle()}} style={{backgroundColor:'#000', color:'#fff', width:"100%", height:"70px", fontSize:"30px"}}> 등 록 하 기 </Button>
                </div>
            </MobileView>
            <Footer />
        </React.Fragment>
    );
}
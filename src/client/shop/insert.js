import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { registShop, getLoginInfo, getShopCateogryList } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
}));

export default function Insert() {
    const classes = useStyles();
    const [shop, setShop] = useState({
        title : '',
        categoryseq : 0,
        phone : '',
        zipcode : '',
        address : '',
        addressdetail : '',
        url : '',
        content : '',
        rating : 0.0,
        thumbnail : null,
        memberseq : 0,
        register : ''
    });
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [openAddress, setOpenAddress] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [previewList, setPreviewList] = useState([]);
    const slickSetting = {
        dots : true,
        infinite : true,
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
                setLoginInfo(res.data);
                setShop({...shop, memberseq : res.data.seq});
                setShop({...shop, register : res.data.name});
            }
        })
    }, []);

    const registHandle = () => {
        if(validateShop()){
            if(confirm('등록하시겠습니까?')){
                registShop(shop).then(res => {
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
        drawMap(address);
    }

    const drawMap = (address) => {
        setOpenMap(true);
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

    const validateShop = () => {
        if(shop.rating === 0.0){
            alert("평점을 선택하세요.");
            return false;
        }
        if(shop.title === ''){
            alert("이름을 입력하세요.");
            return false;
        }
        if(shop.categoryseq === 0){
            alert("음식 종류를 선택하세요.");
            return false;
        }
        if(shop.zipcode === ''){
            alert("우편번호를 입력하세요.");
            return false;
        }
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
            var reader;
            var previewArr = new Array();
            for(var i=0; i<files.length; i++){
                reader = new FileReader();
                reader.onload = function(e) {
                    previewList.push(e.target.result);
                }
                reader.readAsDataURL(files[i]);
            }
            
        }
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <Header />
            <div className="basicBox60" style={{}}>
                <p>필수 정보</p>
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
                    label="맛집 이름"
                    style={{ margin: 8 }}
                    placeholder="맛집 이름"
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
                        <option>직접 입력</option>
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
                <br></br>
                <TextField
                    id="zipcode"
                    label="우편번호"
                    style={{ margin: 8 }}
                    placeholder="우편번호"
                    helperText=""
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = {shop.zipcode}
                    onChange = {(e) => setShop({...shop, zipcode : e.target.value})}
                />
                <Button variant="contained" onClick={() => {setOpenAddress(true)}}>주소 찾기</Button>
                <Modal
                    className="modal"
                    open={openAddress}
                    onClose={() => {setOpenAddress(false)}}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openAddress}>
                        <DaumPostcode onComplete={completePostHandle} width="500px" />
                    </Fade>
                </Modal>
                <br></br>
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
                {
                    openMap ? <div><div id="map" style={{width:'500px', height:'400px'}}></div><br></br></div> : null
                }         
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
                <br></br>
                <p>선택 정보</p>
                <TextField
                    id="phone"
                    label="전화번호"
                    style={{ margin: 8 }}
                    placeholder="'-'를 제외하고 입력하세요."
                    helperText="'-'를 제외하고 입력하세요."
                    margin="normal"
                    inputProps = {{
                        maxLength: 11,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = {shop.phone}
                    onChange = {(e) => phoneRegExp(e.target.value)}
                />
                <TextField
                    id="url"
                    label="맛집 링크"
                    style={{ margin: 8 }}
                    placeholder="맛집 링크"
                    helperText=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange = {(e) => setShop({...shop, url : e.target.value})}
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
                    썸네일 업로드
                    </Button>
                </label>
                <div id="imageArea">
                    <Slider {...slickSetting}>
                        {
                            previewList ? previewList.map((image, idx) => {
                                return(
                                    <img src={image} />
                                );
                            }) : null
                        }
                    </Slider>
                </div>
                <br></br><br></br>
                <Button variant="contained" onClick={() => {registHandle()}} style={{backgroundColor:'#000', color:'#fff', width:"100%"}}>등록하기</Button>
            </div>
            <Footer />
        </React.Fragment>
    );
}
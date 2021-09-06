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
    }
}));

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
                setLoginInfo(res.data);
                setShop({...shop, memberseq : res.data.seq, register : res.data.name});
            }
        })
    }, []);

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
                                    <img src={image} />
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
            <Footer />
        </React.Fragment>
    );
}
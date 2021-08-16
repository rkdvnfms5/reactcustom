import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { registShop, getLoginInfo, getShopCateogryList, getShopOne } from '../../action/action';
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
    favorit: {
        width: "70px",
        height: "70px",
        float: "right",
        marginRight: "150px",
        textAlign: "center",
        color:"#9b9b9b",
        '&:hover': {
            color: '#FF7012',
            cursor: "pointer",
          }
    },
    property: {
        marginRight: "15px",
        fontSize: "20px",
    },
}));

export default function View() {
    const classes = useStyles();
    const { seq } = useParams(); //객체 형태의 params 에서 키가 seq인 값을 가져옴
    const [shop, setShop] = useState(null);

    useEffect(() => {
        getShopOne(seq).then(res => {
            if(res.status == 200){
                setShop(res.data[0]);
            } else {
                console.log(res.status);
            }
        })
    }, []);

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
                            <span className={classes.favorit}>
                                <FavoriteBorderIcon style={{width:"50px", height:"50px"}}/><br></br>
                                <span style={{fontWeight:"bold"}}>좋아요</span>
                            </span>
                            <br></br>
                            <Rating
                            name="rating"
                            value={shop.rating}
                            precision={0.5}
                            disabled
                            />
                            <span>{shop.rating}</span>
                        </div>
                        <div style={{color:"#9b9b9b", marginTop:"13px"}}>
                            <span className={classes.property}>
                                <VisibilityIcon fontSize="small" />{" "}
                                {shop.views}
                            </span>
                            <span className={classes.property}>
                                <CreateIcon fontSize="small" />{" "}
                                999
                            </span>
                            <span className={classes.property}>
                                <FavoriteIcon fontSize="small" />{" "}
                                {shop.thanks}
                            </span>
                        </div>
                    </div>
                    <div className="shop-body">

                    </div>
                </div>: <h1>해당 맛집이 존재하지 않습니다.</h1>
                }
            </div>
            <Footer />
        </React.Fragment>
    );
}
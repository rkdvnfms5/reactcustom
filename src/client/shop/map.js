import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getShopList, getLoginInfo, onLoading, offLoading, getCityList} from '../../action/action';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    
  }));

const states = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

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
        memberseq : 0
    });
    const [categoryList, setCategoryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <div className="map_wrap">
                <div className="header_top">
                    <h2>
                        <span className="bold">핫한 푸드, 푸핫</span>
                        <span className="sub">Hot Food :)</span>
                    </h2>
                </div>
                <div className="header_nav">

                </div>
                <div className="map_body">
                    <div className="map_side">
                    
                    </div>
                    <div className="map_api">
                        <div id="map">

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
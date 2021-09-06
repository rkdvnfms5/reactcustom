import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment, InputLabel, FormControl, Select, Button} from "@material-ui/core";
import { getShopList, getLoginInfo, onLoading, offLoading, getCityList} from '../../action/action';

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
        memberseq : 0,
        limityn : 'N',
        minLa : 0.0,
        minMa : 0.0,
        maxLa : 0.0,
        maxMa : 0.0,
        centerLa : 127.06513366986843,
        centerMa : 37.493151302091796
    });
    const [categoryList, setCategoryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [mapInit, setMapInit] = useState(true);
    const [globalMap, setGlobalMap] = useState(null);

    useEffect(() => {
        drawMap();
        if(shop.minLa > 0.0){
            getShopList(shop).then(res => {
                if(res.status == 200){
                    console.log(res.data)
                    drawMarkerOverlay(res.data);
                }
            })
        }
    }, [shop.centerLa]);

    const drawMap = () => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var coords = new kakao.maps.LatLng(shop.centerMa, shop.centerLa);

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(coords.La, coords.Ma), //지도의 중심좌표.
            level: 8 //지도의 레벨(확대, 축소 정도)
        };
        if(globalMap == null || globalMap == undefined){
            let map = new kakao.maps.Map(container, options)
            setGlobalMap(map);

            //위치 변경 이벤트 등록
            kakao.maps.event.addListener(map, 'dragend', function() {             
                
                // 지도 영역정보를 얻어옵니다 
                var bounds = map.getBounds();
                
                // 영역정보의 남서쪽 정보를 얻어옵니다 
                var swLatlng = bounds.getSouthWest();
                
                // 영역정보의 북동쪽 정보를 얻어옵니다 
                var neLatlng = bounds.getNorthEast();

                // 지도의 중심좌표를 얻어옵니다
                var latlng = map.getCenter();
                setShop({...shop, minLa : swLatlng.La, minMa: swLatlng.Ma, maxLa : neLatlng.La, maxMa : neLatlng.Ma, centerLa:latlng.getLng(), centerMa:latlng.getLat()});
            });

            //줌 이벤트
            kakao.maps.event.addListener(map, 'zoom_changed', function() {        
        
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

                setShop({...shop, minLa : swLatlng.La, minMa: swLatlng.Ma, maxLa : neLatlng.La, maxMa : neLatlng.Ma, centerLa:latlng.getLng(), centerMa:latlng.getLat()});
                
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
            setShop({...shop, minLa : swLatlng.La, minMa: swLatlng.Ma, maxLa : neLatlng.La, maxMa : neLatlng.Ma, centerLa:latlng.getLng(), centerMa:latlng.getLat()});
        }
        
        
    }

    const drawMarkerOverlay = (markerList) => {
        //마커, 오버레이 생성
        for(var i=0; i<markerList.length; i++){
            //마커 생성
            var markerCoords = new kakao.maps.LatLng(markerList[i].coordX, markerList[i].coordY);
            var marker = new kakao.maps.Marker({
                map: globalMap,
                position: markerCoords
            });

            //오버레이 생성
            var content = '<div class="overlay_wrap">' + 
                            '    <div class="info">' + 
                            '        <div class="title">' + 
                            '            ' + markerList[i].title + ' <span class="rating">' + markerList[i].rating + '</span>' +
                            //'            <div class="close" onclick="closeOverlay('+i+')" title="닫기"></div>' + 
                            '        </div>' + 
                            '        <div class="body">' + 
                            '            <div class="img">' +
                            '                <img src="' + markerList[i].thumbnail + '" width="73" height="70">' +
                            '           </div>' + 
                            '            <div class="desc">' + 
                            '                <div class="ellipsis">' + markerList[i].address + markerList[i].addressdetail + '</div>' + 
                            '                <div class="jibun ellipsis">' + markerList[i].categoryName + '</div>' + 
                            '                <div><a href="/shop/view/' + markerList[i].seq + '" target="_blank" class="link">보러가기</a></div>' + 
                            '            </div>' + 
                            '        </div>' + 
                            '    </div>' +    
                            '</div>';
            // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
            var overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: globalMap,
                position: marker.getPosition()       
            });

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                overlay.setMap(globalMap);
            });

            
        }
        //END 마커, 오버레이 생성
    }

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
                        <ul>
                            <li>지기지기장장</li>
                        </ul>
                    </div>
                    <div className="map_api">
                        <div id="map" style={{width:"100vw", height:"100vh"}}>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
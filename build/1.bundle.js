(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{513:function(r,n,o){"use strict";o.r(n);var e=o(86),i=o.n(e),t=o(48),p=o.n(t),a=o(514),l=i()(!1),d=p()(a.a);l.push([r.i,'@charset "UTF-8";\r\n\r\nul {list-style: none; padding-left: 0;}\r\n\r\n.contents95 {min-width:500px; width:95%; margin:0 auto;}\r\n.contents90 {min-width:500px; width:90%; margin:0 auto;}\r\n.contents80 {min-width:500px; width:80%; margin:0 auto;}\r\n.contents70 {min-width:500px; width:70%; margin:0 auto;}\r\n.contents60 {min-width:500px; width:60%; margin:0 auto;}\r\n\r\n.contents95.mobile{min-width: 300px;}\r\n.contents90.mobile{min-width: 300px;}\r\n.contents80.mobile{min-width: 300px;}\r\n.contents70.mobile{min-width: 200px;}\r\n.contents60.mobile{min-width: 200px;}\r\n\r\n.basicBox90 {width: 90%; border-radius: 15px; box-shadow: 1px 1px 2px 2px #dedede; background-color: white; padding: 20px 20px; margin:0 auto; margin-top: 120px; margin-bottom: 70px;}\r\n.basicBox80 {width: 80%; border-radius: 15px; box-shadow: 1px 1px 2px 2px #dedede; background-color: white; padding: 20px 20px; margin:0 auto; margin-top: 120px; margin-bottom: 70px;}\r\n.basicBox70 {width: 70%; border-radius: 15px; box-shadow: 1px 1px 2px 2px #dedede; background-color: white; padding: 20px 20px; margin:0 auto; margin-top: 120px; margin-bottom: 70px;}\r\n.basicBox60 {width: 60%; border-radius: 15px; box-shadow: 1px 1px 2px 2px #dedede; background-color: white; padding: 20px 20px; margin:0 auto; margin-top: 120px; margin-bottom: 70px;}\r\n\r\n.modal {display: flex; align-items: center; justify-content: center;}\r\n\r\n.hidden {display: none;}\r\n\r\n.preview {height: 300px; width: 500px; position: relative;}\r\n.mobile .preview {width: 100%; height: auto;}\r\n.preview img {max-width: 100%; max-height: 100%; width: auto; height: auto; top: 50%; left: 50%; translate: (-50%, -50%);}\r\n\r\n.slick-prev:before, .slick-next:before {color: black;}\r\n\r\n.mobile .slick-next, .mobile .slick-prev {display: none;}\r\n\r\na{text-decoration: none;}\r\na:link { color: black; text-decoration: none;}\r\na:visited { color: black; text-decoration: none;}\r\n\r\n/* view */\r\n.shop-header {\r\n    border-bottom: 1px solid #e9e9e9de;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.shop-header .title {\r\n    font-size: 30px;\r\n    font-weight: bold;\r\n    margin-right: 10px;\r\n}\r\n\r\n.shop-body {\r\n    padding: 20px 20px;\r\n    font-size: 17px;\r\n    border-bottom: 1px solid #e9e9e9de;\r\n}\r\n\r\n.shop-body .imageArea{\r\n    margin: 50px auto;\r\n    text-align: center;\r\n    width: 100%;\r\n    height: 400px;\r\n}\r\n\r\n.shop-body .imageArea img{\r\n    margin: 0 auto;\r\n    max-width: 500px;\r\n    height: auto;\r\n    cursor: pointer;\r\n}\r\n\r\n.table-view {\r\n    /* border: 1px solid black; */\r\n    width: 50%;\r\n}\r\n\r\n.mobile .table-view {\r\n    width: 100%;\r\n}\r\n\r\n.table-view tr {\r\n    height: 40px;\r\n}\r\n\r\n.table-view td {\r\n    vertical-align: top;\r\n}\r\n\r\n.table-view .column{\r\n    color: rgba(155, 155, 155, 1);\r\n}\r\n\r\n.table-view .content{\r\n    height: 200px;\r\n}\r\n\r\n.mobile .table-view .content{\r\n    height: auto;\r\n}\r\n\r\n#viewImageDim {\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    z-index: 10;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    display: none;\r\n}\r\n\r\n#viewImageDim.on { display: block;}\r\n#viewImageDim .slick-prev {left: -65px;}\r\n#viewImageDim .slick-next {right: -40px;}\r\n#viewImageDim .slick-prev:before, #viewImageDim .slick-next:before {font-size: 50px;}\r\n\r\n.viewImageBox {\r\n    z-index: 11;\r\n    position: fixed;\r\n    width: 1000px;\r\n    height: 600px;\r\n    top:50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    background-color: black;\r\n}\r\n\r\n.viewImageBox img {\r\n    max-width: 1000px;\r\n    max-height: 600px;\r\n    width: auto;\r\n    height: auto;\r\n    margin: 0 auto;\r\n    /*position: absolute; top: 50%; left: 50%; translate: (-50%, -50%);*/\r\n}\r\n\r\n.viewImageClose {\r\n    cursor: pointer;\r\n    z-index: 11;\r\n    color: white;\r\n    position: absolute;\r\n    top: 0px;\r\n    right: -70px;\r\n    \r\n}\r\n\r\n.favorit {\r\n    width: 70px;\r\n    height: 70px;\r\n    float: right;\r\n    margin-right: 50px;\r\n    text-align: center;\r\n    color: #9b9b9b;\r\n}\r\n\r\n.mobile .favorit {\r\n    margin-right: 20px;\r\n}\r\n\r\n.favorit:hover {\r\n    color: #FF7012;\r\n    cursor: pointer;\r\n}\r\n.favorit.on {\r\n    color: #FF7012;\r\n}\r\n\r\n.favoritList.on {\r\n    color: #FF7012;\r\n}\r\n\r\n#loginDim {\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    z-index: 10;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    display: none;\r\n}\r\n\r\n#loginDim.on {\r\n    display: block;\r\n}\r\n\r\n.loginPop {\r\n    z-index: 11;\r\n    position: fixed;\r\n    width: 370px;\r\n    height: 500px;\r\n    top:50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    background-color: white;\r\n    border-radius: 10px;\r\n    padding: 101px 52px 98px;\r\n}\r\n\r\n.loginPopClose {\r\n    cursor: pointer;\r\n    z-index: 11;\r\n    color: rgb(95, 91, 91);\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    \r\n}\r\n\r\n.loginBtn {\r\n    cursor: pointer;\r\n    border: 0;\r\n    width: 256px;\r\n    height: 51px;\r\n    margin: 0 auto 12px;\r\n    font-size: 14px;\r\n    line-height: 51px;\r\n    border-radius: 48px;\r\n}\r\n.kakao {\r\n    color: #66514c;\r\n    background-color: #ffe809;\r\n}\r\n\r\n.logout {\r\n    color: #ffffff;\r\n    background-color: #000000;\r\n}\r\n\r\n.myShop {\r\n    color: #ffffff;\r\n    background-color: #FF7012;\r\n}\r\n\r\n.insert {\r\n    color: #ffffff;\r\n    background-color: #555;\r\n}\r\n\r\n.shop-review {\r\n    padding: 15px 20px;\r\n    font-size: 17px;\r\n}\r\n\r\n.mobile .shop-review {\r\n    padding: 15px 5px;\r\n}\r\n\r\n.addReview {\r\n    width: 80px;\r\n    height: 50px;\r\n    float: right;\r\n    margin-left: 50px;\r\n    margin-right: 30px;\r\n    text-align: center;\r\n    color: #9b9b9b;\r\n}\r\n\r\n.mobile .addReview {\r\n    margin-right: 0;\r\n    margin-left: 0;\r\n}\r\n\r\n.addReview:hover {\r\n    color: #FF7012;\r\n    cursor: pointer;\r\n}\r\n\r\n.review-title {\r\n    height: 70px;\r\n}\r\n\r\n/*\r\n.review {\r\n    margin: 0 auto;\r\n    width: 100%;\r\n    height: 275px;\r\n    border-bottom: 2px solid #e9e9e9;\r\n}\r\n*/\r\n\r\n.review {\r\n    width: 100%;     \r\n    border-radius: 15px; \r\n    box-shadow: 1px 1px 2px 2px #dedede; \r\n    background-color: white; \r\n    margin:20px auto;\r\n}\r\n\r\n.review:not(.mobile){\r\n    height: 335px;\r\n}\r\n\r\n.review.mobile {\r\n    display: inline-block;\r\n}\r\n\r\n.review .review-profile {\r\n    width: 15%;\r\n    height: 100%;\r\n    float: left;\r\n    padding: 20px 10px;\r\n    text-align: center;\r\n}\r\n\r\n.mobile.review .review-profile {\r\n    width: 100%;\r\n    float: none;\r\n    height: auto;\r\n    text-align: left;\r\n    position: relative;\r\n}\r\n\r\n.review .review-content {\r\n    width: 85%;\r\n    height: 100%;\r\n    float: right;\r\n    padding: 20px 20px;\r\n}\r\n\r\n.mobile.review .review-content {\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.review .review-content .date {\r\n    color:"#9b9b9b";\r\n}\r\n\r\n.review .review-content .content {\r\n    height: 60%;\r\n    padding: 10px 0;\r\n}\r\n\r\n.review .review-content .footer {\r\n    height: 35%;\r\n}\r\n\r\n.review .review-content .footer .edit {\r\n    text-align: center;\r\n    margin-right: 50px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.review.mobile .review-content .footer .edit {\r\n    margin-right: 20px;\r\n}\r\n\r\n.review .review-content .footer .edit:hover {\r\n    color: #FF7012;\r\n}\r\n\r\n.review .review-content .footer .delete {\r\n    text-align: center;\r\n    margin-right: 50px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.review.mobile .review-content .footer .delete {\r\n    margin-right: 20px;\r\n}\r\n\r\n.review .review-content .footer .delete:hover {\r\n    color: #FF7012;\r\n}\r\n\r\n.review .review-content .footer .attach {\r\n    text-align: center;\r\n    margin-right: 50px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    float: left;\r\n}\r\n\r\n.review .review-content .footer .attach:hover {\r\n    color: #FF7012;\r\n}\r\n\r\n.review .review-content .footer .done {\r\n    text-align: center;\r\n    margin-right: 20px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    float: right;\r\n}\r\n\r\n.review .review-content .footer .done:hover {\r\n    color: #FF7012;\r\n}\r\n\r\n.review .review-content .footer .cancel {\r\n    text-align: center;\r\n    margin-right: 20px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.review .review-content .footer .cancel:hover {\r\n    color: #FF7012;\r\n}\r\n\r\n.caution {color: brown; font-size: 12px; font-weight: bold; margin-left: 20px;}\r\n\r\n.mobile .caution { margin-left: 0;}\r\n\r\n.reviewImageArea {\r\n    display: inline-block;\r\n    width: 45%;\r\n    height: 100%;\r\n}\r\n\r\n.mobile .reviewImageArea {\r\n    width: 100%;\r\n}\r\n\r\n.reviewImageArea .reviewImage{\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    width: 33%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n\r\n\r\n.reviewImageArea .reviewImage img {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    margin: 0 auto;\r\n}\r\n\r\n\r\n.reviewImageArea .reviewImage .more {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    width: 100%;\r\n    height: 100%;\r\n    color: white;\r\n    text-align: center;\r\n    font-size: 30px;\r\n    display:none;\r\n}\r\n\r\n.reviewImageArea .reviewImage:hover .more{\r\n    display: inline-block;\r\n}\r\n\r\n.reviewImageArea .reviewImage .more span {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}\r\n\r\n.zoomDim {\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    z-index: 10;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    display: none;\r\n}\r\n\r\n.zoomDim.on { display: block;}\r\n.zoomDim .slick-prev {left: -65px;}\r\n.zoomDim .slick-next {right: -40px;}\r\n.zoomDim .slick-prev:before, .zoomDim .slick-next:before {font-size: 50px;}\r\n\r\n.zoomImageBox {\r\n    z-index: 11;\r\n    position: fixed;\r\n    width: 1000px;\r\n    height: 600px;\r\n    top:50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    background-color: black;\r\n}\r\n\r\n.zoomImageClose {\r\n    cursor: pointer;\r\n    z-index: 11;\r\n    color: white;\r\n    position: absolute;\r\n    top: 0px;\r\n    right: -70px;\r\n    \r\n}\r\n\r\n.zoomImage {\r\n    position: absolute;\r\n    top: 50%; \r\n    left: 50%; \r\n    transform: translate(-50%, -50%);\r\n    max-width: 1000px;\r\n    max-height: 600px;\r\n    width: 100%;\r\n    height: 100%;\r\n    line-height: 100%;\r\n}\r\n\r\n.zoomImage img {\r\n    margin:auto 0;\r\n    max-width: 1000px;\r\n    max-height: 600px;\r\n    width: auto;\r\n    height: auto;\r\n}\r\n\r\n.navi-left {\r\n    position: absolute;\r\n    height: 100%;\r\n    border-right: 1px solid #D8D8D8;\r\n    top: 145px;\r\n    left: 50px;\r\n}\r\n\r\n.navi-left .menu {\r\n    margin-top: 0;\r\n    list-style : none;\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n    padding: 0px 20px;\r\n    padding-right: 40px;\r\n}\r\n\r\n.navi-left .menu a:hover{\r\n    text-decoration: underline;\r\n    color: #FF7012;\r\n}\r\n\r\n.navi-left .menu li {\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.my-contents {\r\n    padding: 20px 0;\r\n}\r\n\r\n.my-contents .shop-list {\r\n    padding-top: 5px;\r\n}\r\n\r\n.my-contents .shop {\r\n    margin: 30px auto;\r\n    width: 100%;\r\n    height: 300px;\r\n    border-radius: 15px; \r\n    box-shadow: 1px 1px 2px 2px #dedede; \r\n    background-color: white; \r\n    padding: 20px 20px;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.mobile .my-contents .shop {\r\n    display: inline-block;\r\n    height: auto;\r\n}\r\n\r\n.my-contents .shop:hover {\r\n    cursor: pointer;\r\n    border: 1px solid #FF7012;\r\n}\r\n\r\n.my-contents .shop:hover{\r\n    border-color: 1px solid #FF7012;\r\n}\r\n\r\n.my-contents .shop .contents-area {\r\n    width: 70%;\r\n    height: 100%;\r\n    float: left;\r\n}\r\n\r\n.mobile .my-contents .shop .contents-area {\r\n    width: 100%;\r\n    float:none;\r\n}\r\n\r\n.my-contents .shop .contents-area .title {\r\n    font-size: 25px;\r\n    font-weight: bold;\r\n}\r\n\r\n.my-contents .shop .contents-area .category {\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    color: rgb(155, 155, 155);\r\n}\r\n\r\n.my-contents .shop .contents-area .content {\r\n    height: 65%;\r\n    padding: 10px 0px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    color: rgb(95, 91, 91);\r\n}\r\n\r\n\r\n.my-contents .shop .image-area {\r\n    width: 25%;\r\n    height: 100%;\r\n    float: right;\r\n    position: relative;\r\n}\r\n\r\n.mobile .my-contents .shop .image-area {\r\n    width: 100%;\r\n    float: none;\r\n    height: 300px;\r\n}\r\n\r\n.my-contents .shop .image-area .image-view {\r\n    position: absolute;\r\n    top: 50%; \r\n    left: 50%; \r\n    transform: translate(-50%, -50%);\r\n    width: 200px;\r\n    height: 200px;\r\n    background-color: #f6f6f6;\r\n}\r\n\r\n.mobile .my-contents .shop .image-area .image-view {\r\n    width: 280px;\r\n    height: 280px;\r\n}\r\n\r\n.my-contents .shop .image-area .image-view span {\r\n    position: absolute;\r\n    top: 50%; \r\n    left: 50%; \r\n    transform: translate(-50%, -50%);\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    color: #cbcbcb;\r\n    font-family: \'Arial\';\r\n}\r\n\r\n.my-contents .shop .image-area .image-view img {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n    position: absolute;\r\n    top: 50%; \r\n    left: 50%; \r\n    transform: translate(-50%, -50%);\r\n}\r\n\r\n#historyDim {\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    z-index: 10;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n}\r\n\r\n#historyDim.mobile {\r\n    z-index: 1101;\r\n}\r\n\r\n.historyPop {\r\n    z-index: 11;\r\n    position: fixed;\r\n    width: 370px;\r\n    height: 500px;\r\n    top:9%;\r\n    right: 5%;\r\n    transform: translate(0%, 0%);\r\n    background-color: white;\r\n    border-radius: 10px;\r\n    padding: 20px 20px;\r\n}\r\n\r\n.historyPop.mobile {\r\n    right: 0.75%;\r\n    z-index: 1101;\r\n    width: auto;\r\n}\r\n\r\n.historyPopClose {\r\n    cursor: pointer;\r\n    z-index: 11;\r\n    color: rgb(95, 91, 91);\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    \r\n}\r\n\r\n.historyPop .historyPop_header {\r\n    text-align: center;\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n    width: 100%;\r\n    height: 10%;\r\n    color: #FF7012;\r\n    border-bottom: 2px solid #FF7012;\r\n}\r\n\r\n.historyPop .historyPop_body {\r\n    height: 90%;\r\n    padding-top: 10px;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.historyPop .historyPop_body ul{\r\n    list-style: none;\r\n    padding: 0;\r\n}\r\n\r\n.historyPop .historyPop_body ul li{\r\n    width: 100%;\r\n    height: 100px;\r\n\r\n}\r\n\r\n.historyPop .historyPop_body ul li .history_image{\r\n    height: 86px;\r\n    width: 86px;\r\n    float: left;\r\n}\r\n\r\n.historyPop .historyPop_body ul li .history_info{\r\n    height: 100%;\r\n    display: inline-block;\r\n    padding-top: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.historyPop .historyPop_body ul li .history_info .content {\r\n    color: #6a6a6a;\r\n    font-size: 13px;\r\n}\r\n\r\n#disableDim {\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    z-index: 10;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n}\r\n\r\n.disablePop {\r\n    z-index: 11;\r\n    position: fixed;\r\n    width: 500px;\r\n    height: 550px;\r\n    top:50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    background-color: white;\r\n    border-radius: 10px;\r\n    padding: 20px 20px;\r\n}\r\n\r\n.disablePop.mobile {\r\n    width: 300px;\r\n    height: 370px;\r\n}\r\n\r\n/* Map CSS*/\r\n.map {\r\n    width: 80px;\r\n    height: 70px;\r\n    float: right;\r\n    text-align: center;\r\n    color: #9b9b9b;\r\n    position: fixed;\r\n    bottom: 30px;\r\n    right: 30px;\r\n}\r\n.map:hover {\r\n    color: #FF7012;\r\n    cursor: pointer;\r\n}\r\n\r\n.map_wrap:not(.mobile) {display:flex;position:relative;-webkit-box-flex:1;-webkit-box-pack:justify;flex-grow:1;flex-direction:column;justify-content:space-between;min-width:1650px;min-height:768px;height:100%;overflow:hidden;background:#fff;}\r\n.map_wrap .header_top {display:flex;align-items:center;justify-content:space-between;height:104px;padding-left:269px;background:url('+d+") no-repeat 21px 0;background-size:226px 104px;border-bottom:1px solid #414242; color: white; background-color: black;}\r\n.map_wrap .header_top h2 {display:flex;align-items:center;}\r\n.map_wrap .header_top h2 .bold {font-size:32px;}\r\n.map_wrap .header_top h2 .sub {font-size:16px;padding-left:12px; color: rgb(190, 186, 186);}\r\n\r\n.map_wrap .header_nav {position:relative;height:84px;background: #fff; padding:0 20%; font-size:0;display:flex;align-items:center;z-index: 2;}\r\n.map_wrap:not(.mobile)::after {content:\"\";position:absolute;top: 163px;height:20px;width:100%;box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.08);z-index:3;}\r\n\r\n.map_wrap .map_body {-webkit-box-flex:1;flex-grow:1;display:flex;width:100%;height:calc(100% - 188px);position:relative;}\r\n.map_wrap .map_body .map_side {width:376px;min-width:376px;background:#edf2f6;flex:0 0 auto;display:flex;flex-direction:column;height:80vh;box-shadow:0 0 4px 0 rgba(51, 51, 51, 0.5);position:relative;z-index:1; overflow-y: scroll;}\r\n\r\n.map_wrap .map_api {position:relative;width:100%;}\r\n\r\n.overlay_wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}\r\n.overlay_wrap * {padding: 0;margin: 0;}\r\n.overlay_wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}\r\n.overlay_wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}\r\n.overlay_wrap .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}\r\n.overlay_wrap .info .title .rating {color:#FF7012}\r\n.overlay_wrap .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}\r\n.overlay_wrap .info .close:hover {cursor: pointer;}\r\n.overlay_wrap .info .body {position: relative;overflow: hidden;}\r\n.overlay_wrap .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}\r\n.overlay_wrap .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}\r\n.overlay_wrap .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}\r\n.overlay_wrap .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}\r\n.overlay_wrap .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}\r\n.overlay_wrap .info .link {color: #5085BB;}\r\n\r\n.side_shop {width:300px; height: 320px; margin:5px auto 15px; background-color: #fff; box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);}\r\n.side_shop:hover {border : 1px solid #FF7012}\r\n.side_shop .thumb {height: 50%;}\r\n.side_shop .info {height: 25%; overflow: hidden; text-overflow: ellipsis; padding: 10px;}\r\n.side_shop .footer {height: 15%;}\r\n\r\n\r\n/* Map Mobile */\r\n.map_wrap.mobile {display:flex;position:relative;-webkit-box-flex:1;-webkit-box-pack:justify;flex-grow:1;flex-direction:column;justify-content:space-between;height:100%;overflow:hidden;background:#fff;}\r\n\r\n.map_wrap.mobile .header_nav {position:relative;height:84px;background: #fff; padding:0 20%; font-size:0;display:flex;align-items:center;z-index: 2; margin-top: 100px;}\r\n\r\n.map_wrap .map_body {-webkit-box-flex:1;flex-grow:1;display:flex;width:100%;height:calc(100% - 188px);position:relative;}\r\n\r\n.map_wrap .map_api {position:relative;width:100%;}\r\n\r\n.mobile .overlay_wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}\r\n.mobile .overlay_wrap * {padding: 0;margin: 0;}\r\n.mobile .overlay_wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}\r\n.mobile .overlay_wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}\r\n.mobile .overlay_wrap .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}\r\n.mobile .overlay_wrap .info .title .rating {color:#FF7012}\r\n.mobile .overlay_wrap .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}\r\n.mobile .overlay_wrap .info .close:hover {cursor: pointer;}\r\n.mobile .overlay_wrap .info .body {position: relative;overflow: hidden;}\r\n.mobile .overlay_wrap .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}\r\n.mobile .overlay_wrap .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}\r\n.mobile .overlay_wrap .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}\r\n.mobile .overlay_wrap .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}\r\n.mobile .overlay_wrap .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}\r\n.mobile .overlay_wrap .info .link {color: #5085BB;}\r\n",""]),n.default=l},514:function(r,n,o){"use strict";n.a=o.p+"3db2b329878806d30b5f263d2fde58b0.png"},516:function(r,n,o){var e=o(131),i=o(513);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var t={insert:"head",singleton:!1};e(i,t);r.exports=i.locals||{}}}]);
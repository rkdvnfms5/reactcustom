import axios from 'axios';
import { length } from 'file-loader';

//shop actions
export function getShopList(shop){
    return axios.get('/api/shop', {
        params : {
            state : shop.state,
            city : shop.city,
            categoryseq : shop.categoryseq,
            search : shop.search,
            order : shop.order,
            limit : shop.limit,
            offset : shop.offset,
            memberseq : shop.memberseq,
            myyn : shop.myyn,
            mythankyn : shop.mythankyn
        }
    })
}

export function getShopOne(seq){
    return axios.get('/api/shop/' + seq)
}

export function insertShop(shop){
    return axios.post('/api/shop', shop)
}

export function updateShop(shop){
    return axios.put('/api/shop/' + shop.seq, shop)
}

export function deleteShop(seq){
    return axios.delete('/api/shop/' + seq)
}

//shopImage actions
export function getShopImageList(seq){
    return axios.get('/api/shopimage/' + seq)
}

export function insertShopImage(image){
    return axios.post('/api/shopimage', image)
}

//shopCategory actions
export function getShopCateogryList(){
    return axios.get('/api/shopcategory')
}

export function insertShopCateogry(category){
    return axios.post('/api/shopcategory', category)
}

//shopThankLog actions
export function getShopThankLog(memberseq, shopseq){
    return axios.get('/api/shopThankLog', {
        params : {
            memberseq : memberseq,
            shopseq : shopseq
        }
    })
}

export function insertShopThankLog(log){
    return axios.post('/api/shopThankLog', log)
}

export function deleteShopThankLog(memberseq, shopseq){
    return axios.delete('/api/shopThankLog', {
        params : {
            memberseq : memberseq,
            shopseq : shopseq
        }
    })
}

export async function registShop(shop, imageList){
    const form = new FormData();

    for (var image of imageList) {
        form.append('imageList', image);
    }

    if(shop.categoryseq == 0 && shop.category != ''){
        let category = {
            name : shop.category,
            register : shop.register
        }
        await axios.post('/api/shopcategory', category).then(res => {
            if(res.status == 200){
                form.append("categoryseq", res.data.insertId);
            }
        })
    } else {
        form.append("categoryseq", shop.categoryseq);
    }

    form.append("title", shop.title);
    
    form.append("price", shop.price);
    form.append("zipcode", shop.zipcode);
    form.append("address", shop.address);
    form.append("addressdetail", shop.addressdetail);
    form.append("menu", shop.menu);
    form.append("content", shop.content);
    form.append("rating", shop.rating);
    form.append("memberseq", shop.memberseq);
    form.append("register", shop.register);
    form.append("category", shop.category);
    form.append("tag", shop.tag);

    return axios.post('/api/shop', form, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export function shopAction(shop){
    return axios.put('/api/shop/action/' + shop.seq, shop);
}

//member actions
export function getMember(member){
    return axios.post('/api/member/get', member)
}

export function insertMember(member){
    return axios.post('/api/member/insert', member)
}

export function disableMember(member){
    return axios.put('/api/member/inactive', member)
}

export function kakaoLogin(member){
    return getMember(member).then(res => {
        if(res.status == 200){
            if(res.data.length > 0) {
                return login(member);
            } else {
                insertMember(member).then(result => {
                    if(result.status == 200) {
                        return login(member);
                    }
                })
            }
        }
    })
}

export function login(member){
    console.log("login action");
    return axios.post("/api/auth/login", {
        params : {
            id : member.id,
            password : member.password,
            profile : member.profile
        }
    });
}

export function logout(){
    return axios.post("/api/auth/logout");
}

export function getLoginInfo(){
    return axios.post("/api/auth/info");
}

export async function goLoginCheck(url){
    const loginInfo = await axios.post("/api/auth/info");
    if(loginInfo.data){
        location.href = url;
    } else {
        alert("로그인이 필요합니다.");
    }
}

export function onLoading(){
    document.getElementById("loading").classList.add("on");
}
export function offLoading(){
    document.getElementById("loading").classList.remove("on");
}

// review action
export function getReviewList(shopseq) {
    return axios.get("/api/review/list/" + shopseq);
}

export function getReviewCount(memberseq, shopseq) {
    return axios.get('/api/review/count', {
        params : {
            memberseq : memberseq,
            shopseq : shopseq
        }
    })
}

export function insertShopReview(review, imageList){
    const form = new FormData();

    for (var image of imageList) {
        form.append('imageList', image);
    }

    form.append("shopseq", review.shopseq);
    form.append("memberseq", review.memberseq);
    form.append("membername", review.membername);
    form.append("comment", review.comment);
    form.append("rating", review.rating);

    return axios.post('/api/review', form, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export function updateShopReview(review){
    return axios.put('/api/review', review);
}

export function insertViewLog(log){
    return axios.post('api/viewLog', log);
}

export function getViewLogList(memberseq){
    return axios.get('api/viewLog', {
        params : {
            memberseq : memberseq
        }
    });
}

export function getCityList(state){
    let list = new Array();
    switch(state) {
        case "서울" :
            list = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
                    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
                    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
            break;
        case "부산" :
            list = ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구',
                    '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'];
            break;
        case "대구" :
            list = ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'];
            break;
        case "인천" :
            list = ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구',
                    '옹진군', '중구'];
            break;
        case "광주" :
            list = ['광산구', '남구', '동구', '북구', '서구'];
            break;
        case "대전" :
            list = ['대덕구', '동구', '서구', '유성구', '중구'];
            break;
        case "울산" :
            list = ['남구', '동구', '북구', '울주군', '중구'];
            break;
        case "세종" :
            list = ['세종시'];
            break;
        case "경기" :
            list = ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시',
                    '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시',
                    '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시',
                    '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'];
            break;
        case "강원" :
            list = ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군',
                    '원주시', '인제군', '정선군', '철원시', '춘천시', '태백시', '평창군', '홍천군',
                    '화천군', '횡성군'];
            break;
        case "충북" :
            list = ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군',
                    '진천군', '청주시', '충주시'];
            break;
        case "충남" :
            list = ['계릉시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시',
                    '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'];
            break;
        case "전북" :
            list = ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군',
                    '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'];
            break;
        case "전남" :
            list = ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시',
                    '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군',
                    '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'];
            break;
        case "경북" :
            list = ['경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군',
                    '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군',
                    '울릉군', '독도', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'];
            break;
        case "경남" :
            list = ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군',
                    '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군',
                    '함양군', '합천군'];
            break;
        case "제주" :
            list = ['서귀포시', '제주시'];
            break;
            
    }
    return list
}

export function openLoginPop(){
    document.getElementById("loginDim").classList.add("on");
}
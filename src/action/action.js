import axios from 'axios';

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
            password : member.password
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
    return axios.put('/api/review', review)
}


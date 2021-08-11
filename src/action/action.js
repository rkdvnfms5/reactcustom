import axios from 'axios';

//shop actions
export function getShopList(){
    return axios.get('/api/shop', {
        params : {

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
    return axios.get('/api/shopcategory/')
}

export function insertShopCateogry(category){
    return axios.post('/api/shopcategory', category)
}

export function registShop(shop){
    insertShop(shop).then((result) => {
        return result;
        //image 저장 로직
        //let shopseq = result.insertId;
        //let data = {shopseq : shopseq, image : image, path : path};
        //insertShopImage(data);
    })
}

export function login(member){
    return axios.post("/api/auth/login", {
        params : {
            id : member.id,
            password : member.password
        }
    });
}

export function getLoginInfo(){
    return axios.post("/api/auth/info");
}

import axios from 'axios';

//shop actions
export function getShopList(shop){
    return axios.get('/api/shop', {
        params : {
            state : shop.state,
            city : shop.city,
            categoryseq : shop.categoryseq,
            search : shop.search,
            order : shop.order
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
    
    form.append("phone", shop.phone);
    form.append("zipcode", shop.zipcode);
    form.append("address", shop.address);
    form.append("addressdetail", shop.addressdetail);
    form.append("url", shop.url);
    form.append("content", shop.content);
    form.append("rating", shop.rating);
    form.append("memberseq", shop.memberseq);
    form.append("register", shop.register);
    form.append("category", shop.category);

    return axios.post('/api/shop', form, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
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

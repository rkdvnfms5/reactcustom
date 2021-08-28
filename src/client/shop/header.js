import React, {useState, useEffect} from 'react';
import { getMember, insertMember, kakaoLogin, getLoginInfo, logout, onLoading, offLoading, goLoginCheck } from '../../action/action';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../../images/logo1.png';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));

export default function Header() {
    const classes = useStyles();
    const [loginInfo, setLoginInfo] = useState(null);

    useEffect(() => {
        getLoginInfo().then(res => {
            console.log(res.status);
            if(res.status == 200){
                if(res.data != '' && res.data != null && res.data != undefined){
                    setLoginInfo(res.data);
                }
                
            }
        })
    }, []);

    const closeLoginPop = () => {
        document.getElementById("loginDim").classList.remove("on");
    }

    const openLoginPop = () => {
        document.getElementById("loginDim").classList.add("on");
    }

    const loginWithKakao = () => {
        onLoading();
        Kakao.Auth.login({
          success: function(authObj) {
            //alert(JSON.stringify(authObj))
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(response) {
                    let id = "kakao_" + response.id;
                    let email = (response.kakao_account.email != undefined ? response.kakao_account.email : '');
                    
                    let properties = response.properties;
                    let name = properties.nickname;
                    let profile_image = properties.profile_image;
                    
                    let member = {
                        id : id,
                        password : id,
                        email : email,
                        name : name,
                        profile : profile_image,
                        snsyn : 'Y'
                    }
                    kakaoLogin(member).then(res => {
                        if(res.status == 200){
                            getLoginInfo().then(result => {
                                if(result.status == 200){
                                    setLoginInfo(result.data);
                                    closeLoginPop();
                                    location.reload();
                                }
                            })
                        }
                    })

                },
                fail: function(error) {
                    console.log(error);
                }
            });
          },
          fail: function(err) {
            alert(JSON.stringify(err))
          },
        })
        offLoading();
    }

    const logoutHandle = () => {
        let flag = confirm("로그아웃 하시겠습니까?");
        if(flag){
            logout().then(res => {
                if(res.status == 200){
                    setLoginInfo(null);
                    location.href="/shop/list";
                }
            })
        }
    }

    const goInsert = () => {
        if(!loginInfo){
            alert("로그인이 필요합니다.");
            return;
        }
        location.href="/shop/insert";
        
    }

    const goMyPage = () => {
        if(!loginInfo){
            alert("로그인이 필요합니다.");
            return;
        }
        location.href="/shop/mypage";
        
    }

    return(
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="fixed" style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}>
                    <Toolbar>
                        <img src={`${Logo}`} style={{height: '64px', cursor:"pointer"}} onClick={() => {location.href='/shop/list'}}/>
                        <Typography variant="h6" className={classes.title}>
                            
                        </Typography>
                        {
                            loginInfo? 
                                <div>
                                    <Avatar alt="" src={loginInfo.profile} onClick={openLoginPop} style={{cursor:"pointer", marginRight: "10px"}}/>
                                </div>
                            :   <div>
                                    <IconButton aria-label="login" color="inherit" onClick={openLoginPop}>
                                        <AccountCircleIcon fontSize="large" />
                                    </IconButton>
                                </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <div id="loginDim">
                <div className="loginPop">
                    <span className="loginPopClose" onClick={closeLoginPop}><CloseIcon style={{width: "30px", height: "30px"}}/></span>
                    {
                        loginInfo?
                        <div style={{textAlign:"center"}}>
                            <Avatar alt="" src={loginInfo.profile} className={classes.large} style={{margin:"0 auto"}}/>
                            <h1 style={{fontsize:"30px"}}>{loginInfo.name}님</h1>
                            <button className="loginBtn insert" onClick={(e) => goLoginCheck("/shop/insert")}>핫집 공유하기</button>
                            <button className="loginBtn myShop" onClick={(e) => goLoginCheck("/shop/mypage")}>마이 푸핫</button>
                            <button className="loginBtn logout" onClick={logoutHandle}>로그아웃</button>
                        </div>
                        :
                        <div style={{textAlign:"center"}}>
                            <h1 style={{fontsize:"30px"}}>로그인</h1>
                            <p style={{fontsize:"16px", color:"#555", marginBottom:"30px"}}>핫한 집을 공유해주세요.</p>
                            {/*<button className="loginBtn kakao" onClick={loginWithKakao}>카카오 로그인</button>*/}
                            <a id="custom-login-btn" onClick={loginWithKakao} style={{cursor:"pointer"}}>
                                <img
                                    src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                                    width="242"
                                />
                            </a>
                        </div>
                    }
                </div>
            </div>

        </React.Fragment>
    );
}
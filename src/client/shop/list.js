import React, {useState, useEffect} from 'react';
import { getShopList, getLoginInfo, getShopCateogryList, onLoading, offLoading, shopAction, getCityList} from '../../action/action';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainBg from '../../../images/main_bg1.jpg';
import { TextField, InputAdornment, InputLabel, FormControl, Select} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Footer from './footer';
import Header from './header';
import Rating from '@material-ui/lab/Rating';
import $ from 'jquery';
import { useInView } from 'react-intersection-observer';
import defaultThumb from '../../../images/default_thumb.png';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${MainBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    height: '500px',
    padding: theme.spacing(24, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      border: '1px solid #FF7012',
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    height: "115px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  searchArea: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
}));

const states = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

export default function List() {
  const [shopList, setShopList] = useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
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

  //페이징
  const [ref, inView] = useInView();
  const [offset, setOffset] = useState(0);
  const moreCnt = 9;
  const [more, setMore] = useState(true);
  
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
          setShop({...shop, memberseq : res.data.seq});
          let memberShop = {...shop, memberseq : res.data.seq};
          getShopList(memberShop).then(result => {
            onLoading();
            if(result.status == 200){
              setShopList(result.data);
            } else {
                console.log(result.status);
            }
            offLoading();
        })
      }
    })
    
    if(shop.state != ''){
      setCityList(getCityList(shop.state));
    }
  }, [shop.state, shop.city, shop.categoryseq, shop.order]); //,[] 안하면 무한루프

  const openSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSort = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if(more){
      let paging = {...shop, offset : offset};
      getShopList(paging).then(res => {
        if(res.status == 200){
            setShopList([...shopList, ...res.data]);  
            if(res.data.length < moreCnt){
              setMore(false);
            }
        }
      })
      setOffset(offset + moreCnt);
      setShop({...shop, limit : (shop.limit + moreCnt)});
    }
  }, [inView])

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom style={{color: 'white'}}>
              핫한 푸드,
            </Typography>
            <Typography component="h1" variant="h2" align="center" gutterBottom style={{color: 'white'}}>
              푸핫
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <div className={classes.searchArea}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="search-area">지역</InputLabel>
              <Select
                native
                value={shop.state}
                label="지역"
                labelId="search-area"
                onChange={(e) => setShop({...shop, state : e.target.value})}
              >
                {
                  states.map((state) => {
                    return(
                      <option value={state}>{state}</option>
                    )
                  })
                } 
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="search-city">도시</InputLabel>
              <Select
                native
                value={shop.city}
                label="도시"
                labelId="search-city"
                onChange={(e) => setShop({...shop, city : e.target.value})}
              >
                <option value='all'>전체</option>
                {
                  cityList.map((city) => {
                    return(
                      <option value={city}>{city}</option>
                    )
                  })
                } 
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="search-category">음식</InputLabel>
              <Select
                native
                value={shop.categoryseq}
                label="음식"
                labelId="search-category"
                onChange={(e) => setShop({...shop, categoryseq : e.target.value})}
              >
                <option value={0}>전체</option>
                {
                  categoryList.map((category) => {
                    return(
                      <option value={category.seq}>{category.name}</option>
                    )
                  })
                }
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="검색"
              onChange={(e) => setShop({...shop, search : e.target.value})}
              onKeyPress = {(e) => {
                  if(e.key == 'Enter'){
                    getShopList(shop).then(res => {
                      onLoading();
                      if(res.status == 200){
                        setShopList(res.data);
                      }
                      offLoading();
                    });
                    
                  }
                }
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle search"
                        edge="end"
                        onClick={(e) => getShopList(shop).then(res => {
                            onLoading();
                            if(res.status == 200){
                              setShopList(res.data);
                            }
                            offLoading();
                        })}
                      >
                        <SearchIcon/>
                      </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" aria-controls="search-sort" aria-haspopup="true" onClick={openSort} style={{height: "56px", float:"right"}}>
              정렬
            </Button>
            <Menu
              id="search-sort"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeSort}
            >
              <MenuItem onClick={(e) => {setShop({...shop, order : 'regdate'}); closeSort();}} selected={shop.order === 'regdate'}>최근순</MenuItem>
              <MenuItem onClick={(e) => {setShop({...shop, order : 'rating'}); closeSort();}} selected={shop.order === 'rating'}>평점순</MenuItem>
              <MenuItem onClick={(e) => {setShop({...shop, order : 'thanks'}); closeSort();}} selected={shop.order === 'thanks'}>인기순</MenuItem>
              <MenuItem onClick={(e) => {setShop({...shop, order : 'views'}); closeSort();}} selected={shop.order === 'views'}>조회순</MenuItem>
            </Menu>
          </div>
          {/* End hero unit */}
          <Grid container spacing={4} id="shopListArea">
            {
              shopList?
                shopList.map((shop, index) => (
                  <React.Fragment key={index}>
                    {
                      shopList.length-1 == index?
                      <Grid item key={shop} xs={12} sm={6} md={4} ref={ref}>
                        <Card className={classes.card}>
                        <a href={`/shop/view/${shop.seq}`}>
                          <CardMedia
                            className={classes.cardMedia}
                            image={shop.thumbnail ? shop.thumbnail:defaultThumb}
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" style={{whiteSpace:"nowrap", overflow : "hidden", textOverflow : "ellipsis"}}>
                              {shop.title}
                            </Typography>
                            <Typography>
                              {shop.categoryName}
                            </Typography>
                            <Typography>
                              {shop.address}
                            </Typography>
                          </CardContent>
                          </a>
                          <CardActions>
                            {
                              shop.thankyn == 'already' ?
                              <IconButton className="favoritList on" aria-label="add to favorites">
                                <FavoriteIcon />
                                {shop.thanks}
                              </IconButton>
                              : 
                              <IconButton className="favoritList" aria-label="add to favorites">
                                <FavoriteIcon />
                                {shop.thanks}
                              </IconButton>
                            }
                            <Rating
                                name="rating"
                                value={shop.rating}
                                precision={0.5}
                                disabled
                                size="small"
                                style={{float:"right"}}
                              />
                          </CardActions>
                        </Card>
                    </Grid>
                      : 
                    <Grid item key={shop} xs={12} sm={6} md={4} >
                      <Card className={classes.card}>
                      <a href={`/shop/view/${shop.seq}`}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={shop.thumbnail ? shop.thumbnail:defaultThumb}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2" style={{whiteSpace:"nowrap", overflow : "hidden", textOverflow : "ellipsis"}}>
                            {shop.title}
                          </Typography>
                          <Typography>
                            {shop.categoryName}
                          </Typography>
                          <Typography>
                            {shop.address}
                          </Typography>
                        </CardContent>
                        </a>
                        <CardActions>
                          {
                            shop.thankyn == 'already' ?
                            <IconButton className="favoritList on" aria-label="add to favorites">
                              <FavoriteIcon />
                              {shop.thanks}
                            </IconButton>
                            : 
                            <IconButton className="favoritList" aria-label="add to favorites">
                              <FavoriteIcon />
                              {shop.thanks}
                            </IconButton>
                          }
                          <Rating
                              name="rating"
                              value={shop.rating}
                              precision={0.5}
                              disabled
                              size="small"
                              style={{float:"right"}}
                            />
                        </CardActions>
                      </Card>
                  </Grid>
                    }
                  </React.Fragment>
                  
                )) : null
            }
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
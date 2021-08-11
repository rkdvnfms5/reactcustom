import React, {useState, useEffect} from 'react';
import { getShopList, getLoginInfo } from '../../action/action';
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
import Logo from '../../../images/logo2.png';
import { TextField, InputAdornment, InputLabel, FormControl, Select} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Footer from './footer';
import Header from './header';

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
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  searchArea: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function Album() {
  const [shopList, setShopList] = useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    getShopList().then(res => {
        if(res.status == 200){
          setShopList(res.data);
        } else {
            console.log(res.status);
        }
    })
    getLoginInfo().then(res => {
        if(res.status == 200){
            setLoginInfo(res.data);
        }
    })
  }, []); //,[] 안하면 무한루프

  const openSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSort = () => {
    setAnchorEl(null);
  };

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
              <InputLabel htmlFor="search-area">지역</InputLabel>
              <Select
                native
                value=""
                label="지역"
                inputProps={{
                  name: 'area',
                  id: 'search-area',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>서울</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="search-food">음식</InputLabel>
              <Select
                native
                value=""
                label="음식"
                inputProps={{
                  name: 'food',
                  id: 'search-food',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>고기</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="검색"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
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
              <MenuItem onClick={closeSort}>최근순</MenuItem>
              <MenuItem onClick={closeSort}>인기순</MenuItem>
              <MenuItem onClick={closeSort}>조회순</MenuItem>
            </Menu>
          </div>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {shopList.map((shop) => (
              <Grid item key={shop} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {shop.title}
                    </Typography>
                    <Typography>
                      {shop.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
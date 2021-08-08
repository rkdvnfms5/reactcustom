import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import MainBg from '../../images/main_bg1.jpg';
import { TextField, InputAdornment, InputLabel, FormControl, Select} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Websited
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  searchArea: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const openSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSort = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            푸핫 이미지
          </Typography>
        </Toolbar>
      </AppBar>
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
        <Container className={classes.cardGrid} maxWidth="md">
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
            </Menu>
          </div>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
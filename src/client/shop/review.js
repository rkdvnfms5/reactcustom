import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));

export default function Review(props) {
    const classes = useStyles();
    const review = props.review;

    return(
        <div className="review">
            <div className="review-profile">
                <Avatar src={review.profile} className={classes.large} style={{margin:"0 auto"}} />
                <br></br>
                <span style={{fontWeight:"bold"}}>{review.membername}</span>
            </div>
            <div className="review-content">
                <div className="date">
                    <span style={{float:"right"}}>{review.moddate ? review.moddate : review.regdate}</span>
                    <Rating
                        name=""
                        value={review.rating}
                        precision={0.5}
                        disabled
                        size="small"
                        style={{marginRight:"5px"}}
                    />
                    <span style={{color: "#FF7012"}}>{review.rating}</span>
                </div>
                <div className="content">
                    {review.comment}
                </div>
                <div className="footer">
                    <span className="edit">
                        <CreateIcon style={{width:"30px", height:"30px"}}/><br></br>
                        <span style={{fontWeight:"bold", fontSize:"14px"}}>수정</span>
                    </span>
                    <span className="delete">
                        <DeleteIcon style={{width:"30px", height:"30px"}}/><br></br>
                        <span style={{fontWeight:"bold", fontSize:"14px"}}>삭제</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
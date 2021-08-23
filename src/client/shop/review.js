import React, { useState } from 'react';
import { updateShopReview, getReviewList, getShopOne } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));

export default function Review(props) {
    const classes = useStyles();
    const review = props.review;

    const [updateReivew, setUpdateReview] = useState({
        seq : review.seq,
        comment : "",
        viewyn : ""
    })

    const deleteHandle = () => {
        let check = confirm("리뷰를 삭제하시겠습니까?");
        if(check) {
            let deleteReview = {
                seq : review.seq,
                viewyn : 'N'
            }
            updateShopReview(deleteReview).then(res => {
                if(res.status == 200){
                    getReviewList(review.shopseq).then(res => {
                        if(res.status == 200){
                            props.setReviewList(res.data);
                            getShopOne(review.shopseq).then(result => {
                                if(result.status == 200){
                                    props.setShop(result.data[0]);
                                }
                            })
                        }
                    })
                }
            })
        }
    }

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
                    <TextField
                        id=""
                        label="리뷰"
                        multiline
                        variant="filled"
                        rows={4}
                        placeholder="리뷰를 입력해주세요."
                        fullWidth
                        onChange = {(e) => setUpdateReview({...updateReview, comment : e.target.value})}
                    />
                </div>
                <div className="footer">
                    <span className="edit">
                        <CreateIcon style={{width:"30px", height:"30px"}}/><br></br>
                        <span style={{fontWeight:"bold", fontSize:"14px"}}>수정</span>
                    </span>
                    <span className="delete" onClick={deleteHandle}>
                        <DeleteIcon style={{width:"30px", height:"30px"}}/><br></br>
                        <span style={{fontWeight:"bold", fontSize:"14px"}}>삭제</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
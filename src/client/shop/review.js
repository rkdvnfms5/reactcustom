import React, { useState } from 'react';
import { updateShopReview, getReviewList, getShopOne } from '../../action/action';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));

export default function Review(props) {
    const classes = useStyles();
    const review = props.review;
    const memberseq = props.memberseq;

    const [updateReview, setUpdateReview] = useState({
        seq : review.seq,
        comment : review.comment,
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

    const modifyHandle = (obj) => {
        updateShopReview(updateReview).then(res => {
            if(res.status == 200){
                getReviewList(review.shopseq).then(res => {
                    if(res.status == 200){
                        props.setReviewList(res.data);
                        offModify(obj);
                    }
                })
            }
        })
    }

    const onModify = (obj) => {
        $(obj).closest("div.review-content").find("div.comment").hide();
        $(obj).closest("div.review-content").find("div.modifyComment").show();
        $(obj).closest("div.review-content").find("span.modifyAction").show();
    }

    const offModify = (obj) => {
        $(obj).closest("div.review-content").find("div.comment").show();
        $(obj).closest("div.review-content").find("div.modifyComment").hide();
        $(obj).closest("div.review-content").find("span.modifyAction").hide();
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
                    <div className="comment">{review.comment}</div>
                    <div className="modifyComment" style={{display:"none"}}>
                        <TextField
                            label="리뷰"
                            multiline
                            variant="filled"
                            rows={4}
                            placeholder="리뷰를 입력해주세요."
                            fullWidth
                            value={updateReview.comment}
                            onChange = {(e) => setUpdateReview({...updateReview, comment : e.target.value})}
                        />
                    </div>
                </div>
                <div className="footer">
                    {
                        memberseq == review.memberseq ?
                        <span>
                            <span className="edit" onClick={(e) => onModify(e.target)}>
                                <CreateIcon style={{width:"30px", height:"30px"}}/><br></br>
                                <span style={{fontWeight:"bold", fontSize:"14px"}}>수정</span>
                            </span>
                            <span className="delete" onClick={deleteHandle}>
                                <DeleteIcon style={{width:"30px", height:"30px"}}/><br></br>
                                <span style={{fontWeight:"bold", fontSize:"14px"}}>삭제</span>
                            </span>
                        </span>
                        : null
                    }
                    
                    {
                        review.imageList ? 
                        <span className="reviewImageArea">
                            {review.imageList.map((image, index) => {
                                if(index < 3){
                                    return(<span className="reviewImage" onClick={(e) => props.openZoom(review.imageList, index)}>
                                    <img src={image} />
                                    {
                                        review.imageList.length > 3?
                                        <span className="more">
                                            <span>+{review.imageList.length-3}</span>
                                        </span>
                                        : null
                                    }
                                    </span>)
                                }
                            }
                                
                            )}
                        </span>
                        : null
                    }

                    <span className="modifyAction" style={{display:"none", float:"right"}}>
                        <span className="cancel" style={{marginRight: "20px"}} onClick={(e) => offModify(e.target)}>
                            <CloseIcon style={{width:"30px", height:"30px"}}/><br></br>
                            <span style={{fontWeight:"bold", fontSize:"14px"}}>취소</span>
                        </span>
                        <span className="done" onClick={(e) => modifyHandle(e.target)}>
                            <DoneIcon style={{width:"30px", height:"30px"}}/><br></br>
                            <span style={{fontWeight:"bold", fontSize:"14px"}}>등록</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}
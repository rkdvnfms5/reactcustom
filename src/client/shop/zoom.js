import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Zoom(props) {
    const idx = props.idx;
    const imageList = props.imageList;
    const zoomSlider = useRef();
    const getZoomList = props.getZoomList;
    const slickSetting = {
        dots : true,
        infinite : false,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1
    }

    useEffect(() => { 
        if(imageList.length >0){
            zoomSlider.current.slickGoTo(idx);
            document.getElementById("zoom").classList.add("on");
        }
        
    }, [imageList, idx])

    return(
        <div id="zoom" className="zoomDim">
            <div className="zoomImageBox">
                <div style={{position:"relative", width:"100%", height:"100%"}}>
                    <span className="zoomImageClose" onClick={(e) => {document.getElementById("zoom").classList.remove("on")}}><CloseIcon style={{width: "50px", height: "50px"}}/></span>
                    <div className="zoomImage">
                        <Slider ref={zoomSlider} {...slickSetting}>
                            {
                                imageList.length > 0 ? imageList.map((image, index) => {
                                    return(
                                        <img src={image.path + image.image} />
                                    );
                                }) : null
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
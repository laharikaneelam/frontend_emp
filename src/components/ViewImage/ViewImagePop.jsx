import React, {Fragment} from "react";

const ViewImagePop = (props) =>{
    // console.log(props.ImageValue);
    return (
        <Fragment>
            <div>
                <div className="pop_img_view">
                    <img src={`https://cloudscouts.pro/empapi/`+props.ImageValue} alt="" />
                </div>
            </div>
        </Fragment>
    )
}
export default ViewImagePop;
// import React, {Fragment, useState } from 'react';
// import Avatar from 'react-avatar-edit';
// import ReactDOM from 'react-dom'

// const Upload_User_Image = () => {
// //   constructor(props) {
// //     super(props)

// //   }
//     const [imgageCrop, SetImgCrop]=useState(false);
//   const handleUpload = () => {

//     const onCrop = (view) =>{
//         SetImgCrop(view);
//     }

//     const onClose = () =>{
//         SetImgCrop(null);
//     }
//     //add here the upload logic...
//   }
// //   this.onCrop = this.onCrop.bind(this)
// //   this.onClose = this.onClose.bind(this)
//     return (
//         <Fragment>
//             <form onSubmit={handleUpload}>
//                 <Avatar
//                 width={400}
//                 height={400}
//                 onCrop={onCrop}
//                 onClose={onClose}
//                 />
//             </form>
//         </Fragment>
       
//     )
// }

// export default Upload_User_Image;



// import React, {Fragment, useState } from 'react';


// import Avatar from "react-avatar-edit";

// const Upload_User_Image = (props) => {
//   const [preview, setPreview] = useState(false);
//   const [storeImage, SetstoreImage] = useState([]);
//   const onClose = () =>{
//     setPreview(null);
//   }
//   const onCrop =(pv) => {
//     setPreview(pv);
//   }
//   const onBeforeFileLoad = (elem) => {
//     console.log(elem.target.files[0]);
//     if (elem.target.files[0].size > 71680) {
//       alert("File is too big!");
//       elem.target.value = "";
//     }
//   }
//   const SaveImage = () =>{
//     SetstoreImage([...storeImage, {preview}]);
//     // submitHandlerVal();
//     // props.onAddImage(PreviewImageVlaue);
//     // props.onAddRow('1');
//   }
//   const PreviewImageVlaue= storeImage.map(item=>item.preview);
//   // if(PreviewImageVlaue.length < 0){
//     console.log(PreviewImageVlaue );
//   // }
  
  
  
//   return (
//     <div>
//       <Avatar
//         width={300}
//         height={300}
//         onCrop={onCrop}
//         onClose={onClose}
//         onBeforeFileLoad={onBeforeFileLoad}
//         src={null}
//       />
//       <button onClick={SaveImage}>Save</button>
//     </div>
//   );
// }
// export default Upload_User_Image;





import {Fragment, useState,React } from 'react';
import classes from '../Employee/EmployeeForm.module.scss';
import swal from 'sweetalert';
import axios from 'axios';

import Avatar from "react-avatar-edit";

const Upload_User_Image = (props) => {
  // console.log(props);
  // const [preview, setPreview] = useState(false);
  // const [storeImage, SetstoreImage] = useState([]);
  // const onClose = () =>{
  //   setPreview(null);
  // }
  // const onCrop =(pv) => {
  //   setPreview(pv);
  // }
  // const onBeforeFileLoad = (elem) => {
  //   console.log(elem.target.files[0]);
  //   if (elem.target.files[0].size > 71680) {
  //     alert("File is too big!");
  //     elem.target.value = "";
  //   }
  // }
  // const SaveImage = () =>{
  //   SetstoreImage([...storeImage, {preview}]);
  //   // submitHandlerVal();
  //   // props.onAddImage(PreviewImageVlaue);
  //   // props.onAddRow('1');
  // }
  // const PreviewImageVlaue= storeImage.map(item=>item.preview);
  // // if(PreviewImageVlaue.length < 0){
  //   console.log(PreviewImageVlaue );
  // // }

  const [logo_img, setLogo_img] = useState('');
  const [logo_img_prvw, setLogo_img_prvw] = useState('');
  const logo_img_Handler =(event) =>{
      // console.log(event.target.files.length);
      // setLogo_img(event.target.files[0]['name']);
      setLogo_img(event.target.files[0]);
      if(event.target.files.length > 0){
        setLogo_img_prvw(URL.createObjectURL(event.target.files[0]));
      }
      
  }
  const orgSubmitHandler = (event) =>{ 
    // console.log(logo_img.name);
    event.preventDefault();
    if(logo_img.name !=''){
        const data_innfo={
            // first_name: state.name,
            // ac_type: state.ac_type,
            // R_ID: row_id,
            file_id : logo_img,
            employ_id:props.editedID,
            on_board_dd: 'Save',
        }
        // console.log(data_innfo);
        axios({
            method: "post",
            url: process.env.REACT_APP_USERS_PROFILE_IMG_UPLOAD,
            headers: { "content-type": "multipart/form-data" },
            data: data_innfo
        })
        .then(result => {
            swal({
                icon: result.data.msg_type.toLowerCase(),
                title: result.data.msg_type,
                text: result.data.sent,
            });
            if(result.data.msg_type=='Success'){
                props.onAddRow('1');
                props.onAddImage(logo_img);    
            }
            // onChange
            // console.log(result.data.sent);
        })
        .catch(error => console.log(error.message));
    }else{
        swal({
            icon: "error",
            title: "Error",
            text: "Enter all mandatory fileds",
        });
    }
  }
  return (
    <div>
       <form className={classes.l_form}  onSubmit={orgSubmitHandler}>
          {logo_img_prvw && 
                <div className='user_image_pop m-auto'>
                  <img src={logo_img_prvw} alt="" className="image" />
                </div>
            }
          <input type="file" id="logo_img" onChange={logo_img_Handler} onBlur={logo_img_Handler} className={`${classes.inputText}`}  />
          <button className="float-end">Save</button>
      </form>
    </div>
  );
}
export default Upload_User_Image;
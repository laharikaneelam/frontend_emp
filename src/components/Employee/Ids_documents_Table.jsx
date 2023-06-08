// import React, { useReducer } from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdModeEdit} from "react-icons/md";
import {AiOutlineUserAdd} from "react-icons/ai";
// import Input from '@mui/material/Input';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import classes from './EmployeeForm.module.scss';
import Model from '../Model/Model';
import Ids_Documents_Form from './Ids_Documents_Form';
import {MdVerified} from "react-icons/md";
import { RxCrossCircled }  from "react-icons/rx";
import ViewImagePop from '../ViewImage/ViewImagePop';
// import { FiCheck }  from "react-icons/fi";
import { AiFillEye }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';


const Ids_documents_Table = (props) =>{
    // console.log(props);
    const [modelshow, setModelShow]=useState(false);
    const [Imgmodelshow, setImgModelShow]=useState(false);
    const [ImgViewId, setImgViewId]=useState('');
    const [editedRowId, setEditedRowId]=useState('');
    const [rows, setRows]=useState('');
    const [ModelTitle, SetModelTitle]=useState('Add IDs');
    const [dataCanged, setDataCanged] = useState(false);
    const closeModel =() =>{
      setModelShow(false);
    }
    const setEnditedIdHander = (e) =>{
        // console.log(e);
        setEditedRowId(e);
        setModelShow(true);
    }
    const setImagePopUpEnditedIdHander = (e) =>{
        // console.log(e);
        // setEditedRowId(e);
        setImgViewId(e);
        setImgModelShow(true);
    }
    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
            dd_up_ID: props.editable_id,
        }
        // console.log(data_innfo);
        axios({
            method: "post",
            url: process.env.REACT_APP_USERS_IDS_DOCS_LIST_INFO,
            headers: { "content-type": "application/json" },
            data: data_innfo
        })
        .then(result => {
            setRows(result.data);
        })
        setDataCanged(false);
    }, [dataCanged])
    // console.log(rows);

    const deleteSelected =(e) =>{
        // console.log(e);

        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => { 
            if(e.length!==0){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                R_ID: e.r_id,
                dc_type: e.type_v,
                employ_id:props.editable_id,
                on_board_dd: "Delete",
            }
              axios({
                method: "post",
                url: process.env.REACT_APP_USERS_IDS_DOCS_DLT_INFO,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
              // console.log(result.data);
              // alert(result.data.response);
              swal({
                icon: result.data.msg_type.toLowerCase(),
                title: result.data.msg_type,
                text: result.data.sent,
              });
              setDataCanged(true);
            }) 
            .catch(error => console.log(error.message));
            }
        });
    }
    return (
        <section>
            {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Ids_Documents_Form editedID={props.editable_id} editedTableID={editedRowId} onAddRow={() => {setModelShow(false)}} onChange={() => setDataCanged(true)} /></Model>}
            {Imgmodelshow && <Model title={ModelTitle} onConfirm={() => {setImgModelShow(false)}}><ViewImagePop ImageValue={ImgViewId} /></Model>}
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            // autoComplete="off"
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="table-responsive">
                        <table className="table pt-5">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Verification</th>
                                    <th style={{width: '80px', textAlign: 'center'}}>
                                        <button style={{margin: '0px', fontSize:'1rem'}} type="button" className="add_new" onClick={() => {setModelShow(true);setEnditedIdHander('')}}>+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.length > 0 && rows.map((row) => {
                                    return (
                                    <tr id={row.r_id} key={row.r_id}>
                                        <td>{row.type_v}</td>
                                        <td>{row.verification==='Verified' ? <MdVerified className="verified" /> : <RxCrossCircled  className="not_verified" />} {row.verification}</td>
                                        <td className='align_center'>
                                            <button style={{margin: '0px'}} type="button" onClick={() => {setImagePopUpEnditedIdHander(row.flie_name); SetModelTitle(row.type_v)}} className='color_gry font_15'><AiFillEye /></button>
                                            <button style={{margin: '0px'}} type="button" onClick={() => {setEnditedIdHander(row); SetModelTitle(row.type_v)}} className='color_gry font_15'><MdModeEdit /></button>
                                            <button style={{margin: '0px'}} onClick={() => {deleteSelected(row)}}  type="button" className='color_gry font_15'><RiDeleteBin6Line /></button>
                                        </td>
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Ids_documents_Table;
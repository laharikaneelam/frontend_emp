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
import Emergency_Contact_From from './Emergency_Contact_From';
// import { BiEditAlt }  from "react-icons/bi";
// import { FiCheck }  from "react-icons/fi";
// import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';


const Emegency_Contact_Table = (props) =>{
    const [modelshow, setModelShow]=useState(false);
    const [editedRowId, setEditedRowId]=useState('');
    const [rows, setRows]=useState('');
    const [ModelTitle, SetModelTitle]=useState('Add Emergency Contact');
    const [dataCanged, setDataCanged] = useState(false);
    const closeModel =() =>{
      setModelShow(false);
    }
    const setEnditedIdHander = (e) =>{
        // console.log(e);
        setEditedRowId(e);
        setModelShow(true);
    }
    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
            dd_up_ID: props.editable_id,
        }
        // console.log(data_innfo);
        axios({
            method: "post",
            url: process.env.REACT_APP_EMERGENCY_INFO_LIST,
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
                R_ID: e,
                employ_id:props.editable_id,
                on_board_dd: "Delete",
            }
              axios({
                method: "post",
                url: process.env.REACT_APP_EMERGENCY_INFO_DLT,
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
            {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Emergency_Contact_From editedID={props.editable_id} editedTableID={editedRowId} onAddRow={() => {setModelShow(false)}} onChange={() => setDataCanged(true)} /></Model>}
            <header>
                Emergency Contact
                {/* <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button> */}
                {/* <div className="float-end">
                    <button type="button" className="add_new"><AiOutlineUserAdd /> Add</button>
                </div> */}
            </header>
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
                                    <th>Name</th>
                                    <th>Relation</th>
                                    <th>Phone No.</th>
                                    <th style={{width: '80px', textAlign: 'center'}}>
                                        <button style={{margin: '0px', fontSize:'1rem'}} type="button" className="add_new" onClick={() => {setModelShow(true);setEnditedIdHander('')}}>+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.length > 0 && rows.map((row) => {
                                    return (
                                    <tr id={row.r_id} key={row.r_id}>
                                        <td>
                                            {row.name}
                                        </td>
                                        <td>{row.relation}</td>
                                        <td>{row.phone}</td>
                                        <td className='align_center'>
                                            <button style={{margin: '0px'}} type="button" onClick={() => {setEnditedIdHander(row); SetModelTitle('Update Emergency Contact')}} className='color_gry font_15'><MdModeEdit /></button>
                                            <button style={{margin: '0px'}} onClick={() => {deleteSelected(row.r_id)}}  type="button" className='color_gry font_15'><RiDeleteBin6Line /></button>
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
export default Emegency_Contact_Table;
import React, { useReducer } from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdModeEdit} from "react-icons/md";
import {AiOutlineUserAdd} from "react-icons/ai";
import college from '../../assets/college_icon.png';
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
import Education_Info_Form from './Education_Info_Form';
// import { BiEditAlt }  from "react-icons/bi";
// import { FiCheck }  from "react-icons/fi";
// import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';


const Education_Info_Table = (props) =>{
    const [modelshow, setModelShow]=useState(false);
    const [editedRowId, setEditedRowId]=useState('');
    const [rows, setRows]=useState('');
    const [ModelTitle, SetModelTitle]=useState('Add Educational Info');
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
            url: process.env.REACT_APP_EDUCATIONAL_INFO_LIST,
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
                url: process.env.REACT_APP_EDUCATIONAL_INFO_DLT,
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
            {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Education_Info_Form editedID={props.editable_id} editedTableID={editedRowId} onAddRow={() => {setModelShow(false)}} onChange={() => setDataCanged(true)} /></Model>}
            <header>
                Educational Info
                {/* <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button> */}
                <div className="float-end">
                    {/* <button type="button" className="add_new"><AiOutlineUserAdd /> Add</button> */}
                    <button style={{margin: '0px'}} type="button" className="add_new" onClick={() => {setModelShow(true);}}><AiOutlineUserAdd /> Add</button>
                </div>

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
                    {/* <div className="table-responsive">
                        <table className="table pt-5">
                            <thead>
                                <tr>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th style={{width: '100px'}}>From</th>
                                    <th style={{width: '100px'}}>To</th>
                                    <th style={{width: '80px'}}>
                                        <button style={{margin: '0px'}} type="button" className="add_new" onClick={() => {setModelShow(true);}}>+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.length > 0 && rows.map((row) => {
                                    return (
                                    <tr id={row.r_id} key={row.r_id}>
                                        <td>{row.department}</td>
                                        <td>{row.designation}</td>
                                        <td className='align_center'>{row.dt_frm}</td>
                                        <td className='align_center'>{row.dt_to}</td>
                                        <td className='align_center'>
                                            <button style={{margin: '0px'}} type="button" onClick={() => {setEnditedIdHander(row)}} className='color_gry font_15'><MdModeEdit /></button>
                                            <button style={{margin: '0px'}} onClick={() => {deleteSelected(row.r_id)}}  type="button" className='color_gry font_15'><RiDeleteBin6Line /></button>
                                        </td>
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                    </div> */}
                    <div className="educationl_info">
                        {rows && rows.length > 0 && rows.map((row) => {
                        return (
                            <div className="row educationl_info_tab" id={row.r_id} key={row.r_id} style={{color: '#626262', fontSize: '0.9em'}}>
                                <div className="col-sm-3 educationl_info_icon">
                                    <div>{row.qualification}</div>
                                    <img src={college} alt="" className="image" />
                                </div>
                                <div className="col-sm-9 educationl_info_cntnt">
                                    <button style={{margin: '0px'}} onClick={() => {deleteSelected(row.r_id)}}  type="button" className='color_gry font_15'><RiDeleteBin6Line /></button>
                                    <button style={{margin: '0px'}} type="button" onClick={() => {setEnditedIdHander(row)}} className='color_gry font_15'><MdModeEdit /></button>
                                    <div>{row.college_name}</div>
                                    <div>{row.course}</div>
                                    <div>{row.steam}</div>
                                    <div>{row.course_type}</div>
                                    <div>{row.frm_dt} - {row.to_dt}</div>
                                    <div>{row.college_name}</div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Education_Info_Table;
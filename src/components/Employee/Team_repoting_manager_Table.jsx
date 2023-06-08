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
import Repoting_Manager_Form from './Repoting_Manager_Form';
// import { BiEditAlt }  from "react-icons/bi";
// import { FiCheck }  from "react-icons/fi";
// import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';


const Team_repoting_manager_Table = (props) =>{
    const [modelshow, setModelShow]=useState(false);
    const [editedRowId, setEditedRowId]=useState('');
    const [rows, setRows]=useState('');
    const [ModelTitle, SetModelTitle]=useState('Add Reporting Manager');
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
            url: process.env.REACT_APP_REPORTING_MNGR_LIST,
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
                url: process.env.REACT_APP_REPORTING_MNGR_DLT,
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
    const [idV, setIdV]=useState(''); // getting data api
    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
        }
        axios({
        method: "post",
        url: process.env.REACT_APP_USER_DROPDOWN_LIST,
        headers: { "content-type": "application/json" },
        data: data_innfo
        })
        .then(result => {
            // setRows(result.data);
            setIdV(result.data);
            // console.log(result.data);
        })
    }, [])
    // console.log(idV);
    return (
        <section>
            {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><Repoting_Manager_Form editedID={props.editable_id} editedTableID={editedRowId} onAddRow={() => {setModelShow(false)}} onChange={() => setDataCanged(true)} /></Model>}
            <header>
                Reporting Manager
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
                                    <th>Type</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th style={{width: '80px', textAlign: 'center'}}>
                                        <button style={{margin: '0px', fontSize:'1rem'}} type="button" className="add_new" onClick={() => {setModelShow(true);}}>+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows && rows.length > 0 && rows.map((row) => {
                                    return (
                                    <tr id={row.r_id} key={row.r_id}>
                                        <td>
                                            {/* {row.Name} */}
                                            {
                                                idV.length > 0 && idV.filter((ocuntry) => ocuntry.vl === row.Name).map( (getcountry)=>(
                                                <span>{getcountry.name}</span> 
                                                ))
                                            }
                                        </td>
                                        <td>{row.Type}</td>
                                        <td>{row.department}</td>
                                        <td>{row.designation}</td>
                                        <td className='align_center'>
                                            <button style={{margin: '0px'}} type="button" onClick={() => {setEnditedIdHander(row); SetModelTitle('Update Reporting Manager')}} className='color_gry font_15'><MdModeEdit /></button>
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
export default Team_repoting_manager_Table;
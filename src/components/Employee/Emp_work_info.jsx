import React, { useReducer } from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import classes from './EmployeeForm.module.scss';
// import { RiDashboardLine, RiOrganizationChart } from "react-icons/ri";
// import { ImOffice }  from "react-icons/im";
// import { BsFillTelephoneFill }  from "react-icons/bs";
// import { MdEmail }  from "react-icons/md";
import { BiEditAlt }  from "react-icons/bi";
import { FiCheck }  from "react-icons/fi";
import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';
const initialState = {
    designation: '',
    job_ttl: '',
    dprtmnt: '',
    sub_dprtmnt: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
switch (action.type) {
    case 'SET_DESIGNATION':
    return { ...state, designation: action.payload };
    case 'SET_JOB_TTL':
    return { ...state, job_ttl: action.payload };
    case 'SET_DPRTMNT':
    return { ...state, dprtmnt: action.payload };
    case 'SET_SUB_DPRTMNT':
    return { ...state, sub_dprtmnt: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

const Emp_work_info = (props) =>{
    // console.log(props.editable_id);
    // const [rowVlues, setRows] = useState('');
    const [rowid, setRowsId] = useState('');
    useEffect(() => {
        if(props.editable_id!=''){
            // console.log(va);
            // setBtn_name('Update');
            const data_innfo={
                dd_id_v:props.editable_id,
                dd_up: 'get_emp_work_info',
            }
            axios({
                method: "post",
                url: process.env.REACT_APP_PERSONAL_INFO_KEY,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // setRows(result.data);
                // console.log(result.data);
                setRowsId(result.data[0]['row_id']);
                dispatch({ type: `SET_DESIGNATION`, payload: result.data[0]['designation'] });
                dispatch({ type: `SET_JOB_TTL`, payload: result.data[0]['job_title'] });
                dispatch({ type: `SET_DPRTMNT`, payload: result.data[0]['department'] });
                dispatch({ type: `SET_SUB_DPRTMNT`, payload: result.data[0]['sub_department'] });
            })
        }
        // setDataCanged(false);
    }, [])
    const [readonly, setReadonly] = useState(true);
    const handleSubmit = (e) => { 
        e.preventDefault();
        // console.log(state);
        if(state.designation.length > 0 && state.job_ttl.length > 0 && state.dprtmnt.length > 0 && state.sub_dprtmnt.length > 0){
            const data_innfo={
                row_id: rowid,
                designation: state.designation,
                job_ttl: state.job_ttl,
                dprtmnt : state.dprtmnt,
                sub_dprtmnt : state.sub_dprtmnt,
                on_board_dd: 'update_emp_work_info',
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_UP_PERSONAL_INFO_KEY,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // console.log(result.data);
                // alert(result.data.sent);
                swal({
                    // title: "Success",
                    // text: result.data.sent,
                    // icon: "success",
                    title: result.data.msg_type,
                    text: result.data.sent,
                    // icon: result.data.msg_type.toLowerCase(),
                });
                if(result.data.msg_type=='Success'){
                    setReadonly(true);
                }
                // props.onAddRow('1');
                // props.onChange('');
                // console.log(result.data.sent);
            })
            .catch(error => console.log(error.message));
            
        }else{
            swal({
                title: 'Error',
                text: "Enter all required information",
            });
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`SET_${name.toUpperCase()}`);
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    };
    
    return (
        <section>
            <header>
                Work Info
                <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button>
            </header>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            // autoComplete="off"
            onSubmit={handleSubmit}
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="">Designation</label>
                            {readonly && <p>{state.designation}</p>}
                            {!readonly && <Input type="text" defaultValue="" name="designation" value={state.designation} onChange={handleInputChange}/>}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Job Title</label>
                            {readonly && <p>{state.job_ttl}</p>}
                            {!readonly && <Input type="text" defaultValue="" name="job_ttl" value={state.job_ttl} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Department</label>
                            {readonly && <p>{state.dprtmnt} Days</p>}
                            {!readonly &&  <Input type="text" name="dprtmnt" defaultValue=""  value={state.dprtmnt} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Sub Department</label>
                            {readonly && <p>{state.sub_dprtmnt}</p>}
                            {!readonly && <Input type="text" name="sub_dprtmnt" defaultValue=""  value={state.sub_dprtmnt} onChange={handleInputChange} />}
                        </div>
                        {!readonly && <div className="row">
                            <div className="col-sm-12">
                                <button type='submit' className="float-end"><FiCheck />Save</button>
                                <button type="button" onClick={() => setReadonly(!readonly)} className="float-end cancel_btn"><AiOutlineClose />Cancel</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Emp_work_info;
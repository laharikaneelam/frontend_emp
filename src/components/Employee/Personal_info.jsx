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
    name: '',
    middle_name: '',
    last_name: '',
    DOB: '',
    gender: '',
    blood_group: '',
    martial_status: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
switch (action.type) {
    case 'SET_FIRST_NAME':
    return { ...state, name: action.payload };
    case 'SET_MIDDILE_NAME':
    return { ...state, middle_name: action.payload };
    case 'SET_LAST_NAME':
    return { ...state, last_name: action.payload };
    case 'SET_DOB':
    return { ...state, DOB: action.payload };
    case 'SET_GENDER':
    return { ...state, gender: action.payload };
    case 'SET_BLOOD_GROUP':
        return { ...state, blood_group: action.payload };
    case 'SET_MARTIAL_STATUS':
        return { ...state, martial_status: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

const Personal_info = (props) =>{
    // console.log(props.editable_id);
    // const [rowVlues, setRows] = useState('');
    const [rowid, setRowsId] = useState('');
    useEffect(() => {
        if(props.editable_id!=''){
            // console.log(va);
            // setBtn_name('Update');
            const data_innfo={
                dd_id_v:props.editable_id,
                dd_up: 'get_prsnl',
            }
            axios({
                method: "post",
                url: process.env.REACT_APP_PERSONAL_INFO_KEY,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // setRows(result.data);
                setRowsId(result.data[0]['row_id']);
                dispatch({ type: `SET_FIRST_NAME`, payload: result.data[0]['first_name'] });
                dispatch({ type: `SET_MIDDILE_NAME`, payload: result.data[0]['middle_name'] });
                dispatch({ type: `SET_LAST_NAME`, payload: result.data[0]['last_name'] });
                dispatch({ type: `SET_DOB`, payload: result.data[0]['DOB'] });
                dispatch({ type: `SET_GENDER`, payload: result.data[0]['gender'] });
                dispatch({ type: `SET_BLOOD_GROUP`, payload: result.data[0]['blood_group'] });
                dispatch({ type: `SET_MARTIAL_STATUS`, payload: result.data[0]['martial_status'] });
            })
        }
        // setDataCanged(false);
    }, [])
    const [readonly, setReadonly] = useState(true);
    const handleSubmit = (e) => { 
        e.preventDefault();
        // console.log(state);
        if(state.name.length > 0 && state.last_name.length > 0){
            const data_innfo={
                row_id: rowid,
                first_name: state.name,
                middle_name: state.middle_name,
                last_name : state.last_name,
                DOB : state.DOB,
                blood_group: state.blood_group,
                gender: state.gender,
                martial_status: state.martial_status,
                on_board_dd: 'update_personal',
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
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    };
    
    return (
        <section>
            <header>
                Personal Info
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
                        <div className="col-sm-4">
                            <label htmlFor="">First Name<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.name}</p>}
                            {!readonly && <Input defaultValue="" name="first_name" value={state.name} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Middle Name</label>
                            {readonly && <p>{state.middle_name}</p>}
                            {!readonly && <Input defaultValue="" name="middle_name" value={state.middle_name} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Last Name<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.last_name}</p>}
                            {!readonly && <Input defaultValue="" name="last_name" value={state.last_name} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Date Of Birth<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.DOB}</p>}
                            {!readonly && <Input type="date" defaultValue="" name="DOB" value={state.DOB} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-4">
                            <div>
                            <label htmlFor="">Gender<span className='imp_clss'>*</span></label>
                            </div>
                            {readonly && <p>{state.gender=='M' ? 'Male' : state.gender=='F' ? 'Female' : ''}</p>}
                            {!readonly && <label style={{display: 'inline'}} htmlFor=""><input type="radio" name="gender" value="M" checked={state.gender==='M'} onChange={handleInputChange} /> Male</label>}
                            {!readonly && <label style={{marginLeft : '15px', display: 'inline'}} htmlFor=""><input type="radio" name="gender" checked={state.gender==='F'}  value="F" onChange={handleInputChange} /> Female</label>}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Blood Group<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.blood_group}</p>}
                            {/* {!readonly &&  <Input type="text" name="blood_group" defaultValue="" value={state.blood_group} onChange={handleInputChange}  />} */}
                            {/* <select class="mdb-select  custom-select iconPos " name="bloodGroup" id="bloodGroup">
                                                            <option value="">Blood Group</option>
                                                            <option value="1">A +</option>
                                                            <option value="2">
                                                                A -</option>
                                                            <option value="3">
                                                                B +</option>
                                                            <option value="4">
                                                                B -</option>
                                                            <option value="5">
                                                                O +</option>
                                                            <option value="6">
                                                                O -</option>
                                                            <option value="7">AB +</option>
                                                            <option value="8">AB -</option>
                                                        </select> */}
                            {!readonly &&  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}><Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="blood_group" defaultValue="" value={state.blood_group} onChange={handleInputChange}
                                >
                                <MenuItem value="">Blood Group</MenuItem>
                                <MenuItem value="A +">A +</MenuItem>
                                <MenuItem value="A -">A -</MenuItem>
                                <MenuItem value="B +">B +</MenuItem>
                                <MenuItem value="B -">B -</MenuItem>
                                <MenuItem value="O +">O +</MenuItem>
                                <MenuItem value="O -">O -</MenuItem>
                                <MenuItem value="AB +">AB +</MenuItem>
                                <MenuItem value="AB -">AB -</MenuItem>
                            </Select></FormControl>}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Martial Status<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.martial_status}</p>}
                            {/* {!readonly && <Input type="text" name="martial_status" defaultValue="" value={state.martial_status} onChange={handleInputChange}  />} */}
                            {/* {!readonly && <select class="mdb-select custom-select iconPos"  name="martial_status" defaultValue="" value={state.martial_status} onChange={handleInputChange}>
                                <option value="">Marital Status</option>
                                <option value="1">Married</option>
                                <option value="2">Single</option>
                            </select>} */}
                            {!readonly &&  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}><Select
                                
                                name="martial_status" defaultValue="" value={state.martial_status} onChange={handleInputChange}
                                >
                                <MenuItem value="">Marital Status</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Single">Single</MenuItem>
                                {/* <MenuItem value="">Blood Group</MenuItem>
                                <MenuItem value="1">A +</MenuItem>
                                <MenuItem value="2">A -</MenuItem>
                                <MenuItem value="3">B +</MenuItem>
                                <MenuItem value="4">B -</MenuItem>
                                <MenuItem value="5">O +</MenuItem>
                                <MenuItem value="6">O -</MenuItem>
                                <MenuItem value="7">AB +</MenuItem>
                                <MenuItem value="8">AB -</MenuItem> */}
                            </Select></FormControl>}
                        </div>
                        {!readonly && <div className="row">
                            <div className="col-sm-12">
                                <button type='submit' className="float-end"><FiCheck />Save</button>
                                <button type="button"  onClick={() => setReadonly(!readonly)} className="float-end cancel_btn"><AiOutlineClose />Cancel</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Personal_info;
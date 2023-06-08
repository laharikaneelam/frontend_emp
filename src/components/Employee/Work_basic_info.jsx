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
    emp_id: '',
    DOJ: '',
    probatin_prd: '',
    emp_type: '',
    wrk_loc: '',
    emp_status: '',
    work_exp_yrs: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
switch (action.type) {
    case 'SET_EMP_ID':
    return { ...state, emp_id: action.payload };
    case 'SET_DOJ':
    return { ...state, DOJ: action.payload };
    case 'SET_PROBATIN_PRD':
    return { ...state, probatin_prd: action.payload };
    case 'SET_EMP_TYPE':
    return { ...state, emp_type: action.payload };
    case 'SET_WRK_LOC':
    return { ...state, wrk_loc: action.payload };
    case 'SET_EMP_STATUS':
        return { ...state, emp_status: action.payload };
    case 'SET_WORK_EXP_YRS':
        return { ...state, work_exp_yrs: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

const Work_basic_info = (props) =>{
    // console.log(props.editable_id);
    // const [rowVlues, setRows] = useState('');
    const [rowid, setRowsId] = useState('');
    useEffect(() => {
        if(props.editable_id!=''){
            // console.log(va);
            // setBtn_name('Update');
            const data_innfo={
                dd_id_v:props.editable_id,
                dd_up: 'get_work_basic',
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
                dispatch({ type: `SET_EMP_ID`, payload: result.data[0]['emp_ID'] });
                dispatch({ type: `SET_DOJ`, payload: result.data[0]['date_of_joining'] });
                dispatch({ type: `SET_PROBATIN_PRD`, payload: result.data[0]['probation_period'] });
                dispatch({ type: `SET_EMP_TYPE`, payload: result.data[0]['emp_type'] });
                dispatch({ type: `SET_WRK_LOC`, payload: result.data[0]['wrk_loc'] });
                dispatch({ type: `SET_EMP_STATUS`, payload: result.data[0]['emp_status'] });
                dispatch({ type: `SET_WORK_EXP_YRS`, payload: result.data[0]['work_expc'] });
            })
        }
        // setDataCanged(false);
    }, [])
    const [readonly, setReadonly] = useState(true);
    const handleSubmit = (e) => { 
        e.preventDefault();
        // console.log(state);
        if(state.emp_id.length > 0 && state.DOJ.length > 0 && state.probatin_prd.length > 0 && state.emp_type.length > 0 && state.wrk_loc.length > 0 && state.emp_status.length > 0 && state.work_exp_yrs.length > 0){
            const data_innfo={
                row_id: rowid,
                emp_id: state.emp_id,
                DOJ: state.DOJ,
                probatin_prd : state.probatin_prd,
                emp_type : state.emp_type,
                wrk_loc: state.wrk_loc,
                emp_status: state.emp_status,
                work_exp_yrs: state.work_exp_yrs,
                on_board_dd: 'update_work_basic',
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
        // console.log(`SET_${name.toUpperCase()}`);
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    };
    
    return (
        <section>
            <header>
                Basic Info
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
                            <label htmlFor="">Employee ID</label>
                            {readonly && <p>{state.emp_id}</p>}
                            {!readonly && <Input defaultValue="" name="emp_id" value={state.emp_id} onChange={handleInputChange}/>}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Date Of Joining</label>
                            {readonly && <p>{state.DOJ}</p>}
                            {!readonly && <Input type="date" defaultValue="" name="DOJ" value={state.DOJ} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Probition Period</label>
                            {readonly && <p>{state.probatin_prd} Days</p>}
                            {!readonly &&  <Input type="number" min='0' name="probatin_prd" defaultValue=""  value={state.probatin_prd} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Employee Type</label>
                            {readonly && <p>{state.emp_type}</p>}
                            {!readonly && <Input type="text" name="emp_type" defaultValue=""  value={state.emp_type} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Work Location</label>
                            {readonly && <p>{state.wrk_loc}</p>}
                            {!readonly && <Input type="text" name="wrk_loc" defaultValue=""  value={state.wrk_loc} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Employee Status</label>
                            {readonly && <p>{state.emp_status}</p>}
                            {!readonly && <Input type="text" name="emp_status" defaultValue=""  value={state.emp_status} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Work Experience</label>
                            {readonly && <p>{state.work_exp_yrs} Yrs</p>}
                            {!readonly && <Input type="number" min='0' name="work_exp_yrs" defaultValue=""  value={state.work_exp_yrs} onChange={handleInputChange} />}
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
export default Work_basic_info;
import React, { useReducer } from 'react';
import {Fragment,useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
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
    current_address: '',
    permanent_address: '',
    house_type: '',
    stying_since: '',
    living_city_since: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
switch (action.type) {
    case 'SET_CURRENT_ADDRESS':
    return { ...state, current_address: action.payload };
    case 'SET_PERMANENT_ADDRESS':
    return { ...state, permanent_address: action.payload };
    case 'SET_HOUSE_TYPE':
    return { ...state, house_type: action.payload };
    case 'SET_STYING_SINCE':
        return { ...state, stying_since: action.payload };
    case 'SET_LIVING_CITY_SINCE':
        return { ...state, living_city_since: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

const Address_info = (props) =>{
    const [readonly, setReadonly] = useState(true);
    const [rowid, setRowsId] = useState('');
    useEffect(() => {
        // console.log(props.editable_id);
        if(props.editable_id!=''){
            // console.log(va);
            // setBtn_name('Update');
            const data_innfo={
                dd_id_v:props.editable_id,
                dd_up: 'get_adress',
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
                dispatch({ type: `SET_CURRENT_ADDRESS`, payload: result.data[0]['current_address'] });
                dispatch({ type: `SET_PERMANENT_ADDRESS`, payload: result.data[0]['permanent_address'] });
                dispatch({ type: `SET_HOUSE_TYPE`, payload: result.data[0]['house_type'] });
                dispatch({ type: `SET_STYING_SINCE`, payload: result.data[0]['stying_in_since'] });
                dispatch({ type: `SET_LIVING_CITY_SINCE`, payload: result.data[0]['living_in_city_since'] });
            })
        }
        // setDataCanged(false);
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(state);
        if(state.current_address.length > 0 && state.house_type.length > 0){
            const data_innfo={
                row_id: rowid,
                current_address: state.current_address,
                permanent_address: state.permanent_address,
                house_type : state.house_type,
                stying_since : state.stying_since,
                living_city_since : state.living_city_since,
                on_board_dd: 'update_addres',
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
            // alert("Enter all mandatory fileds")
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
                Address Info
                <button onClick={() => setReadonly(!readonly)} type="button"><BiEditAlt /></button>
            </header>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="">Current Address<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.current_address}</p>}
                            {!readonly &&  <TextField
                                            multiline
                                            rows={2}
                                            defaultValue=""
                                            variant="standard"
                                            style={{width:'100%'}}
                                            name="current_address" 
                                            value={state.current_address} 
                                            onChange={handleInputChange}
                                            />}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Permanent Address</label>
                            {readonly && <p>{state.permanent_address}</p>}
                            {!readonly &&  <TextField
                                            multiline
                                            rows={2}
                                            defaultValue=""
                                            variant="standard"
                                            style={{width:'100%'}}
                                            name="permanent_address" 
                                            value={state.permanent_address} 
                                            onChange={handleInputChange}
                                            />}
                        </div>
                        <div className="col-sm-6">
                            <div>
                            <label htmlFor="">House Type<span className='imp_clss'>*</span></label>
                            </div>
                            {readonly && <p>{state.house_type}</p>}
                            {!readonly && 
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}><Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard" defaultValue="" name="house_type"  value={state.house_type} onChange={handleInputChange}
                                >
                                    <MenuItem value="" selected=""> House Type</MenuItem>
                                    <MenuItem value="Owned by Self/Spouse">Owned by Self/Spouse</MenuItem>
                                    <MenuItem value="Owned by Parent/Sibling">Owned by Parent/Sibling</MenuItem>
                                    <MenuItem value="Rented - with Family">Rented - with Family</MenuItem>
                                    <MenuItem value="Rented - with Friends">Rented - with Friends</MenuItem>
                                    <MenuItem value="Rented - Staying Alone">Rented - Staying Alone</MenuItem>
                                    <MenuItem value="Paying Guest">Paying Guest</MenuItem>
                                    <MenuItem value="Hostel">Hostel</MenuItem>
                                    <MenuItem value="Company Provided">Company Provided</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select></FormControl>}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Staying Since<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.stying_since}</p>}
                            {!readonly &&  <Fragment><Input style={{marginLeft:'5px', marginTop: '15px'}} type="date" name="stying_since"  defaultValue=""  value={state.stying_since} onChange={handleInputChange}  /></Fragment>}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Living in Current City Since<span className='imp_clss'>*</span></label>
                            {readonly && <p>{state.living_city_since}</p>}
                            {!readonly &&  <Fragment><Input  style={{marginLeft:'5px', marginTop: '15px'}} type="date" name="living_city_since" defaultValue=""  value={state.living_city_since} onChange={handleInputChange}  /></Fragment>}
                        </div>
                        {!readonly && <div className="row">
                            <div className="col-sm-12">
                                <button type='submit' className="float-end" disabled={!state.isValid}><FiCheck />Save</button>
                                <button onClick={() => setReadonly(!readonly)} type="button" className="float-end cancel_btn" disabled={!state.isValid}><AiOutlineClose />Cancel</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Address_info;
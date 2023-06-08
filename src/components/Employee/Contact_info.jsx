import React, { useReducer } from 'react';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import classes from './EmployeeForm.module.scss';
import { BiEditAlt }  from "react-icons/bi";
import { FiCheck }  from "react-icons/fi";
import { AiOutlineClose }  from "react-icons/ai";
import axios from 'axios';
import swal from 'sweetalert';
const initialState = {
    offcl_email: '',
    prsnl_email: '',
    phone_no: '',
    altr_phone_no: '',
    isValid: true,
  };
  
const reducer = (state, action) => {
    // console.log(action);
    
switch (action.type) {
    case 'SET_OFFCL_EMAIL':
    return { ...state, offcl_email: action.payload };
    case 'SET_PRSNL_EMAIL':
    return { ...state, prsnl_email: action.payload };
    case 'SET_PHONE_NO':
    return { ...state, phone_no: action.payload };
    case 'SET_ALTR_PHONE_NO':
        return { ...state, altr_phone_no: action.payload };
    case 'SET_VALIDATION':
    return { ...state, isValid: action.payload };
    default:
    return state;
}
};

const Contact_info = (props) =>{
    const [rowid, setRowsId] = useState('');
    useEffect(() => {
        // console.log(props.editable_id);
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
                dispatch({ type: `SET_OFFCL_EMAIL`, payload: result.data[0]['officail_mail_id'] });
                dispatch({ type: `SET_PRSNL_EMAIL`, payload: result.data[0]['alternate_mail'] });
                dispatch({ type: `SET_PHONE_NO`, payload: result.data[0]['offical_phone'] });
                dispatch({ type: `SET_ALTR_PHONE_NO`, payload: result.data[0]['alternate_mobile'] });
            })
        }
        // setDataCanged(false);
    }, [])
    const [readonly, setReadonly] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.offcl_email.length > 0 && state.phone_no.length > 0){
            const data_innfo={
                row_id: rowid,
                offcl_email: state.offcl_email,
                prsnl_email: state.prsnl_email,
                phone_no : state.phone_no,
                altr_phone_no : state.altr_phone_no,
                on_board_dd: 'update_contact',
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
        // console.log(state);
        // const { name, email, password } = state;
        // const isValid = name.length > 0 && email.length > 0 && password.length > 0;
        // dispatch({ type: 'SET_VALIDATION', payload: isValid });
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
                Contact Info
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
                        <div className="col-sm-4">
                            <label htmlFor="">Offical Email ID<span className='imp_clss'>*</span> </label>
                            {readonly && <p>{state.offcl_email}</p>}
                            {!readonly &&  <Input type="email" name="offcl_email" defaultValue=""  value={state.offcl_email} onChange={handleInputChange} />}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Personal Email ID</label>
                            {readonly && <p>{state.prsnl_email}</p>}
                            {!readonly &&  <Input type="email" name="prsnl_email" defaultValue="" value={state.prsnl_email} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-4">
                            <div>
                            <label htmlFor="">Phone Number<span className='imp_clss'>*</span></label>
                            </div>
                            {readonly && <p>{state.phone_no}</p>}
                            {!readonly &&  <Input type="text" name="phone_no" defaultValue="" value={state.phone_no} onChange={handleInputChange}  />}
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="">Alternate Phone Number</label>
                            {readonly && <p>{state.altr_phone_no}</p>}
                            {!readonly &&  <Input type="text" name="altr_phone_no" defaultValue="" value={state.altr_phone_no} onChange={handleInputChange}  />}
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
export default Contact_info;
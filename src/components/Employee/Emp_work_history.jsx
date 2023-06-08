import React, { Fragment, useRef, useState, useEffect, useReducer } from "react";
// import classes from '../UsersList/UsersForm.module.scss';
import classes from '../Employee/EmployeeForm.module.scss';
// import LiveSearchDropDown from '../LiveSearch/LiveSearchDropDown';
import swal from 'sweetalert';
import axios from 'axios';
// import switch_class from '../Uni_Comp/Switch.module.scss';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';


const initialState = {
    department: '',
    designation: '',
    dt_frm: '',
    dt_to: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_DEPARTMENT':
        return { ...state, department: action.payload };
        case 'SET_DESIGNATION':
        return { ...state, designation: action.payload };
        case 'SET_DT_FRM':
        return { ...state, dt_frm: action.payload };
        case 'SET_DT_TO':
        return { ...state, dt_to: action.payload };
        case "SET_ERRORS":
            return {
                ...state,
                errors:  action.errors,
            };
        case "RESET":
            return initialState;
        case 'SET_VALIDATION':
        return { ...state, isValid: action.payload };
        default:
        return state;
    }
};

const Emp_work_history = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Save');
    const [row_id, setRow_ID] = useState('');
    const [empl_ID, setEmpl_ID] = useState(props.editedID);
    useEffect(() => {
        if(props.editedTableID!==''){
            // console.log(props.editedTableID);
            setbtn_name('Update');
            // setRow_ID(result.data[0]['r_id']);
            setEmpl_ID(props.editedTableID['emply_id']);
            setRow_ID(props.editedTableID['r_id']);
            dispatch({ type: `SET_DEPARTMENT`, payload: props.editedTableID['department'] });
            dispatch({ type: `SET_DESIGNATION`, payload: props.editedTableID['designation'] });
            dispatch({ type: `SET_DT_FRM`, payload: props.editedTableID['dt_frm'] });
            dispatch({ type: `SET_DT_TO`, payload: props.editedTableID['dt_to'] });
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();

        if(state.department.length > 0 && state.designation.length > 0){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                department: state.department,
                R_ID: row_id,
                designation: state.designation,
                dt_frm: state.dt_frm,
                dt_to: state.dt_to,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            // console.log(data_innfo);
            // axios({
            //     method: "post",
            //     url: process.env.REACT_APPWRK_HSRT_INSRT,
            //     headers: { "content-type": "application/json" },
            //     data: data_innfo
            // })
            // .then(result => {
            //     console.log(result);
            //     // alert(result.data.sent);
            //     swal({
            //         // title: "Success",
            //         // text: result.data.sent,
            //         icon: "success",
            //         title: result.data.msg_type,
            //         text: result.data.sent,
            //         // icon: result.data.msg_type.toLowerCase(),
            //     });
            //     // if(result.data.msg_type=='Success'){
            //     //     // history('/users');
            //     //     // dispatch({ type: `RESET`, payload: '' });
            //     //     // setValue('Mandatory Info');
            //     // }
            //     // props.onAddRow('1');
            //     // props.onChange('');
            //     // console.log(result.data.sent);
            // })
            // .catch(error => console.log(error.message));
            

            axios({
                method: "post",
                url: process.env.REACT_APP_WRK_HSRT_INSRT,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // console.log(result.data);
                // alert(result.data.sent);
                swal({
                    // title: "Success",
                    // text: result.data.sent,
                    icon: result.data.msg_type.toLowerCase(),
                    title: result.data.msg_type,
                    text: result.data.sent,
                    // icon: result.data.msg_type.toLowerCase(),
                });
                if(result.data.msg_type=='Success'){
                    props.onAddRow('1');
                    props.onChange('');    
                }
                // onChange
                
                // console.log(result.data.sent);
            })
            .catch(error => console.log(error.message));


        }else{
            // alert("Enter all mandatory fileds")
            swal({
                // title: "Success",
                // text: result.data.sent,
                icon: "error",
                title: "Error",
                text: "Enter all mandatory fileds",
                // icon: result.data.msg_type.toLowerCase(),
            });
        }

        
    }  
    // const [idV, setIdV]=useState(''); // getting data api
    // const [Orgvalue, setOrgValue] = React.useState({vl: '', name: ''});
    // useEffect(() => {
    //     const data_innfo={
    //         dd_up: 'get',
    //     }
    //     axios({
    //     method: "post",
    //     url: process.env.REACT_APP_ORGN_DROP_KEY,
    //     headers: { "content-type": "application/json" },
    //     data: data_innfo
    //     })
    //     .then(result => {
    //         // setRows(result.data);
    //         setIdV(result.data);
    //         // console.log(result.data);
    //     })
    // }, [])
    // const defaultProps = {
    //     options: idV,
    //     getOptionLabel: (option) => option.name,
    //     // isOptionEqualToValue: (option, value) => option.name === value.name,
    // };

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(`SET_${name.toUpperCase()}`);
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
        // dispatch({ type: "SET_ERRORS", errors });
        // mandatoryHandler(e);
    };

    return ( 
        <Fragment>
            <div>
                <form className={classes.l_form} onSubmit={submitHandler}>
                    <div className={classes.emp_frm_tab_cnt}>
                        <div className={classes.emp_frm_tab_cnt_val}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Department<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="department" value={state.department} onChange={handleInputChange}  />
                                    {state.errors.department && (
                                        <span className="error">{state.errors.department}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Designation<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="designation" value={state.designation} onChange={handleInputChange}  />
                                    {state.errors.designation && (
                                        <span className="error">{state.errors.designation}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">From {row_id} <span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" type="date" name="dt_frm" value={state.dt_frm} onChange={handleInputChange}  />
                                    {state.errors.dt_frm && (
                                        <span className="error">{state.errors.dt_frm}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" type="date" name="dt_to" value={state.dt_to} onChange={handleInputChange}  />
                                    {state.errors.dt_to && (
                                        <span className="error">{state.errors.dt_to}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <button className="float-end">Send</button> */}
                        <button className="float-end">{btn_name}</button>
                    </div>
              </form>
            </div>
        </Fragment>
    )
}
export default Emp_work_history;
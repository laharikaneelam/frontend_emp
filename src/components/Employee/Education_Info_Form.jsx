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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const initialState = {
    qualification: '',
    course: '',
    course_type: '',
    steam: '',
    frm_dt: '',
    to_dt: '',
    college_name: '',
    university_name: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_QUALIFICATION':
        return { ...state, qualification: action.payload };
        case 'SET_COURSE':
        return { ...state, course: action.payload };
        case 'SET_COURSE_TYPE':
        return { ...state, course_type: action.payload };
        case 'SET_STEAM':
        return { ...state, steam: action.payload };
        case 'SET_FRM_DT':
        return { ...state, frm_dt: action.payload };
        case 'SET_TO_DT':
        return { ...state, to_dt: action.payload };
        case 'SET_COLLEGE_NAME':
        return { ...state, college_name: action.payload };
        case 'SET_UNIVERSITY_NAME':
        return { ...state, university_name: action.payload };
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

const Education_Info_Form = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Save');
    const [row_id, setRow_ID] = useState('');
    const [empl_ID, setEmpl_ID] = useState(props.editedID);
    useEffect(() => {
        if(props.editedTableID!==''){
            // console.log(props.editedTableID);
            setbtn_name('Update');
            // setEmpl_ID(props.editedTableID['emply_id']);
            setRow_ID(props.editedTableID['r_id']);
            dispatch({ type: `SET_QUALIFICATION`, payload: props.editedTableID['qualification'] });
            dispatch({ type: `SET_COURSE`, payload: props.editedTableID['course'] });
            dispatch({ type: `SET_COURSE_TYPE`, payload: props.editedTableID['course_type'] });
            dispatch({ type: `SET_STEAM`, payload: props.editedTableID['steam'] });
            dispatch({ type: `SET_FRM_DT`, payload: props.editedTableID['frm_dt'] });
            dispatch({ type: `SET_TO_DT`, payload: props.editedTableID['to_dt'] });
            dispatch({ type: `SET_COLLEGE_NAME`, payload: props.editedTableID['college_name'] });
            dispatch({ type: `SET_UNIVERSITY_NAME`, payload: props.editedTableID['university_name'] });
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();

        if(state.course){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                R_ID: row_id,
                qualification: state.qualification,
                course: state.course,
                course_type: state.course_type,
                steam: state.steam,
                frm_dt: state.frm_dt,
                to_dt: state.to_dt,
                college_name: state.college_name,
                university_name: state.university_name,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_EDUCATIONAL_INFO_INSRT,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // console.log(result);
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
                                    <label htmlFor="">Qualification Type<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    {/* <Input className="width_100 mt-2" defaultValue="" name="department" value={state.department} onChange={handleInputChange}  />
                                    {state.errors.department && (
                                        <span className="error">{state.errors.department}</span>
                                    )} */}
                                    <select className="mt-2" id="Type" name="qualification" value={state.qualification} onChange={handleInputChange}  onBlur={handleInputChange}>
                                            <option value="">Qualification Type</option>
                                            <option value="Graduation" selected="">Graduation</option>
                                            <option value="Post Graduation">Post Graduation</option>
                                            <option value="Doctorate">Doctorate</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="Pre University">Pre University</option>
                                            <option value="Other Education">Other Education</option>
                                            <option value="Certification">Certification</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Course Name <span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="course" value={state.course} onChange={handleInputChange}  />
                                    {state.errors.course && (
                                        <span className="error">{state.errors.course}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Course Type<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    {/* <Input className="width_100 mt-2" defaultValue="" name="department" value={state.department} onChange={handleInputChange}  />
                                    {state.errors.department && (
                                        <span className="error">{state.errors.department}</span>
                                    )} */}
                                    <select id="Type" className="mt-2" name="course_type" value={state.course_type} onChange={handleInputChange}  onBlur={handleInputChange}>
                                        <option value="">Course Type</option>
                                        <option value="Full Time" selected="">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Correspondence">Correspondence</option>
                                        <option value="Certificate">Certificate</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Steam <span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="steam" value={state.steam} onChange={handleInputChange}  />
                                    {state.errors.steam && (
                                        <span className="error">{state.errors.steam}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Course Start Date<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" type="date" name="frm_dt" value={state.frm_dt} onChange={handleInputChange}  />
                                    {state.errors.frm_dt && (
                                        <span className="error">{state.errors.frm_dt}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Course End Date</label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" type="date" name="to_dt" value={state.to_dt} onChange={handleInputChange}  />
                                    {state.errors.to_dt && (
                                        <span className="error">{state.errors.to_dt}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">College Name <span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="college_name" value={state.college_name} onChange={handleInputChange}  />
                                    {state.errors.college_name && (
                                        <span className="error">{state.errors.college_name}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">University Name <span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" name="university_name" value={state.university_name} onChange={handleInputChange}  />
                                    {state.errors.university_name && (
                                        <span className="error">{state.errors.university_name}</span>
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
export default Education_Info_Form;
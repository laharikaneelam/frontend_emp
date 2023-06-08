import React, { Fragment, useState, useEffect, useReducer } from "react";
// import classes from '../UsersList/UsersForm.module.scss';
import classes from '../Employee/EmployeeForm.module.scss';
// import LiveSearchDropDown from '../LiveSearch/LiveSearchDropDown';
import swal from 'sweetalert';
import axios from 'axios';
// import switch_class from '../Uni_Comp/Switch.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';


const initialState = {
    department: '',
    designation: '',
    Name: '',
    Type: '',
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
        case 'SET_NAME':
        return { ...state, Name: action.payload };
        case 'SET_TYPE':
        return { ...state, Type: action.payload };
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

const Repoting_Manager_Form = (props) =>{
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
            // dispatch({ type: `SET_NAME`, payload: props.editedTableID['Name'] });
            // setNameValue(props.editedTableID['Name']);
            setNameValue({vl: props.editedTableID['Name'], name: 'Srikanth Yadav'});
            dispatch({ type: `SET_TYPE`, payload: props.editedTableID['Type'] });
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
                Name: Name_value.vl,
                Type: state.Type,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_REPORTING_MNGR_INSRT,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                console.log(result.data);
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
        // alert(value);
        // console.log(`SET_${name.toUpperCase()}`);
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
        // dispatch({ type: "SET_ERRORS", errors });
        // mandatoryHandler(e);
    };

    const [idV, setIdV]=useState(''); // getting data api
    const [Name_value, setNameValue] = React.useState({vl: '', name: ''});
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
    const defaultProps = {
        options: idV,
        getOptionLabel: (option) => option.name,
        // isOptionEqualToValue: (option, value) => option.name === value.name,
    };

    return ( 
        <Fragment>
            <div>
                <form className={classes.l_form} onSubmit={submitHandler}>
                    <div className={classes.emp_frm_tab_cnt}>
                        <div className={classes.emp_frm_tab_cnt_val}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Name<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    {/* <Input className="width_100 mt-2" defaultValue="" name="Name" value={state.Name} onChange={handleInputChange}  />
                                    {state.errors.Name && (
                                        <span className="error">{state.errors.Name}</span>
                                    )} */}
                                    <Autocomplete
                                        {...defaultProps}
                                        id="controlled-demo"
                                        className="width_100 mt-2"
                                        value={Name_value}
                                        onChange={(event, newValue) => {
                                            setNameValue(newValue);
                                        }}
                                        renderInput={(params) => (
                                        <TextField {...params} onChange={handleInputChange}  onBlur={handleInputChange} value={state.Name} variant="standard" />
                                        )}
                                    />
                                    {state.errors.Name && (
                                        <span className="error">{state.errors.Name}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Type<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    {/* <Input className="width_100 mt-2" defaultValue="" name="Type" value={state.Type} onChange={handleInputChange}  />
                                    {state.errors.Type && (
                                        <span className="error">{state.errors.Type}</span>
                                    )} */}

                                    <select className="width_100 mt-2" id="Type" name="Type" value={state.Type} onChange={handleInputChange}  onBlur={handleInputChange}>
                                        <option value="">None</option>
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                    </select>
                                    {state.errors.Type && (
                                        <span className="error">{state.errors.Type}</span>
                                    )}
                                </div>
                            </div>
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
                        </div>
                    </div>
                    <div>
                        <button className="float-end">{btn_name}</button>
                    </div>
              </form>
            </div>
        </Fragment>
    )
}
export default Repoting_Manager_Form;
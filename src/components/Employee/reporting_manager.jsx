import React, { Fragment, useRef, useState, useEffect, useReducer } from "react";
// import classes from '../UsersList/UsersForm.module.scss';
import classes from '../Employee/EmployeeForm.module.scss';
// import LiveSearchDropDown from '../LiveSearch/LiveSearchDropDown';
import swal from 'sweetalert';
import axios from 'axios';
import switch_class from '../Uni_Comp/Switch.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const initialState = {
    name: '',
    ac_type: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_NAME':
        return { ...state, name: action.payload };
        case 'SET_AC_TYPE':
        return { ...state, ac_type: action.payload };
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

const reporting_manager = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Send');
    const [row_id, setRow_ID] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailIdRef = useRef();
    const [usr_type, setUsr_type]=useState(''); // Apply Periodic
    const [usr_status, setUsr_status]=useState(''); // Apply Periodic
    const usr_typeHandler = (event) =>{
        setUsr_type(event.target.value);
    }

    useEffect(() => {
        if(props.editedID!==''){
            // console.log(props.editedID);
            setbtn_name('Update');
            // firstNameRef.current.value= props.editedID.row_id;
            // firstNameRef.current.value=props.editedID.first_name;
            // lastNameRef.current.value=props.editedID.last_name;
            // emailIdRef.current.value=props.editedID.usr_emailID;
            // usr_type.current.value=props.editedID.usr_role;
            // setUsr_type(props.editedID.usr_role);
            // setUsr_status(props.editedID.usr_status);
            // setRow_ID(props.editedID.row_id);
            // setOrg_name(props.editedID.cmp_name);
            // setUsr_remarks(props.editedID.usr_remarks);
            // firstNameRef=props.editedID.usr_status;
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();

        if(state.name.length > 0 && state.ac_type.length > 0){
            const data_innfo={
                first_name: state.name,
                ac_type: state.ac_type,
                on_board_dd: 'Add_onboard',
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_ONBOARDING_INSR_KEY,
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
                    // history('/users');
                    // dispatch({ type: `RESET`, payload: '' });
                    // setValue('Mandatory Info');
                }
                // props.onAddRow('1');
                // props.onChange('');
                // console.log(result.data.sent);
            })
            .catch(error => console.log(error.message));
            
        }else{
            // alert("Enter all mandatory fileds")
            swal({
                // title: "Success",
                // text: result.data.sent,
                // icon: "success",
                title: "error",
                text: "Enter all mandatory fileds",
                // icon: result.data.msg_type.toLowerCase(),
            });
        }

        
    }  
    const [idV, setIdV]=useState(''); // getting data api
    const [Orgvalue, setOrgValue] = React.useState({vl: '', name: ''});
    useEffect(() => {
        const data_innfo={
            dd_up: 'get',
        }
        axios({
        method: "post",
        url: process.env.REACT_APP_ORGN_DROP_KEY,
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

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`SET_${name.toUpperCase()}`);
        console.log(value);
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
                                <div className="col-sm-6">
                                    <label htmlFor="">Name</label>
                                    <Autocomplete
                                        {...defaultProps}
                                        id="controlled-demo"
                                        value={Orgvalue}
                                        onChange={(event, newValue) => {
                                        setOrgValue(newValue);
                                        }}
                                        renderInput={(params) => (
                                        <TextField {...params} onChange={handleInputChange}  onBlur={handleInputChange} value={state.name}  variant="standard" />
                                        )}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="">Type</label>
                                    <select id="ac_type" name="ac_type" value={state.ac_type} onChange={handleInputChange}  onBlur={handleInputChange}>
                                        <option value="">None</option>
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                    </select>
                                </div>
                                {/* <label className={classes.floating_label}>
                                    First Name
                                </label>  */}
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
export default reporting_manager;
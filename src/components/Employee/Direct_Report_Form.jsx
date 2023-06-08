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
    Name: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_NAME':
        return { ...state, Name: action.payload };
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

const Direct_Report_Form = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Save');
    const [row_id, setRow_ID] = useState('');
    const [empl_ID, setEmpl_ID] = useState(props.editedID);
    
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

    // console.log(idV);
    useEffect(() => {
        if(props.editedTableID!==''){
            // console.log(props.editedTableID);
            setbtn_name('Update');
            setEmpl_ID(props.editedTableID['emply_id']);
            setRow_ID(props.editedTableID['r_id']);
            // dispatch({ type: `SET_DEPARTMENT`, payload: props.editedTableID['department'] });
            // dispatch({ type: `SET_DESIGNATION`, payload: props.editedTableID['designation'] });
            // // dispatch({ type: `SET_NAME`, payload: props.editedTableID['Name'] });
            // // setNameValue(props.editedTableID['Name']);
            
            {idV.length > 0 && idV.filter((ocuntry) => ocuntry.vl === props.editedTableID['Name']).map( (getcountry)=>(
                // <span>{getcountry.name}</span> 
                    setNameValue({vl: props.editedTableID['Name'], name: getcountry.name})
                ))
            }
            
            // dispatch({ type: `SET_TYPE`, payload: props.editedTableID['Type'] });
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();

        if(Name_value.vl.length > 0 && props.editedID.length > 0){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                R_ID: row_id,
                Name: Name_value.vl,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_DIRECT_REPORT_INSRT,
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

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // alert(value);
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
                                    <label htmlFor="">Name<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Autocomplete
                                        {...defaultProps}
                                        id="controlled-demo"
                                        className="mt-2"
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
export default Direct_Report_Form;
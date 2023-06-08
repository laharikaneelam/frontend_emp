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
    Relationship: '',
    Dependant: 'Y',
    date_of_birth: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_NAME':
        return { ...state, Name: action.payload };
        case 'SET_RELATIONSHIP':
        return { ...state, Relationship: action.payload };
        case 'SET_DATE_OF_BIRTH':
        return { ...state, date_of_birth: action.payload };
        // case 'SET_DEPENDANT':
        //     console.log(action.payload.checked);
        // return { ...state, Dependant: action.payload };
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

const Family_members_From = (props) =>{
    // const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Save');
    const [row_id, setRow_ID] = useState('');
    const [empl_ID, setEmpl_ID] = useState(props.editedID);
    const [Dependant, setGst_swith] = useState('N');
    const gst_swith_handler =(event) =>{
        // console.log(event.target.value);
        // setLogo_img(event.target.files[0]['name']);
        // setGst_swith(event.target.value);
        if(event.target.checked)
        {
            setGst_swith('Y');
        }else{
            setGst_swith('N');
        }
    }
    useEffect(() => {
        if(props.editedTableID!==''){
            setbtn_name('Update');
            setEmpl_ID(props.editedTableID['emply_id']);
            setRow_ID(props.editedTableID['r_id']);
            dispatch({ type: `SET_NAME`, payload: props.editedTableID['name'] });
            dispatch({ type: `SET_RELATIONSHIP`, payload: props.editedTableID['relation'] });
            dispatch({ type: `SET_DATE_OF_BIRTH`, payload: props.editedTableID['dob'] });
            // dispatch({ type: `SET_DEPENDANT`, payload: props.editedTableID['dependent'] });
            setGst_swith(props.editedTableID['dependent']);
            // // setNameValue(props.editedTableID['Name']);
            // dispatch({ type: `SET_TYPE`, payload: props.editedTableID['Type'] });
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();

        if(state.date_of_birth.length > 0 && state.Name.length > 0){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                R_ID: row_id,
                Name: state.Name,
                Relationship: state.Relationship,
                Dependant: Dependant,
                date_of_birth: state.date_of_birth,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_FAMILY_INFO_INSRT,
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
        console.log(`SET_${name.toUpperCase()}`);
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
                                    <Input className="width_100 mt-2" defaultValue="" name="Name" value={state.Name} onChange={handleInputChange}  />
                                    {state.errors.Name && (
                                        <span className="error">{state.errors.Name}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Relationship<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <select className="width_100 mt-2" id="Type" name="Relationship" value={state.Relationship} onChange={handleInputChange}  onBlur={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Husband">Husband</option>
                                        <option value="Wife">Wife</option>
                                        <option value="Son">Son</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Date of Birth<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <Input className="width_100 mt-2" defaultValue="" type="date" name="date_of_birth" value={state.date_of_birth} onChange={handleInputChange}  />
                                    {state.errors.date_of_birth && (
                                        <span className="error">{state.errors.date_of_birth}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="">Dependant<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="checkbox" style={{width: 'auto', marginTop: '16px'}} name="Dependant" value={Dependant}  onChange={gst_swith_handler} checked={`${Dependant==='Y' ? 'checked' : ''}`}/>
                                    {/* <Input className="width_100 mt-2" defaultValue="" type="checkbox" name="Dependant" value={state.Dependant} onChange={handleInputChange}  />
                                    {state.errors.Dependant && (
                                        <span className="error">{state.errors.Dependant}</span>
                                    )} */}
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
export default Family_members_From;
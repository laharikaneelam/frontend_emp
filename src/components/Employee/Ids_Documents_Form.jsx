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
    file_id: '',
    Relationship: '',
    verification: '',
    isValid: false,
    errors: '',
  };


  const reducer = (state, action) => {
    // console.log(action.errors);
    switch (action.type) {
        case 'SET_RELATIONSHIP':
        return { ...state, Relationship: action.payload };
        case 'SET_VERIFICATION':
        return { ...state, verification: action.payload };
        case 'SET_FILE_ID':
        return { ...state, file_id: action.payload };
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

const Ids_Documents_Form = (props) =>{
    const [showResults, setShowResults] = useState(false);
    const [btn_name, setbtn_name] = useState('Save');
    const [row_id, setRow_ID] = useState('');
    const [empl_ID, setEmpl_ID] = useState(props.editedID);
    
    
    useEffect(() => {
        if(props.editedTableID!==''){
            // console.log(props.editedTableID); verification
            setbtn_name('Update');
            setEmpl_ID(props.editedTableID['emply_id']);
            setRow_ID(props.editedTableID['r_id']);
            dispatch({ type: `SET_RELATIONSHIP`, payload: props.editedTableID['type_v'] });
            dispatch({ type: `SET_VERIFICATION`, payload: props.editedTableID['verification'] });
            // // dispatch({ type: `SET_NAME`, payload: props.editedTableID['Name'] });
            // // setNameValue(props.editedTableID['Name']);
            
            // dispatch({ type: `SET_TYPE`, payload: props.editedTableID['Type'] });
        }
    }, [])

    const submitHandler =(event) =>{
        event.preventDefault();
        // if(row_id!==''){
        //     if(state.Relationship.length > 0 && logo_img!==''){
        // }else{
        //     if(state.Relationship.length > 0 && verification!==''){
        // }
        if(state.Relationship.length > 0){
            const data_innfo={
                // first_name: state.name,
                // ac_type: state.ac_type,
                R_ID: row_id,
                file_id : logo_img,
                Relationship : state.Relationship,
                verification : state.verification,
                employ_id:props.editedID,
                on_board_dd: btn_name,
            }
            // console.log(data_innfo);
            axios({
                method: "post",
                url: process.env.REACT_APP_USERS_IDS_DOCS_INFO,
                headers: { "content-type": "multipart/form-data" },
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
    const[error_img, setError_img]=useState('');
    const [logo_img, setLogo_img] = useState('');
    const logo_img_Handler =(event) =>{
        const image =event.target.files[0];  
        // console.log(image.type);
        if(image['size'] > 1000000){
            setError_img('Image size not more than 1mb')
        }else{
            setError_img('')
            setLogo_img(image);
        }
    }

    return ( 
        <Fragment>
            <div>
                <form className={classes.l_form} onSubmit={submitHandler}>
                    <div className={classes.emp_frm_tab_cnt}>
                        <div className={classes.emp_frm_tab_cnt_val}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className={classes.margin_0} htmlFor="">Select ID Type<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <select className="mt-2" id="Type" name="Relationship" value={state.Relationship} onChange={handleInputChange}  onBlur={handleInputChange} disabled={row_id && true}>
                                        <option value="" selected="">---</option>
                                        <option value="PAN Card">PAN Card</option>
                                        <option value="Aadhaar Card">Aadhaar Card</option>
                                        <option value="Passport">Passport</option>
                                        <option value="Driving Licence">Driving Licence</option>
                                        <option value="Voter ID">Voter ID</option>
                                        <option value="Electricity Bill">Electricity Bill</option>
                                        <option value="Phone Bill">Phone Bill</option>
                                        <option value="Bank Passbook">Bank Passbook</option>
                                        <option value="Rental Agreement">Rental Agreement</option>
                                    </select>
                                </div>
                            </div>
                            {row_id && <div className="row mt-2"> 
                                <div className="col-sm-4">
                                    <label htmlFor="">Verification<span className='imp_clss'>*</span></label>
                                </div>
                                <div className="col-sm-8 mt-2">
                                    <label style={{display: 'inline'}} htmlFor=""><input type="radio" name="verification" value="Verified" checked={state.verification==='Verified'} onChange={handleInputChange} /> Verified</label>
                                    <label style={{marginLeft : '15px', display: 'inline'}} htmlFor=""><input type="radio" name="verification" checked={state.verification==='Not Verified'}  value="Not Verified" onChange={handleInputChange} /> Not Verified</label>
                                </div>
                            </div>}
                            <div className="row mt-4"> 
                                <div className="col-sm-12">
                                    <input
                                        type="file"
                                        id="file_id" onChange={logo_img_Handler} 
                                    />
                                    {error_img && <span className="error">{error_img}</span>}
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
export default Ids_Documents_Form;
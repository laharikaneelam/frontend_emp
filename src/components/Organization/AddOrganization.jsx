import { Fragment, useRef, useState, useEffect, React } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from './AddOrganization.module.scss';
import { CgOrganisation } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import countrydata from '../Countrydata.json';
import busness_type_data from '../business_types.json';
import switch_class from '../Uni_Comp/Switch.module.scss';
import axios from 'axios';
const AddOrganization = (props) =>{
    const params=useParams();
    // console.log(params.id);
    const [btn_name, setBtn_name] = useState('Save');
    const va=params.id;
    
    useEffect(() => {
        if(va){
            // console.log(va);
            setBtn_name('Update');
            const data_innfo={
                dd_id_v:va,
                dd_up: 'get',
            }
            axios({
                method: "post",
                url: process.env.REACT_APP_ORGN_LIST_EDIT_KEY,
                headers: { "content-type": "application/json" },
                data: data_innfo
            })
            .then(result => {
                // setRows(result.data);
                // console.log(data_innfo);
                const data_vl=result.data[0];
                // console.log(data_vl);
                setrowid(data_vl[0]);
                setCmp_name(data_vl[2]);
                setCmp_ID(data_vl['org_cmp_id']);
                setIndustry(data_vl['org_industry']);
                setBusiness_type(data_vl['org_type']);
                setCountryid(data_vl['org_location']);
                
                UP_handlecounty(data_vl['org_location']);
                UP_handlestate(data_vl['org_adrs_state']);
                setStreet_1(data_vl['org_street_1']);
                setStreet_2(data_vl['org_street_2']);
                setCity_v(data_vl['org_adrs_city']);
                setzip_code(data_vl['org_adrs_code']);
                setphone_no(data_vl['org_adrs_phone']);
                setfax(data_vl['org_adrs_fax']);
                setfiscal_year(data_vl['fiscal_yr']);
                setfiscalyr_date(data_vl['fiscal_yr_str_dt']);
                setGst_swith(data_vl['gst_swith']); 
                setpan_no(data_vl['pan_n']);
                setcin_no(data_vl['cin_n']);
                settan_no(data_vl['tan_n']);
                setgst_no(data_vl['gst_n']);
                // setLogo_img(data_vl['org_logo']);
                setLogo_img_prvw("http://localhost/digital/emp_portal/empapi/"+data_vl['org_logo']);
                setReg_lable(data_vl['reg_lable']);
                setImp_exp(data_vl['imp_exp']);
                setVat_rt_scme(data_vl['vat_rt_scme']);

                setcmp_nameValid(true);
                setcmp_IDValid(true);
                setindustryValid(true);
                setbusiness_typeValid(true);
                setcountryidValid(true);
                setstateidValid(true);
            })
        }
        // setDataCanged(false);
    }, [])
    const history = useNavigate();
    
        
    const[countryid, setCountryid]=useState('');
    const[rowid, setrowid]=useState('');
    const[state, setState]=useState([]);
    const[stateid, setStateid]= useState('');
    const[cmp_nameValid, setcmp_nameValid]= useState('');
    const[cmp_IDValid, setcmp_IDValid]= useState('');
    const[industryValid, setindustryValid]= useState('');
    const[business_typeValid, setbusiness_typeValid]= useState('');
    const[countryidValid, setcountryidValid]= useState('');
    const[stateidValid, setstateidValid]= useState('');
    const[street_1Valid, setstreet_1Valid]= useState('');
    const[street_2Valid, setstreet_2Valid]= useState('');
    const[city_vValid, setscity_vValid]= useState('');
    const[zip_codeValid, setszip_codeValid]= useState('');
    const[phone_no_Valid, sets_phone_no_Valid]= useState('');
    const[fiscal_yearValid, setfiscal_year_Valid]= useState('');
    const[fiscalyr_date_Valid, setfiscalyr_date_Valid]= useState('');
    const[pan_no_Valid, sets_pan_no_Valid]= useState('');
    const[cin_no_Valid, sets_cin_no_Valid]= useState('');
    const[tan_no_Valid, sets_tan_no_Valid]= useState('');
    const[gst_no_Valid, sets_gst_no_Valid]= useState('');
    const[reg_date_Valid, sets_reg_date_Valid]= useState('');


    const handlecounty=(event)=>{
        const getcountryId= event.target.value;
        if(getcountryId===''){
            setcountryidValid(false);
        }else{
            setcountryidValid(true)
        }
        const getStatedata= countrydata.find(country=>country.country_id===getcountryId).states;
        setState(getStatedata);
        setCountryid(getcountryId);
    }

    const UP_handlecounty=(event)=>{
        const getcountryId= event;
        if(getcountryId===''){
            setcountryidValid(false);
        }else{
            setcountryidValid(true)
        }
        const getStatedata= countrydata.find(country=>country.country_id===getcountryId).states;
        setState(getStatedata);
        setCountryid(getcountryId);
    }

    const handlestate = (event)=>{
        const stateid= event.target.value;
        if(stateid===''){
            setstateidValid(false);
        }else{
            setstateidValid(true)
        }
        setStateid(stateid);
    }

    const UP_handlestate = (event)=>{
        const stateid= event;
        if(stateid===''){
            setstateidValid(false);
        }else{
            setstateidValid(true)
        }
        setStateid(stateid);
    }
    const [cmp_name, setCmp_name] = useState('');
    const cmp_nameHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setcmp_nameValid(false);
        }else{
            setcmp_nameValid(true)
        }
        setCmp_name(event.target.value);
    }
    const [cmp_ID, setCmp_ID] = useState('');
    const cmp_IDHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setcmp_IDValid(false);
        }else{
            setcmp_IDValid(true)
        }
        setCmp_ID(event.target.value);
    }
    const [industry, setIndustry] = useState('');
    const industryHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setindustryValid(false);
        }else{
            setindustryValid(true)
        }
        setIndustry(event.target.value);
    }
    const [business_type, setBusiness_type] = useState('');
    const business_typeHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setbusiness_typeValid(false);
        }else{
            setbusiness_typeValid(true)
        }
        setBusiness_type(event.target.value);
    }
    const [street_1, setStreet_1] = useState('');
    const street_1_typeHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setstreet_1Valid(false);
        }else{
            setstreet_1Valid(true)
        }
        setStreet_1(event.target.value);
    }

    const [street_2, setStreet_2] = useState('');
    const street_2_typeHandler =(event) =>{
        if(event.target.value.trim().length===0){
            setstreet_2Valid(false);
        }else{
            setstreet_2Valid(true)
        }
        setStreet_2(event.target.value);
    }

    const [city_v, setCity_v] = useState('');
    const city_v_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            setscity_vValid(false);
        }else{
            setscity_vValid(true)
        }
        setCity_v(event.target.value);
    }
    
    const [zip_code, setzip_code] = useState('');
    const zip_code_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            setszip_codeValid(false);
        }else{
            setszip_codeValid(true)
        }
        setzip_code(event.target.value);
    }
    
    const [phone_no, setphone_no] = useState('');
    const phone_no_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_phone_no_Valid(false);
        }else{
            sets_phone_no_Valid(true)
        }
        setphone_no(event.target.value);
    }

    const [fax, setfax] = useState('');
    const fax_no_Handler =(event) =>{
        setfax(event.target.value);
    }


    const [fiscal_year, setfiscal_year] = useState('');
    const fiscal_year_Handler =(event) =>{
        const getfiscal_year= event.target.value;
        if(getfiscal_year===''){
            setfiscal_year_Valid(false);
        }else{
            setfiscal_year_Valid(true)
        }
        setfiscal_year(event.target.value);
    }

    const [fiscalyr_date, setfiscalyr_date] = useState('');
    const fiscalyr_date_Handler =(event) =>{
        const getfiscal_year_dt= event.target.value;
        if(getfiscal_year_dt===''){
            setfiscalyr_date_Valid(false);
        }else{
            setfiscalyr_date_Valid(true)
        }
        setfiscalyr_date(event.target.value);
    }

    const [pan_no, setpan_no] = useState('');
    const pan_no_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_pan_no_Valid(false);
        }else{
            sets_pan_no_Valid(true)
        }
        setpan_no(event.target.value);
    }

    const [cin_no, setcin_no] = useState('');
    const cin_no_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_cin_no_Valid(false);
        }else{
            sets_cin_no_Valid(true)
        }
        setcin_no(event.target.value);
    }

    const [tan_no, settan_no] = useState('');
    const tan_no_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_tan_no_Valid(false);
        }else{
            sets_tan_no_Valid(true)
        }
        settan_no(event.target.value);
    }


    const [gst_no, setgst_no] = useState('');
    const gst_no_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_gst_no_Valid(false);
        }else{
            sets_gst_no_Valid(true)
        }
        setgst_no(event.target.value);
    }
    
    const [logo_img, setLogo_img] = useState('');
    const [logo_img_prvw, setLogo_img_prvw] = useState('');
    const logo_img_Handler =(event) =>{
        // console.log(event.target.files);
        // setLogo_img(event.target.files[0]['name']);
        setLogo_img_prvw(URL.createObjectURL(event.target.files[0]));
        setLogo_img(event.target.files[0]);
    }

    const [gst_swith, setGst_swith] = useState('N');
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

    const [reg_date, setReg_date] = useState('');
    const reg_date_Handler =(event) =>{
        if(event.target.value.trim().length===0){
            sets_reg_date_Valid(false);
        }else{
            sets_reg_date_Valid(true)
        }
        setReg_date(event.target.value);
    }

    const [reg_lable, setReg_lable] = useState('');
    const reg_lable_Handler =(event) =>{
        setReg_lable(event.target.value);
    }
    
    const [imp_exp, setImp_exp]=useState('N'); // Active Rule
    const imp_exp_Handler = (e) =>{
        // console.log(this.id)
        if(e.target.checked)
        {
            setImp_exp('Y');
        }else{
            setImp_exp('N');
        }
        
    }

    const [vat_rt_scme, setVat_rt_scme]=useState('N'); // Active Rule
    const vat_rt_scme_Handler = (e) =>{
        // console.log(this.id)
        if(e.target.checked)
        {
            setVat_rt_scme('Y');
        }else{
            setVat_rt_scme('N');
        }
        
    }

    const orgSubmitHandler = (event) =>{
        event.preventDefault();
        // cmp_nameValid: true,
        // cmp_IDValid: true,
        // industryValid: true,
        // business_typeValid: true,
        // countryidValid: true,
        // stateidValid: true,
        
        
        if(cmp_nameValid && cmp_IDValid && industryValid && business_typeValid && countryidValid && stateidValid){
            // const data_innfo={
            //     rowid:rowid,
            //     cmp_name: cmp_name,
            //     cmp_ID: cmp_ID,
            //     industry: industry,
            //     business_type: business_type,
            //     countryid: countryid,
            //     stateid: stateid,
            //     street_1: street_1,
            //     street_2: street_2,
            //     city_v:city_v,
            //     zip_code:zip_code,
            //     phone_no:phone_no,
            //     fax:fax,
            //     fiscal_year:fiscal_year,
            //     fiscalyr_date:fiscalyr_date,
            //     pan_no:pan_no,
            //     cin_no:cin_no,
            //     tan_no:tan_no,
            //     gst_no:gst_no,
            //     gst_swith:gst_swith,
            //     reg_lable:reg_lable,
            //     reg_date:reg_date,
            //     logo_img:logo_img,
            //     vat_rt_scme:vat_rt_scme,
            //     imp_exp:imp_exp,
            //     dd_up: btn_name,
            // }
            // function createFormData(formData, key, data) {
            //     if (data === Object(data) || Array.isArray(data)) {
            //         for (var i in data) {
            //             createFormData(formData, key + '[' + i + ']', data[i]);
            //         }
            //     } else {
            //         formData.append(key, data);
            //     }
            // }
            var formData = new FormData();
            // createFormData(formData, 'data', data_innfo);
            formData.append('rowid', rowid);
            formData.append('cmp_name', cmp_name);
            formData.append('cmp_ID', cmp_ID);
            formData.append('industry', industry);
            formData.append('business_type', business_type);
            formData.append('countryid', countryid);
            formData.append('stateid', stateid);
            formData.append('street_1', street_1);
            formData.append('street_2', street_2);
            formData.append('city_v', city_v);
            formData.append('zip_code', zip_code);
            formData.append('phone_no', phone_no);
            formData.append('fax', fax);
            formData.append('fiscal_year', fiscal_year);
            formData.append('fiscalyr_date', fiscalyr_date);
            formData.append('pan_no', pan_no);
            formData.append('cin_no', cin_no);
            formData.append('tan_no', tan_no);
            formData.append('gst_no', gst_no);
            formData.append('gst_swith', gst_swith);
            formData.append('reg_lable', reg_lable);
            formData.append('reg_date', reg_date);
            formData.append('logo_img', logo_img);
            formData.append('vat_rt_scme', vat_rt_scme);
            formData.append('imp_exp', imp_exp);
            formData.append('dd_up', btn_name);
            // console.log(logo_img);
            axios({
                method: "post",
                url: process.env.REACT_APP_ORG_INSR_KEY,
                headers: { "content-type": "multipart/form-data" },
                data: formData
            })
            .then(result => {
                // console.log(result.data);
                alert(result.data.sent);
                if(result.data.msg_type==='Success'){
                    history('/Organisation');
                }
            })
            .catch(error => console.log(error.message));
            // console.log(data_innfo);
        }else{
            alert("Enter data for all required fields");
            setcmp_nameValid(false);
            setcmp_IDValid(false);
            setindustryValid(false);
            setbusiness_typeValid(false);
            setcountryidValid(false);
            setstateidValid(false);
        }
    }
    return (
        <Fragment>
            <div>
                <div className="page_headers">
                    <div className="float-start">
                        <span className="page_headers_title">Add Organisation Info</span>
                    </div>
                    <div className="float-end">
                        <button type="button" className="add_new"><CgOrganisation /> <Link to='/Organisation'>Organisation List</Link></button>
                    </div>
                </div>
                <form className={classes.form_org}  onSubmit={orgSubmitHandler}>
                    <div className={classes.form_org_div}>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Your Logo
                                </label> 
                            </div>
                            <div className={`col-3 ${classes.inputDiv}`}>
                                <div className={classes.logo_div}>
                                    <img
                                        src={logo_img_prvw!="" ? logo_img_prvw : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={`col-6 ${classes.inputDiv}`}>
                                <div className={classes.logo_div_cnt}>
                                    <span style={{fontSize: '1.1rem', color: '#999999'}}>This logo will appear on transactions and email notifications.</span>
                                    <p style={{fontSize: '0.9rem', color: '#999999'}}>Preferred Image Size: 240px x 240px @ 72 DPI Maximum size of 1MB.</p>
                                </div>
                                <input type="file"  id="logo_img" onChange={logo_img_Handler} onBlur={logo_img_Handler} className={`${classes.inputText}`}  />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Organisation Name*
                                </label> 
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <input type="text"  id="cmp_name" value={cmp_name} onChange={cmp_nameHandler} onBlur={cmp_nameHandler} className={`${classes.inputText} ${ cmp_nameValid === false ? classes.invalid : '' }`}  />
                                {cmp_nameValid === false && <p className={classes.p_error}>Organisation Name is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Company ID*
                                </label>   
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <input type="text"  id="cmp_ID" value={cmp_ID} onChange={cmp_IDHandler} onBlur={cmp_IDHandler} className={`${classes.inputText} ${ cmp_IDValid === false ? classes.invalid : '' }`}  />
                                {cmp_IDValid === false && <p className={classes.p_error}>Company ID is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Industry*
                                </label>   
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <select name="industry" id="" className={`${classes.inputText} ${ industryValid === false ? classes.invalid : '' }`} value={industry} onChange={industryHandler} onBlur={industryHandler}>
                                    <option value="">Select</option>
                                    {/* <option value="Technology 1">Technology 1</option>
                                    <option value="Technology 2">Technology 2</option> */}
                                    {
                                    busness_type_data.map( (busness_type_d,index)=>(
                                    <option value={busness_type_d.value} key={index}>{busness_type_d.label}</option> 
                                    ))
                                    }
                                </select>
                                {industryValid === false && <p className={classes.p_error}>Industry is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Business Type*
                                </label>   
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <select name="business_type" id="" className={`${classes.inputText} ${ business_typeValid === false ? classes.invalid : '' }`} value={business_type} onChange={business_typeHandler} onBlur={business_typeHandler}>
                                    <option value="">Select</option>
                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="LLC">LLC</option>
                                    <option value="Corporation">Corporation</option>
                                    <option value="S Corporation">S Corporation</option>
                                    <option value="Non Profit">Non Profit</option>
                                    <option value="Others/None">Others/None</option>
                                </select>
                                {business_typeValid === false && <p className={classes.p_error}>Business Type is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Business Location*
                                </label>   
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <select name='bus_country' className={`${classes.inputText} ${ countryidValid === false ? classes.invalid : '' }`} value={countryid} onChange={handlecounty} onBlur={handlecounty}>
                                    <option value="">--Select Country--</option>
                                    {
                                    countrydata.map( (getcountry,index)=>(
                                    <option value={getcountry.country_id} key={index}>{getcountry.country_name}</option> 
                                    ))
                                    }
                                </select>
                                {countryidValid === false && <p className={classes.p_error}>Business Location is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Business State*
                                </label>   
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <select name='bus_state' className={`${classes.inputText} ${ stateidValid === false ? classes.invalid : '' }`}  value={stateid} onChange={handlestate} onBlur={handlestate}>
                                    <option value="">--Select State--</option>
                                    {
                                    state.map((getstate, index)=>(
                                        <option value={getstate.state_id} key={index}>{ getstate.state_name }</option>
                                    ))
                                    }
                                </select> 
                                {stateidValid === false && <p className={classes.p_error}>Business State is required</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Company Address*
                                </label>   
                            </div>
                            <div className={`col-9 ${classes.inputDiv}`}>
                                <div className="col-12">
                                    <input type="text" id="street_1" placeholder="Street 1" value={street_1} onChange={street_1_typeHandler} onBlur={street_1_typeHandler} className={`${classes.inputText} ${ street_1Valid === false ? classes.invalid : '' }`}/>  
                                </div>
                                <div className="col-12">
                                    <input type="text" id="street_2" placeholder="Street 2" value={street_2} onChange={street_2_typeHandler} onBlur={street_2_typeHandler} className={`${classes.inputText} ${ street_2Valid === false ? classes.invalid : '' }`}/>  
                                </div>
                                <div className={`row ${classes.padding_z}`} >
                                    <div className={`col-4 ${classes.padding_left_z}`}>
                                        <input type="text" id="city_v" placeholder="City" value={city_v} onChange={city_v_Handler} onBlur={city_v_Handler} className={`${classes.inputText} ${ city_vValid === false ? classes.invalid : '' }`}/>  
                                    </div>
                                    <div className="col-4">
                                        <input type="text" id="zip_code" placeholder="Zip Code" value={zip_code} onChange={zip_code_Handler} onBlur={zip_code_Handler} className={`${classes.inputText} ${ zip_codeValid === false ? classes.invalid : '' }`}/>  
                                    </div>
                                    <div className={`col-4 ${classes.padding_right_z}`}>
                                        <input type="text" id="phone_no" placeholder="Phone" value={phone_no} onChange={phone_no_Handler} onBlur={phone_no_Handler} className={`${classes.inputText} ${ phone_no_Valid === false ? classes.invalid : '' }`}/>  
                                    </div>
                                </div>
                                <div className={`row ${classes.padding_z}`} >
                                    <div className={`col-4 ${classes.padding_left_z}`}>
                                        <input type="text" id="fax" value={fax} onChange={fax_no_Handler} placeholder="Fax"/>  
                                    </div>
                                    {/* <div className="col-4">
                                        <input type="text"/>  
                                    </div>
                                    <div className={`col-4 ${classes.padding_right_z}`}>
                                        <input type="text"/>  
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label >
                                    Fiscal Year*
                                </label> 
                            </div>
                            <div className={`col-5 ${classes.inputDiv}`}>
                                <select name='fiscal_year' className={`${classes.inputText} ${ fiscal_yearValid === false ? classes.invalid : '' }`}  value={fiscal_year} onChange={fiscal_year_Handler} onBlur={fiscal_year_Handler}>
                                    <option value="">--Select Fiscal Year--</option>
                                    <option value="January-December">January-December</option>
                                    <option value="February-January">February-January</option>
                                    <option value="March-February">March-February</option>
                                    <option value="April-March">April-March</option>
                                    <option value="May-April">May-April</option>
                                    <option value="June-May">June-May</option>
                                    <option value="July-June">July-June</option>
                                    <option value="August-July">August-July</option>
                                    <option value="September-August">September-August</option>
                                    <option value="October-September">October-September</option>
                                    <option value="November-October">November-October</option>
                                    <option value="December-November">December-November</option>
                                </select> 
                            </div>
                            <div className="col-2">
                                <label >
                                    Start Date*
                                </label>
                            </div>
                            <div className={`col-2 ${classes.inputDiv}`}>
                                <select name='fiscal_day' className={`${classes.inputText} ${ fiscalyr_date_Valid === false ? classes.invalid : '' }`}  value={fiscalyr_date} onChange={fiscalyr_date_Handler} onBlur={fiscalyr_date_Handler}>
                                    <option value="">--Select Start Date--</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select> 
                            </div>
                        </div>
                            {(countryid ==='229' || countryid ==='230' || countryid ==='101' || countryid ==='231') &&  
                                <div className="row mb-3">
                                    <div className="col-7">
                                        <label >
                                        {countryid ==='101' &&  
                                            <span>Is this business registered for GST?</span>
                                        }
                                        {(countryid ==='229' || countryid ==='230') &&  
                                            <span>Is this business registered for VAT?</span>
                                        }
                                        {(countryid ==='231') &&  
                                            <span>Is this business liable to collect sales tax?</span>
                                        }
                                        </label>
                                        <label className={`float-end ${switch_class.switch}`} >
                                            <input className={switch_class['switch-input']} value={gst_swith} onChange={gst_swith_handler} type="checkbox" checked={`${gst_swith=='Y' ? 'checked' : ''}`} />
                                            {/* <input className={switch_class['switch-input']} value={gst_swith} onChange={gst_swith_handler} type="checkbox" checked={`${gst_swith=='Y' ? 'checked' : ''}`}  id="imp_exp" value={imp_exp} /> */}
                                            <span className={switch_class['switch-label']} data-on="Yes" data-off="No"></span>
                                            <span className={switch_class['switch-handle']}></span>
                                        </label>
                                    </div>
                                </div>
                            }
                            {(gst_swith == 'Y' && countryid ==='101') &&
                                <Fragment>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                                Permanent Account No (PAN)*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="pan_no" value={pan_no} onChange={pan_no_Handler} onBlur={pan_no_Handler} className={`${classes.inputText} ${ pan_no_Valid === false ? classes.invalid : '' }`}  />
                                            {pan_no_Valid === false && <p className={classes.p_error}>PAN Number is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                                CIN Number
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="cin_no" value={cin_no} onChange={cin_no_Handler} onBlur={cin_no_Handler} className={`${classes.inputText} ${ cin_no_Valid === false ? classes.invalid : '' }`}  />
                                            {cin_no_Valid === false && <p className={classes.p_error}>CIN Number is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                                Tax deduction Account Number(TAN)*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="tan_no" value={tan_no} onChange={tan_no_Handler} onBlur={tan_no_Handler} className={`${classes.inputText} ${ tan_no_Valid === false ? classes.invalid : '' }`}  />
                                            {tan_no_Valid === false && <p className={classes.p_error}>TAN Number is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                            GST Number(GST)*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="gst_no" value={gst_no} onChange={gst_no_Handler} onBlur={gst_no_Handler} className={`${classes.inputText} ${ gst_no_Valid === false ? classes.invalid : '' }`}  />
                                            {gst_no_Valid === false && <p className={classes.p_error}>GST Number is required</p>}
                                        </div>
                                    </div>
                                </Fragment>
                            }
                            {(gst_swith == 'Y' && countryid ==='229') &&
                                <Fragment>
                                     <div className="row">
                                        <div className="col-2">
                                            <label >
                                               Tax Registration Number Label
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text" maxLength="255"  id="reg_lable" value={reg_lable} onChange={reg_lable_Handler} onBlur={reg_lable_Handler} className={`${classes.inputText} `}  />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                               Tax Registration No (TRN)*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="pan_no" value={pan_no} onChange={pan_no_Handler} onBlur={pan_no_Handler} className={`${classes.inputText} ${ pan_no_Valid === false ? classes.invalid : '' }`}  />
                                            {pan_no_Valid === false && <p className={classes.p_error}>TRN Number is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                                VAT Registered On*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="date"  id="reg_date" value={reg_date} onChange={reg_date_Handler} onBlur={reg_date_Handler} className={`${classes.inputText} ${ reg_date_Valid === false ? classes.invalid : '' }`}  />
                                            {reg_date_Valid === false && <p className={classes.p_error}>VAT Registration date is required</p>}
                                        </div>
                                    </div>
                                </Fragment>
                            }
                            {(gst_swith == 'Y' && countryid ==='230') &&
                                <Fragment>
                                     <div className="row">
                                        <div className="col-2">
                                            <label >
                                               VAT Registration Number Label
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="reg_lable" value={reg_lable} onChange={reg_lable_Handler} onBlur={reg_lable_Handler} className={`${classes.inputText} `}  />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                               VAT Registration No (VAT)*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="text"  id="pan_no" value={pan_no} onChange={pan_no_Handler} onBlur={pan_no_Handler} className={`${classes.inputText} ${ pan_no_Valid === false ? classes.invalid : '' }`}  />
                                            {pan_no_Valid === false && <p className={classes.p_error}>VAT Number is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <label >
                                                VAT Registered On*
                                            </label> 
                                        </div>
                                        <div className={`col-5 ${classes.inputDiv}`}>
                                            <input type="date"  id="reg_date" value={reg_date} onChange={reg_date_Handler} onBlur={reg_date_Handler} className={`${classes.inputText} ${ reg_date_Valid === false ? classes.invalid : '' }`}  />
                                            {reg_date_Valid === false && <p className={classes.p_error}>VAT Registration date is required</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className={`col-9 mb-3 ${classes.inputDiv} ${classes.chkbox}`}>
                                            
                                            
                                            <div><input type="checkbox" checked={`${imp_exp=='Y' ? 'checked' : ''}`}  id="imp_exp" value={imp_exp} onChange={imp_exp_Handler} className={`${classes.inputText} `}  /></div>
                                            <div><label>I Import/export goods and services from other countries.</label></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className={`col-9 mb-3 ${classes.inputDiv} ${classes.chkbox}`}>
                                            <div><input type="checkbox" checked={`${vat_rt_scme=='Y' ? 'checked' : ''}`}  id="vat_rt_scme" value={vat_rt_scme} onChange={vat_rt_scme_Handler}  className={`${classes.inputText}`}  /></div>
                                            <div>
                                                <label>I've joined the VAT Flat Rate Scheme.
                                                    <p>If you use flat rate, the VAT payable will be calculated as a percentage of total VAT-inclusive turnover</p>
                                            </label></div>
                                            
                                        </div>
                                    </div>
                                </Fragment>
                            }
                            {(gst_swith == 'Y' && countryid ==='231') &&
                                <Fragment>
                                    <div className="row">
                                        <div className={`col-9 mb-3 ${classes.inputDiv}`}>
                                            <div>
                                                <label>
                                                    <h6>If you want to disable Sales Tax:</h6>
                                                    <p>Before you can disable sales tax, you will have to delete all the transactions to witch sales tax or tax exemption reason have been applied. Also, you will have to delete the tax payments, if they have been recorded. Once you disabel, you will not be able to associate sale tax with transactions.</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            }
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
export default AddOrganization;
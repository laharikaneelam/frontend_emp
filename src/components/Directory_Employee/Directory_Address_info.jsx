import React, { useReducer } from 'react';
import {Fragment,useState, useEffect} from "react";
import Box from '@mui/material/Box';
import classes from '../Employee/EmployeeForm.module.scss';

import axios from 'axios';

const Directory_Address_info = (props) =>{
    // const [readonly, setReadonly] = useState(true);
    const [rows, setRowsId] = useState('');
    // const rows=props.editable_id;
      useEffect(() => {
        if(props.editable_id!=''){
            setRowsId(props.editable_id);
            // console.log(va);
            // setBtn_name('Update');
            // const data_innfo={
            //     dd_id_v:props.editable_id,
            //     dd_up: 'get_prsnl',
            // }
            // axios({
            //     method: "post",
            //     url: process.env.REACT_APP_PERSONAL_INFO_KEY,
            //     headers: { "content-type": "application/json" },
            //     data: data_innfo
            // })
            // .then(result => {
            //     setRowsId(result.data[0]);
               
            // })
        }
    }, [])
    // useEffect(() => {
    //     if(props.editable_id!=''){
    //         const data_innfo={
    //             dd_id_v:props.editable_id,
    //             dd_up: 'get_adress',
    //         }
    //         axios({
    //             method: "post",
    //             url: process.env.REACT_APP_PERSONAL_INFO_KEY,
    //             headers: { "content-type": "application/json" },
    //             data: data_innfo
    //         })
    //         .then(result => {
    //             // setRows(result.data);
    //             setRowsId(result.data[0]);
    //             // dispatch({ type: `SET_CURRENT_ADDRESS`, payload: result.data[0]['current_address'] });
    //             // dispatch({ type: `SET_PERMANENT_ADDRESS`, payload: result.data[0]['permanent_address'] });
    //             // dispatch({ type: `SET_HOUSE_TYPE`, payload: result.data[0]['house_type'] });
    //             // dispatch({ type: `SET_STYING_SINCE`, payload: result.data[0]['stying_in_since'] });
    //             // dispatch({ type: `SET_LIVING_CITY_SINCE`, payload: result.data[0]['living_in_city_since'] });
    //         })
    //     }
    //     // setDataCanged(false);
    // }, [])
    return (
        <section>
            <header>
                Contact
            </header>
            <Box
             component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
                <div className={classes.emp_frm_tab_cnt_val}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="">Contact Email<span className='imp_clss'>*</span></label>
                            <p>{rows.usr_emailID}</p>
                        </div>
                        {/* <div className="col-sm-6">
                            <label htmlFor="">Permanent Address</label>
                            <p>{rows.permanent_address}</p>
                        </div>
                        <div className="col-sm-3">
                            <div>
                            <label htmlFor="">House Type<span className='imp_clss'>*</span></label>
                            </div>
                            <p>{rows.house_type}</p>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="">Staying Since<span className='imp_clss'>*</span></label>
                            <p>{rows.stying_since}</p>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="">Living in Current City Since<span className='imp_clss'>*</span></label>
                            <p>{rows.living_city_since}</p>
                        </div> */}
                    </div>
                </div>
            </Box>
        </section>
    )
}
export default Directory_Address_info;
import PageNation from '../Pagenation/PageNation';
import {useState, Fragment, useEffect} from 'react';
import "./UsersList.scss";
// import { FaUserEdit } from "react-icons/fa";
import {SiMicrosoftexcel} from "react-icons/si";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BiImport} from "react-icons/bi";
import {FaRegEdit} from "react-icons/fa";

import {BsArrowDown, BsSendCheck} from "react-icons/bs";
import {MdAdminPanelSettings} from "react-icons/md";
import sup_ic from '../../assets/superadmin_icon.png';
import admin_ic from '../../assets/admin_icon.png';
import staff_ic from '../../assets/staff_icon.png';
import {AiOutlineUserAdd, AiFillCrown, AiFillStar} from "react-icons/ai";
import Model from '../Model/Model';
import UsersForm from './UsersForm';
import swal from 'sweetalert';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const Users = () => {

  const [rowVlues, setRows] = useState('');
  
  const [dataCanged, setDataCanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = rowVlues.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const data_innfo={
      dd_up: 'get',
  }
    axios({
      method: "post",
      url: process.env.REACT_APP_USER_DATA_LIST_KEY,
      headers: { "content-type": "application/json" },
      data: data_innfo
    })
    .then(result => {
        setRows(result.data);
        // console.log(result.data);
    })
    setDataCanged(false);
  }, [dataCanged])
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const set_posts_cng = setposts => {
    setPostPerPage(setposts);
  }
  const [modelshow, setModelShow]=useState(false);
  const closeModel =() =>{
    setModelShow(false);
  }
  const [editedId, setEditedId]=useState('');
  const [ModelTitle, SetModelTitle]=useState('Import Users');
  const setEnditedIdHander = (e) =>{
    // console.log(e);
    setEditedId(e);
    setModelShow(true);
  }
  const [isChecked, setisChecked] = useState('');
  const send_delete = (e) =>{
    const {value, checked}=e.target;
    // console.log(value);
    if(checked){
      setisChecked([...isChecked, value]);
    }else{
      setisChecked(isChecked.filter( (e) => e!== value));
    }
  }

  const [search, setSearch]=useState(''); // Account Identifier
    const search_handler = (event) =>{
        // console.log(this.id)
        setSearch(event.target.value);
    }
  const deleteSelected =() =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => { 
      if (willDelete) {
        if(isChecked.length!==0){
          axios({
            method: "post",
            url: process.env.REACT_APP_DLT_CURRENCY_KEY,
            headers: { "content-type": "application/json" },
            data: JSON.stringify(isChecked)
        })
        .then(result => {
          // console.log(result.data);
          // alert(result.data.response);
          swal({
            title: "Success",
            text: result.data.response,
            icon: "success",
          });
          setDataCanged(true);
        })
        .catch(error => console.log(error.message));
        }else{
          swal({
            title: "Error",
            text: "please Select at least one check box !",
            icon: "error",
          });
          // alert("please Select at least one check box !");
        }
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }

  const InviteUsers =() =>{
    swal({
      title: "Are you sure?",
      text: "You want to invite",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => { 
      if (willDelete) {
        if(isChecked.length!==0){
          axios({
            method: "post",
            url: process.env.REACT_APP_INVITE_MULTIPLE_USERS,
            headers: { "content-type": "application/json" },
            data: JSON.stringify(isChecked)
        })
        .then(result => {
          // console.log(result.data);
          // alert(result.data.response);
          swal({
            title: result.data.msg_type,
            text: result.data.response,
            icon: "success",
          });
          setDataCanged(true);
          setisChecked('');
        })
        .catch(error => console.log(error.message));
        }else{
          swal({
            title: "Error",
            text: "please Select at least one check box !",
            icon: "error",
          });
          // alert("please Select at least one check box !");
        }
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }

  const headers = [
    { label: "First Name", key: "first_name" , style: {font: {sz: "18", bold: true}}, width: {wpx: 125}},
    { label: "Last Name", key: "last_name",style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}} },
    { label: "Email", key: "usr_emailID" },
    { label: "Role", key: "usr_role" },
    { label: "Organisation", key: "cmp_name" },
    { label: "Status", key: "usr_status" },
    { label: "Date Created", key: "usr_created_date" },
  ];

  const [sort, setSort] = useState('ASC');
  const sorting = (col) =>{
    if(sort==='ASC'){
      const sorted = [...currentPosts].sort((a, b) =>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setRows(sorted);
      setSort('DSC');
    }
    if(sort==='DSC'){
      const sorted = [...currentPosts].sort((a, b) =>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setRows(sorted);
      setSort('ASC');
    }
  }
  const stringToColor = (string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  const stringAvatar =(name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <Fragment>
    {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><UsersForm editedID={editedId} onChange={() => setDataCanged(true)} onAddRow={closeModel}/></Model>}
      <div>
          <div className="page_headers">
              <div className="float-start">
                  <span className="page_headers_title">Employee Management</span>
              </div>
              <div className="float-end">
                <button type="button" className="add_new"  onClick={InviteUsers}><BsSendCheck /> Invite</button>
              </div>
              <div className="float-end">
                  <button type="button" className="add_new" onClick={() => {setModelShow(true); setEnditedIdHander('');}}><BiImport /> Import</button>
              </div>
              <div className="float-end">
                <button type="button" className="add_new"><AiOutlineUserAdd /> <Link to='/UserForm/AddEmployee2'>Add</Link></button>
              </div>
          </div>
          <header className="table_buttons">
              <div className="float-start">
                  <input onChange={search_handler} value={search}  onFocus={search_handler} type="search" placeholder="search" name="" id=""/>
              </div>
              <div className="float-end">
                  {/* <button type="button" className="icon_btn"><GrDocumentPdf /></button> */}
                  <button type="button" className="icon_btn"><CSVLink data={currentPosts} headers={headers} filename={"Users List.csv"}><SiMicrosoftexcel  title="Export to excel" style={{color : '#34a853'}}/></CSVLink></button> 
                  <button title="Edit selected users" type="button" className="icon_btn" style={ {cursor :`${(isChecked.length > 0 && isChecked.length <= 1) ? 'pointer' : 'no-drop'}`} }>{(isChecked.length > 0 && isChecked.length <= 1) ? <Link to={`/Employee/EmployeeInfo/${isChecked}`} ><FaRegEdit  style={ {color :`${(isChecked.length > 0 && isChecked.length <= 1) ? '#1face4' : '#c9c9c9'}`} } /></Link> : <FaRegEdit  style={ {color : '#c9c9c9'} } /> }</button>
                  <button title="Delete selected users" style={ {cursor :`${(isChecked.length!==0) ? 'pointer' : 'no-drop'}`} } type="button" className="icon_btn" onClick={isChecked.length!==0 ? deleteSelected : ''}><RiDeleteBin6Line  style={ {color :`${(isChecked.length!==0) ? 'red' : '#c9c9c9'}`} } /></button>
              </div>
          </header>
          <div className="table-responsive">
              <table className="table pt-5">
              <thead> 
                  <tr>
                  <th style={{width : '20px'}}></th>
                  {/* <th style={{width : '30px'}}>Type</th> */}
                  <th onClick={() => sorting('first_name')}>Name <span className="sorting"><BsArrowDown /></span></th>
                  {/* <th onClick={() => sorting('last_name')}>Last Name <span className="sorting"><BsArrowDown /></span></th> */}
                  <th onClick={() => sorting('usr_emailID')}>Email <span className="sorting"><BsArrowDown /></span></th>
                  <th>Designation <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('usr_role')}>Role <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('cmp_name')}>Organisation <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('usr_status')} style={{width : '100px'}}>Status <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('usr_created_date')}>Date Created <span className="sorting"><BsArrowDown /></span></th>
                  </tr>
              </thead>
              <tbody>
                  {currentPosts && currentPosts.filter(item => {
                        const searchTerm=search.toLowerCase();
                        // const fvl_2=item.first_name.toLowerCase()+' '+item.last_name.toLowerCase()+' '+item.usr_emailID.toLowerCase()+' '+item.cmp_name.toLowerCase()+' '+item.usr_role.toLowerCase()+' '+item.usr_status.toLowerCase();
                        const fvl_2=item.first_name.toLowerCase()+' '+item.last_name.toLowerCase()+' '+item.usr_emailID.toLowerCase()+' '+item.usr_role.toLowerCase();
                        return fvl_2.match(searchTerm);
                    }).map((row) => (
                      <tr id={row.row_id} key={row.row_id}>
                      <td>{row.usr_role!=='SuperAdmin' && <input type="checkbox" value={row.row_id} onChange={(e) => send_delete(e)}/>}</td>
                      {/* <td>{row.usr_role!=='SuperAdmin' && <button title='Update User' onClick={() => {setEnditedIdHander(row); SetModelTitle('Update User');}}><FaUserEdit /></button>}</td> */}
                      {/* <td>{row.usr_role!=='SuperAdmin' && <button title='Update User' onClick={() => {setEnditedIdHander(row); SetModelTitle('Update User');}}>
                          <div className="cellWrapper">
                            <img src={(row.usr_role==='SuperAdmin' ? sup_ic : (row.usr_role==='Admin' ? admin_ic  : staff_ic))} alt="" className="image" />
                          </div>
                        </button>}
                        {row.usr_role==='SuperAdmin' && 
                          <div className="cellWrapper">
                            <img src={(row.usr_role==='SuperAdmin' ? sup_ic : (row.usr_role==='Admin' ? admin_ic  : staff_ic))} alt="" className="image" />
                          </div>}AiFillStar
                      </td> */}
                      {/* <td><span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillCrown style={{color : '#ffc333'}} /> : (row.usr_role==='Admin' ? <MdAdminPanelSettings style={{color : 'rgb(54 181 231)'}} />  : ''))}</span></td> */}
                      <td>
                          {/* <div className="cellWrapper">
                            <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="image" />
                            <span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillCrown style={{color : '#ffc333'}} /> : (row.usr_role==='Admin' ? <MdAdminPanelSettings style={{color : 'rgb(54 181 231)'}} />  : ''))}</span>
                          </div> */}
                          {/* <div className="cellWrapper">
                            <img src={(row.user_image==='' || row.user_image===null) ? ('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500') : (`https://cloudscouts.pro/empapi/`+row.user_image)} alt="" className="image" />
                            <span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillStar title='SuperAdmin' style={{color : 'rgb(38 205 18)'}} /> : (row.usr_role==='Admin' ? <AiFillStar title='Admin' style={{color : 'rgb(0 153 213)'}} />  : ''))}</span>
                          </div> */}
                          <div className="cellWrapper">
                          {(row.user_image==='' || row.user_image===null) && <Avatar {...stringAvatar(row.first_name+' '+row.last_name)} style={{width:'25px', height:'25px', fontSize:'0.8rem'}} />}

                          {(row.user_image!=='' && row.user_image!==null) && <img src={(`https://cloudscouts.pro/empapi/`+row.user_image)} alt="" className="image" />}
                          <span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillStar style={{color : 'rgb(38 205 18)'}} /> : (row.usr_role==='Admin' ? <AiFillStar style={{color : 'rgb(0 153 213)'}} />  : ''))}</span>
                          </div>
                      </td>
                      <td>{row.usr_emailID}</td>
                      <td>{row.designation}</td>
                      <td>{row.usr_role}</td>
                      <td>{row.cmp_name}</td>
                      <td style={{textAlign : 'center'}}><span className={row.usr_status}>{row.usr_status}</span></td>
                      <td>{row.usr_created_date}</td>
                      </tr>
                  ))}
              </tbody>
              </table>
          </div>
        <PageNation
          postsPerPage={postsPerPage}
          totalPosts={rowVlues.length}
          paginate={paginate}
          active_r={currentPage}
          set_posts_cng={set_posts_cng}
        />
      </div>
    </Fragment>
  )
};

export default Users;

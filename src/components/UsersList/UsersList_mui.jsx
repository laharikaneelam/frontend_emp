import * as React from 'react';
import PageNation from '../Pagenation/PageNation';
import {useState, Fragment, useEffect} from 'react';
import "./UsersList.scss";
import { FaUserEdit } from "react-icons/fa";
import {SiMicrosoftexcel} from "react-icons/si";
import {RiDeleteBin6Line} from "react-icons/ri";
// import {GrDocumentPdf} from "react-icons/gr";
import sup_ic from '../../assets/superadmin_icon.png';
import admin_ic from '../../assets/admin_icon.png';
import staff_ic from '../../assets/staff_icon.png';
import {AiOutlineUserAdd} from "react-icons/ai";
import Model from '../Model/Model';
import UsersForm from './UsersForm';
import swal from 'sweetalert';
import axios from 'axios';
import {CSVLink} from 'react-csv';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import {TableBody, TableHead} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import {BiFirstPage, BiLastPage} from "react-icons/bi";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
// import AiOutlineRight from '@mui/icons-material/AiOutlineRight';
// import BiLastPage from '@mui/icons-material/LastPage';
// const rows_old = [
//   {
//     id: '0001',
//     product: "Acer Nitro 5",
//     img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     customer: "John Smith",
//     date: "1 March",
//     email: 'test1@gmail.com',
//     phone: "1234567890",
//     status: "Active",
//     role: "Admin",
//   },
//   {
//     id: '0002',
//     product: "Playstation 5",
//     img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     customer: "Michael Doe",
//     date: "1 March",
//     email: 'test2@gmail.com',
//     phone: "1234567890",
//     status: "Inactive",
//     role: "Team Lead",
//   },
//   {
//     id: '0003',
//     product: "Redragon S101",
//     img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     customer: "John Smith",
//     date: "1 March",
//     email: 'test3@gmail.com',
//     phone: "1234567890",
//     status: "Inactive",
//     role: "Developer",
//   },
//   {
//     id: '0004',
//     product: "Razer Blade 15",
//     img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     customer: "Jane Smith",
//     date: "1 March",
//     email: 'test4@gmail.com',
//     phone: "1234567890",
//     status: "Active",
//     role: "Team Lead",
//   },
//   {
//     id: '0005',
//     product: "ASUS ROG Strix",
//     img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     customer: "Harold Carol",
//     date: "1 March",
//     email: 'test5@gmail.com',
//     phone: "1234567890",
//     status: "Inactive",
//     role: "Developer",
//   },
// ];
const Users = () => {

  const [rowVlues, setRows] = useState('');
  const [dataCanged, setDataCanged] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostPerPage] = useState(10);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = rowVlues.slice(indexOfFirstPost, indexOfLastPost);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        console.log(rowVlues.length);
    })
    setDataCanged(false);
  }, [dataCanged])
  // console.log(currentPosts);
  // const paginate = pageNumber => setCurrentPage(pageNumber);
  // const set_posts_cng = setposts => {
  //   setPostPerPage(setposts);
  // }
  const [modelshow, setModelShow]=useState(false);
  const closeModel =() =>{
    setModelShow(false);
  }
  const [editedId, setEditedId]=useState('');
  const [ModelTitle, SetModelTitle]=useState('Invite New User');
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
    // if (window.confirm('Are you sure you want to delete?')) 
    // {
    //   if(isChecked.length!==0){
    //     axios({
    //       method: "post",
    //       url: process.env.REACT_APP_DLT_CURRENCY_KEY,
    //       headers: { "content-type": "application/json" },
    //       data: JSON.stringify(isChecked)
    //   })
    //   .then(result => {
    //     // console.log(result.data);
    //     // alert(result.data.response);
    //     swal({
    //       title: "Success",
    //       text: result.data.response,
    //       icon: "success",
    //     });
    //     setDataCanged(true);
    //   })
    //   .catch(error => console.log(error.message));
    //   }else{
    //     alert("please Select at least one check box !");
    //   }
    // }
    // else{
    //   return false;
    // }
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
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <BiLastPage /> : <BiFirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <AiOutlineRight /> : <AiOutlineLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <AiOutlineLeft /> : <AiOutlineRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <BiFirstPage /> : <BiLastPage />}
        </IconButton>
      </Box>
    );
  }
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  const headers = [
    { label: "First Name", key: "first_name" , style: {font: {sz: "18", bold: true}}, width: {wpx: 125}},
    { label: "Last Name", key: "last_name",style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}} },
    { label: "Email", key: "usr_emailID" },
    { label: "Role", key: "usr_role" },
    { label: "Organisation", key: "cmp_name" },
    { label: "Status", key: "usr_status" },
    { label: "Date Created", key: "usr_created_date" },
  ];
  return (
    <Fragment>
    {modelshow && <Model title={ModelTitle} onConfirm={() => {setModelShow(false)}}><UsersForm editedID={editedId} onChange={() => setDataCanged(true)} onAddRow={closeModel}/></Model>}
      <div>
          <div className="page_headers">
              <div className="float-start">
                  <span className="page_headers_title">User Management</span>
              </div>
              <div className="float-end">
                  <button type="button" className="add_new" onClick={() => {setModelShow(true); setEnditedIdHander('');}}><AiOutlineUserAdd /> Invite New User</button>
              </div>
          </div>
          <header className="table_buttons">
              <div className="float-start">
                  <input onChange={search_handler} value={search}  onFocus={search_handler} type="search" placeholder="search" name="" id=""/>
              </div>
              <div className="float-end">
                  {/* <button type="button" className="icon_btn"><GrDocumentPdf /></button> */}
                  {/* <button type="button" className="icon_btn"><CSVLink data={currentPosts} headers={headers} filename={"Users List.csv"}><SiMicrosoftexcel  title="Export to excel" style={{color : '#34a853'}}/></CSVLink></button> */}
                  <button title="Delete selected users" type="button" className="icon_btn" onClick={deleteSelected}><RiDeleteBin6Line  style={ {color :`${(isChecked.length!==0) ? 'red' : '#808080'}`} } /></button>
              </div>
          </header>
          <div className="table-responsive">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{widTableCell : '20px'}}></TableCell>
                  <TableCell style={{widTableCell : '30px'}}>Type</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Organisation</TableCell>
                  <TableCell style={{widTableCell : '100px'}}>Status</TableCell>
                  <TableCell>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowVlues.length > 0 && (rowsPerPage > 0
                    ? rowVlues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rowVlues
                  ).map((row) => (
                  <TableRow
                    key={row.row_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.usr_role!=='SuperAdmin' && <input type="checkbox" value={row.row_id} onChange={(e) => send_delete(e)}/>}</TableCell>
                      <TableCell>{row.usr_role!=='SuperAdmin' && <button title='Update User' onClick={() => {setEnditedIdHander(row); SetModelTitle('Update User');}}>
                          <div className="cellWrapper">
                            {/* <img src={(row.usr_role=='SuperAdmin' ? sup_ic : (row.usr_role=='Admin' ? admin_ic  : staff_ic))} alt="" className="image" /> */}
                          </div>
                        </button>}
                        {row.usr_role==='SuperAdmin' && 
                          <div className="cellWrapper">
                            {/* <img src={(row.usr_role=='SuperAdmin' ? sup_ic : (row.usr_role=='Admin' ? admin_ic  : staff_ic))} alt="" className="image" /> */}
                          </div>}
                      </TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>
                          <div className="cellWrapper">
                            {/* <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="image" /> */}
                          {row.last_name}
                          </div>
                      </TableCell>
                      <TableCell>{row.usr_emailID}</TableCell>
                      <TableCell>{row.usr_role}</TableCell>
                      <TableCell>{row.cmp_name}</TableCell>
                      <TableCell><span className={row.usr_status}>{row.usr_status}</span></TableCell>
                      <TableCell>{row.usr_created_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={10}
                    count={rowVlues.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          </div>
        {/* <PageNation
          postsPerPage={postsPerPage}
          totalPosts={rowVlues.length}
          paginate={paginate}
          active_r={currentPage}
          set_posts_cng={set_posts_cng}
        /> */}
      </div>
    </Fragment>
  )
};

export default Users;

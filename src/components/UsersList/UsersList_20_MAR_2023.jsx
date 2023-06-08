import PageNation from '../Pagenation/PageNation';
import {useState, Fragment, useEffect} from 'react';
import "./UsersList.scss";
import { FaUserEdit } from "react-icons/fa";
import {SiMicrosoftexcel} from "react-icons/si";
import {RiDeleteBin6Line} from "react-icons/ri";
import {GrDocumentPdf} from "react-icons/gr";
import {AiOutlineUserAdd} from "react-icons/ai";
import Model from '../Model/Model';
import UsersForm from './UsersForm';
import swal from 'sweetalert';
import axios from 'axios';
const rows = [
  {
    id: '0001',
    product: "Acer Nitro 5",
    img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    customer: "John Smith",
    date: "1 March",
    email: 'test1@gmail.com',
    phone: "1234567890",
    status: "Active",
    role: "Admin",
  },
  {
    id: '0002',
    product: "Playstation 5",
    img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    customer: "Michael Doe",
    date: "1 March",
    email: 'test2@gmail.com',
    phone: "1234567890",
    status: "Inactive",
    role: "Team Lead",
  },
  {
    id: '0003',
    product: "Redragon S101",
    img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    customer: "John Smith",
    date: "1 March",
    email: 'test3@gmail.com',
    phone: "1234567890",
    status: "Inactive",
    role: "Developer",
  },
  {
    id: '0004',
    product: "Razer Blade 15",
    img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    customer: "Jane Smith",
    date: "1 March",
    email: 'test4@gmail.com',
    phone: "1234567890",
    status: "Active",
    role: "Team Lead",
  },
  {
    id: '0005',
    product: "ASUS ROG Strix",
    img: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    customer: "Harold Carol",
    date: "1 March",
    email: 'test5@gmail.com',
    phone: "1234567890",
    status: "Inactive",
    role: "Developer",
  },
];
const Users = () => {

  const [rowVlues, setRows] = useState(rows);
  const [dataCanged, setDataCanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

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
                  <input type="search" placeholder="search" name="" id=""/>
              </div>
              <div className="float-end">
                  <button type="button" className="icon_btn"><GrDocumentPdf /></button>
                  <button type="button" className="icon_btn"><SiMicrosoftexcel /></button>
                  <button type="button" className="icon_btn" onClick={deleteSelected}><RiDeleteBin6Line /></button>
              </div>
          </header>
          <div className="table-responsive">
              <table className="table pt-5">
              <thead>
                  <tr>
                  <th style={{width : '20px'}}></th>
                  <th style={{width : '30px'}}>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Organisation</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  </tr>
              </thead>
              <tbody>
                  {currentPosts && currentPosts.map((row) => (
                      <tr id={row.row_id} key={row.row_id}>
                      <td>{row.usr_role!='Admin' && <input type="checkbox" value={row.row_id} onChange={(e) => send_delete(e)}/>}</td>
                  <td>{row.usr_role!='Admin' && <button onClick={() => {setEnditedIdHander(row); SetModelTitle('Update User');}}><FaUserEdit /></button>}</td>
                      <td>{row.first_name}</td>
                      <td>
                          <div className="cellWrapper">
                          <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="image" />
                          {row.last_name}
                          </div>
                      </td>
                      <td>{row.usr_emailID}</td>
                      <td>{row.usr_role}</td>
                      <td>{row.cmp_name}</td>
                      <td><span className={`${(row.usr_status=='Active') ? 's_Active' : 's_inActive'}`}>{row.usr_status}</span></td>
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

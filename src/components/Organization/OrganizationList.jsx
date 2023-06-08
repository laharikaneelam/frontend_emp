import PageNation from '../Pagenation/PageNation';
import {useState, Fragment, useEffect} from 'react';
import "../UsersList/UsersList.scss";
import classess from "./OrganizationList.module.scss";
// import { FaUserEdit } from "react-icons/fa";
// import {SiMicrosoftexcel} from "react-icons/si";
// import {RiDeleteBin6Line} from "react-icons/ri";
// import {GrDocumentPdf} from "react-icons/gr";
import {AiOutlineUserAdd} from "react-icons/ai";
import {Link} from 'react-router-dom';
import countrydata from '../Countrydata.json';
// import busness_type_data from '../business_types.json';
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
const OrganizationList = () => {

  const [rowVlues, setRows] = useState(rows);
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
      url: process.env.REACT_APP_ORGN_LIST_KEY,
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
    if (window.confirm('Are you sure you want to delete?')) 
    {
      if(isChecked.length!==0){
        axios({
          method: "post",
          url: process.env.REACT_APP_DLT_ORGN_LIST_KEY,
          headers: { "content-type": "application/json" },
          data: JSON.stringify(isChecked)
      })
      .then(result => {
        // console.log(result.data);
        alert(result.data.response);
        setDataCanged(true);
      })
      .catch(error => console.log(error.message));
      }else{
        alert("please Select at least one check box !");
      }
    }
    else{
      return false;
    }
    
  }
  return (
    <Fragment>
      <div>
          <div className="page_headers">
              <div className="float-start">
                  <span className="page_headers_title">Organisations List</span>
              </div>
              <div className="float-end">
                  <button type="button" className="add_new" onClick={() => {setModelShow(true)}}><AiOutlineUserAdd /> <Link to='/Organisation/AddOrganisation'>Add Organisation</Link></button>
              </div>
          </div>
          <header className="table_buttons">
              <div className="float-end">
                  {/* <button type="button" className="icon_btn" onClick={deleteSelected}><RiDeleteBin6Line /></button> */}
              </div>
          </header>
          <div className="table-responsive">
            {currentPosts && currentPosts.map((row) => (
              <div className={classess.org_div_main}  key={row.row_id}>
                  <div>
                    <div className={classess.org_img}>
                          <img
                              src={"http://localhost/digital/emp_portal/empapi/"+row.cmp_logo}
                                  alt=""
                          />  
                    </div>
                    <div className={classess.org_contnt}>
                          <div className={classess.hding}>{row.cmp_name}</div>
                          <div className={classess.org_crted}>Organisation created on {row.usr_created_date}
                          </div>
                          <div className={classess.org_id}><label htmlFor="">Organisation ID:</label><span>{row.cmp_ID}</span></div>
                          <div className={classess.org_edtn}>
                              <label htmlFor="">Edition:</label>
                              <span>
                                {
                                  countrydata.filter((ocuntry) => ocuntry.country_id === row.countryid).map( (getcountry)=>(
                                  <span>{getcountry.country_name}</span> 
                                  ))
                                }
                              </span>
                          </div>
                          <div className={classess.org_usr_role}>Your Admin to this organization</div>
                    </div>
                    <div className={classess.org_bt}>
                          <button><Link to={`/Organisation/AddOrganisation/${row.row_id}`} >Edit Organisation</Link></button>
                    </div>
                  </div>
              </div>
              ))}
              {/* <table className="table pt-5">
              <thead>
                  <tr>
                  <th style={{width : '20px'}}></th>
                  <th style={{width : '30px'}}>#</th>
                  <th>Organisation Name</th>
                  <th>Company ID</th>
                  <th>Industry</th>
                  <th>Business Type</th>
                  <th>Business Location</th>
                  <th>Business State</th>
                  <th>Created Date</th>
                  </tr>
              </thead>
              <tbody>
                  {currentPosts && currentPosts.map((row) => (
                      <tr key={row.row_id}>
                      <td><input type="checkbox" value={row.row_id} onChange={(e) => send_delete(e)}/></td>
                      <td><button onClick={() => {setEnditedIdHander(row); SetModelTitle('Update User');}}><FaUserEdit /></button></td>
                      <td>{row.cmp_name}</td>
                      <td>
                          <div className="cellWrapper">
                          {row.cmp_ID}
                          </div>
                      </td>
                      <td>
                        {
                            busness_type_data.filter((indry) => indry.value === row.industry).map( (getindstry)=>(
                            <span>{getindstry.label}</span> 
                            ))
                          }
                      </td>
                      <td>{row.business_type}</td>
                      <td>
                          {
                            countrydata.filter((ocuntry) => ocuntry.country_id === row.countryid).map( (getcountry)=>(
                            <span>{getcountry.country_name}</span> 
                            ))
                          }
                      </td>
                      <td>

                          {
                            countrydata.filter((ocuntry) => ocuntry.country_id === row.countryid).map( (getcountry)=>(
                              getcountry.states.filter((stt) => stt.state_id === row.stateid).map( (stt_s)=>(
                              <span>{stt_s.state_name}</span> 
                              ))
                            ))
                          }
                      </td>
                      <td>{row.usr_created_date}</td>
                      </tr>
                  ))}
              </tbody>
              </table> */}
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

export default OrganizationList;

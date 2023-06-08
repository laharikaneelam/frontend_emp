import PageNation from '../Pagenation/PageNation';
import {useState, Fragment, useEffect} from 'react';
import "./UsersList.scss";

import {BsArrowDown, BsSendCheck} from "react-icons/bs";
// import {MdAdminPanelSettings} from "react-icons/md";
// import sup_ic from '../../assets/superadmin_icon.png';
// import admin_ic from '../../assets/admin_icon.png';
// import staff_ic from '../../assets/staff_icon.png';
import {AiOutlineUserAdd, AiFillCrown, AiFillStar} from "react-icons/ai";
import Model from '../Model/Model';
import UsersForm from './UsersForm';
import swal from 'sweetalert';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom';

const DirectoryList = () => {

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
      url: process.env.REACT_APP_USER_DIRECTORY_LIST_KEY,
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


  const [search, setSearch]=useState(''); // Account Identifier
    const search_handler = (event) =>{
        // console.log(this.id)
        setSearch(event.target.value);
    }

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
      <div>
          <div className="page_headers">
              <div className="float-start">
                  <span className="page_headers_title">Directory</span>
              </div>
          </div>
          <header className="table_buttons">
              <div className="float-start">
                  <input onChange={search_handler} value={search}  onFocus={search_handler} type="search" placeholder="search" name="" id=""/>
              </div>
          </header>
          <div className="table-responsive">
              <table className="table pt-5">
              <thead> 
                  <tr>
                  {/* <th style={{width : '30px'}}>Type</th> */}
                  <th onClick={() => sorting('first_name')}>Name <span className="sorting"><BsArrowDown /></span></th>
                  {/* <th onClick={() => sorting('last_name')}>Last Name <span className="sorting"><BsArrowDown /></span></th> */}
                  <th onClick={() => sorting('usr_emailID')}>Email <span className="sorting"><BsArrowDown /></span></th>
                  <th>Designation <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('usr_role')}>Role <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('cmp_name')}>Organisation <span className="sorting"><BsArrowDown /></span></th>
                  <th onClick={() => sorting('usr_status')} style={{width : '100px'}}>Status <span className="sorting"><BsArrowDown /></span></th>
                  </tr>
              </thead>
              <tbody>
                  {currentPosts && currentPosts.filter(item => {
                        const searchTerm=search.toLowerCase();
                        const fvl_2=item.first_name.toLowerCase()+' '+item.last_name.toLowerCase()+' '+item.usr_emailID.toLowerCase()+' '+item.usr_role.toLowerCase();
                        return fvl_2.match(searchTerm);
                    }).map((row) => (
                      <tr id={row.row_id} key={row.row_id}>
                      <td>
                          {/* <div className="cellWrapper">
                            <img src={(row.user_image==='' || row.user_image===null) ? ('https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500') : (`https://cloudscouts.pro/empapi/`+row.user_image)} alt="" className="image" />
                            <span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillStar style={{color : 'rgb(38 205 18)'}} /> : (row.usr_role==='Admin' ? <AiFillStar style={{color : 'rgb(0 153 213)'}} />  : ''))}</span>
                          </div> */}
                          <Link to={`/UserDirectory/${row.row_id}`} >
                            <div className="cellWrapper">
                            {(row.user_image==='' || row.user_image===null) && <Avatar {...stringAvatar(row.first_name+' '+row.last_name)} style={{width:'25px', height:'25px', fontSize:'0.9rem'}} />}

                            {(row.user_image!=='' &&  row.user_image!==null) && <img src={(`https://cloudscouts.pro/empapi/`+row.user_image)} alt="" className="image" />}
                            <span className="user_role_icon">{row.first_name+' '+row.last_name+' '} {(row.usr_role==='SuperAdmin' ? <AiFillStar style={{color : 'rgb(38 205 18)'}} /> : (row.usr_role==='Admin' ? <AiFillStar style={{color : 'rgb(0 153 213)'}} />  : ''))}</span>
                            </div>
                          </Link>
                      </td>
                      <td>{row.usr_emailID}</td>
                      <td>{row.designation}</td>
                      <td>{row.usr_role}</td>
                      <td>{row.cmp_name}</td>
                      <td style={{textAlign : 'center'}}><span className={row.usr_status}>{row.usr_status}</span></td>
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

export default DirectoryList;

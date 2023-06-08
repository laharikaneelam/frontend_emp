import PageNation from '../Pagenation/PageNation';
import {useState, Fragment} from 'react';
import "./ProjectsList.scss";
import { FaUserEdit } from "react-icons/fa";
import {SiMicrosoftexcel} from "react-icons/si";
import {RiDeleteBin6Line} from "react-icons/ri";
import {GrDocumentPdf} from "react-icons/gr";
import {VscProject} from "react-icons/vsc";
import Model from '../Model/Model';
import ProjectsForm from './ProjectsForm';
const rows = [
  {
    id: 'P001',
    prjct: "Consolidation",
    date: "1 March 2022",
    crtd_by: 'John',
    phone: "1234567890",
    status: "Active",
    hrs_wrkd: "10 Hrs",
  },
  {
    id: 'P002',
    prjct: "EPM",
    date: "1 March 2022",
    crtd_by: 'John',
    phone: "1234567890",
    status: "Pending",
    hrs_wrkd: "10 Hrs",
  },
  {
    id: 'P003',
    prjct: "Test Project",
    date: "1 April 2022",
    crtd_by: 'Michel',
    phone: "1234567890",
    status: "Inactive",
    hrs_wrkd: "80 Hrs",
  },
];
const ProjectsList = () => {
  const [rowVlues, setRows] = useState(rows);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = rowVlues.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const set_posts_cng = setposts => {
    setPostPerPage(setposts);
  }
  const [modelshow, setModelShow]=useState(false);
  return (
    <Fragment>
    {modelshow && <Model title={"Invite New User"} onConfirm={() => {setModelShow(false)}}><ProjectsForm /></Model>}
      <div>
          <div className="page_headers">
              <div className="float-start">
                  <span className="page_headers_title">Projects Management</span>
              </div>
              <div className="float-end">
                  <button type="button" className="add_new" onClick={() => {setModelShow(true)}}><VscProject /> Add New Project</button>
              </div>
          </div>
          <header className="table_buttons">
              <div className="float-start">
                  <input type="search" placeholder="search" name="" id=""/>
              </div>
              <div className="float-end">
                  <button type="button" className="icon_btn"><GrDocumentPdf /></button>
                  <button type="button" className="icon_btn"><SiMicrosoftexcel /></button>
                  <button type="button" className="icon_btn"><RiDeleteBin6Line /></button>
              </div>
          </header>
          <div className="table-responsive">
              <table className="table pt-5">
              <thead>
                  <tr>
                    <th style={{width : '20px'}}></th>
                    <th style={{width : '30px'}}>#</th>
                    <th style={{width : '30px'}}>ID</th>
                    <th>Project</th>
                    <th>Hours Worked</th>
                    <th>Created Date</th>
                    <th>Created By</th>
                    <th>Status</th>
                  </tr>
              </thead>
              <tbody>
              {/* id: 'P002',
    prjct: "EPM",
    date: "1 March 2022",
    crtd_by: 'John',
    phone: "1234567890",
    status: "Pending",
    hrs_wrkd: "10 Hrs", */}
                  {currentPosts && currentPosts.map((row) => (
                      <tr id={row.id} key={row.id}>
                      <td><input type="checkbox" value={row.id}/></td>
                      <td><button><FaUserEdit /></button></td>
                      <td>{row.id}</td>
                      <td>
                          <div className="cellWrapper">
                          {row.prjct}
                          </div>
                      </td>
                      <td>{row.hrs_wrkd}</td>
                      <td>{row.date}</td>
                      <td>{row.crtd_by}</td>
                      {/* <td><span className={`${(row.status=='Active') ? 's_Active' : 's_pending'}`}>{row.status}</span></td> */}
                      <td><span className={`${row.status}`}>{row.status}</span></td>
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

export default ProjectsList;

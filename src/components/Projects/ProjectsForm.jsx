import { Fragment } from "react";
import classes from './ProjectsForm.module.scss';
const ProjectsForm = () =>{
    return (
        <Fragment>
            <div>
                <form className={classes.l_form}>
                    <div className={classes.l_form_div}>
                        <div>
                            <input type="text"  id="usr_name" className={classes.inputText} required/>
                            <label className={classes.floating_label}>
                            Name
                            </label> 
                        </div>
                        <div>
                            <input type="email" id="usr_email" className={classes.inputText} required/>
                            <label className={classes.floating_label}>
                            Email
                            </label>
                        </div>
                        <div>
                            <input type="password" id="user_mbl" className={classes.inputText} required/>
                            <label className={classes.floating_label}>
                            Phone No.
                            </label>
                        </div>
                        <div>
                            <input type="password" id="user_jbttl" className={classes.inputText} required/>
                            <label className={classes.floating_label}>
                            Job Title
                            </label>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="Admin">Admin</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Developer">Developer</option>
                            </select>
                            <label className={classes.floating_label_no}>
                                Role
                            </label>
                        </div>
                        <div>
                            <label className={classes.in_label} htmlFor="status_y"><input type="radio" name="usr_status" value="Y" checked id="status_y"/> Active</label>
                            <label className={classes.in_label} htmlFor="status_n"><input type="radio" name="usr_status" value=" N" id="status_n"/> Inactive</label>
                            <label className={classes.floating_label_no_radio}>
                                Status
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="float-end">Login</button>
                    </div>
              </form>
            </div>
        </Fragment>
    )
}
export default ProjectsForm;
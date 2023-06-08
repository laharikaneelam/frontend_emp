import React, {Fragment} from 'react';
import classes from './PageNation.module.scss';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const PageNation =(props) =>{
const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
    return (
        <Fragment>
            <div className={classes.pagnation_div}>
                <div className={classes.view}>
                    <label>View</label>
                    <select name="" id="" onChange={(e) => props.set_posts_cng(e.target.value)}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <ul>
                <li><button><BsChevronLeft  onClick={() => props.paginate(props.active_r -1)}/></button></li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a  className={props.active_r==number && classes.active} onClick={() => props.paginate(number)} href='#'>
                        {number}
                        </a>
                    </li>
                ))}
                <li><button><BsChevronRight onClick={() => props.paginate(props.active_r +1)} /></button></li>
                    {/* <li><button><ArrowBackIosIcon /></button></li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li className={classes.active}>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li><button><ArrowForwardIosIcon /></button></li> */}
                </ul>
                
            </div>
        </Fragment>
    )
}
export default PageNation;
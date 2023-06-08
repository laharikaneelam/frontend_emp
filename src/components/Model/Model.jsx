import classes from './Model.module.css';
import React  from 'react';
const Model =(props) => {
    return (
        <div className={classes.modalBackground}>
            <div className={classes.modalContainer}>
                <header>
                    <h5 className={classes.title}>
                        {props.title}
                    </h5>
                    <button  className={classes.titleCloseBtn} onClick={props.onConfirm}>x</button>
                </header>
                <div className={classes.body}>
                    {props.children}
                </div>
            </div>
      </div>
    )
}
export default Model;
import classes from './LiveSearchDropDown.module.scss';
import React, {useState, useEffect, Fragment} from 'react';
const profiles = [
    {name: "" },
  ];
const LiveSearchDropDown = (props) =>{
    // console.log(props);
    const set_vlaues =(name) =>{
        props.setval(name);
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="relative" 
            // onKeyDown={handleKeyDown}
            >
                {/* Search Results Container */}

                <div className={`${classes.drop_dw_p} ${classes.absolute} mt-1 w-full p-1 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto`}>
                    <div
                    key={''}
                    onClick={() => set_vlaues('')}
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-1 pt-0"
                    >
                        <span className={classes.lble_v}></span>
                    </div>
                    {props.listData.filter(item => {
                        const searchTerm=props.seach.toLowerCase();
                        // const fname=item.name.toLowerCase();
                        // const fvl=item.vl.toLowerCase();
                        const fvl_2=item.name.toLowerCase()+' '+item.vl.toLowerCase();
                        // return fname.startsWith(searchTerm), fvl.startsWith(searchTerm);
                        return fvl_2.match(searchTerm);
                        // return fname.search(searchTerm) +' '+ fname.startsWith(searchTerm);
                    }).map((item) => {
                    return (
                        <Fragment>
                            <div
                            id={item.name}
                            key={item.name}
                            onClick={() => set_vlaues(item.name)}
                            className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-1 pt-0"
                            >
                                {/* <input className={classes.checkbox} type="checkbox" name={item.name} id={item.name}/> */}
                                <span className={classes.lble_v}> {item.name} </span>
                            </div>
                        </Fragment>
                    );
                    })}
                </div>
            </div>
            {/* <datalist className={`${classes.drop_dw_p} ${classes.absolute} mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto`} id={props.id} style={{backgroundColor : '#BE5050'}}>
                {results.map((item) => {
                return (
                    <option
                    style={{backgroundColor : '#BE5050'}}
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-1"
                    >
                    {item.name}
                    </option>
                );
                })}
            </datalist> */}
        </div>
    )
}
export default LiveSearchDropDown;
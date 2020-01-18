import React from 'react'; 

export default function Welcome(props) {
    return (
        <div id='welcome' >
            <h> Let's find out where you   </h> 
            <h> will find best place to live  </h> 
            <span> <input placeholder='Lehi, Utah' /> <button onClick={props.discover} >Discover</button> </span>
        </div>
    )
}

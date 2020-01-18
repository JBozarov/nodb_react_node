import React from 'react'; 
import logo from './headerLogo.png'; 


//Header displays header, toggles login, logout 
function Header (props) {
    return (
      <header id='header' >
          <img src={logo} style={{width: '60px', borderRadius: '5px'}} alt='Real Estate' /> 
          <nav className='header-nav' >
              <span>Home</span>
              <span>About</span>
              <span>Homes</span>
              <span>Contact</span>
              <span>Search</span> 
              <input />
          </nav>
              
                {
                  props.agentToggle ? 
                  <span onClick={props.loginAgent} >Log out </span> :
                  <span onClick={props.loginAgent} >Login as agent </span> 
                }
      </header>
    )
}

export default Header;

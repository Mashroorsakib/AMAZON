import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { usercontext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [loggeduser,setloggedusser]=useContext(usercontext);
    return (
        <div className="header">
            <img  src={logo} alt="not found"/>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">manage inventory</Link>
                {
                    loggeduser.email && <button onClick={()=>{setloggedusser({})}}>sign out</button>
                }
            </nav>
        </div>
    );
};

export default Header;
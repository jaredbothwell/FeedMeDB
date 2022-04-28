/*
This is a component for the navigation bar
*/
import React from 'react'
import {Link} from 'react-router-dom'
import AccountMenu from './AccountMenu';
import { Button } from './Button';
import './css_files/Navbar.css';


export default function NavBar(props) {

  
    return (
      <>
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo that shows up on the left */}
                <Link to="/" className="navbar-logo">
                    FeedMeDB&nbsp; <i className='fa-solid fa-utensils'/> 
                </Link>

                {/* These are the buttons that show up on the right */}
                <ul className={'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/test' className='nav-links'>
                            TestAPI
                        </Link>
                    </li>

                </ul>
                {!props.loggedIn?
                <Button buttonStyle='btn--outline' link='login'>Login</Button>:
                <AccountMenu/>
                }
            </div>
        </nav>
      </>
  )
}
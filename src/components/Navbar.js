import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import UserContext from '../contexts/UserContext';
import Download from '../image-test/Download.jpg';

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(0);
    const { user } = useContext(UserContext);
    const node = useRef();

    function toggleMenu() {
        !showMenu ? setShowMenu(1) : setShowMenu(0);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        setShowMenu(0);
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClick);
    
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    return (
        <>
            <Header direction={showMenu} avatar={Download}>
                <Link to='/timeline'>
                    <h1>linkr</h1>
                </Link>
                <div ref={node}>
                    <IoIosArrowDown className="arrow" onClick={toggleMenu}/>
                    <div onClick={toggleMenu}></div>
                </div>
            </Header>
            {showMenu === 1 && 
                <NavMenu ref={node}>
                    <Link to='/my-posts'>
                        <h1>My posts</h1>
                    </Link>
                    <Link to='/my-posts'>
                        <h2>My likes</h2>
                    </Link>
                    <Link to='/'>
                        <h3>Logout</h3>
                    </Link>
                </NavMenu>
            }
        </>
    )
}

const NavMenu = styled.div`
    width: 132px;
    height: 109px;
    padding: 17px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0px 0px 0px 20px;
    background: #171717;
    position: fixed;
    top: 72px;
    right: 0;
    z-index: 10;

    h1, h2, h3 {
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 2px;
        color: #fff;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 72px;
    padding: 10px 26px 10px 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #151515;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    h1 {
        font-family: 'Passion One', sans-serif;
        font-size: 49px;
        letter-spacing: 2px;
        line-height: 54px;
        color: #fff;
    }

    > div {
        width: 110px;
        height: 53px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .arrow {
        font-size: 30px;
        color: #fff;
        cursor: pointer;
        transform: ${props => props.direction ? `rotateZ(180deg)` : "none"};
        transition: 0.2s;  	
    }

    > div div {
        width: 53px;
        height: 53px;
        margin-left: 12px;
        border-radius: 26.5px;
        background-image: url("${props => props.avatar}");
        background-size: cover;
    }
`;


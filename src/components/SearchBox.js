import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';

export default function SearchBox() {

    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const [search, setSearch] = useState("");

    return (
        <Form>
            <input 
                type="search" placeholder="Search for people and friends"
                value={search} onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
            <IoIosSearch className="search"/>  
            </button>            
        </Form>
    );
}

const Form = styled.form`    
    position: relative;
    input {
        width: 563px;
        height: 45px;
        padding: 12px 0px 10px 17px;
        border: none;
        border-radius: 8px;
        background: #FFFFFF;
        font-size: 19px;
        line-height: 23px;
        color: #666;
        cursor: pointer;
    }
    button {
        height: 43px;
        border: none;
        border-radius: 8px;
        padding: 10px;
        position: absolute;
        top: 1px;
        right: 0;
        background: #fff;
    }
    .search {
        font-size: 26px;
        color: #C6C6C6
    }
    input::placeholder {
        color: #C6C6C6;
    }
    input:focus, button:focus {
        border: 0px solid #333;
        box-shadow: 0 0 0 0;
        outline: 0;
    }
`;
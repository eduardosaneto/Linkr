import { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input';
import Download from '../img/Download.jpg';

export default function SearchBox() {

    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const [search, setSearch] = useState("");

    function searchUser(e) {        
        setSearch(e);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,                  
            },
            params: {
                username: {search}
                },
            };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search`, config);
        request.then(response => {
            alert("deu bom");
            console.log(response.data);
        });
        request.catch(error => {
            alert("deu ruim");
            console.log(error);
        });
    }

    return (
        <Form>
            <Suggestions>
                <li>
                    <DebounceInput 
                    type="search" placeholder="Search for people and friends" className="search-box"
                    minLength={3} debounceTimeout={300}
                    value={search} onChange={(e) => searchUser(e.target.value)}
                />
                <button type="submit">
                <IoIosSearch className="search"/>  
                </button> 
                </li>
                {/* <li>
                    <span></span>
                    <h2>Enter</h2>
                    <h3>• following</h3>
                </li>
                <li>
                    <span></span>
                    <h2>Enter</h2>
                </li> */}
            </Suggestions> 
        </Form>
    );
}

const Suggestions = styled.ul`
    width: 100%;
    border-radius: 8px;
    background: #E7E7E7;
    li{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16px;
    }
    li:first-child {
        margin-bottom: 0px;
    }
    li:nth-child(2) {
        margin-top: 16px;
    }
    span {
        width: 40px;
        height: 40px;
        border-radius: 304px;
        background: url(${Download});
        background-size: cover;
        background-position: center;
        margin-right: 12px;
        margin-left: 17px;
    }
    h2 {
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        margin-right: 8px;
    }
    h3 {
        font-size: 17px;
        line-height: 19px;
        color: #c5c5c5;
    }
`;

const Form = styled.div`    
    width: 563px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: none;
    border-radius: 8px;
    position: relative;
    position: fixed;
    top: 13px;
    left: calc(50% - 563px / 2);
    z-index: 10;
    background: #E7E7E7;
    .search-box {
        width: 563px;
        height: 45px;
        padding: 12px 0px 10px 17px;
        border: none;
        border-radius: 8px;
        background: #FFFFFF;
        font-size: 19px;
        line-height: 23px;
        color: #666;        
    }
    input::placeholder {
        color: #C6C6C6;
    }
    input:focus, button:focus {
        border: 0px solid #333;
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    button {
        height: 42px;
        border: none;
        border-radius: 8px;
        padding: 10px;
        position: absolute;
        top: 1px;
        right: 0px;
        background: #fff;
    }
    .search {
        font-size: 26px;
        color: #C6C6C6;
        cursor: pointer;
    }
    @media(max-width: 900px){
        width: 350px;
        left: calc(50% - 350px / 2);
        .search-box {
            width: 100%;
        }
    }
    @media(max-width: 611px){
        width: 100%;
        height: auto;
        padding: 10px;
        top: 72px;
        left: 0;
        background: #333;
        border-radius: 0;
        .search-box {
            width: 100%;
            font-size: 17px;
            line-height: 20px;
        }
        button {
        height: 42px;
        top: 10px;
        right: 10px;
    }
    }
`;
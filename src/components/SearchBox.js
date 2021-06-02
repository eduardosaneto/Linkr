import { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input';

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
            <DebounceInput 
                type="search" placeholder="Search for people and friends" className="search-box"
                minLength={3} debounceTimeout={300}
                value={search} onChange={(e) => searchUser(e.target.value)}
            />
            <button type="submit">
            <IoIosSearch className="search"/>  
            </button>         
            <Suggestions>
                <li>
                    Enter
                </li>
            </Suggestions> 
        </Form>
    );
}

const Suggestions = styled.ul`
    width: 100%;
    background-color: red;
`;

const Form = styled.div`    
    width: 563px;
    height: auto;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 8px 8px 0 0;
    position: relative;
    position: fixed;
    top: 13px;
    left: calc(50% - 281px);
    z-index: 10;
    background-color: blue;
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
        color: #C6C6C6;
        cursor: pointer;
    }
    /* @media(max-width: 900px){
        .search-box {
            width: 250px;
        }
    }
    @media(max-width: 611px){
        .search-box {
            width: 100%;
            max-width: 350px;
            margin: 0 10px;
        }
    } */
`;
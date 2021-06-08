import axios from "axios";
import { useContext, useEffect, useState,  } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import { HashtagIcon } from "../styledComponents/IconStyles";

import Usercontext from "../contexts/UserContext";

export default function TrendingBar() {
  const { user, setUser } = useContext(Usercontext);
  const [hashtags, setHashtags] = useState([]);
  const localstorage = JSON.parse(localStorage.user);
  const token = localstorage.token;
  const [searchHashtags, setSearchHashtags] = useState("");
  let history = useHistory();

  

  useEffect(() => trendingTopics(), [searchHashtags]);

  function trendingTopics() {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
      config
    );

    request.then((response) => {
      setHashtags(response.data.hashtags);
      setUser(localStorage.user);
    });
  }

 function RedirectToHashtag(event){
  event.preventDefault();
  const newHashtags = hashtags.map((hashtag) => (hashtag.name))
  if(newHashtags.includes(searchHashtags)) {
    history.push(`/hashtag/${searchHashtags}`)
  }
 }
 
  return (
    <>
      <h1>trending</h1>
      <ul>
        {hashtags.lenght === 0 ? "" : hashtags.map((hashtag) => (
          <Link to={`/hashtag/${hashtag.name}`}>
            <li>#{hashtag.name}</li>
          </Link>
        ))}
      </ul>
      <div>
        <form onSubmit = {hashtags.lenght !== 0 ? RedirectToHashtag : ""}>
        <Input 
          type='text'
          value={searchHashtags}
          placeholder='type a hashtag'
          onChange={(e) => setSearchHashtags(e.target.value)}
         /></form>
        <HashtagIcon />
      </div>
    </>
  );
}

const Input = styled.input`
  ::placeholder{
    color: #FFF;
  }
  :focus{
    outline: 0;
    border: 0 none;
  }
    color: #FFF; 
`

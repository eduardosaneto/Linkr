import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Usercontext from "../contexts/UserContext";
import ReactHashtag from "react-hashtag";
import { FaHashtag } from "react-icons/fa";

export default function TrendingBar() {
  const { user, setUser } = useContext(Usercontext);
  const [hashtags, setHashtags] = useState([]);
  const localstorage = JSON.parse(localStorage.user);
  const token = localstorage.token;
  const [searchhashtags, setSearchHashtags] = useState("");
  
  console.log(SearchHashtags);

  useEffect(() => trendingTopics(), []);

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

  return (
    <>
      <h1>trending</h1>
      <ul>
        {hashtags.map((hashtag) => (
          <Link to={`/hashtag/${hashtag.name}`}>
            <li>#{hashtag.name}</li>
          </Link>
        ))}
      </ul>
      <div>
        <input
          type='text'
          value={searchhashtags}
          placeholder='type a hashtag'
          onChange={(e) => setSearchHashtags(e.target.value)}
         />
        <FaHashtagAlt className='hashtag-icon' />
      </div>
    </>
  );
}

const Hashtag = styled.span`
  color: #fff;
  font-size: 19px !important;
  line-height: 23px;
`;

const FaHashtagAlt = styled(FaHashtag)`
  color: #ffffff;
  font-size: 19px;
  line-height: 23px;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  top: 8px;
  left: 17px;
`;

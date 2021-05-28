import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import ReactHashtag from "react-hashtag";
import {FiHeart} from 'react-icons/fi';
import {FaHeart} from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import UserContext from "../contexts/UserContext";

export default function Post({post, id, postUser, likes}) {

    const [peopleThatLiked, setPeopleThatLiked] = useState(likes);
    const [likeQuantity, setLikeQuantity] = useState(likes.length);
    const [like, setLike] = useState(0);
    const { user } = useContext(UserContext);

    console.log(user.user.username);

    useEffect(() => {
        likes.some(like => like.userId === user.user.id || like.id === user.user.id) ? setLike(1) : setLike(0);
    },[]);
    
    function likePost(config) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`, {}, config);
        request.then(response => {
            setLike(1);
            setLikeQuantity(response.data.post.likes.length);
            setPeopleThatLiked([...peopleThatLiked, {"user.username": user.user.username}]);
        });
        request.catch(() => {
            alert("Há uma instabilidade no servidor, tente novamente em alguns minutos");
        });
    }

    function dislikePost(config) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`, {}, config);
        request.then(response => {
            setLike(0);
            setLikeQuantity(response.data.post.likes.length);
            const teste = peopleThatLiked.filter(name => name['user.username'] !== user.user.username)
            setPeopleThatLiked(teste);
        });
        request.catch(() => {
            alert("Há uma instabilidade no servidor, tente novamente em alguns minutos");
        });
    }

    function toggleLike() {
        const config = { 
            headers:{ 
                Authorization: `Bearer ${user.token}`
            }
        };
        like === 0 ? likePost(config) : dislikePost(config); 
    }

    return (
        <PostContainer key={postUser.id}>
            <Profile>
                <Link to={`user/${postUser.id}`}><img src={postUser.avatar} alt={`${postUser.username}' profile`}/></Link>
                <div>
                    {like === 1 ? 
                        <HeartIconFill onClick={toggleLike} /> :
                        <HeartIconEmpty onClick={toggleLike}/>
                    }
                    <Tooltip 
                        content={peopleThatLiked.length > 0 ? 
                            <span>
                                {peopleThatLiked.map((name, i) => {
                                if(i < 2) {
                                    if(i === 0) return like === 1 ? <p>Você </p> : <p>{name['user.username']} </p>
                                    if(i === 1) return <p>, {name['user.username']}</p>
                                }
                                })}
                                <p>{`${peopleThatLiked.length >= 4 ? `e outras ${peopleThatLiked.length - 2} pessoas` : 
                                    `${peopleThatLiked.length === 3 ? `e mais uma pessoa` : 
                                    `${peopleThatLiked.length === 2 ? `curtiram isso` : 
                                    `${peopleThatLiked.length === 1 ? `curtiu` : ""}`}`}`}`}
                                </p>
                            </span> 
                            : ""}                        
                        interactive={true} placement="bottom" arrow={true}
                    >
                        <p>{likeQuantity} {likeQuantity === 1 ? "like": "likes"}</p>
                    </Tooltip>
                </div>
            </Profile>
            <Content>
                <h2>{postUser.username}</h2>
                <div>
                    <p>
                        <ReactHashtag renderHashtag={(hashtagValue) => (
                            <Link to={`hashtag/${hashtagValue}`.replace("#","")}>
                            <Hashtag>{hashtagValue}</Hashtag>
                            </Link>)}>
                            {post.text} 
                        </ReactHashtag>
                    </p>          
                </div>
                <LinkSnippet href={post.link} target={"_blank"}>
                    <Text>
                        <h2>{post.linkTitle}</h2>
                        <p>{post.linkDescription}</p>
                        <div><p>{post.link}</p></div>
                    </Text>
                    <img src={post.linkImage} alt="website" />
                </LinkSnippet>
            </Content>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 276px;
    width: 100%;
    font-weight: 400;
    padding: 18px 18px 20px 21px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
    word-break: break-all;
    @media(max-width: 611px){
        border-radius: 0;
        padding: 9px 18px 15px 15px;
        height: 232px;
    }   
`;
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 104px;
    
    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    p{
        color: #FFF;
        font-size: 11px;
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-between;
        height: 35px;
    }

    @media (max-width: 611px){
        height: 97px;
        img{
            width: 40px;
            height: 40px; 
        }
        p{
            font-size: 9px;
        }
    }
`;
const Content = styled.div`
    width: 503px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    >h2{
        color: #FFF;
        font-size: 19px;
    }
    > div {
        width: 100%;
        max-width: 502px;
        max-height: 52px;
        display: flex; 
        flex-wrap: wrap;
        overflow-x: hidden;
    }
    > div p{
        font-size: 15px;
        line-height: 20px;
        color: #B7B7B7;
    }

    @media (max-width: 611px){
        width: 82%;
        >h2{
            font-size: 16px;
        }
        >p{
            font-size: 14px;
            line-height: 16px;
        }
    }
`;
const LinkSnippet = styled.a`
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    height: 155px;
    display: flex;
    justify-content: space-between;

    img {
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        height: 100%;
        width: 154px;
    }
    @media (max-width:611px){
        height: 115px;
        img{
            width: 33%;
        }
    }
`;
const Text = styled.div`
    padding: 23px 27px 23px 19px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: hidden;
    
    h2{
        font-size: 16px;
        color: #CECECE;
    }
    p{
        color: #9B9595;
        font-size: 11px;
        line-height: 15px;
    }
    > div {
        width: 100%;
    }
    > div p {
        color: #CECECE;
        font-size: 11px;
    }
    @media (max-width: 611px){
        margin: 7px 7px 7px 11px;
        width:67%;
        h2{
            font-size: 11px;
            line-height: 13px;
        }
        p{
            font-size: 9px;
            line-height: 9px;
        }
        div{
            font-size: 9px;
            line-height: 9px;
        }
    }
`;

const HeartIconEmpty = styled(FiHeart)`
    font-size: 18px;
    color: #fff;
    cursor: pointer;
`;

const HeartIconFill = styled(FaHeart)`
    font-size: 18px;
    color: #AC0000;
    cursor: pointer;
`;

const Hashtag = styled.span`
    color: #FFF;
    font-weight: 700;
`;

const Tooltip = styled(Tippy)`
    background: #ebebeb !important;
    font-weight: 700 !important;
    font-size: 12px !important;
    line-height: 14px !important;
    color: #505050 !important;
    display: flex !important;
    
    span{
        width: 100%;
        display: flex;

    }

    p{
        color: #505050 !important;
    }

    .tippy-arrow {
        color: #ebebeb !important;
    }
`;
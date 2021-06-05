import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from "react-confirm-alert";

import { CommentIcon, HeartIconEmpty, HeartIconFill, RespostIcon } from '../../styledComponents/IconStyles'
import { BarContainer, Image } from './PostStyles'

import ToolTip from './ToolTip'

import UserContext from "../../contexts/UserContext";

export default function Bar({post, likes, showComments, setShowComments}) {
    const { user, setUser } = useContext(UserContext);
    const [peopleThatLiked, setPeopleThatLiked] = useState(likes);
    const [likeQuantity, setLikeQuantity] = useState(likes.length);
    const [like, setLike] = useState(0);
    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const config = {headers: {Authorization: `Bearer ${token}`}};

    function toggleComments() { 
        setShowComments(!showComments)
    }
    
    useEffect(() => {
        likes.some(
          (like) =>
            like.userId === localstorage.user.id || like.id === localstorage.user.id
        )
          ? setLike(1)
          : setLike(0);
      }, []);

    function toggleLike() {
        like === 0 ? likePost() : dislikePost();
    }
    
    function dislikePost() {
        const request = axios.post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,{},config);

        request.then((response) => {
          setUser(localStorage.user);
          setLike(0);
          setLikeQuantity(response.data.post.likes.length);
          const storePeopleThatLiked = peopleThatLiked.filter((name) => 
          name["user.username"] !== localstorage.user.username);
          setPeopleThatLiked(storePeopleThatLiked);
        });
        request.catch(() => {
          alert("Há uma instabilidade no servidor, tente novamente em alguns minutos");
        });
      }

      function likePost() {
        const request = axios.post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,{},config);

        request.then((response) => {
          setUser(localStorage.user);
          setLike(1);
          setLikeQuantity(response.data.post.likes.length);
          setPeopleThatLiked([...peopleThatLiked,{ "user.username": localstorage.user.username },]);
        });

        request.catch(() => {
          alert("Há uma instabilidade no servidor, tente novamente em alguns minutos");
        });
      }
    
      function DoYouWannaRepost(){
        confirmAlert({
          message: "Você deseja repostar esse link?",
          buttons: [
            {
              label: "Sim, compartilhar!",
              onClick: () => Reposts(),
              className: "yesShare",
            },
            { label: "Não, voltar",}],
          closeOnClickOutside: false,
        });
      }

      function Reposts(){
        const request = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/share`,{},config);
      }

    return (
        <BarContainer>
            <Link to={`/user/${post.user.id}`}>
            <Image avatar={post.user.avatar}></Image>
            </Link>
            <div>
                {like === 1 ? (
                    <HeartIconFill className="button" onClick={toggleLike} />
                ) : (
                    <HeartIconEmpty className="button" onClick={toggleLike} />
                )}
                <ToolTip like={like} likeQuantity={likeQuantity} peopleThatLiked={peopleThatLiked}/>
            </div>
            <div>
                <CommentIcon className="button" onClick={toggleComments}/>
                <p>{post.commentCount} comments</p>
            </div>
            <div>
                <RespostIcon className="button" onClick={DoYouWannaRepost}/>
                <p>{post.repostCount} re-posts</p>
            </div>
      </BarContainer>
    )
}
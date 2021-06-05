import axios from 'axios'
import { useState, useContext } from "react";
import { confirmAlert } from "react-confirm-alert";

import Repost from './Repost'
import Comments from './Comments';
import Bar from './Bar'
import Content from './Content'

import { PostContainer } from './PostStyles'
import "tippy.js/dist/tippy.css";
import '../../styles/react-confirm-alert.css'

import UserContext from "../../contexts/UserContext";

export default function Post({post, likes, reloadingPosts, loadMyPosts, location, OpenModal}) {
  const { user, setUser } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false)
  const localstorage = JSON.parse(localStorage.user);
  const token = localstorage.token;
  const config = {headers: { Authorization: `Bearer ${token}` }};

  function moveToTrash() {
    confirmAlert({
      message: "Tem certeza que deseja excluir essa publicação?",
      buttons: [
        {
          label: "Sim, excluir",
          onClick: () => deletePost(),
          className: "yes",
        },
        {
          label: "Não, voltar",
        },
      ],
      closeOnClickOutside: false,
    });
  }

  function deletePost() {
    const request = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.repostId || post.id}`,config);
    
    request.then(() => {
      setUser(localStorage.user);
      if (location.pathname === "/timeline") {
        reloadingPosts();
      } else if (location.pathname === "/my-posts") {
        loadMyPosts();
      }
    });
  
    request.catch(() => {
      alert("Não foi possível excluir o post");
    });
  }

  return (
    <>
    {post.hasOwnProperty("repostedBy") ? <Repost post={post} moveToTrash={moveToTrash}/> : null}
    <PostContainer>
      <Bar post={post} setShowComments={setShowComments} showComments={showComments} likes={likes}/>
      <Content post={post} OpenModal={OpenModal} location={location} loadMyPosts={loadMyPosts} reloadingPosts={reloadingPosts} moveToTrash={moveToTrash} />
    </PostContainer>
    {showComments ? <Comments post={post} /> : null}
    </>
  );
}




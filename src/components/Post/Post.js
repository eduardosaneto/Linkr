import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import { confirmAlert } from "react-confirm-alert";

import ModalMap from '../ModalMap'
import Repost from './Repost'
import Comments from './Comments';
import Bar from './Bar'

import styled from "styled-components";
import { TrashIcon, PencilIcon, MapMarkerIcon } from '../../styledComponents/IconStyles'
import { PostContainer } from './PostStyles'
import "tippy.js/dist/tippy.css";
import '../../styles/react-confirm-alert.css'

import linkrLogo from '../../img/linkrLogo.JPG';

import UserContext from "../../contexts/UserContext";

export default function Post({
  post,
  id,
  postUser,
  likes,
  reloadingPosts,
  loadMyPosts,
  location,
  OpenModal
}) {

  const { user, setUser } = useContext(UserContext);
  const localstorage = JSON.parse(localStorage.user);
  const token = localstorage.token;
  const [controler, setControler] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const inputRefText = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showComments, setShowComments] = useState(false)
  const[openMaps, setOpenMaps] = useState(false);

  function ViewLocation(){
    setOpenMaps(true);
    };

  function deletePost() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const request = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`,
      config
    );
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
  function ShowEdit() {
    if (controler) {
      setControler(false);
      return;
    } else {
      setControler(true);
    }
  }

  useEffect(() => {
    if (controler) {
      inputRefText.current.focus();
      setIsEdit(false);
    }
    else {setEditText(post.text);
           }
  }, [controler]);

  function Edit(event) {
    event.preventDefault();
    const body = {
      text: editText,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const request = axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`,
      body,
      config
    );
   
    request.then((response) => {
      setControler(false);
      setIsEdit(true);
      setEditText(response.data.post.text)
      
    });

    request.catch(() => {

      alert("Não foi possível salvar as alterações");
    });
  }


  function keydowm(e){
    e.keyCode === 27 && setControler(false);
  }

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  let srcYoutube;
  if(post.link){
    srcYoutube = "https://www.youtube.com/embed/"+getId(post.link)+"?mute=1"
  }

  return (
    <>
    { post.hasOwnProperty("repostedBy") ?<Repost post={post}/> : null}
    <PostContainer key={postUser.id}>
      <Bar post={post} setShowComments={setShowComments} showComments={showComments} likes={likes}/>
      <Content>
      <div class='boxName'>
          <div>
            <Link to={`/user/${postUser.id}`}>
            <h2>{postUser.username}</h2>
            </Link>
            {post.geolocation ? <MapMarkerIcon onClick={ViewLocation}/>
            : ""}
            {openMaps? <ModalMap  openMaps={openMaps} setOpenMaps={setOpenMaps} post={post}/> : ""}
          </div>
          { post.hasOwnProperty('repostedBy') || <div class='icons'>
            {post.user.id === localstorage.user.id ? (
              <PencilIcon onClick={ShowEdit} />
            ) : (
              ""
            )}
            {post.user.id === localstorage.user.id ? (
              <TrashIcon
                id={id}
                onClick={moveToTrash}
              />
            ) : (
              ""
            )}{" "}
          </div>}
        </div>
        <div className='teste'>
            {controler ? (
              <form onSubmit={Edit}>
                <input
                  type='text'
                  required
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  ref={inputRefText}
                  onKeyDown={(e) => keydowm(e)}
                />
              </form>
            ) : (
              <p>
                <ReactHashtag
                  renderHashtag={(hashtagValue) => (
                    <Link to={`/hashtag/${hashtagValue}`.replace("#", "")}>
                      <Hashtag>{hashtagValue}</Hashtag>
                    </Link>
                  )}>
                  {isEdit ? editText : post.text}
                </ReactHashtag>
              </p>
            )}
          </div>
          {post.link.includes("youtube.com/watch") ||
          post.link.includes("youtu.be/") ? (
            <YoutubePlayer>
              <iframe width='502' height='281' src={srcYoutube}></iframe>
              <p>{post.link}</p>
            </YoutubePlayer>
          ) : (
            (<LinkSnippet onClick={()=>OpenModal(post.link)}>
            <Text>
              <h2>{post.linkTitle}</h2>
              <p>{post.linkDescription}</p>
              <div>
                <p>{post.link}</p>
              </div>
            </Text>
            <img src={post.linkImage} onError={(e)=>{e.target.onerror = null; e.target.src=(linkrLogo)}} alt='website' />
          </LinkSnippet>)
          )}
      </Content>
    </PostContainer>
    
    {showComments ? <Comments id={id} postUser={post.user} /> : null}
    </>
  );
}

const YoutubePlayer = styled.div`
  display: flex;
  flex-direction: column;

  iframe{
    margin-top: 8px;
    margin-bottom: 8px;
  }
  @media (max-width: 611px) {
      width: 100%;
      iframe{
        width:100%;
        height:100%;
      }
    }
`

const Content = styled.div`
  width: 503px;
  height: 100%;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  .teste {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 23px;
    margin-bottom: 1.5px;

    form{
      width:100%;
    }
    > h2 {
      color: #fff;
      font-size: 19px;
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
    > p {
      font-size: 17px;
      line-height: 23px;
      color: #b7b7b7;
      max-height: 70px;
      margin-top: 19px;
      margin-bottom: 14px;
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
  }
  .boxName {
    display: flex;
    justify-content: space-between;
    width: 100%;
 
    @media (max-width: 611px) {
      width: 100%;
    }
  }

  > h2 {
    color: #fff;
    font-size: 19px;
  }
  > p {
    font-size: 17px;
    line-height: 23px;
    color: #b7b7b7;
    max-height: 70px;
    margin-top: 19px;
    margin-bottom: 14px;
  }

  div {
    color: white;
    display: flex;
  }

  input {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 23px;
    border-radius: 7px;
    padding: 0px 5px;
    color: #4c4c4c;
    background-color: #ffff;
    outline: none;
    border: none;
    margin-top: 19px;
    margin-bottom: 14px;
    font-weight: bold;
    font-size: 17px;
    line-height: 23px;
  }


  @media (max-width: 611px) {
    width: 100%;
    > h2 {
      font-size: 16px;
    }
    > p {
      font-size: 14px;
      line-height: 16px;
      h2 {
        color: #fff;
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
      > div p {
        font-size: 15px;
        line-height: 20px;
        color: #b7b7b7;
      }
      @media (max-width: 611px) {
        width: 82%;
        > h2 {
          font-size: 16px;
        }
        > p {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
`;
const LinkSnippet = styled.div`
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  height: 155px;
  display: flex;
  justify-content: space-between;

  img {
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 100%;
    width: 154px;
    object-fit: cover;
    background-position: center;
  }

  &:hover{
    cursor:pointer;
  }
  img:before{
    content: ' ';
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 100%;
    width: 154px;
    background-image: url(${linkrLogo});
    object-fit: cover;
    background-position: center;
  }
  @media (max-width: 611px) {
    height: 115px;
    img {
      width: 33%;
    }
  }
`;
const Text = styled.div`
  padding: 10px;
  height: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //overflow-y: scroll;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
> h2 {
    font-size: 16px;
    color: #cecece;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    //overflow: hidden;
    //white-space: nowrap;
  }

   /* display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; */

> p {
    color: #9b9595;
    font-size: 11px;
    line-height: 15px;
    margin-bottom: 15px;
  }
> div {
    width: 100%;
  }
> div p {
    color: #cecece;
    font-size: 11px;
  }
  @-moz-document url-prefix() { 
    overflow:hidden;
    p,h2{
      word-break: break-word !important;
    }
  }
  @media (max-width: 611px) {
    width: 67%;
    h2 {
      margin-top: 5px;
      font-size: 11px;
      line-height: 13px;
    }
    p {
      font-size: 9px;
      line-height: 9px;
    }
    div {
      font-size: 9px;
      line-height: 9px;
    }
  }
`;

const Hashtag = styled.span`
  color: #fff;
  font-size: 19px;
  line-height: 23px;
`;



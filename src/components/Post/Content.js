import axios from 'axios'
import { useState, useContext, useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import { confirmAlert } from "react-confirm-alert";

import { ContentContainer, NameBox, Text, YoutubePlayer, LinkSnippet, Hashtag } from './PostStyles'
import { TrashIcon, PencilIcon, MapMarkerIcon } from '../../styledComponents/IconStyles'

import linkrLogo from '../../img/linkrLogo.JPG'
import ModalMap from '../ModalMap'

import UserContext from "../../contexts/UserContext";

export default function Content({post, OpenModal, location, loadMyPosts, reloadingPosts}) {
    const { user, setUser } = useContext(UserContext);
    const[openMaps, setOpenMaps] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [controler, setControler] = useState(false);
    const [editText, setEditText] = useState(post.text);
    const inputRefText = useRef(null);
    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const config = {headers: { Authorization: `Bearer ${token}` }};

    function ViewLocation(){
      setOpenMaps(true);
    };

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
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`,config);
      
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
      } else {
        setEditText(post.text); 
      }
    }, [controler]);
  
    function Edit(event) {
      event.preventDefault();
      const body = { text: editText };
  
      const request = axios.put(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`,
        body,config);
     
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
        <ContentContainer>
            <NameBox>
                <div>
                    <Link to={`/user/${post.user.id}`}>
                    <h2>{post.user.username}</h2>
                    </Link>
                    {post.geolocation ? <MapMarkerIcon onClick={ViewLocation}/>
                    : ""}
                    {openMaps? <ModalMap  openMaps={openMaps} setOpenMaps={setOpenMaps} post={post}/> : ""}
                </div>
                {post.hasOwnProperty('repostedBy') || <div class='icons'>
                    {post.user.id === localstorage.user.id ? (
                    <PencilIcon onClick={ShowEdit} />
                    ) : (
                    ""
                    )}
                    {post.user.id === localstorage.user.id ? (
                    <TrashIcon
                        id={post.id}
                        onClick={moveToTrash}
                    />
                    ) : (
                    ""
                    )}{" "}
                </div>}
            </NameBox>
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
            <img src={post.linkImage || linkrLogo} alt='website' />
          </LinkSnippet>)
          )}
      </ContentContainer>
    )
}
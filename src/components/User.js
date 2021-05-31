import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Posts, Trending, Load } from "../styledComponents/Content";
import styled from 'styled-components'
import Navbar from './Navbar';
import Usercontext from '../contexts/UserContext'
import TrendingBar from './TrendingBar';
import Post from './Post';

export default function User(){
    const {user, setUser} = useContext(Usercontext);
    const {id} = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [followList, setFollowList] = useState([]);
    const [userInfo, setUserInfo] = useState(undefined);

    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const config = { headers: { Authorization: `Bearer ${token}`}};

    
    useEffect(() =>{
        loadingUser();
        loadingPostsUser();
        FollowList();
    },[]);
    
    function username() {
        //return userPosts[0].user.username +"'s posts";
        return userInfo.username +"'s posts";
    }

    function loadingPostsUser() {
        setIsLoading(true);
        setIsError(false);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config)

        request.then( response => {
            setUser(localStorage.user);
            const data = response.data.posts;
            setUserPosts([...response.data.posts]);
            setIsLoading(false);
            if(userPosts === data) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }})
    }

    function FollowList(){
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows",config);
        request.then((e)=>{
            setFollowList(e.data.users);
        })

    }

    function CheckIfIFollow(){
        if(!userInfo){
            return
        }
        const idList = followList.map((e)=>e.id);
        return idList.includes(id);
    }

    function loadingUser(){
        
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,config);
        request.then((e)=>{
            setUserInfo(e.data.user);
            console.log(e.data);
            console.log(e.data.user);
        })
        request.catch((e)=>{
            console.log(e.data.response);
            console.log('nao consegui');
        })
    }


    return(
        <>
            <Navbar />
            <Container>
                <TitleContainer>
                    <Title>
                    {userInfo ? <img src={`${userInfo.avatar}`} alt={`${userInfo.username} profile`}/> : ""} 
                        <h1>{ userInfo ? username() : ""}</h1>
                    </Title>
                    <Button follow={CheckIfIFollow()}> {CheckIfIFollow()?'Unfollow':'Follow'} </Button>
                </TitleContainer>
                <div>
                    <Posts>
                        { isLoading ? <Load>Loading</Load> : ""}
                        { isError ? <Load>Houve uma falha ao obter os posts, <br/> por favor atualize a página</Load> : ""}
                        { isEmpty && !isLoading ? <Load>Nenhum post encontrado</Load> : ""}
                        {userPosts.map(post =><Post key={post.id} post={post} postUser={post.user} likes={post.likes}/>)}
                    </Posts>
                    <Trending >
                        <TrendingBar/>
                    </Trending>
                </div>
            </Container>
        </>
    )
}

const TitleContainer = styled.div`
    align-items: center !important;
`
const Title=styled.div`
    display: flex;
    justify-content: flex-start !important;
    align-items: center !important;
    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 18px;
    }
`
const Button = styled.button`
    width: 112px;
    height: 31px;
    border: none;
    border-radius: 5px;
    background-color: ${props=>props.follow?"#FFF":"#1877F2"};
    color:${props=>props.follow?"#1877F2":"#FFF"};
    font-size: 14px;
    font-weight: 700;
`
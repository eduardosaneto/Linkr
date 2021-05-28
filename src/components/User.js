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
    const {id} = useParams()
    const [userPosts, setUserPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    
    useEffect(() => loadingPostsUser(),[])
    
    function username() {
        return userPosts[0].user.username +"'s posts"
    }

    function loadingPostsUser() {
        const localstorage = JSON.parse(localStorage.user);
        const token = localstorage.token;
        setIsLoading(true)
        setIsError(false)
        const config = { headers: { Authorization: `Bearer ${token}`}}
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`, config)

        request.then( response => {
            setUser(localStorage.user);
            const data = response.data.posts
            setUserPosts([...response.data.posts])
            setIsLoading(false)
            if(userPosts === data) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }})
    }

    return(
        <>
            <Navbar />
            <Container>
                <h1>{ userPosts.length === 0 ? "" : username()}</h1>
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
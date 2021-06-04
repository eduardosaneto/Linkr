import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import { useState, useContext, useEffect } from 'react';
import { Container, Posts, Trending, Load } from "../styledComponents/Content";
import Navbar from './Navbar';
import Post from './Post';
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import loading from '../img/loading.svg'
import TrendingBar from './TrendingBar';
import CreatePosts from './CreatePosts';
import useInterval from 'react-useinterval';
import { FaDoorClosed, FaHourglassEnd } from 'react-icons/fa';
export default function Timeline(){
    const {user, setUser, followingUsers, setFollowingUsers} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [afterLoading, setAfterLoading] = useState(null)
    const [hasMorePosts, setHasMorePosts] = useState(false)
    const location = useLocation();
    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const config = { headers:{ Authorization: `Bearer ${token}`}};

    useEffect(() => checkFollowingUsers(),[])

    function checkFollowingUsers() {
        setIsLoading(true)
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows', config)

        request.then( response => {
            setFollowingUsers(response.data.users);
            setUser(localStorage.user);
            loadingPosts()
        })

        request.catch( () => {setIsError(true); setIsLoading(false)})
    }

    function loadingPosts() {
        setIsLoading(true)
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts', config)

        request.then( response => {
            const data = response.data.posts 
            setPosts(response.data.posts)
            setIsLoading(false)
            setHasMorePosts(true)  
            if(data.length === 0 && followingUsers.length !== 0){
                setAfterLoading(<Load>Nenhuma publicação encontrada</Load>)
                return
            } else if (data.length === 0 && followingUsers.length === 0) {
                setAfterLoading(<Load>Você não segue ninguém ainda, procure por perfis na busca</Load>)
                return
            }
        })

        request.catch( () => {setIsError(true); setIsLoading(false)});
    }

    useInterval(updatePosts,15000);

    function updatePosts(){
        setIsError(false)
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?earlierThan=${posts[0].id}`,config)
        
        request.then( response => {
            if(response.data.posts !== undefined){
                setPosts([...response.data.posts, ...posts]);
            } 
        })
        request.catch( () => {setIsError(true); setIsLoading(false); setHasMorePosts(false)})
    }

    function fetchPosts(){
        console.log("fetch", posts)
        if(posts.length > 200){
            setHasMorePosts(false)
            return
        }

        if(posts.length !== 0){
            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${posts[posts.length - 1].id}`, config)

            request.then( response => {
                console.log("TO AQUI")
                if(response.data.posts.length < 10){
                    setHasMorePosts(false)
                } 
                setTimeout(() => setPosts([...posts,...response.data.posts]),1000)
            })

            request.catch( () => {setIsError(true); setIsLoading(false); setHasMorePosts(false)})
        }
    }
    // hasMorePosts ?<Load><div><img src={loading}/>Loading more posts...</div></Load> : ""
    return(
        <>
            <Navbar />
            <Container>
                <h1>timeline</h1>
                <div>
                    <Posts>
                        <CreatePosts loadingPosts = {updatePosts} />
                        { isLoading ? <Load><div><img src={loading}/>Loading...</div></Load>  : ""}
                        { isError ? <Load>Houve uma falha ao obter os posts, <br/> por favor atualize a página</Load> : ""}
                        { posts === undefined || (posts.length === 0 && afterLoading === null) || posts.length !== 0 ? "" : afterLoading}
                        <InfiniteScroll pageStart={0} loader={<Load><div><img src={loading}/>Loading more posts...</div></Load> } hasMore={true} loadMore={fetchPosts}>
                            {posts.map( post => 
                                <Post 
                                    key={post.id} id={post.id} post={post} 
                                    postUser={post.user} likes={post.likes}
                                    reloadingPosts={loadingPosts}
                                    location={location}
                                />
                            )}
                        </InfiniteScroll>
                    </Posts>
                    <Trending >
                        <TrendingBar />
                    </Trending>
                </div>
            </Container>
        </>
    )
}
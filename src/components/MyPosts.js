
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Usercontext from "../contexts/UserContext";
import { Container, Posts, Trending, Load } from "../styledComponents/Content";
import Navbar from "./Navbar";
import Post from "./Post";
import TrendingBar from "./TrendingBar";

export default function MyPosts(){

    const {user, setUser} = useContext(Usercontext);
    const [ posts, setPosts ] = useState([]);
    const [ requestLoading, setRequestLoading ] = useState(1);
    const [ erro, setErro ] = useState(0);
    const localstorage = JSON.parse(localStorage.user);
    console.log(localstorage.user['id'])
    useEffect(()=>{
        
        const token = localstorage.token;
        const config = { headers:{ Authorization: `Bearer ${token}`}};
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${localstorage.user['id']}/posts`,config);

        request.then((e)=>{
            setUser(localStorage.user);
            setPosts(e.data.posts)
            setRequestLoading(0);     
        })
        request.catch(()=>{
            setErro(1);
        })
    
    },[])


    return(
        <>
            <Navbar />
            <Container>
                <h1>my posts</h1>
                <div>
                    <Posts>
                    {requestLoading
                    ?(erro?<Load>Houve uma falha ao obter os posts,<br/>por favor atualize a página.</Load>:<Load>Loading</Load>)
                    :(posts.length ? (posts.map( (post) => 
                        <Post 
                            key={post.id} id={post.id} post={post} 
                            postUser={post.user} likes={post.likes}
                        />)) : 
                        <Load>Nenhum post encontrado</Load>)
                    }
                    </Posts>                    
                    <Trending >
                        <TrendingBar />
                    </Trending>
                    
                </div>  
            </Container>
        </>
    )
}

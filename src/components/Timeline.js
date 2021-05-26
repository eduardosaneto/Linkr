import axios from 'axios'
import { useState, useContext, useEffect } from 'react';
import { Container, Posts, Trending } from "../styledComponents/Content";
import Post from './Post';

import UserContext from "../contexts/UserContext";

export default function Timeline(){
    {/*const {user} = useContext(UserContext)*/};
    const [posts, setPosts] = useState([]);

    useEffect(() => {loadingPosts()},[])
    
    function loadingPosts(){
        const config = { headers:{ Authorization: `Bearer 732249a2-af53-4731-bd8f-4a7c79b3015a`}};        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config)

        request.then( response => {setPosts(response.data.posts); console.log(response.data.posts)})
        request.catch( () => alert("Houve uma falha ao obter os posts, por favor atualize a página"))
    }

    return(
        
        <Container>
            <h1>timeline</h1>
            <div>
                <Posts>
                    {posts.map( post => <Post key={post.id} post={post}/>)}
                </Posts>
                <Trending >
                    <h1>trending</h1>
                    <ul><li># javascript</li></ul>
                </Trending>
            </div>
        </Container>
    )
}
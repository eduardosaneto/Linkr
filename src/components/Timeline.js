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
        {/*const config = { headers:{ Authorization: `Bearer ${user.token}`}}*/}
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', {})

        request.then( response => setPosts(response.data))
        request.catch( () => alert("Houve uma falha ao obter os posts, por favor atualize a página"))
    }

    return(
        
        <Container>
            <h1>timeline</h1>
            <div>
                <Posts>
                    {/*posts.map( post => <Post post={post}/>)*/}
                    <Post/>
                </Posts>
                <Trending>
                    <h1>trending</h1>
                    <ul><li># javascript</li></ul>
                </Trending>
            </div>
        </Container>
    )
}
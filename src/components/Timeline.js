import axios from 'axios'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react';
import { Container, Posts, Trending } from "../styledComponents/Content";
import Post from './Post';

import UserContext from "../contexts/UserContext";

export default function Timeline(){
    {/*const {user} = useContext(UserContext)*/};
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {loadingPosts()},[])
    
    function loadingPosts(){
        setIsLoading(true)
        const config = { headers:{ Authorization: `Bearer 732249a2-af53-4731-bd8f-4a7c79b3015a`}};        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config)

        request.then( response => {setPosts(response.data.posts); setIsLoading(false)})
        request.catch( () => setIsError(true))
    }

    return(
        <Container>
            <h1>timeline</h1>
            <div>
                <Posts>
                    { isLoading ? <Load>Loading</Load> : ""}
                    { isError ? <Load>Houve uma falha ao obter os posts, por favor atualize a página</Load> : ""}
                    {posts.map( post => <Post key={post.id} post={post} user={post.user}/>)}
                </Posts>
                <Trending >
                    <h1>trending</h1>
                    <ul><li># javascript</li></ul>
                </Trending>
            </div>
        </Container>
    )
}

const Load = styled.div`
    display: flex;
    justify-content: center;
    color: #FFF;
    font-size: 30px;
`
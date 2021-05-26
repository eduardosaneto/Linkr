import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Usercontext from "../contexts/UserContext";
import { Container, Posts, Trending } from "../styledComponents/Content";
import Navbar from "./Navbar";



export default function MyPosts(){

    const { user } = useContext(Usercontext);
    const [ posts, setPosts ] = useState([]);

    const config = { headers:{ Authorization: `Bearer ${user.token}`}};
    useEffect(()=>{
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`,config);

        request.then((e)=>{
            setPosts(e.posts)
            console.log("consegui pegar os posts")
        })
        request.catch(()=>{
            console.log("Deu problema na hora de pegar os posts")
        })
    
    },[])


    return(
        <>
            <Navbar />
            <Container>
                <h1>My posts</h1>
                <div>
                    <Posts>
                        {posts===undefined?"Você não postou nada!":""}

                    </Posts>
                    <Trending>

                    </Trending>
                </div>  
            </Container>
        </>
    )
}
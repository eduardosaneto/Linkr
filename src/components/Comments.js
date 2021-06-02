import axios from 'axios'
import { useState, useContext, useEffect } from 'react';
import UserContext from "../contexts/UserContext";
import styled from 'styled-components'
import { IoPaperPlaneOutline } from 'react-icons/io5'

export default function Comments({id}) {
    const {user, setUser} = useContext(UserContext);
    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const localstorage = JSON.parse(localStorage.user);
    const token = localstorage.token;
    const config = { headers:{ Authorization: `Bearer ${token}`}};
    // array de quem sigo
    // array total

    useEffect( () => loadingComments(),[])

    function loadingComments() {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comments`, config)

        request.then( response  => setComments(response.data.comments))
    }

    function sendComment(e){
        e.preventDefault();
        const body = {text};
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comment`, body, config)

        request.then( response => {
            console.log("enviou comentario",response.data)
            setText("")
            loadingComments()
        })
    }
    return(
        <CommentsContainer>
            {comments.map(comment => {
               return <CommentBox key={comment.id}>
                    <ProfilePicture>
                        <img src={comment.user.avatar}/>
                    </ProfilePicture>
                    <div className="comment">
                        <div className="username">{comment.user.username}</div>
                        <p>{comment.text}</p>
                    </div>
            </CommentBox>})}
            <InputBox>
                <ProfilePicture>
                    <img src={localstorage.user.avatar}/>
                </ProfilePicture>
                <form onSubmit={sendComment}>
                    <input 
                        placeholder="write a comment..." 
                        onChange={(e) => setText(e.target.value)} 
                        value={text}
                    />
                    <button type="submit">
                        <PlaneIcon />
                    </button>   
                </form>    
            </InputBox>
        </CommentsContainer>
    )
}

const CommentsContainer = styled.div`
    height: auto;
    width: 611px;
    background: #1E1E1E;
    font-size: 14px;
    padding: 20px 0;
    margin-bottom: 16px;
    margin-top: -30px;
    border-radius: 16px;

    .username{
        color: #FFF;
        font-weight: 700;
    }

    p{
        color: #ACACAC;
        padding-top: 5px;
        min-width: 16px;
    }

`
const ProfilePicture = styled.div`
    margin-right: 18px;

    img{
        height: 39px;
        width: 39px;
        border-radius: 50%;
    }
`
const InputBox = styled.div`
    display: flex;
    margin: 20px;

    form{
        display: flex;
        width: 100%;
        height: 39px;
        position: relative;
    }

    input{
        width: 100%;
        border-radius: 9px;
        background: #252525;
        padding: 10px;
        border: none;
        color: #FFF;
        ::placeholder{
            color: #575757;
            font-style: italic;
        }
    }

    button{
        position: absolute;
        background: #252525;
        width: 10%;
        height: 39px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-right-radius: 9px;
        border-top-right-radius: 9px;
        border: none
    }
`
const CommentBox = styled.div`
    display: flex;
    border-bottom: 1px solid #353535;
    margin: 0 20px;
    padding: 16px 0;
`
const PlaneIcon = styled(IoPaperPlaneOutline)`
    color: #FFF;
    font-size: 16px;
`
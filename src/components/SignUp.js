import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [disabled, setDisabled] = useState(false);
    let history = useHistory();

    function SendInfo(e) {
        setDisabled(true);
        e.preventDefault();
        const info = { email, password, username, pictureUrl}
        
        const request = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
            info
        );
        request.then((e) => {
            history.push("/");
        });
        request.catch((e) => {
            if (e.response.status === 403) {
                alert("O email inserido já está cadastrado!");
                return;
            }
        });
    }

    return (
        <>
            <Container>
                <LogoContainer>
                    <div>
                        <h1>linkr</h1>
                        <p>save, share and discover <br/> the best links on the web</p>
                    </div>

                </LogoContainer>
                <InputContainer>
                    <Inputs>
                        <form onSubmit={SendInfo}>
                            <input
                                placeholder="e-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={disabled}
                            />
                            <input
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={disabled}
                            />
                            <input
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={disabled}
                            />
                            <input
                                placeholder="picture url"
                                type="url"
                                value={pictureUrl}
                                onChange={(e) => setPictureUrl(e.target.value)}
                                required
                                disabled={disabled}
                            />
                            <button type="submit" disabled={disabled}>Sign Up</button>
                            <p><Link to="/">Switch back to log in</Link></p>
                        </form>
                    </Inputs>
                </InputContainer>
            </Container>
            
        </>
    );
}

const Container = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    @media (max-width: 611px){
        flex-direction: column;
    }
`
const InputContainer = styled.div`
    width:36%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 611px){
        width: 100vw;
        height: auto;
    }
`
const LogoContainer = styled.div`
    width: 64%;
    height: 100vh;
    background-color: #151515;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Passion One', cursive;

    div{
        margin-left: 16%;
    }

    h1{
        font-size: 106px;
    }

    p{
        font-size: 46px;
    }

    @media (max-width: 611px){
        width: 100vw;
        height: 175px;
        text-align: center;

        div{
            margin: 0
        }

        h1{
            font-size: 76px;
        }

        p{
            font-size: 23px;
        }
    }
`



const Inputs = styled.div`
    width:80%;
    margin: 0 auto;
    margin-top: 137px;

    input{
        width: 100%;
        height: 65px;
        background-color: #FFF;
        padding-left: 17px;
        border-radius : 6px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 13px;
        border: none;
    }

    button{
        width: 100%;
        height: 65px;
        background-color: #1877F2;
        color: #FFF;
        border-radius : 6px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: bold;
        border: none;
        text-decoration: none;
    }

    button:hover{
        cursor: pointer;
    }

    p{
        width: 100%;
        text-align: center;
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        text-decoration: underline;
        color: #FFF;
        margin-top: 14px;
    }

    @media (max-width: 611px){
        margin-top: 40px;
        width: 90%;
        input{
            font-size: 17px;
            height: 55px;
        }

        button{
            font-size: 22px;
            height: 55px;
        }

        p{
            font-size: 17px;
        }
    }

`
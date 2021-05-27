import styled from 'styled-components'
import ReactHashtag from "react-hashtag";
import { Link } from 'react-router-dom'
import { BsHeart} from 'react-icons/bs'

export default function Post({post, user}) {

    return (
        <PostContainer>
            <Profile>
                <Link to={`/user/${user.id}`}><img src={user.avatar} alt={`${user.username}' profile`}/></Link>
                <div>
                    <HeartIcon/>
                    <p>13 likes</p>
                </div>
            </Profile>
            <Content>
                <h2>{user.username}</h2>
                <p>
                <ReactHashtag renderHashtag={(hashtagValue) => (
                    <Link to={`/hashtag/${hashtagValue}`.replace("#","")}>
                       <Hashtag>{hashtagValue}</Hashtag>
                    </Link>)}>
                    {post.text} 
                </ReactHashtag>
                </p>
                <LinkSnippet href={post.link} target={"_blank"}>
                    <Text>
                        <h2>{post.linkTitle}</h2>
                        <p>{post.linkDescription}</p>
                        <div>{post.link}</div>
                    </Text>
                    <img src={post.linkImage} alt="website" />
                </LinkSnippet>
            </Content>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 276px;
    width: 100%;
    font-weight: 400;
    padding: 18px 18px 20px 21px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;   
`;
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 104px;
    
    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    p{
        color: #FFF;
        font-size: 11px;
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-between;
        height: 35px;
    }
`;
const Content = styled.div`
    width: 503px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    >h2{
        color: #FFF;
        font-size: 19px;
    }
    >p{
        font-size: 17px;
        color: #B7B7B7;
    }
`;
const LinkSnippet = styled.a`
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    height: 155px;
    display: flex;
    justify-content: space-between;
    word-wrap: break-word;
    overflow: hidden;
    img {
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        height: 100%;
        width: 154px;
    }
`;
const Text = styled.div`
    margin: 23px 27px 23px 19px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    h2{
        font-size: 16px;
        color: #CECECE;
    }
    p{
        color: #9B9595;
        font-size: 11px;
        line-height: 12px;
    }
    div {
        color: #CECECE;
        font-size: 11px;
    }
`;
const HeartIcon = styled(BsHeart)`
    color: #FFF;
`;
const Hashtag = styled.span`
    color: #FFF;
    font-weight: 700;
`;
import styled from 'styled-components'
import { BsHeart } from 'react-icons/bs'

export default function Post() {
    return (
        <PostContainer>
            <Profile>
                <img src="https://yt3.ggpht.com/ytc/AAUvwniFYPUGdxQlEddGuOuxuP9Va39N-vU616xjBjle=s900-c-k-c0x00ffffff-no-rj"/>
                <div>
                    <HearIcon/>
                    <p>13 likes</p>
                </div>
            </Profile>
            <Content>
                <h2>Juvenal Juvêncio</h2>
                <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</p>
                <LinkNews>
                    <div>
                        <h2>Como aplicar o Material UI em um projeto React</h2>
                        <p>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</p>
                        <div>https://medium.com/@pshrmn/a-simple-react-router</div>
                    </div>
                    <img src="https://yt3.ggpht.com/ytc/AAUvwniFYPUGdxQlEddGuOuxuP9Va39N-vU616xjBjle=s900-c-k-c0x00ffffff-no-rj" />
                </LinkNews>
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
`
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
`
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
`

const LinkNews = styled.div`
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    height: 155px;
    display: flex;
    justify-content: space-between;
}

    > div{
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
        }

        div {
            color: #CECECE;
            font-size: 11px;
        }
    }

    img {
        border-radius: 0%;
        height: 100%;
        width: 154px;
    }
`;

const HearIcon = styled(BsHeart)`
    color: #FFF;
`
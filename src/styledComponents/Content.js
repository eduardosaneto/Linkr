import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 auto;
    margin-top: 125px;
    width: 937px;

    h1 {
        font-size: 43px;
        font-family: 'Oswald', sans-serif;
        color: #FFF;
    }

    > div {
        display: flex;
        justify-content: space-between;
        margin-top: 43px;
    }

    @media (max-width: 937px){
        width: 611px;
    }

    @media (max-width: 611px){
        width: 100vw;
        margin-top: 91px;
        > h1{
            margin-left: 17px;
            font-size: 33px;
        }
        >div{
            margin-top: 19px;
        }
    }
`;

export const Trending = styled.aside`
    display: flex;
    flex-direction: column;
    background: #171717;
    width: 32.1%;
    height: 406px;
    border-radius: 16px;

    h1 {
        display: flex;
        align-items: center;
        height: 65px;
        padding-left: 16px;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        color: #FFF;
        border-bottom: 1px solid #4D4D4D;
    };

    ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 70%;
        color: #FFF;
        font-weight: 700;
        font-size: 19px;
        padding: 22px 0 30px 16px;
    
        li {
            margin-bottom: 10px;
        }
    }

    @media (max-width: 937px){
        display: none;
    }
`;

export const Posts = styled.div`
    width: 65.2%;

    ul {
        width: 100%;
    }

    li {
        display: flex;
        justify-content: space-between;
        height: 237px;
        padding: 18px 18px 20px 21px;
        background: #171717;
        border-radius: 16px;
        margin-bottom: 16px;
    }

    @media (max-width: 611px){
        width: 100%;
        border-radius: 0;
    }
`;
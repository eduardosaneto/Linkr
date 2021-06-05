import styled from "styled-components";

export const PostContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 400;
    padding: 18px 18px 20px 21px;
    background: #171717;
    margin-bottom: 16px;
    border-radius: 16px;
    position: relative;
    z-index:0;

    .button:focus,
    .button:hover {   
        filter: brightness(700%);
        animation: pulse 1s;
        opacity: 0.8;

    }
    @media (max-width: 611px) {
        border-radius: 0;
        padding: 9px 18px 15px 15px;
        height: 232px;
    }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 85px;
  padding-right: 10px;
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  p {
    color: #fff;
    font-size: 12px;
    margin-top:8px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top : 18px;

  }

  @media (max-width: 611px) {
    height: 130px;
    margin-left: -6px;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      font-size: 9px;
    }
    >div{
      height:28px;
      width: 55px;
    }
  }
`;

export const Image = styled.div`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: url("${props => props.avatar}");
    background-size: cover;
    background-position: center;
`;

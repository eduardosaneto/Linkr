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

export const BarContainer = styled.div`
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

export const ContentContainer = styled.div`
  width: 503px;
  height: 100%;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  .edit-text {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 23px;
    margin-bottom: 1.5px;

    form{
      width:100%;
    }
    > h2 {
      color: #fff;
      font-size: 19px;
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
    > p {
      font-size: 17px;
      line-height: 23px;
      color: #b7b7b7;
      max-height: 70px;
      margin-top: 19px;
      margin-bottom: 14px;
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
  }

  > h2 {
    color: #fff;
    font-size: 19px;
  }
  > p {
    font-size: 17px;
    line-height: 23px;
    color: #b7b7b7;
    max-height: 70px;
    margin-top: 19px;
    margin-bottom: 14px;
  }

  div {
    color: white;
    display: flex;
  }

  input {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 23px;
    border-radius: 7px;
    padding: 0px 5px;
    color: #4c4c4c;
    background-color: #ffff;
    outline: none;
    border: none;
    margin-top: 19px;
    margin-bottom: 14px;
    font-weight: bold;
    font-size: 17px;
    line-height: 23px;
  }


  @media (max-width: 611px) {
    width: 100%;
    > h2 {
      font-size: 16px;
    }
    > p {
      font-size: 14px;
      line-height: 16px;
      h2 {
        color: #fff;
        font-size: 19px;
      }
      > div {
        width: 100%;
        max-width: 502px;
        max-height: 52px;
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
      }
      > div p {
        font-size: 15px;
        line-height: 20px;
        color: #b7b7b7;
      }
      @media (max-width: 611px) {
        width: 82%;
        > h2 {
          font-size: 16px;
        }
        > p {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
`;

export const NameBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
 
    @media (max-width: 611px) {
      width: 100%;
    }
`

export const Text = styled.div`
  padding: 10px;
  height: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; 
  word-break: break-word;
> h2 {
    font-size: 16px;
    color: #cecece;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    height: 30%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

> p {
    color: #9b9595;
    font-size: 11px;
    line-height: 13px;
    margin-bottom: 15px;
    height: 50%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
 > div {
  height: 20%;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
> div p {
    color: #cecece;
    font-size: 11px;
  }
  @-moz-document url-prefix() { 
    overflow:hidden;
    p,h2{
      word-break: break-word !important;
    }
  }
  @media (max-width: 611px) {
    width: 67%;
    h2 {
      margin-top: 5px;
      font-size: 11px;
      line-height: 13px;
    }
    p {
      font-size: 9px;
      line-height: 9px;
    }
    div {
      font-size: 9px;
      line-height: 9px;
    }
  }
`;

export const YoutubePlayer = styled.div`
  display: flex;
  flex-direction: column;

  iframe{
    margin-top: 8px;
    margin-bottom: 8px;
  }
  @media (max-width: 611px) {
      width: 100%;
      iframe{
        width:100%;
        height:100%;
      }
    }
`

export const LinkSnippet = styled.div`
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  height: 155px;
  display: flex;
  justify-content: space-between;

  img {
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 100%;
    width: 154px;
    object-fit: cover;
    background-position: center;
  }

  &:hover{
    cursor:pointer;
  }
  img:before{
    content: ' ';
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 100%;
    width: 154px;
    object-fit: cover;
    background-position: center;
  }
  @media (max-width: 611px) {
    height: 115px;
    img {
      width: 33%;
    }
  }
`;

export const Hashtag = styled.span`
  color: #fff;
  font-size: 19px;
  line-height: 23px;
`;
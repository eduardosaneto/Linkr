import styled from 'styled-components'
import { RespostIcon } from '../styledComponents/IconStyles'

export default function Repost({post}) {
    const localstorage = JSON.parse(localStorage.user);
    
    return (
        <RepostContainer>
            <RespostIcon className="RepostBar"></RespostIcon>
            <p>re-posted by <span>{localstorage.user.id===post.repostedBy['id']?'You':post.repostedBy['username']}</span>
            </p>
        </RepostContainer>
    )
}

const RepostContainer = styled.div`
  height: 44px;
  display: flex;
  position: relative;
  top:12px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 16px 16px 0 0;
  background-color:#1E1E1E;
  
  .RepostBar{
    cursor: default;
    margin-left: 24px;
    margin-bottom: 10px;
  }

  p{
    font-size:11px;
    margin-left: 6px;
    color: #FFF;
    margin-bottom: 10px;

    span{
      font-weight: bold;
    }
  }
`;

import { useState } from "react";

import Repost from './Repost'
import Comments from './Comments';
import Bar from './Bar'
import Content from './Content'

import { PostContainer } from './PostStyles'
import "tippy.js/dist/tippy.css";
import '../../styles/react-confirm-alert.css'

export default function Post({post, id, postUser, likes, reloadingPosts, loadMyPosts, location, OpenModal}) {
  const [showComments, setShowComments] = useState(false)

  return (
    <>
    {post.hasOwnProperty("repostedBy") ? <Repost post={post}/> : null}
    <PostContainer key={postUser.id}>
      <Bar post={post} setShowComments={setShowComments} showComments={showComments} likes={likes}/>
      <Content post={post} OpenModal={OpenModal} location={location} loadMyPosts={loadMyPosts} reloadingPosts={reloadingPosts} />
    </PostContainer>
    {showComments ? <Comments id={id} postUser={post.user} /> : null}
    </>
  );
}




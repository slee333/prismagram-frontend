import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

// * Post를 구성하는데 필요한 변수들을 받아오고, Post와 관련된 여러 함수들을 정의합니다.

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  // 유저가 Post를 like 했는지, like의 갯수가 무엇인지를 state 형태로 저장합니다.
  // 만일 like 갯수 등을 state으로 저장하지 않으면, 좋아요를 했다 말았다 할 때 마다 서버와 통신해서 그 값을 받아와야 하는데 그럼 느려집니다.
  // 그런 상황을 방지하기 위해 like count 등은 state 형태로 저장합니다.
  // 실시간으로 사용자의 활동을 반영하기 위해 prop들 중 몇개를 state으로 저장해서 실시간으로 조작한다 생각하면 될 거 같아요.
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);

  const comment = useInput("");

  // PostQueries.js에 달아놓은 mutation들을 이용해줍니다.
  // 좋아요를 toggle (껐다 켰다) 해주는 mutation입니다.
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  }); // toggleLike mutation엔 Post의 id만 필요하니 해당 부분을 넣어주고

  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  }); // add comment는 post의 id와 코멘트 내용을 필요로 합니다.

  // 인스타그램에서 slide 시켜주는 부분입니다.
  // 각 post 안에는 file들이 있는데, 이걸 3초에 한번씩 바꿔줍니다.
  // 병원 프로파일 페이지에 응용이 가능할거같아요
  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  // toggleLikeMutation을 이용해 like를 껐다 켜는 코드를 만듭니다.
  const toggleLike = () => {
    
    // toggleLikeMutation은 자체적으로 해당 post의 좋아요 여부를 따져 like를 껐다 켜줄 수 있게 해줍니다.
    toggleLikeMutation();

    // 좋아요의 state이 true라면 setIsLiked를 통해 그걸 false로 만들어주고 Like Count 역시 하나 차감합니다. 반대로도 마찬가지.
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  // 우리가 사용하는 코맨트 박스는 줄이 길어지면 아래로 확장이 됩니다.
  // 그래서 엔터키를 눌러도 원래는 한 줄만 추가되고 제출을 할수가 없는데, 그걸 방지하기 위해 onKeyPress를 사용합니다.
  // Key code 13은 엔터키입니다.
  const onKeyPress = async event => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try { 
        const {
          data: { addComment }
        } = await addCommentMutation(); // 엔터키를 누르면 코멘트를 추가하고 
         
        setSelfComments([...selfComments, addComment]); // 내가 단 코멘트 State에 방금 단 코멘트를 넣어 업데이트합니다.
        comment.setValue(""); // 그리고 코멘트 창을 지웁니다.
      } catch {
        toast.error("Cant send comment");
      }
    }
  };
  // State에 기록한 값들은 해당 값들을 넘겨주고 나머지는 모두 PostPresentor에 넘겨줍니다 .
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

// Post 안에 들어갈 prop들의 type을 결정해줍니다.
// shape은 객체라고 생각하면 편합니다.
PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;

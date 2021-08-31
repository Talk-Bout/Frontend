import React from 'react';
import { Text } from '../elements';
import { BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const PostInfo = (props) => {
  const {postInfo} = props;

  return (
    <React.Fragment>
      <span style={{ height: 'fit-content'}}>
          {/* 추천 수 */}
          <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px" MOBfontSize='8px'>
            <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiLike /></Text>
            {postInfo.likes ? postInfo.likes.length : 0}
          </Text>
          {/* 답변 수 */}
          <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px" MOBfontSize='8px'>
            <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiComment /></Text>
            {postInfo.commentNumber ? postInfo.commentNumber : 0}
          </Text>
          {/* 조회수 */}
          <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" TABfontSize="10px" MOBfontSize='8px'>
            <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><AiOutlineEye /></Text>
            {postInfo.viewCount > 0 ? postInfo.viewCount : 0}
          </Text>
        </span>
    </React.Fragment>
  )
};

PostInfo.defaultProps = {
  postInfo: {
    viewCount: 0,
    commentNumber: 0,
    likes: null,
  }
}

export default PostInfo;
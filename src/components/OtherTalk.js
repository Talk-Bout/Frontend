import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { GoPrimitiveDot } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const OtherTalk = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.setPostPopDB(1));
  }, []);

  const pop_list = useSelector(state => state.post.pop_list);
  const pop_ten = pop_list.slice(0, 10);

  const nextPost = (postId) => {
    dispatch(postActions.setOnePostDB(postId));
    history.push(`/common/detail/${postId}`)
  }

  return (
    <React.Fragment>
      <OthersBox>
        <Text fontSize='18px' fontWeight='700' color='#E8EAED' cursor='default'>인기 부트톡톡</Text>
        {pop_ten.map((pt, idx) => {
          return (
            <Text key={idx} p fontSize='16px' margin='8px 0 0' color='#DADCE0' _onClick={() => nextPost(pt.postId)} cursor='pointer' hover='opacity: 0.7' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'><GoPrimitiveDot style={{ height: '10px' }} />{pt.title}</Text>
          )
        })}
      </OthersBox>
    </React.Fragment>
  )
};

const OthersBox = styled.div`
  height: fit-content;
  background-color: #202124;
  padding: 24px;
  @media screen and (max-width: 1150px) {
    display: none;
  }
`;

export default OtherTalk;
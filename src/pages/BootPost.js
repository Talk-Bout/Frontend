import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text} from '../elements';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiLike, BiComment } from "react-icons/bi";
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as commentActions} from '../redux/modules/comment';
import {history} from '../redux/ConfigureStore';

const BootPost = (props) => {
  // const dispatch = useDispatch();
  // const post_id = window.location.pathname.split('/boot/post/')[1];
  // const post_list = useSelector(state => state.post.list);
  // const post_found = post_list.find((post) => post.postId == post_id);

  // const comment_list = useSelector(state => state.comment.list);

  // const commentInput = useRef(null);

  // useEffect(() => {
  //   if (post_found) {
  //     dispatch(commentActions.setCommentDB(post_id));
  //     return;
  //   }
  //   dispatch(postActions.setOnePostDB(post_id));
  //   dispatch(commentActions.setCommentDB(post_id));
  // }, []);

  // const addComment = () => {
  //   const content = commentInput.current.value;
  //   const new_comment = {
  //     nickname: 'username',
  //     content: content,
  //   }
  //   dispatch(commentActions.addCommentDB(new_comment, post_id));
  //   commentInput.current.value = '';
  // }

  // const deleteComment = (post_id, comment_id) => {
  //   dispatch(commentActions.deleteCommentDB(post_id, comment_id));
  // }

  // if (!post_found) {
  //   return (
  //     <></>
  //   );
  // };

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='auto'>
        <Sidebar />
        <Body header>
          <BodyInner>
            <div className='post-box' style={{padding: '0 10px 0 0'}}>
              <Post>
                <TitleBox>
                  <Grid display='flex' justify_content='space-between'>
                    <div><Text fontSize='1.7vh' color='#dadce0'>부트캠프 &gt; 커뮤니티</Text></div>
                    <Grid width='auto'>
                      <PostBtn style={{margin: '0 10px 0'}}><Text fontSize='1.5vh' color='#f1f3f4'>수정</Text></PostBtn>
                      <PostBtn><Text fontSize='1.5vh' color='#f1f3f4'>삭제</Text></PostBtn>
                    </Grid>
                  </Grid>
                  <Text p fontSize='2.5vh' color='#f1f3f4' fontWeight='700' margin='15px 0'>항해99 궁금한 게 있어용</Text>
                  <Text fontSize='1.5vh' color='#7A7E82'>2021.08.02</Text>
                </TitleBox>
                <ContentBox>
                  <Text p fontSize='1.7vh' color='#dadce0'>부트캠프 참여하려고 알아보는 중인데 궁금한 게 있습니다. 항해99 생각중인데, 제가 프론트보다는 백엔드쪽으로 하고 싶은데 괜찮을까요?부트캠프 참여하려고 알아보는 중인데 궁금한 게 있습니다. 항해99 생각중인데, 제가 프론트보다는 백엔드쪽으로 하고 싶은데 괜찮을까요?부트캠프 참여하려고 알아보는 중인데 궁금한 게 있습니다. 항해99 생각중인데, 제가 프론트보다는 백엔드쪽으로 하고 싶은데 괜찮을까요?부트캠프 참여하려고 알아보는 중인데 궁금한 게 있습니다. 항해99 생각중인데, 제가 프론트보다는 백엔드쪽으로 하고 싶은데 괜찮을까요?부트캠프 참여하려고 알아보는 중인데 궁금한 게 있습니다. 항해99 생각중인데, 제가 프론트보다는 백엔드쪽으로 하고 싶은데 괜찮을까요?</Text>
                </ContentBox>
                <IconBox>
                  <span style={{backgroundColor: '#202124', padding: '10px', margin: '', borderRadius: '10px'}}><Text color='#BDC1C6' fontSize='2vh' fontWeight='700'><BiLike /> 17</Text></span>
                  <Text color='#BDC1C6' fontSize='1.7vh' margin='0 10px 0 20px'><BiComment /> 15</Text>
                  <Text color='#BDC1C6' fontSize='1.7vh' margin='0 10px 0'><AiOutlineEye /> 354</Text>
                </IconBox>
              </Post>
              <CommentInput>
                <Text p fontSize='1.7vh' color='#E1E1E1'>댓글 15</Text>
                <InputWrap>
                  <Input placeholder='댓글을 남겨주세요'></Input>
                  <Button><Text fontSize='1.7vh' fontWeight='700' color='#121212'>등록하기</Text></Button>
                </InputWrap>
              </CommentInput>
              <CommentList>
                {[1, 2, 3, 4, 5].map((n) => {
                  return (
                    <Comment>
                      <Grid display='flex' justify_content='space-between'>
                        <NameTime><Text fontSize='1.7vh' fontWeight='700' color='#F1F3F4' margin='0 10px 0 0'>익명1</Text><Text fontSize='1.5vh' color='#BDC1C6'>2021.08.02</Text></NameTime>
                        <Buttons>
                          <PostBtn style={{margin: '0 10px 0'}}><Text fontSize='1.5vh' color='#dadce0'>수정</Text></PostBtn>
                          <PostBtn><Text fontSize='1.5vh' color='#dadce0'>삭제</Text></PostBtn>
                        </Buttons>
                      </Grid>
                      <Word><Text fontSize='1.7vh' color='#F1F3F4'>둘 다 역량을 키워서 한쪽을 선택할 수 있게 합니다.</Text></Word>
                      <Like><Text fontSize='1.5vh' color='#BDC1C6' margin='0 10px 0 0'><BiLike /> 17</Text><Text fontSize='1.5vh' color='#BDC1C6'><BiComment /> 0</Text></Like>
                    </Comment>
                  )
                })}
                <MoreBtn><Text fontSize='1.6vh' fontWeight='700' color='#A9AAAB'>댓글 더보기(1/2)</Text></MoreBtn>
              </CommentList>
            </div>
            <OthersBox>
              <BoxInner>
                <Text p fontSize='2vh' fontWeight='700' color='#E8EAED'>커뮤니티 내 다른 게시글</Text>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
                  return (
                    <Text p fontSize='1.7vh' color='#DADCE0' _onClick={() => history.push('/boot/post')} cursor='pointer' hover='opacity: 0.7'><GoPrimitiveDot style={{height: '1.2vh'}} />부트캠프 질문 드립니다!</Text>
                  )
                })}
              </BoxInner>
            </OthersBox>
          </BodyInner>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const BodyInner = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 69% 29%;
`;

const Post = styled.div`
  width: 99%;
  height: auto;
  border-bottom: 1px solid #5F6368;
  padding: 0 0 20px;
`;

const TitleBox = styled.div`
  width: 99%;
  height: auto;
`;

const PostBtn = styled.button`
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid #f1f3f4;
  border-radius: 5px;
  padding: 2px 10px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: auto;
`;

const IconBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 5%;
`;

const CommentInput = styled.div`
  width: 99%;
  border-bottom: 1px solid #5F6368;
  padding-bottom: 40px;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  background-color: #17181B;
  border: 1.9px solid #9AA0A6;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.7vh;
  caret-color: #5F6368;
  color: #e1e1e1;
  &::placeholder {
    color: #5F6368 ;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 15%;
  background-color: #E1E1E1;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const CommentList = styled.div`
  width: 99%;
  height: auto;  
`;

const Comment = styled.div`
  width: 97%;
  border-bottom: 1px solid #5F6368;
  padding: 15px 10px 15px 20px;
`;

const NameTime = styled.div`
  width: auto;
  padding-bottom: 10px;
`;

const Buttons = styled.div`
  width: auto;
`;

const Word = styled.div`
  width: 100%;
`;

const Like = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const MoreBtn = styled.button`
  width: 100%;
  padding: 2.5% 0;
  background-color: #282A2D;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const OthersBox = styled.div``;

const BoxInner = styled.div`
  width: 100%;
  height: auto;
  background-color: #202124;
  padding: 20px;
`;



export default BootPost;
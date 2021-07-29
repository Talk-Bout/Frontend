import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Button, Grid, Input, Text} from '../elements';
import Header from '../components/Header';
import { BiTimeFive, BiLike, BiComment } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';

const ReviewDetail = (props) => {
  const dispatch = useDispatch();
  const post_id = window.location.pathname.split('/review/detail/')[1];
  const post_list = useSelector(state => state.post.list);
  const post_found = post_list.find((post) => post.postId == post_id);

  return (
    <React.Fragment>
      <Grid>
        <Header />
        <Grid is_center>
          <Post>
            <PostDiv>
              <PostBox>
                <Title><Text fontSize='2.5vh' fontWeight='700'>{post_found.title}</Text></Title>
                <TextBox><Text fontSize='1.5vh' color='#ccc'>{post_found.author}</Text></TextBox>
                <TextBox><Text fontSize='1.5vh' color='#ccc'><BiTimeFive /> {post_found.createdAt} <BiLike /> 17 <BiComment /> 5 </Text><Button width='5vw' margin='0 0.5vw 0'>수정</Button><Button width='5vw' margin='0 0.5vw 0'>삭제</Button></TextBox>
                <hr style={{margin: '3vh 0', borderTop: '1px solid #eee'}}/>
                <Body>
                  <Text fontSize='2vh'>{post_found.content}</Text>
                </Body>
                <hr style={{margin: '3vh 0', borderTop: '1px solid #eee'}}/>
              </PostBox>
              <CommentWrite>
                <TextBox><Text fontSize='1.6vh' fontWeight='700'>댓글 5</Text></TextBox>
                <InputBox>
                  <Input width='80%'></Input>
                  <Button width='20%' height='5vh'>등록</Button>
                </InputBox>
              </CommentWrite>
              <CommentList>
                <hr style={{margin: '1vh 0 0', borderTop: '1px solid #eee'}}/>
                <Button height='15%'>댓글 1개 더보기</Button>
                <hr style={{margin: '0 0 3vh', borderTop: '1px solid #eee'}}/>
                  {[1, 2, 3].map((c) => {
                    return (
                      <React.Fragment>
                        <TextBox><Text fontSize='1.5vh' color='#ccc'>G******</Text></TextBox>
                        <TextBox><Text fontSize='1.7vh'>둘 다 해요. 얕지만 다양하게 하는 겁니다.</Text></TextBox>
                        <TextBox><Text fontSize='1.5vh' color='#ccc'><BiTimeFive /> 2021.07.27 <BiLike /> 17 <BiComment /> 5 </Text></TextBox>
                        <hr style={{margin: '3vh 0', borderTop: '1px solid #eee'}}/>
                      </React.Fragment>
                    )
                  })}
              </CommentList>
            </PostDiv>
            <OthersDiv>
              <TitleBox>
                <Text float='left' fontSize='2vh' fontWeight='700'>다른 게시물</Text>
              </TitleBox> 
              <ul style={{marginTop: '2vh'}}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => {
                  return (
                    <li style={{marginBottom: '0.5vh'}}><Text float='left'>다른 게시물 제목입니다.</Text></li>
                  )
                })}
              </ul>
            </OthersDiv>
          </Post>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Post = styled.div`
  margin: auto;
  width: 55%;
  height: 100vh;
  display: flex;
`;

const PostDiv = styled.div`
  width: 70%;
  height: 100%;
  padding: 1vh;
`;

const PostBox = styled.div`
  background-color: white;
`;

const Title = styled.div`
  padding-top: 2vh;
  text-align: left;
`;

const TextBox = styled.div`
  text-align: left;
  margin-top: 1vh;
`;

const Body = styled.div`
  text-align: left;
  margin-top: 3vh;
`;

const CommentWrite = styled.div`
  height: 10%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: left;
  margin-top: 1vh;
`;

const CommentList = styled.div`
  height: 40%;
`;

const OthersDiv = styled.div`
  border: 1px solid #eee;
  width: 30%;
  height: 35%;
`;

const TitleBox = styled.div`
  padding: 2vh 1vw;
`;

export default ReviewDetail;
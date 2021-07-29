import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';
import Header from '../components/Header';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const QuestionList = (props) => {
  const question_list = useSelector((state) => state.post.list);
  return (
    <React.Fragment>
      <Header />
      <Grid padding="3% 10%">
        {/* 헤더 */}
        <Grid display="flex">
          <Text width="90%" fontSize="3.5vh" fontWeight="600">
            질문/답변 게시판
          </Text>
          <Button
            width="10%"
            margin="auto 0 auto auto"
            _onClick={() => history.push('/question/write')}
          >
            글쓰기
          </Button>
          {/* // 글쓰기 페이지로 이동하기 */}
        </Grid>
        <hr />

        {/* 게시물 목록 */}
        <Questions flex_wrap="wrap">
          {question_list.map((q, idx) => {
            return (
              <QuestionBox
                onClick={() => history.push(`/question/detail/${q.postId}`)}
              >
                <Grid display="flex">
                  <Text padding="3%" fontWeight="700" fontSize="2vh">
                    Q
                  </Text>
                  <Text padding="3%" fontWeight="700" fontSize="2vh">
                    {q.title}
                  </Text>
                </Grid>

                <Text padding="3%" fontSize="1.7vh" color="#C4C4C4">
                  {q.content}
                </Text>
                <br />

                <Grid width="100%" padding="3%">
                  <Text p color="#C4C4C4">
                    {q.author}
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiTimeFive />
                    {q.createdAt}
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiLike />
                    {q.like}
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiComment />1
                  </Text>
                </Grid>
              </QuestionBox>
            );
          })}
        </Questions>
      </Grid>
    </React.Fragment>
  );
};

const Questions = styled.div`
  width: 100%;
  height: 100%;
  margin: 3vh auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

//여기 다시 체크! margin과 비율
const QuestionBox = styled.div`
  height: 100%;
  width: 48%;
  border-bottom: 1px solid #b5b5b5;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 0% 1%;
  &:hover {
    opacity: 0.7;
  }
`;

export default QuestionList;

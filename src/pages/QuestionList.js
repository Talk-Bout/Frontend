import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';
import Header from '../components/Header';

//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const QuestionList = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Grid padding="3% 10%">
        {/* 헤더 */}
        <Grid display="flex">
          <Text width="90%" fontSize="3.5vh" fontWeight="600">
            질문/답변 게시판
          </Text>
          <Button width="10%" margin="auto 0 auto auto">
            글쓰기
          </Button>
          {/* // 글쓰기 페이지로 이동하기 */}
        </Grid>
        <hr />

        {/* 게시물 목록 */}
        <Questions flex_wrap="wrap">
          {[1, 2, 3, 4, 5, 6].map((n, idx) => {
            return (
              <QuestionBox>
                <Grid display="flex">
                  <Text padding="3%" fontWeight="700" fontSize="2vh">
                    Q
                  </Text>
                  <Text padding="3%" fontWeight="700" fontSize="2vh">
                    질문 제목
                  </Text>
                </Grid>

                <Text padding="3%" fontSize="1.7vh" color="#C4C4C4">
                  Proident exercitation velit non eiusmod eiusmod nostrud amet
                  magna culpa ullamco nulla officia commodo fugiat.
                </Text>
                <br />

                <Grid width="100%" padding="3%">
                  <Text p color="#C4C4C4">
                    닉네임
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiTimeFive />
                    2021.07.25
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiLike />
                    17
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
`;

export default QuestionList;

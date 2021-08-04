import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';
import { history } from '../redux/ConfigureStore';

const MainTalk = (props) => {

  return (
    <React.Fragment>
      <Grid className='top-boot' margin='40px 0'>
        <Grid>
          <Text fontSize='2.5vh' fontWeight='700' color='#F8F9FA'>인기 부트톡톡</Text>
          <TextBox><Text fontSize='1.5vh' color='#BDC1C6'>부트캠퍼들이 가장 많이 추천한  게시물</Text><Text fontSize='1.5vh' color='#BDC1C6' cursor='pointer'>부트톡톡 더보기 &gt;</Text></TextBox>
          <Questions flex_wrap="wrap">
          {/* 자유게시판 게시물 목록 */}
          {[1, 2, 3, 4].map((n, idx) => {
            return (
              <QuestionBox key={idx} onClick={() => history.push('/question/detail')}>
                <Grid display="flex" flexDirection="rows">
                  <Text padding="3%" fontWeight="700" fontSize="2vh" color='#F8F9FA'>
                    질문 제목
                  </Text>
                </Grid>

                <Text
                  padding="0% 3%"
                  margin="1% 0%"
                  fontSize="1.6vh"
                  color="#C4C4C4"
                >
                  Proident exercitation velit non eiusmod eiusmod nostrud amet
                  magna culpa ullamco nulla officia commodo fugiat.
                </Text>
                <br />

                <Grid padding="1% 3%">
                  <Text p fontSize="1.6vh" color="#C4C4C4" margin="1% 0%">
                    닉네임
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 3% 0% 0%">
                    <BiTimeFive />
                    2021.07.25
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 3% 0% 0%">
                    <BiLike />
                    17
                  </Text>
                  <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 3% 0% 0%">
                    <BiComment />1
                  </Text>
                </Grid>
              </QuestionBox>
            );
          })}
        </Questions>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-top: 5px;
`;

const Questions = styled.div`
  width: 100%;
  height: 100%;
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
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default MainTalk;
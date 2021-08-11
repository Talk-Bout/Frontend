import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Image, Input, Text } from '../elements';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { history } from '../redux/ConfigureStore';
//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const Main = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Banner
        title="수강생들의 100% 리얼 후기!"
        description="부트캠퍼들이 평가하는 부트캠프는 어떤지 확인해보세요."
      />
      {/* 부트캠프 게시판 */}
      <Grid padding="5% 10% 0% 10%">
        <Grid display="flex" flexDirection="row">
          <Text fontSize="2vh" fontWeight="700">
            부트캠프
          </Text>
          <Text
            fontSize="1.6vh"
            margin="0 0 0 auto"
            _onClick={() => {
              history.push('/boot');
            }}
          >
            더보기 &gt;
          </Text>
        </Grid>
        <Text p fontSize="1.6vh">
          100% 리얼 실제 리뷰
        </Text>
      </Grid>
      {/* 부트캠프리스트 */}
      <Grid padding="0% 10%">
        <CardList>
          {[1, 2, 3, 4, 5, 6].map((n, idx) => {
            return (
              <CampCard
                onClick={() => {
                  history.push('/boot/info');
                }}
              >
                <Grid width="30%">
                  <ImageDiv>
                    <Text fontSize="1.5vh">LOGO</Text>
                  </ImageDiv>
                </Grid>
                <Grid width="70%" margin="auto 5%">
                  <Grid margin="1% auto">
                    <Text p fontSize="1.7vh" fontWeight="700" margin="3% 0%">
                      부트캠프명
                    </Text>
                    <Text fontSize="1.3vh" color="#696969">
                      ★★☆☆☆ 2.2
                    </Text>
                  </Grid>

                  <Grid display="flex" margin="5% auto 0">
                    <Text p fontSize="1.3vh" margin="3% 3% 0 0" color="#696969">
                      리뷰
                    </Text>
                    <Text fontSize="1.3vh" margin="3% 3% 0 0" color="#696969">
                      게시물
                    </Text>
                  </Grid>
                </Grid>
              </CampCard>
            );
          })}
        </CardList>
      </Grid>

      {/* 자유게시판 */}
      <Grid padding="5% 10% 0% 10%">
        <Grid display="flex">
          <Text fontSize="2vh" fontWeight="700">
            자유게시판
          </Text>
          <Text
            fontSize="1.6vh"
            styles={{ justify_content: 'flex-end' }}
            margin="0 0 0 auto"
            _onClick={() => {
              history.push('/common/list');
            }}
          >
            더보기 &gt;
          </Text>
        </Grid>
        <Text p fontSize="1.6vh">
          자유게시판 설명
        </Text>

        {/* 자유게시판 게시물 목록 */}
        <Table>
          <table style={{ width: '100%' }}>
            <thead
              style={{
                backgroundColor: '#e5e5e5',
              }}
            >
              <tr>
                <th style={{ width: '20%', fontWeight: '400' }}>토픽</th>
                <th style={{ width: '30%', fontWeight: '400' }}>제목</th>
                <th style={{ width: '30%', fontWeight: '400' }}>추천</th>
                <th style={{ width: '20%', fontWeight: '400' }}>댓글</th>
              </tr>
            </thead>
            {[1, 2, 3, 4].map((n, idx) => {
              return (
                <tbody>
                  <tr onClick={() => history.push('/common/detail')}>
                    <Th>토픽</Th>
                    <Th>게시물 제목</Th>
                    <Th>16</Th>
                    <Th>58</Th>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </Table>
        {/* 질문게시판 */}
      </Grid>

      <Grid padding="5% 10% 0% 10%">
        <Grid display="flex">
          <Text fontSize="2vh" fontWeight="700">
            질문게시판
          </Text>
          <Text
            fontSize="1.6vh"
            styles={{ justify_content: 'flex-end' }}
            margin="0 0 0 auto"
            _onClick={() => {
              history.push('/question');
            }}
          >
            더보기 &gt;
          </Text>
        </Grid>
        <Text p fontSize="1.6vh">
          질문게시판 설명
        </Text>
        <Questions flex_wrap="wrap">
          {/* 질문게시판 게시물 목록 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n, idx) => {
            return (
              <QuestionBox onClick={() => history.push('/question/detail')}>
                <Grid display="flex" flexDirection="rows">
                  <Text padding="3%" fontWeight="700" fontSize="1.7vh">
                    Q
                  </Text>
                  <Text padding="3%" fontWeight="700" fontSize="1.7vh">
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
    </React.Fragment>
  );
};
const CardList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const CampCard = styled.div`
  background-color: #e5e5e5;
  width: 33%;
  height: 100%;
  border: 0.5vh solid white;
  box-sizing: border-box;
  padding: 1%;
  text-align: left;
  display: flex;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  background-color: #c4c4c4;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  margin: 0% 10%;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  table-layout: fixed;

  /* padding: '0% 10%'; */
`;

const Th = styled.th`
  font-weight: 400;
  font-size: 1.6vh;
  border-bottom: 1px solid #e5e5e5;
  padding: 1% 0%;
`;

const Questions = styled.div`
  width: 100%;
  height: 100%;
  margin: 5vh auto 0;
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

export default Main;

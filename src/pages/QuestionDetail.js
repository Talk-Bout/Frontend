import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input } from '../elements';
import Header from '../components/Header';
//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const QuestionDetail = (props) => {
  return (
    // height: '100vh' 다른 카드 생기면 없애기!
    <div style={{ backgroundColor: '#C4C4C4' }}>
      {/* 질문 */}
      <Grid backgroundColor="#ffffff">
        <Header />
        <Grid width="60vw" margin="0% auto">
          <QuestionBox>
            <Grid display="flex">
              <Grid width="10%">
                <Text fontSize="3vh" fontWeight="600">
                  Q
                </Text>
              </Grid>
              <Grid width="90%">
                <Text fontSize="3vh" fontWeight="600" margin="auto 0%">
                  질문입니다
                </Text>
              </Grid>
            </Grid>

            <Text p margin="5% 0%">
              Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
              minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa amet
              aliqua consectetur culpa consectetur ad cillum non cillum proident
              velit Lorem do id. Exercitation aliquip incididunt aute officia in
              in excepteur. Ea cupidatat et est sit qui. Eiusmod excepteur et
              nisi ullamco voluptate cillum nisi culpa velit dolore. Culpa do
              adipisicing voluptate pariatur fugiat.
            </Text>

            <Grid width="100%" margin="3% 0%">
              <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                닉네임
              </Text>
              <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                조회수 23
              </Text>
              <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 1% 0% 0%">
                답변수 3
              </Text>
            </Grid>
          </QuestionBox>
        </Grid>
      </Grid>
      <Grid>
        {/* 대답 여기서 맵 돌리기 */}
        <Grid width="60vw" margin="0% auto" padding="2% 0%">
          {[1, 2].map((n, idx) => {
            return (
              <AnswerBox>
                <Grid display="flex">
                  <Grid width="10%">
                    <Text fontSize="3vh" fontWeight="600">
                      A
                    </Text>
                  </Grid>

                  <Grid>
                    <Text p margin="1% auto" fontWeight="600">
                      닉네임님의 답변
                    </Text>
                    <Text p margin="1% auto" color="#C4C4C4">
                      2021-07-25 20:32:09 작성
                    </Text>
                  </Grid>
                </Grid>

                <hr color="#E5E5E5" />
                {/* commentWrite */}
                <Grid margin="5% 0%">
                  <Text p margin="5% 0%">
                    Cillum in amet cillum irure ullamco. Cupidatat occaecat ad
                    ex minim ullamco dolore eiusmod velit eu fugiat excepteur.
                    Culpa amet aliqua consectetur culpa consectetur ad cillum
                    non cillum proident velit Lorem do id. Exercitation aliquip
                    incididunt aute officia in in excepteur. Ea cupidatat et est
                    sit qui. Eiusmod excepteur et nisi ullamco voluptate cillum
                    nisi culpa velit dolore. Culpa do adipisicing voluptate
                    pariatur fugiat.
                  </Text>
                  <hr color="#E5E5E5" />
                  {/* 댓글 */}
                  <Grid>
                    <Text p fontWeight="600" margin="3% 0%">
                      댓글 5개
                    </Text>
                    <Grid display="flex">
                      <Input placeholder={'댓글을 남겨주세요'} />
                      <Button width="10%" margin="0% 2%" height="5vh">
                        등록
                      </Button>
                    </Grid>
                  </Grid>
                  <hr color="#E5E5E5" />

                  {/* commentListButton???? */}
                  <Grid is_center margin="4% 0%">
                    <Text fontWeight="600">댓글 1개 더보기</Text>
                  </Grid>
                  <hr color="#E5E5E5" />

                  {/* commentList : component로 만들기*/}
                  <Grid width="100%" margin="3% 0%">
                    <Text p margin="3% 0%" color="#C4C4C4">
                      닉네임
                    </Text>
                    <Text>댓글내용</Text>
                    <Grid width="100%" margin="3% 0%">
                      <Text
                        fontSize="1.6vh"
                        color="#C4C4C4"
                        margin="0% 1% 0% 0%"
                      >
                        <BiTimeFive />
                        2021.07.25
                      </Text>
                      <Text
                        fontSize="1.6vh"
                        color="#C4C4C4"
                        margin="0% 1% 0% 0%"
                      >
                        <BiLike />
                        17
                      </Text>
                      <Text
                        fontSize="1.6vh"
                        color="#C4C4C4"
                        margin="0% 1% 0% 0%"
                      >
                        <BiComment />1
                      </Text>
                    </Grid>
                  </Grid>
                  <hr color="#E5E5E5" />
                </Grid>
              </AnswerBox>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const QuestionBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 3% 3%;
  /* background-color: #ffffff; */
`;

const AnswerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 3% 3%;
  margin-bottom: 4%;
  background-color: #ffffff;
`;

export default QuestionDetail;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input, Image } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';
import { history } from '../redux/ConfigureStore';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import ThumbUp from '../image/ThumbUp.png';
import View from '../image/View.png';

const QuestionDetail = (props) => {
  return (
    <React.Fragment>
      <Grid display="flex">
        <Sidebar />
        <Body header>
          <Grid height="50%">
            {/* 질문 카드 */}
            <Grid width="70vw" height="100%" margin="auto">
              <Grid display="flex">
                <Grid width="40%">
                  <Text fontSize="3vh" fontWeight="600" color="#ffffff">
                    Q
                  </Text>
                  <Text
                    fontSize="3vh"
                    fontWeight="600"
                    margin="auto 5%"
                    color="#ffffff"
                  >
                    {/* {question_found.title} */} 질문타이틀
                  </Text>
                </Grid>
                <Grid width="20%" display="flex" margin="0 0 0 auto">
                  <Button>수정하기</Button>
                  <Button>삭제하기</Button>
                </Grid>
              </Grid>

              <Grid display="flex" margin="3% 0">
                <Grid width="3vw">
                  <Image src={ThumbUp} />
                  <Image size="45px"></Image>
                </Grid>

                <Grid width="40%">
                  <Text p margin="auto 5%" fontWeight="600" color="#ffffff">
                    닉네임님의 답변
                  </Text>
                  <Text p margin="auto 5%" color="#C4C4C4">
                    2021-07-25 20:32:09
                  </Text>
                </Grid>
              </Grid>

              <Text p margin="5% 0%" color="#C4C4C4">
                {/* {question_found.content} */}
                Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
                minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa
                amet aliqua consectetur culpa consectetur ad cillum non cillum
                proident velit Lorem do id. Exercitation aliquip incididunt aute
                officia in in excepteur. Cillum in amet cillum irure ullamco.
                Cupidatat occaecat ad ex minim ullamco dolore eiusmod velit eu
                fugiat excepteur. Culpa amet aliqua consectetur culpa
                consectetur ad cillum non cillum proident velit Lorem do id.
                Exercitation aliquip incididunt aute officia in in excepteur.
              </Text>

              <Grid display="flex" width="100%" margin="3% 0%">
                <Button
                  width="10%"
                  color="#C4C4C4"
                  margin="0% 1% 0% 0%"
                  border_radius="3%"
                >
                  {/* {question_found.author} */}
                  좋아요
                </Button>
                <Text color="#C4C4C4" margin="0% 1% 0% 0%">
                  <Image src={View} />
                  23
                </Text>
                <Text color="#C4C4C4" margin="0% 1% 0% 0%">
                  <BiComment /> 3
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <AnswerBox>
            <AnswerInput>
              <Text p fontWeight="600">
                답변 3
              </Text>
              <input style={{ width: '100%' }}></input>
            </AnswerInput>

            <AskCard>
              <Grid padding="3%">
                <Grid display="flex">
                  <Text fontSize="3vh" fontWeight="600" color="#ffffff">
                    A
                  </Text>
                  <Image size="45px" margin="0 2%" border_radius="3px"></Image>
                  <Grid width="40%">
                    <Text p margin="5% auto" fontWeight="600">
                      닉네임님의 답변
                    </Text>
                    <Text p margin="auto" color="#C4C4C4">
                      2021-07-25 20:32:09 작성
                    </Text>
                  </Grid>

                  <Grid
                    width="20%"
                    display="flex"
                    margin="0 0 0 auto"
                    backgroundColor="yellow"
                  >
                    <Button>수정하기</Button>
                    <Button>삭제하기</Button>
                  </Grid>
                </Grid>
                <Text p margin="5% 0%" color="#C4C4C4">
                  {/* {question_found.content} */}
                  Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
                  minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa
                  amet aliqua consectetur culpa consectetur ad cillum non cillum
                  proident velit Lorem do id. Exercitation aliquip incididunt
                  aute officia in in excepteur. Cillum in amet cillum irure
                  ullamco. Cupidatat occaecat ad ex minim ullamco dolore eiusmod
                  velit eu fugiat excepteur. Culpa amet aliqua consectetur culpa
                  consectetur ad cillum non cillum proident velit Lorem do id.
                  Exercitation aliquip incididunt aute officia in in excepteur.
                </Text>
                <Grid display="flex" width="100%" margin="3% 0%">
                  <Button
                    width="10%"
                    color="#C4C4C4"
                    margin="0% 1% 0% 0%"
                    border_radius="3%"
                  >
                    {/* {question_found.author} */}
                    좋아요 23
                  </Button>

                  <Text color="#C4C4C4" margin="0% 1% 0% 0%">
                    <BiComment /> 3
                  </Text>
                </Grid>
                <hr />
                <Grid>
                  <Text p fontWeight="600" margin="3% 0%">
                    댓글 5
                  </Text>
                  <Grid display="flex">
                    <Input
                      placeholder={'댓글을 남겨주세요'}
                      border_radius="3px"
                      padding="1%"
                    />
                    <AnswerBtn>좋아요</AnswerBtn>
                  </Grid>

                  <AllBtn>댓글 모두 보기</AllBtn>
                </Grid>
              </Grid>
            </AskCard>
          </AnswerBox>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

//Answer Section
const AnswerBox = styled.div`
  height: 100vh;
  /* transform: translateX(-40px); */
  margin: 0 -40px 0 -40px;
  background-color: #282a2d;
`;

const AnswerInput = styled.div`
  width: 70vw;
  margin: 0% auto;
  /* background-color: yellow; */
  padding-top: 1%;
`;

const AskCard = styled.div`
  width: 70vw;
  margin: 1% auto;
  background-color: #202124;
  border-radius: 5px;
`;

const AnswerBtn = styled.button`
  width: 10%;
  color: #c4c4c4;
  margin: 0% 1% 0% 0%;
  border-radius: 3%;
  border: 0;
  outline: 0;
`;

const AllBtn = styled.button`
  color: #ffffff;
  background-color: #282a2d;
  width: 100%;
  height: 5vh;
  margin: 1% 0%;
  border-radius: 5px;
  border: 0;
  outline: 0;
`;

export default QuestionDetail;

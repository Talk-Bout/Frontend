import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Image } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { Group } from '../image/Group.png';

const QnaCard = (props) => {
  const dispatch = useDispatch();
  const { _onClick } = props;
  const question_id = props.postId;
  const question_list = useSelector((state) => state.post.list);

  const question_found = question_list.find(
    (post) => post.postId == question_id
  );

  return (
    <React.Fragment>
      <QnaListCard onClick={_onClick}>
        {/* 질문 내용 */}
        <QuestionSection>
          <Grid display="flex">
            <Grid width="1.5vw">
              <Text fontSize="2vh" fontWeight="600" color="#F8F9FA">
                Q
              </Text>
            </Grid>
            <Grid>
              <Text fontSize="2vh" fontWeight="600" color="#F8F9FA">
                {question_found.title}
              </Text>
            </Grid>
          </Grid>

          <Text p fontSize="1.7vh" color="#9AA0A6">
            {question_found.content}
          </Text>

          <Grid display="flex" margin="8% 0">
            <div style={{ display: 'flex', margin: '0 3% 0 0' }}>
              <Image size="20"></Image>
              <Text fontSize="1.6vh" color="#C4C4C4" fontSize="1.6vh">
                {question_found.nickname}
              </Text>
            </div>

            <Text fontSize="1.6vh" color="#C4C4C4" fontSize="1.6vh">
              <BiTimeFive />
              {question_found.createdAt}
            </Text>
          </Grid>
        </QuestionSection>
        <hr width="100%" />

        {/* 답변 내용 */}
        <AnswerSection>
          <div>
            <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 3% 0 0">
              <BiLike />
              추천 갯수
            </Text>

            <Text fontSize="1.6vh" color="#C4C4C4">
              <BiComment /> 답변 1
            </Text>
          </div>

          <div style={{ margin: '3% 3% 0 0' }}>
            <div style={{ display: 'flex' }}>
              <Image size="30" width="10%" margin="0 1% 0 0"></Image>
              <div>
                <Text
                  fontSize="1.6vh"
                  color="#9AA0A6"
                  fontSize="1.6vh"
                  fontWeight="700"
                >
                  답변자 닉네임
                </Text>
                <Text p fontSize="1.7vh" color="#9AA0A6">
                  Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
                  minim ullamco dolore eiusmod velit eu fugiat excepteur.
                </Text>
              </div>
            </div>
          </div>
        </AnswerSection>
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  width: 33%;
  height: 50%;
  background-color: #202124;
  border-radius: 3%;
  box-sizing: border-box;
  padding: 3vh 2vw 0;
  margin: 0 0 2%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const QuestionSection = styled.div`
  height: 60%;
`;

const AnswerSection = styled.div`
  height: 30%;
`;

QnaCard.defaultProps = {
  _onClick: () => {},
};

export default QnaCard;

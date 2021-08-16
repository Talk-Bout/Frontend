import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Profile from '../image/profile_small.png';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';

const MainQna = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(questionActions.setQuestionPopDB(1));
  }, []);

  const qna_list = useSelector(state => state.question.popular_list);
  const pop_qna = qna_list.slice(0, 3);
  
  // console.log(pop_qna);

  return (
    <React.Fragment>
      <Grid className="top-boot" height="fit-content" padding="49px 0 16px" TABpadding='32px 0 16px'>
        {/* 인기 Q&A */}
        <Text fontSize='24px' fontWeight='700' color='#F8F9FA' TABfontSize='20px'>🔥질문과 답변</Text>
        <TextBox>
          {/* 질문과 답변 = (question) => { return answer } */}
          <Text fontSize='14px' color='#BDC1C6' TABfontSize='12px'>질문과 답변 = (question) =&gt; &#123; return answer &#125;</Text>
          {/* Q&A 더보기 버튼 */}
          <Text fontSize='14px' color='#BDC1C6' cursor='pointer' _onClick={() => history.push('/question')}>질문과 답변 더보기 &gt;</Text>
        </TextBox>
        {/* Q&A 목록 */}
        <CardList>
          {pop_qna.map((pq, idx) => {
            return (
              <QuestionCard key={idx} onClick={() => history.push(`/question/detail/${pq.questionId}`)}>
                {/* 질문 제목 */}
                <Text
                  fontSize="18px"
                  TABfontSize='16px'
                  fontWeight="700"
                  color="#f1f3f4"
                  margin="0 0 16px"
                  TABmargin='0 0 11px'
                  overflow='hidden'
                  display='-webkit-box'
                  wlc='1'
                  wbo='vertical'
                >
                  Q {pq.title}
                </Text>
                {/* 질문 내용 */}
                <Content>
                  <Text
                  p
                  fontSize="14px"
                  TABfontSize='12px'
                  letterSpacing="0.2px"
                  lineHeight='18px'
                  TABlineHeight='16px'
                  color="#9aa0a6"
                  overflow="hidden"
                  display="-webkit-box"
                  wlc="4"
                  wbo="vertical"
                >{pq.content}
                  </Text>
                </Content>
                <Info>
                  {/* 작성자 프로필 이미지 */}
                  <ProfileImg src={pq.user.profilePic ? pq.user.profilePic : Profile} alt="프로필" />
                  {/* 작성자 닉네임 */}
                  <Text fontSize="12px" color="#9aa0a6" margin="0 8px" TABfontSize='10px'>
                    {pq.nickname}
                  </Text>
                  {/* 작성일자 */}
                  <Text fontSize="12px" color="#80868b" margin="0 4px 0 0" TABfontSize='14px' vertical_align='middle'>
                    <BiTimeFive />
                  </Text>
                  <Text fontSize="12px" color="#80868b" TABfontSize='10px'>
                    {pq.createdAt}
                  </Text>
                </Info>
                <Line />
                <div style={{ height: 'fit-content' }}>
                  {/* 추천 수 */}
                  <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0' TABfontSize='10px'>
                  <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' vertical_align= 'middle' TABfontSize='14px'><BiLike /></Text>{pq.likeNumber}
                </Text>
                {/* 댓글 수 */}
                {/* <Text fontSize='12px' color='#bdc1c6' margin='0 8px'>
                  <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiComment /></span>댓글 수</Text> */}
                {/* 조회수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px' TABfontSize='10px'>
                <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' vertical_align= 'middle' TABfontSize='14px'><AiOutlineEye /></Text>{pq.viewCount}</Text>
                </div>
              </QuestionCard>
            );
          })}
        </CardList>
      </Grid>
    </React.Fragment>
  );
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  margin-top: 3px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin-top: 4px;
    padding-bottom: 20px;
  }
`;

const CardList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 201px;
  }
`;

const QuestionCard = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: fit-content;
  padding: 24px 24px 8px;
  box-sizing: border-box;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    padding: 16px 16px 12px;
  }
`;

const Content = styled.div`
  margin: 0;
  padding: 0;
  height: 76px;
`;

const Info = styled.div`
  margin-top: 24px;
  height: 24px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin-top: 20px;
    height: 16px;
  }
`;

const ProfileImg = styled.img`
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 16px;
    height: 16px;
  }
`;

const Line = styled.hr`
  margin: 16px 0 8px;
  border: 1px solid #282a2d;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin: 12px 0;
  }
`;

export default MainQna;

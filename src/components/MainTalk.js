import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import Profile from '../image/profile_small.png';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { history } from '../redux/ConfigureStore';

const MainTalk = (props) => {

  return (
    <React.Fragment>
      <Grid className='top-boot' margin='48px 0'>
        {/* 인기 부트톡톡 */}
        <Text fontSize='24px' fontWeight='700' color='#F8F9FA'>인기 부트톡톡</Text>
        <TextBox>
          {/* 부트캠퍼들이 가장 많이 추천한 게시물 */}
          <Text fontSize='14px' color='#BDC1C6'>부트캠퍼들이 가장 많이 추천한  게시물</Text>
          {/* 부트톡톡 더보기 버튼 */}
          <Text fontSize='14px' color='#BDC1C6' cursor='pointer'>부트톡톡 더보기 &gt;</Text>
        </TextBox>
        {/* 부트톡톡 게시물 목록 */}
        <Questions>
        {[1, 2, 3, 4].map((n, idx) => {
          return (
            <QuestionBox key={idx} onClick={() => history.push('/question/detail')}>
              {/* 게시글 제목 */}
              <Text fontSize="18px" fontWeight='700' color='#F8F9FA'>
                개발자는 커뮤니케이션 능력이 중요한 것 같아요...
              </Text>
              {/* 게시글 내용 */}
              <Text p fontSize="14px" margin="8px 0 0" letterSpacing='0.2px' color="#9aa0a6" overflow='hidden' wlc='2' wbo='vertical' display='-webkit-box'>Proident exercitation velit non eiusmod eiusmod nostrud amet magna culpa ullamco nulla officia commodo fugiat. Proident exercitation velit non eiusmod eiusmod nostrud amet magna culpa ullamco nulla officia commodo fugiat. Proident exercitation velit non eiusmod eiusmod nostrud amet magna culpa ullamco nulla officia commodo fugiat.</Text>
              {/* 작성자 정보 */}
              <Grid padding='16px 0 0'>
                <img src={Profile} alt='프로필' style={{width: '24px', verticalAlign: 'middle'}} />
                <Text fontSize="12px" color="#9aa0a6" margin='0 8px'>
                  G****** 
                </Text>
              </Grid>
              <Grid padding='16px 0 0'>
                {/* 작성일자 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0'>
                  <span style={{fontSize: '16px', marginRight: '6px'}}><BiTimeFive /></span>2021.07.25
                </Text>
                {/* 추천 수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0'>
                  <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiLike /></span>17
                </Text>
                {/* 댓글 수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 8px'>
                  <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiComment /></span>1</Text>
                {/* 조회수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px'>
                  <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><AiOutlineEye /></span>354</Text>
              </Grid>
            </QuestionBox>
          );
        })}
        </Questions>
      </Grid>
    </React.Fragment>
  )
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0 24px;
`;

const Questions = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 16px;
`;

//여기 다시 체크! margin과 비율
const QuestionBox = styled.div`
  height: fit-content;
  width: 620px;
  padding: 24px;
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
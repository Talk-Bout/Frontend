import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Profile from '../image/profile_small.png';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const MainQna = (props) => {
  return (
    <React.Fragment>
      <Grid className="top-boot" height="fit-content" padding="49px 0 16px">
        {/* 인기 Q&A */}
        <Text fontSize="24px" fontWeight="700" color="#F8F9FA">
          {' '}
          🔥 인기 질문과 답변
        </Text>
        <TextBox>
          {/* 부트캠퍼들이 가장 궁금했던 것들 */}
          <Text fontSize="14px" color="#BDC1C6">
            부트캠퍼들이 가장 궁금했던 것들
          </Text>
          {/* Q&A 더보기 버튼 */}
          <Text fontSize="14px" color="#BDC1C6" cursor="pointer">
            Q&A 더보기 &gt;
          </Text>
        </TextBox>
        {/* Q&A 목록 */}
        <CardList>
          {[1, 2, 3].map((n, idx) => {
            return (
              <QuestionCard key={idx} onClick={() => {}}>
                {/* 질문 제목 */}
                <Text
                  fontSize="18px"
                  fontWeight="700"
                  color="#f1f3f4"
                  margin="0 0 16px"
                >
                  Q 개발자 이직 고민
                </Text>
                {/* 질문 내용 */}
                <Text
                  p
                  fontSize="14px"
                  letterSpacing="0.2px"
                  color="#9aa0a6"
                  overflow="hidden"
                  display="-webkit-box"
                  wlc="4"
                  wbo="vertical"
                >
                  안녕하세요. 저는 29살 직장인입니다. 현재 소기업에서 플랫폼을
                  개발하고 있는 백엔드 개발자로 이제 4년차 되었습니다. 사용하는
                  기술은 자바를 사용하고 있습니다. 현재 이직 준비를 하고 있지만
                  제일 문제가 되는 게 코딩테스트입니다. 이제 4년차 되었습니다.
                  사용하는 기술은 자바를 사용하고 있습니다. 현재 이직 준비를
                  하고 있지만 제일 문제가 되는 게 코딩테스트입니다.
                </Text>
                <div style={{ marginTop: '24px', height: '24px' }}>
                  {/* 작성자 프로필 이미지 */}
                  <ProfileImg src={Profile} alt="프로필" />
                  {/* 작성자 닉네임 */}
                  <Text fontSize="12px" color="#9aa0a6" margin="0 8px">
                    G******
                  </Text>
                  {/* 작성일자 */}
                  <Text fontSize="12px" color="#80868b" margin="0 4px 0 0">
                    <BiTimeFive />
                  </Text>
                  <Text fontSize="12px" color="#80868b">
                    2021.08.09
                  </Text>
                </div>
                <Line />
                <div style={{ height: 'fit-content' }}>
                  {/* 추천 수 */}
                  <Text fontSize="12px" color="#bdc1c6" margin="0 8px 0 0">
                    <span
                      style={{
                        fontSize: '16px',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                      }}
                    >
                      <BiLike />
                    </span>
                    17
                  </Text>
                  {/* 댓글 수 */}
                  <Text fontSize="12px" color="#bdc1c6" margin="0 8px">
                    <span
                      style={{
                        fontSize: '16px',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                      }}
                    >
                      <BiComment />
                    </span>
                    1
                  </Text>
                  {/* 조회수 */}
                  <Text fontSize="12px" color="#bdc1c6" margin="0 0 0 8px">
                    <span
                      style={{
                        fontSize: '16px',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                      }}
                    >
                      <AiOutlineEye />
                    </span>
                    354
                  </Text>
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
`;

const CardList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
`;

const ProfileImg = styled.img`
  vertical-align: middle;
`;

const Line = styled.hr`
  margin: 16px 0 8px;
  border: 1px solid #282a2d;
`;

export default MainQna;

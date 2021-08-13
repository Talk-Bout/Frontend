import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';

const MainBoot = (props) => {
  return (
    <React.Fragment>
      <Grid className="top-boot" height="421px">
        <Grid padding="57px 0 0">
          {/* 인기 부트캠프 */}
          <Text fontSize="24px" fontWeight="700" color="#F8F9FA">
            🚀 인기 부트캠프
          </Text>
          <TextBox>
            {/* 100% 리얼 실제 리뷰 */}
            <Text fontSize="14px" color="#BDC1C6">
              100% 리얼 실제 리뷰
            </Text>
            {/* 부트캠프 더보기 버튼 */}
            <Text fontSize="14px" color="#BDC1C6" cursor="pointer">
              부트캠프 더보기 &gt;
            </Text>
          </TextBox>
          {/* 부트캠프 목록 */}
          <CardList>
            {[1, 2, 3, 4, 5, 6].map((n, idx) => {
              return (
                <CampCard key={idx}>
                  {/* 부트캠프 로고 */}
                  <Grid width="104px" padding="22px 0 0 24px">
                    <ImageDiv>
                      <Text fontSize="14px" color="#F8F9FA">
                        LOGO
                      </Text>
                    </ImageDiv>
                  </Grid>
                  {/* 부트캠프 정보 */}
                  <Grid width="304px" padding="22px 24px">
                    <Grid
                      cursor="pointer"
                      _onClick={() => history.push('/boot/info')}
                    >
                      {/* 부트캠프 이름 */}
                      <Text
                        p
                        fontSize="18px"
                        fontWeight="700"
                        margin="0"
                        color="#F8F9FA"
                      >
                        부트캠프명
                      </Text>
                      {/* 부트캠프 별점 */}
                      <Stars size="16px" score="2.2" withScore />
                    </Grid>
                    <Grid display="flex" padding="13px 0 0">
                      {/* 부트캠프 리뷰 메뉴 */}
                      <Text
                        fontSize="14px"
                        color="#E8EAED"
                        margin="0 16px 0 0"
                        cursor="pointer"
                        _onClick={() => history.push('/boot/review')}
                      >
                        리뷰
                      </Text>
                      {/* 부트캠프 커뮤니티 메뉴 */}
                      <Text
                        fontSize="14px"
                        color="#E8EAED"
                        cursor="pointer"
                        _onClick={() => history.push('/boot/community')}
                      >
                        커뮤니티
                      </Text>
                    </Grid>
                  </Grid>
                </CampCard>
              );
            })}
          </CardList>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  margin-top: 4px;
`;

const CardList = styled.div`
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

const CampCard = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: 124px;
  margin-bottom: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  background-color: #3c4043;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
`;

export default MainBoot;

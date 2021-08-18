import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import CampImg from '../image/bootcamp_default.png';

const MainBoot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campActions.mainCampsDB());
  }, []);

  const camp_list = useSelector((state) => state.bootcamp.camp_list);
  const pop_camps = camp_list.slice(0, 6);

  return (
    <React.Fragment>
      <Grid className="top-boot" height="421px" TABheight="330px">
        <Grid padding="57px 0 0" TABpadding="40px 0 0">
          {/* 인기 부트캠프 */}
          <Text
            fontSize="24px"
            fontWeight="700"
            color="#F8F9FA"
            TABfontSize="20px"
          >
            🚀부트캠프
          </Text>
          <TextBox>
            {/* 부트캠프 페이지 소개 */}
            <Text fontSize="14px" color="#BDC1C6" TABfontSize="12px">
              부트캠프별 정보를 공유하고 별점도 매겨보세요!
            </Text>
            {/* 부트캠프 더보기 버튼 */}
            <Text
              fontSize="14px"
              color="#BDC1C6"
              cursor="pointer"
              _onClick={() => history.push('/boot')}
            >
              부트캠프 더보기 &gt;
            </Text>
          </TextBox>
          {/* 부트캠프 목록 */}
          <CardList>
            {pop_camps.map((pc, idx) => {
              return (
                <CampCard className={`campcard${idx}`} key={idx}>
                  {/* 부트캠프 로고 */}
                  <Grid
                    width="104px"
                    padding="22px 0 0 24px"
                    TABwidth="84px"
                    TABpadding="16px 0 0 20px"
                  >
                    <ImageDiv>
                      <Logo src={pc.logo ? pc.logo : CampImg} />
                    </ImageDiv>
                  </Grid>
                  {/* 부트캠프 정보 */}
                  <Grid
                    width="304px"
                    padding="22px 24px"
                    TABwidth="240px"
                    TABpadding="16px 10px"
                  >
                    <Grid
                      cursor="pointer"
                      _onClick={() =>
                        history.push(`/boot/${pc.bootcampName}`)
                      }
                    >
                      {/* 부트캠프 이름 */}
                      <Text
                        p
                        fontSize="18px"
                        fontWeight="700"
                        margin="0"
                        color="#F8F9FA"
                        TABfontSize="16px"
                      >
                        {pc.bootcampName}
                      </Text>
                      {/* 부트캠프 별점 */}
                      <Stars size="16px" score={pc.star} withScore />
                    </Grid>
                    <Grid
                      display="flex"
                      padding="13px 0 0"
                      TABpadding="6px 0 0"
                    >
                      {/* 부트캠프 리뷰 메뉴 */}
                      <Text
                        fontSize="14px"
                        color="#E8EAED"
                        margin="0 16px 0 0"
                        TABfontSize="12px"
                        TABmargin="0 8px 0 0"
                        cursor="pointer"
                        _onClick={() =>
                          history.push({pathname: `/boot/${pc.bootcampName}`, state: {tab_click: 'review'}})
                        }
                      >
                        리뷰
                      </Text>
                      {/* 부트캠프 커뮤니티 메뉴 */}
                      <Text
                        fontSize="14px"
                        color="#E8EAED"
                        TABfontSize="12px"
                        cursor="pointer"
                        _onClick={() =>
                          history.push({pathname: `/boot/${pc.bootcampName}`, state: {tab_click: 'community'}})
                        }
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    padding-bottom: 20px;
  }
`;

const CardList = styled.div`
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .campcard4,
    .campcard5 {
      display: none;
    }
  }
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 49%;
    height: 96px;
    margin-bottom: 12px;
    box-shadow: none;
  }
`;

const ImageDiv = styled.div`
  background-color: #3c4043;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 64px;
    height: 64px;
  }
`;

const Logo = styled.img`
  max-width: 100%;
`;

export default MainBoot;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Emoji } from '../elements';
import { Stars } from '../components';
import { CampLogo_default, Rocket_emoji, } from '../image';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { FaPlus } from 'react-icons/fa';

const MainBoot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campActions.mainCampsDB());
  }, []);

  const camp_list = useSelector((state) => state.bootcamp.camp_list);
  const pop_camps = camp_list.slice(0, 6);

  return (
    <React.Fragment>
      <Grid className="top-boot" height="421px" TABheight="330px" MOBheight='fit-content'>
        <Grid padding="57px 0 0" TABpadding="40px 0 0" MOBpadding='20px 0 0'>
          {/* 인기 부트캠프 */}
          <Text fontSize="24px" fontWeight="700" color="#F8F9FA" TABfontSize="20px" MOBfontSize='16px' cursor='default'>
            <Emoji src={Rocket_emoji} alt='로켓' height='24px' TABheight='20px' margin='0 8px 0 0' />이 부트캠프는 어떠세요?
          </Text>
          <TextBox>
            {/* 부트캠프 페이지 소개 */}
            <Text fontSize="14px" color="#BDC1C6" TABfontSize="12px" MOBfontSize='10px' cursor='default'>
              매력있는 부트캠프들을 만나보세요!
            </Text>
            {/* 부트캠프 더보기 버튼 */}
            <Text fontSize="28px" color="#BDC1C6" cursor="pointer" MOBfontSize='18px' position='absolute' TABtop='310px' MOBtop='200px' right='42px' TABright='18px' _onClick={() => history.push('/boot')}>
              <FaPlus />
            </Text>
          </TextBox>
          {/* 부트캠프 목록 */}
          <CardList>
            {pop_camps.map((pc, idx) => {
              return (
                <CampCard className={`campcard${idx}`} key={idx} onClick={() => history.push(`/boot/${pc.bootcampName}`)}>
                  {/* 부트캠프 로고 */}
                  <Grid
                    width="104px"
                    TABwidth="84px"
                    MOBwidth='72px'
                    padding="22px 0 0 24px"
                    TABpadding="16px 0 0 20px"
                    MOBpadding='12px 0 0 16px'
                  >
                    <ImageDiv>
                      <Logo src={pc.logo ? pc.logo : CampLogo_default} />
                    </ImageDiv>
                  </Grid>
                  {/* 부트캠프 정보 */}
                  <Grid
                    width="304px"
                    padding="36px 24px"
                    TABwidth="240px"
                    TABpadding="16px 10px"
                    MOBpadding='19px 12px'
                  >
                    <Grid>
                      {/* 부트캠프 이름 */}
                      <Text
                        p
                        fontSize="18px"
                        fontWeight="700"
                        margin="0 0 5px"
                        MOBmargin='0'
                        color="#F8F9FA"
                        TABfontSize="16px"
                        MOBfontSize='14px'
                        cursor='pointer'
                        _onClick={() =>
                          history.push(`/boot/${pc.bootcampName}`)
                        }
                      >
                        {pc.bootcampName}
                      </Text>
                      {/* 부트캠프 별점 */}
                      <Stars size="16px" MOBsize='14px' score={pc.star} withScore />
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
  @media screen and (max-width: 1090px) {
    padding-bottom: 20px;
  }
`;

const CardList = styled.div`
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  @media screen and (max-width: 1090px) {
    .campcard4,
    .campcard5 {
      display: none;
    }
  }
  @media screen and (max-width: 767px) {
    .campcard3 {
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
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1090px) {
    width: 49%;
    height: 96px;
    margin-bottom: 12px;
    box-shadow: none;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 80px;
    margin-bottom: 8px;
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
  @media screen and (max-width: 1090px) {
    width: 64px;
    height: 64px;
  }
  @media screen and (max-width: 767px) {
    width: 56px;
    height: 56px;
  }
`;

const Logo = styled.img`
  max-width: 100%;
`;

export default MainBoot;

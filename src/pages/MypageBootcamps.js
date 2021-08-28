import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Body, Sidebar, Stars } from '../components';
import { LogoIcon } from '../image';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { history } from '../redux/ConfigureStore';

const MypageBootcamps = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campActions.setMyCampDB());
  }, []);

  const my_camps = useSelector(state => state.bootcamp.my_camp_list);

  return (
    <React.Fragment>
      <Grid className="background" display='flex'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함 바디 */}
        <Body header footer>
          <Grid className='body-inner' height='100%' overflow='hidden'>
            {/* 페이지 타이틀 */}
            <Text color='#f8f9fa' fontSize='32px' TABfontSize='20px' fontWeight='700' TABmargin='14px 0 0'>관심있는 부트캠프</Text>
            <Text color='#5F6368' fontSize='32px' TABfontSize='20px' TABmargin='14px 0 0'> ({my_camps ? my_camps.length : 0})</Text>
            <CardList>
              {my_camps.map((camp, idx) => {
                return (
                  // 북마크한 부트캠프 카드
                  <Card onClick={() => history.push(`/boot/${camp.bootcampName}`)}>
                    <NameBox>
                      <LogoBox>
                        {/* 로고 */}
                        <Logo src={camp.bootcamp.logo ? camp.bootcamp.logo : LogoIcon} />
                      </LogoBox>
                      <TextBox>
                        {/* 부트캠프 이름 */}
                        <Text p margin='0 0 5px' TABmargin='0' color='#f8f9fa' fontSize='24px' TABfontSize='16px' fontWeight='700'>{camp.bootcampName}</Text>
                        {/* 별점 */}
                        <StarBox>
                          <Stars score={camp.stars == null ? 0 : camp.stars} size='16px' marginRight='2px' withScore />
                        </StarBox>
                        <ScoreBox>
                          <Text TABfontSize='12px' color='#dadce0'>★ {camp.stars ? camp.stars.toFixed(1) : '별점/리뷰 없음'}</Text>
                        </ScoreBox>
                      </TextBox>
                    </NameBox>
                    <InfoBox>
                      <InfoInner>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px' TABfontSize='10px'>기간</Text></div>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px' TABfontSize='10px'>모집일정</Text></div>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px' TABfontSize='10px'>가격</Text></div>
                        <div><Text color='#7879F1' fontSize='30px' TABfontSize='24px'><BsHeartFill /></Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px' TABfontSize='14px' backgroundColor='#17181B' padding='10px' TABpadding='6px' borderRadius='8px' display='-webkit-box' overflow='hidden' wlc='1' wbo='vertical'>{camp.bootcamp.bootcampInfo.기간 ? camp.bootcamp.bootcampInfo.기간 : 'N/A'}</Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px'
                          TABfontSize='14px' backgroundColor='#17181B' padding='10px 20px' TABpadding='5px 10px' borderRadius='8px' display='-webkit-box' overflow='hidden' wlc='1' wbo='vertical'>{camp.bootcamp.bootcampInfo.모집기간 ? camp.bootcamp.bootcampInfo.모집기간 : 'N/A'}</Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px' TABfontSize='14px' backgroundColor='#17181B' padding='10px 20px' TABpadding='5px 10px' borderRadius='8px' display='-webkit-box' overflow='hidden' wlc='1' wbo='vertical'>{camp.bootcamp.bootcampInfo.가격 ? camp.bootcamp.bootcampInfo.가격 : 'N/A'}</Text></div>
                      </InfoInner>
                    </InfoBox>
                  </Card>
                )
              })}
            </CardList>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const CardList = styled.div`
  margin: 24px 0 0;
  @media screen and (max-width: 1090px) {
    margin: 16px 0 0;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 152px;
  border-radius: 12px;
  margin: 0 0 24px;
  display: flex;
  background-color: #202124;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1090px) {
    height: 96px;
    margin: 0 0 12px;
  }
`;

const NameBox = styled.div`
  width: 30%;
  height: 100%;
  padding: 32px;
  display: flex;
  @media screen and (max-width: 1090px) {
    padding: 20px;
  }
`;

const LogoBox = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 1090px) {
    width: 56px;
    height: 56px;
  }
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TextBox = styled.div`
  width: 70%;
  margin: 0 16px 0;
  padding: 10px 0;
  @media screen and (max-width: 1090px) {
    padding: 0;
  }
`;

const StarBox = styled.div`
  @media screen and (max-width: 1090px) {
    display: none;
  }
`;

const ScoreBox = styled.div`
  @media screen and (min-width: 1091px) {
    display: none;
  }
`;

const InfoBox = styled.div`
  width: 70%;
  padding: 24px 0;
  @media screen and (max-width: 1090px) {
    padding: 8px 0;
  }
`;

const InfoInner = styled.div`
  width: 90%;
  height: 100%;
  border-left: 1px solid #3C4043;
  padding: 8px 32px 8px 29px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 2fr 2fr 0.5fr;
  grid-template-rows: 1fr 2fr;
  column-gap: 40px;
  & > div {
    text-align: center;
    min-width: fit-content;
  }
  @media screen and (max-width: 1090px) {
    grid-template-columns: 1.5fr 2fr 2fr 0.5fr;
    grid-template-rows: 1fr 2fr;
    padding: 0 0 0 20px;
    column-gap: 8px;
  }
`;

export default MypageBootcamps;
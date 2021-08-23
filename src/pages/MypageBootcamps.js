import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Body, Sidebar, Stars } from '../components';
import { LogoIcon } from '../image';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const MypageBootcamps = (props) => {

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
            <CardList>
              {[1, 2, 3, 4, 5].map((camp, idx) => {
                return (
                  // 북마크한 부트캠프 카드
                  <Card>
                    <NameBox>
                      <LogoBox>
                        {/* 로고 */}
                        <Logo src={LogoIcon} />
                      </LogoBox>
                      <TextBox>
                        {/* 부트캠프 이름 */}
                        <Text p margin='0 0 5px' color='#f8f9fa' fontSize='24px' fontWeight='700'>부트캠프명</Text>
                        {/* 별점 */}
                        <Stars score='2.2' size='16px' marginRight='2px' withScore />
                      </TextBox>
                    </NameBox>
                    <InfoBox>
                      <InfoInner>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px'>코스</Text></div>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px'>모집기간</Text></div>
                        <div><Text color='#5f6368' fontWeight='700' fontSize='12px'>가격</Text></div>
                        <div><Text color='#7879F1' fontSize='30px'><BsHeartFill /></Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px' backgroundColor='#17181B' padding='10px 20px' borderRadius='8px'>14주</Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px' backgroundColor='#17181B' padding='10px 20px' borderRadius='8px'>2021.09.03(금)까지</Text></div>
                        <div><Text color='#9aa0a6' fontSize='18px' backgroundColor='#17181B' padding='10px 20px' borderRadius='8px'>4,000,000~</Text></div>
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
`;

const NameBox = styled.div`
  width: 40%;
  height: 100%;
  padding: 32px;
  display: flex;
`;

const LogoBox = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TextBox = styled.div`
  width: 60%;
  margin: 0 16px 0;
  padding: 10px 0;
`;

const InfoBox = styled.div`
  width: 50%;
  padding: 24px 0;
`;

const InfoInner = styled.div`
  width: 100%;
  height: 84px;
  border-left: 1px solid #3C4043;
  padding: 8px 32px 8px 29px;
  display: grid;
  grid-template-columns: 2fr 5fr 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 40px;
  & > div {
    text-align: center;
  }
`;

export default MypageBootcamps;
import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';

const BootMain = (props) => {
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid className='body-inner' height='100%'>
            <Text p color='#F8F9FA' fontSize='3vh' fontWeight='700'>부트캠프</Text>
            <CardList>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n, idx) => {
                return (
                  <Card onClick={() => history.push('/boot/review')}>
                    <ImageDiv>
                      <Text fontSize="3vh" color='#ffffff'>LOGO</Text>
                    </ImageDiv>
                    <Text p fontSize="1.6vh" fontWeight="700" margin="10vh 0 0" color='#F8F9FA'>
                      스파르타코딩클럽
                    </Text>
                    <Text fontSize="1.2vh" color="#BDC1C6" margin="1px 0 0">
                      99일 만에 진짜 개발자가 되는 법
                    </Text>
                    <Text p fontSize="1.5vh" color='#E8EAED'>
                      ★★☆☆☆ 2.2
                    </Text>
                  </Card>
                );
              })}
            </CardList>
            <Grid height='7vh' is_center>
              <PageBox>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>&lt;</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>01</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>02</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>03</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>&gt;</Page></Text>
              </PageBox>
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const CardList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: 35vh;
  border: 0.5vh solid #202124;
  border-radius: 8px;
  margin: 0 0 30px;
  box-sizing: border-box;
  padding: 5vh 2vw 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  text-align: center;
  margin-top: 3vh;
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
`;

const Page = styled.span`
  opacity: 0.5;
  cursor: pointer;
  color: #F8F9FA;
  &:hover {
    opacity: 1;
  }
`;

export default BootMain;

import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import {history} from '../redux/ConfigureStore';

const MainBoot = (props) => {

  return (
    <React.Fragment>
      <Grid className='top-boot'>
        <Grid>
          <Text fontSize='2.5vh' fontWeight='700' color='#F8F9FA'>인기 부트캠프</Text>
          <TextBox><Text fontSize='1.5vh' color='#BDC1C6'>100% 리얼 실제 리뷰</Text><Text fontSize='1.5vh' color='#BDC1C6' cursor='pointer'>부트캠프 더보기 &gt;</Text></TextBox>
          <CardList>
            {[1, 2, 3, 4, 5, 6].map((n, idx) => {
              return (
                <CampCard key={idx}>
                  <Grid width="30%">
                    <ImageDiv>
                      <Text fontSize="1.5vh" color='#F8F9FA'>LOGO</Text>
                    </ImageDiv>
                  </Grid>
                  <Grid width="70%" margin="auto 5%">
                    <Grid margin="1% auto" cursor='pointer' _onClick={() => history.push('/boot/info')}>
                      <Text p fontSize="1.7vh" fontWeight="700" margin="3% 0%" color='#F8F9FA'>
                        부트캠프명
                      </Text>
                      <Text fontSize="1.3vh" color="#DADCE0">
                        ★★☆☆☆ 2.2
                      </Text>
                    </Grid>
                    <Grid display="flex" margin="5% auto 0">
                      <Text p fontSize="1.3vh" margin="3% 3% 0 0" color="#E8EAED" cursor='pointer' _onClick={() => history.push('/boot/review')}>
                        리뷰
                      </Text>
                      <Text fontSize="1.3vh" margin="3% 3% 0 0" color="#E8EAED" cursor='pointer' _onClick={() => history.push('/boot/community')}>
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
  )
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-top: 5px;
`;

const CardList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const CampCard = styled.div`
  background-color: #202124;
  width: 33%;
  height: 100%;
  border: 0.5vh solid #202124;
  box-sizing: border-box;
  padding: 1%;
  text-align: left;
  display: flex;
  margin-bottom: 10px;
  border-radius: 10px;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  background-color: #3C4043;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  margin: 0% 10%;
`;

export default MainBoot;
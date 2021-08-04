import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';

const MainQna = (props) => {

  return (
    <React.Fragment>
      <Grid className='top-boot' margin='40px 0'>
        <Grid>
          <Text fontSize='2.5vh' fontWeight='700' color='#F8F9FA'>인기 Q&A</Text>
          <TextBox><Text fontSize='1.5vh' color='#BDC1C6'>부트캠퍼들이 가장 궁금했던 것들</Text><Text fontSize='1.5vh' color='#BDC1C6' cursor='pointer'>Q&A 더보기 &gt;</Text></TextBox>
          <CardList>
            {[1, 2, 3].map((n, idx) => {
              return (
                <QuestionCard key={idx} onClick={() => {}}>
                  <Grid width="100%">
                    <div><Text p fontSize="2vh" fontWeight="700" margin="3% 0%" color='#F8F9FA'>
                        여기에 내용이 들어갑니다
                      </Text></div>
                  </Grid>
              </QuestionCard>
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

const QuestionCard = styled.div`
  background-color: #202124;
  width: 33%;
  height: 50vh;
  border: 0.5vh solid #202124;
  box-sizing: border-box;
  padding: 1%;
  text-align: left;
  display: flex;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default MainQna;
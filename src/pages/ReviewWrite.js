import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';

const ReviewWrite = (props) => {

  return (
    <React.Fragment>
      <Grid backgroundColor='gray' height='100vh' padding='15vh'>
        <Grid backgroundColor='#fff' width='45vw' height='65vh' margin='auto'>
          <WindowInner>
            <HeaderBox>
              <Button width='7%'> X </Button>
              <Text margin='0 13vw' fontSize='2vh' fontWeight='700' lineHeight='4vh'>부트캠프 리뷰작성</Text>
              <Button width='7%'>등록</Button>
            </HeaderBox>
            <hr style={{margin: '1vh 0', borderTop: '1px solid #eee'}}/>
            <BodyBox>
              <Row>
                <Key>부트캠프명</Key><input placeholder='부트캠프명을 입력해주세요'></input>
              </Row>
              <Row>
                <Key>기수</Key>
                <select>
                  <option value=''>--선택해주세요--</option>
                  <option value='수강중'>수강중</option>
                  <option vaoue='수강완료'>수강완료</option>
                </select>
              </Row>
              <Row>
                <Key>총 평점</Key>
                <Text fontSize='1.8vh'>★ ★ ☆ ☆ ☆</Text>
              </Row>
              <Row>
                <Key>부트캠프의 장점</Key>
                <textarea placeholder='부트캠프의 장점을 입력해주세요' rows='7' cols='50' style={{resize: 'none'}}></textarea>
              </Row>
              <Row>
                <Key>부트캠프의 단점</Key>
                <textarea placeholder='부트캠프의 단점을 입력해주세요' rows='7' cols='50' style={{resize: 'none'}}></textarea>
              </Row>
            </BodyBox>
          </WindowInner>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const WindowInner = styled.div`
  padding: 2vh 2vw;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-evenly;
`;

const BodyBox = styled.div`
  padding: 1vh 0;
`;

const Row = styled.div`
  margin: 2vh 0;
`;

const Key = styled.span`
  font-size: 1.8vh;
  font-weight: 700;
  margin-right: 2vw;
`;

export default ReviewWrite;
//질문 업로드 임의 게시판
import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';

const QuestionWrite = (props) => {
  return (
    <React.Fragment>
      <Grid backgroundColor="gray" height="100vh" padding="15vh">
        <Grid backgroundColor="#fff" width="45vw" height="65vh" margin="auto">
          <WindowInner>
            <HeaderBox>
              <Button width="7%"> X </Button>
              <Text
                margin="0 13vw"
                fontSize="2vh"
                fontWeight="700"
                lineHeight="4vh"
              >
                질문 작성
              </Text>
              <Button width="7%">등록</Button>
            </HeaderBox>
            <hr style={{ margin: '1vh 0', borderTop: '1px solid #eee' }} />
            <BodyBox>
              <Row>
                <Key>제목</Key>
                <Input placeholder={'질문 내용을 입력해주세요'}></Input>
              </Row>

              <Row>
                <Key>내용</Key>
                <Input
                  multiLine
                  placeholder={'질문 내용을 입력해주세요'}
                ></Input>
              </Row>
            </BodyBox>
          </WindowInner>
        </Grid>
      </Grid>
    </React.Fragment>
  );
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

export default QuestionWrite;

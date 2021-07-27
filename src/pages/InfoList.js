import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';
import InfoCard from '../components/InfoCard';
//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const InfoList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="10%">
        {/* 헤더 */}
        <>
          <Grid width="100%" margin="5px auto" is_flex>
            <Text fontSize="40px" fontWeight="600">
              정보 게시판
            </Text>
            <Button width="10%" margin="1%">
              글쓰기
            </Button>
            {/* // 글쓰기 페이지로 이동하기 */}
          </Grid>
          <hr />
        </>

        {/* 게시물 목록 */}
        <Grid is_flex flex_wrap="wrap" backgroundColor="#E5E5E5">
          <InfoBox>
            <Text padding="3%" fontWeight="700">
              부트캠프 비교
            </Text>
            <Text padding="3%" fontSize="15px">
              {' '}
              Proident exercitation velit non eiusmod eiusmod nostrud amet magna
              culpa ullamco nulla officia commodo fugiat.
            </Text>
            <br />
            <Text padding="3%">닉네임</Text>
            <br />

            <Grid is_flex width="60%">
              <Text padding="3%" fontSize="15px">
                <BiTimeFive />
                2021.07.25
              </Text>
              <Text padding="3%" fontSize="15px">
                <BiLike />
                17
              </Text>
              <Text padding="3%" fontSize="15px">
                <BiComment />1
              </Text>
            </Grid>
          </InfoBox>
          <InfoCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

//여기 다시 체크! margin과 비율
const InfoBox = styled.div`
  height: 100%;
  width: 48%;
  border: 1.5px solid #b5b5b5;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 1%;
`;

export default InfoList;

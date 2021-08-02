import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Image } from '../elements';

import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { Group } from '../image/Group.png';

//게시물 하나 카드
import QnaCard from '../components/QnaCard';

const QuestionList = (props) => {
  return (
    <React.Fragment>
      <Grid display="flex">
        <Sidebar />
        <Body header>
          <Grid className="body-inner" height="100%">
            <Grid height="100%" padding="0 40px"></Grid>
            <Grid padding="3% 0" display="flex">
              <Text color="#F8F9FA" fontWeight="700" fontSize="3vh">
                Q&A
              </Text>
              <Text color="#F8F9FA" margin="0 0 0 auto">
                인기순
              </Text>
            </Grid>

            <CardList>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((q, idx) => {
                return <QnaCard />;
              })}
            </CardList>
            <Grid height="7vh" is_center>
              <PageBox>
                <Text lineHeight="8vh" margin="0 1vw 0">
                  <Page>&lt;</Page>
                </Text>
                <Text lineHeight="8vh" margin="0 1vw 0">
                  <Page>01</Page>
                </Text>
                <Text lineHeight="8vh" margin="0 1vw 0">
                  <Page>02</Page>
                </Text>
                <Text lineHeight="8vh" margin="0 1vw 0">
                  <Page>03</Page>
                </Text>
                <Text lineHeight="8vh" margin="0 1vw 0">
                  <Page>&gt;</Page>
                </Text>
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

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
`;

const Page = styled.span`
  opacity: 0.5;
  cursor: pointer;
  color: #f8f9fa;
  &:hover {
    opacity: 1;
  }
`;

export default QuestionList;

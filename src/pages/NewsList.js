import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text} from '../elements';
import { BiTimeFive } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const NewsList = (props) => {

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid className='body-inner' height='100%'>
            <Text p color='#f8f9fa' fontSize='3vh' fontWeight='700'>뉴스게시판</Text>
            <CardList>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
                return (
                  <Card>
                    <Grid className='card-inner' height='100%'>
                      <ImageBox></ImageBox>
                      <NewsBox>
                        <Grid className='news-content' height='55%' padding='0 10px'>
                          <Text p fontSize='2vh' fontWeight='700' color='#f8f9fa'>뉴스 제목</Text>
                          <Text p fontSize='1.7vh' color='#9aa0a6'>뉴스 내용입니다.</Text>
                        </Grid>
                        <Grid className='news-time' height='15%' padding='0 10px'>
                          <Text p fontSize='1.4vh' color='#bdc1c6'><BiTimeFive /> 3분 전</Text>
                        </Grid>                  
                      </NewsBox>
                    </Grid>
                  </Card>
                )
              })}
            </CardList>
            <Grid className='pagination' height='8vh' is_center padding='20px 0'>
              <PageBox>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page><BsChevronLeft /></Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>01</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>02</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page>03</Page></Text>
                <Text lineHeight='8vh' margin='0 1vw 0'><Page><BsChevronRight /></Page></Text>
              </PageBox>
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const CardList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  background-color: #202124;
  width: 24%;
  height: 45vh;
  border-radius: 12px;
  margin: 0 0 20px;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageBox = styled.div`
  background-color: #c4c4c4;
  height: 50%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const NewsBox = styled.div`
  height: 50%;
  text-align: left;
  padding: 10px;
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

export default NewsList;
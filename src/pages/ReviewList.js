import React from 'react';
import styled from 'styled-components';
import {Button, Grid, Image, Input, Text} from '../elements';
import Header from '../components/Header';

const ReviewList = (props) => {

  return (
    <React.Fragment>
      <Grid>
        <Header />
        <Grid is_center backgroundColor='#e5e5e5' height='15vh'></Grid>
        <Grid is_center height='25vh'>
          <BootcampBox>
            <ImageDiv>
              <ImageInner>
                <Text fontSize='2.5vh'>LOGO</Text>
              </ImageInner>
            </ImageDiv>
            <InfoDiv>
              <InfoInner>
                <Text fontSize='2.5vh' fontWeight='700'>부트캠프명</Text>
                <Text p fontSize='1.2vh'>★ 2.2 <span style={{color: '#aaa'}}>(184개 리뷰)</span></Text>
              </InfoInner>
            </InfoDiv>
          </BootcampBox>
          <Grid height='75%'></Grid>
          <NavBar>
            <NavBox>
              <Menu><a><Text fontSize='2vh' fontWeight='700'>리뷰</Text></a></Menu>
              <Menu><a><Text fontSize='2vh' fontWeight='700'>게시글</Text></a></Menu>
            </NavBox>
          </NavBar>
        </Grid>
        <Grid is_center backgroundColor='#e5e5e5'>
          <Grid is_flex height='100%' width='55%' margin='0 auto' padding='3vh 0 0'>
            <PostList>
              {[1, 2, 3].map((n, idx) => {
                return (
                  <Post>
                    <StarBox>
                      <Score><Text fontSize='2vh'>2.2</Text></Score>
                      <Stars><Text fontSize='1.5vh'>★★☆☆☆</Text></Stars>
                    </StarBox>
                    <PostBox>
                      <PostInner>
                        <Text fontSize='2vh' fontWeight='700'>리뷰 제목<br/></Text>
                        <Text color='#bbb'>수료자: sp****** 2021.07.25<br/><br/></Text>
                        <Text fontSize='1.5vh' fontWeight='700'>장점<br/></Text>
                        <Text fontSize='1.5vh'>온라인 부트캠프라서 공간적 제약이 없다ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ<br/><br/></Text>
                        <Text fontSize='1.5vh' fontWeight='700'>단점<br/></Text>
                        <Text fontSize='1.5vh'>과정도 별로 메리트 없고 전문가가 아닌 수료생들이 세션을 진행하기도 한다</Text>
                      </PostInner>
                    </PostBox>
                  </Post>
                )
              } )}
            </PostList>
              <CampList>
                <CampListInner>
                  <Title><Text fontSize='1.5vh' fontWeight='700' lineHeight='5vh'>다른 부트캠프</Text></Title>
                  {[1, 2, 3, 4].map((n) => {
                    return (
                      <Camp>
                        <ImageBox>
                        </ImageBox>
                        <InfoBox>
                          <InfoBoxInner>
                            <Text fontSize='1.5vh' fontWeight='700'>부트캠프명</Text>
                            <Text p fontSize='1.2vh'>★★☆☆☆ 2.2</Text>
                          </InfoBoxInner>
                        </InfoBox>
                      </Camp>
                    )
                  })}
                </CampListInner>
              </CampList>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const BootcampBox = styled.div`
  height: 20vh;
  width: 12vw;
  position: absolute;
  top: 15vh;
  left: 22vw;
`;

const ImageDiv = styled.div`
  height: 60%;
  width: 100%;
  background-color: #fafafa;
`;

const ImageInner = styled.div`
  padding-top: 4vh;
`;

const InfoDiv = styled.div`
  height: 50%;
  width: 100%;
  text-align: left;
`;

const InfoInner = styled.div`
  padding: 10px 0 0 5px;
`;

const NavBar = styled.div`
  width: 100%;
  height: 25%;
`;

const NavBox = styled.div`
  width: 55%;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;

const Menu = styled.div`
  width: 10%;
  height: 100%;
  line-height: 6vh;
  text-align: left;
  padding-left: 5px;
`;

const PostList = styled.div`
  background-color: white;
  width: 70%;
  height: 100%;
  display: inline-block;
`;

const Post = styled.div`
  width: 100%;
  display: flex;
`;

const StarBox = styled.div`
  width: 20%;
  height: 100%;
`;

const Score = styled.div`
  text-align: left;
  margin: 30px 30px 0;
`;

const Stars = styled.div`
  text-align: left;
  margin-left: 30px;
`;

const PostBox = styled.div`
  width: 80%;
  height: 100%;
`;

const PostInner = styled.div`
  text-align: left;
  margin: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
`;

const CampList = styled.div`
  background-color: white;
  width: 20%;
  height: 50vh;
  position: absolute;
  top: 50vh;
  left: 62%;
`;

const CampListInner = styled.div`
  height: 100%;
  padding: 20px;
`;

const Title = styled.div`
  background-color: white;
  height: 5vh;
  text-align: left;
`;

const Camp = styled.div`
  height: 20%;
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const ImageBox = styled.div`
  height: 100%;
  width: 30%;
  background-color: tomato;
`;

const InfoBox = styled.div`
  height: 100%;
  width: 70%;
  text-align: left;
`;

const InfoBoxInner = styled.div`
  padding: 2vh 0 0 0.5vw;
`;

export default ReviewList;
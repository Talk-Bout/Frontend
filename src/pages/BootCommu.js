import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Grid, Text, Image} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';

const BootCommu = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);    // post 모듈의 list를 가져온다

  useEffect(() => {
    dispatch(postActions.setPostDB());        // post 모듈에서 게시글 불러오는 함수 호출
  }, [])

  return (
    <React.Fragment>
      <Grid className='background' display='flex'>
        <Sidebar />
        <Body header>
          <Grid clasName='logo-box' height='20%'>
            <LogoBox><TextBox><Text lineHeight='15vh' fontSize='3vh' color='#5F6368'>LOGO</Text></TextBox></LogoBox>
          </Grid>
          <Grid className='info-button' height='15%' padding='40px 0'>
            <InfoBtn>
              <Text fontSize='3.5vh' color='#F8F9FA' fontWeight='700'>부트캠프명</Text>
              <Button><Text fontSize='1.6vh' color='#121212' fontWeight='700'>홈페이지 바로가기</Text></Button>
            </InfoBtn>
            <Text fontSize='1.6vh' color='#80868B'>★ 2.2 (164개 리뷰)</Text>
          </Grid>
          <Grid className='nav-box' height='80px' margin='20px 0 0' borderBottom='2px solid #5F6368'>
            <Menu><Text fontSize='2.5vh' color='#5F6368'_onClick={() => history.push('/boot/review')}>리뷰</Text></Menu>
            <Menu style={{borderBottom: '4px solid #e8eaed'}}><Text fontSize='2.5vh' color='#e8eaed'>커뮤니티</Text></Menu>
          </Grid>
          <Grid className='contents-box' height='55%' padding='40px 0' display='flex' justify_content='space-between' position='relative'>
            <Grid className='contents-postlist' backgroundColor='#202124' width='64%' height='100%' padding='0 40px'>
              <PostList>
                {[1, 2, 3].map((p) => {
                  return (
                    <Post>
                      <StarBox>
                        <Text className='score' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>2.2</Text>
                        <Text className='star' p fontSize='2vh' color='#e8eaed' margin='0'>★★☆☆☆</Text>
                      </StarBox>
                      <PostBox>
                        <Text className='title' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>리뷰 제목</Text>
                        <Text className='user' p fontSize='1.3vh' color='#80868b' margin='0'>수료자 : st****** - 2021.07.25</Text>
                        <Text className='strong-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='20px 0 0'>장점</Text>
                        <Text className='strong-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>온라인 부트캠프라서 공간적 제약이 없고, 소득공유 결제 모델이 있어서 당장 자금이 없어도 배우고 미래에 투자할 수 있습니다.</Text>
                        <Text className='week-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='15px 0 0'>단점</Text>
                        <Text className='wee-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>과정도 별로 메리트 없고 전문가가 아닌, 수료하고 코드스테이츠에 취업한 수료생들이 세션을 진행하는 경우도 꽤 있습니다.</Text>
                      </PostBox>
                    </Post>
                  )
                })}
              </PostList>
            </Grid>
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='450px' position='absolute'>
              <Text className='other-camps' p fontSize='2vh' fontWeight='700' color='#e2e2e2' margin='20px 20px 0'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c) => {
                return (
                  <Camp>
                    <ImgBox><Image size='80' margin='10px' src='https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'></Image></ImgBox>
                    <CampBox>
                      <Text className='camp-name' p fontSize='2vh' fontWeight='700' color='#f1f3f4' margin='20px 0 0'>부트캠프명</Text>
                      <Text className='camp-star' p fontSize='1.5vh' color='#a5a5a5' margin='0' >★★☆☆☆ 2.2</Text>
                    </CampBox>
                  </Camp>
                )
              })}
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const LogoBox = styled.div`
  height: 100%;
  width: 15vw;
  min-width: 150px;
  border: 1px solid #5F6368;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  height: 100%;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0 40px;
  border: none;
  border-radius: 8px;
  background-color: #BDC1C6;
`;

const Menu = styled.div`
  display: inline-block;
  margin-right: 60px;
  padding-top: 20px;
  cursor: pointer;
  height: 70%;
`;

const PostList = styled.div`
  width: 100%;
  height: 100%;
`;

const Post = styled.div`
  display: flex;
`;

const StarBox = styled.div`
  height: 100%;
  width: 25%;
  padding: 40px 0;
`;

const PostBox = styled.div`
  height: 100%;
  width: 75%;
  border-bottom: 1px solid #8f9091;
  padding: 40px 0;
`;

const Camp = styled.div`
  height: 100px;
  display: flex;
  border-bottom: 1px solid #8f9091;
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100px;
`;

const CampBox = styled.div`
  width: 80%;
`;

export default BootCommu;
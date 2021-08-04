import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Grid, Text, Image} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import { AiOutlineEye } from 'react-icons/ai';
import { BiLike, BiComment } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const BootCommu = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);    // post 모듈의 list를 가져온다

  useEffect(() => {
    dispatch(postActions.setPostDB());        // post 모듈에서 게시글 불러오는 함수 호출
  }, []);

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
                {/* <Grid className='temp-button' height='auto' display='inline-block' padding='20px 0 0'> */}
                <WriteBtn onClick={() => history.push('/boot/community/write')}><Text fontSize='1.6vh' color='#e8eaed' fontWeight='700'>글쓰기</Text></WriteBtn>
                {/* </Grid> */}
                <Grid className='community-title' display='flex' justify_content='space-between' borderBottom='1px solid #8f9091'>
                  <TitleBox><Text p fontSize='2.5vh' fontWeight='700' color='#e8eaed'>스파르타코딩클럽 커뮤니티</Text></TitleBox>
                  <Text p className='sort' fontSize='1.7vh' color='#757577' margin='3vh 0 0'>인기순 | 최신순</Text>
                </Grid>
                {post_list.map((n, idx) => {
                  return (
                    <Post key={idx} onClick={() => history.push(`/boot/post/${n.postId}`)}>
                      <Text p fontSize='2vh' fontWeight='700' color='#dadce0'>{n.title}</Text>
                      <Text p color='#80868b'>{n.content}</Text>
                      <Text p color='#bdc1c6'><BiLike /> 17  <BiComment /> 5  <AiOutlineEye /> 354</Text>
                    </Post>
                  )
                })}
              </PostList>
              <Grid className='pagination' height='8vh' is_center>
                <PageBox>
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page><BsChevronLeft /></Page></Text>
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page>01</Page></Text>
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page>02</Page></Text>
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page>03</Page></Text>
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page><BsChevronRight /></Page></Text>
                </PageBox>
              </Grid>
            </Grid>
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='450px' position='absolute'>
              <Text className='other-camps' p fontSize='2vh' fontWeight='700' color='#e2e2e2' margin='20px 20px 0'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c, idx) => {
                return (
                  <Camp key={idx} onClick={() => history.push('/boot/review')}>
                    <ImgBox><Image size='4.5' margin='10px' src='https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'></Image></ImgBox>
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
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
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

const WriteBtn = styled.button`
  float: right;
  margin-top: 20px;
  padding: 5px 10px;
  background-color: transparent;
  border: 2px solid #e8eaed;
  border-radius: 7px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const TitleBox = styled.div``;

const Post = styled.div`
  padding: 20px 40px;
  border-bottom: 1px solid #8f9091;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Camp = styled.div`
  height: 100px;
  display: flex;
  border-bottom: 1px solid #8f9091;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100px;
  overflow: hidden;
`;

const CampBox = styled.div`
  width: 80%;
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

export default BootCommu;
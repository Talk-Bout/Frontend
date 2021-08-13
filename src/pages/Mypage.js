import React, { useEffect } from 'react';
import { history } from '../redux/ConfigureStore';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Profile from '../image/profile_small.png';
import Mid_Profile from '../image/mypage_profile.svg';
import Badge from '../image/badge 1.png';
import { Text, Button, Grid, Input, Image } from '../elements/index';
import { BiTimeFive, BiBadgeCheck} from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as mypageActions} from '../redux/modules/mypage';

const Mypage = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);
  const all_mytalk = useSelector((state) => state.mypage.mytalk_list);
  console.log(all_mytalk);
  const mytalk_list = all_mytalk.filter((talk) => talk.post !== null);
  console.log(mytalk_list);
  const myboot_list = useSelector((state) => state.mypage.myboot_list);
  
  
  // mypost 3개 추출
  const mytalk = mytalk_list.slice(0,3);
  console.log(mytalk);

  // 부트캠프, 부트톡톡 북마크
  useEffect(()  => {
    dispatch(mypageActions.setMyTalkDB(nickname));
    dispatch(mypageActions.setMyBootDB(nickname));
  }, []);
  
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid display="flex" backgroundColor="#17181b" height="93vh">
          {/* 왼쪽 프로필 */}
          <Grid height="100%" width="25%" margin="0 16px 0 0">
            <Grid backgroundColor="#202124" height="325px" width="302px" margin="auto"
            border="1px solid #202124" borderRadius="12px" >
              {/* 인증 안됐을 때 */}
              {/* <ProfileBox>
                <img src={Mid_Profile} alt='프로필'/>
              </ProfileBox> */}
               {/* 인증 됐을 때 */}
              <ProfileBox>
              <img src={Mid_Profile} alt='프로필'/>
              </ProfileBox>
              <Grid height="30%">
                <Text p color="#F8F9FA" text_align="center" margin="5px 0 5px 0" fontSize="24px" fontWeight="bold">
                  스파르타 <Text fontSize="24px" color="#7879F1"><img src={Badge} alt='배지'/></Text>
                </Text>
                <Text p color="#5F6368" text_align="center" margin="0" fontSize="14px">sparta@coding.kr</Text>
              </Grid>
              {/* 인증 안됐을 때 */}
              {/* <Grid height="30%" margin="auto">
                <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                  margin="0 7% 0 0" font_size="14px" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                  <Button font_size="14px" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">부트캠프 인증하기</Button>
                </TextBox>
              </Grid> */}
              {/* 인증 됐을 때 */}
              <Grid height="30%" margin="auto">
                <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                   font_size="14px" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                </TextBox>
              </Grid>
            </Grid>
          </Grid>
          {/* 북마크된 부트캠프, 글들 */}
          <Grid height="100%" width="73%" >
            <Grid height="100%" width="100%" >
              <Grid height="172px" width="100%" >
                <Grid padding="18px 20px" flexDirection="row" align_items="flex-start" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">관심있는 부트캠프</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 게시글이 없을 경우 */}
                {/* <Grid display="flex" margin="1% 0" justify_content="space-between" height="65%" width="100%">
                  <Grid height="80%" width="100%" border="4px dotted #2E3134" borderRadius="5px">
                    <Grid margin="auto" height="100%" width="100%" padding="2.5% 32%">
                    <Text fontSize="2.6vh" color="#FFFFFF">부트캠프를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                    </Grid>
                  </Grid>
                </Grid> */}
                {/* 게시글이 있을 경우 */}
                <Grid display="flex" margin="12px 0" justify_content="space-between" height="65%" width="100%">
                {myboot_list.map((b, idx) => {
              return (
                  <Grid margin="0 16px 0 0" display="flex" padding="0 1.5%" height="96px" width="32%" backgroundColor="#202124"  borderRadius="5px">
                    <ImageBox>
                     <Image shape="CircleLogo"/>
                    </ImageBox>
                    <Grid padding="18px 0" width="67%">
                      <Grid display="flex" justify_content="space-between">
                      <Text p margin="0 0 5px 10px" color="#F1F3F4" fontSize="18px">{b.bootcampName}</Text>
                      <Text cursor="pointer" color="#7879F1" fontSize="18px"><BsHeartFill/></Text>
                      </Grid>
                      
                      <Text p margin="2px 0px 0px 10px" color="#F1F3F4" fontSize="14px">★★☆☆☆ 2.2</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
              </Grid>
              <Grid height="287px" width="100%" margin="48px 0 0 0" >
              <Grid padding="18px 20px" flexDirection="row" align_items="flex-start" justify_content="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">내 북마크</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 부트톡톡 북마크가 있을 경우에만 보여줌 */}
                {mytalk_list ?
                <Grid display="flex" margin="12px 0" height="211px" width="100%">
                {mytalk.map((n, idx) => {
                  
              return (
                  <Grid margin="0 16px 0 0" padding="0 1.5%" height="211px" width="32%" backgroundColor="#202124" borderRadius="5px">
                    <Grid overflow="hidden" padding="2% 7% 0 0" height="55%" width="100%" >
                      <Text p margin="2% 0" color="#F1F3F4" fontSize="18px">{n.post.title}</Text>
                      <Text p margin="2% 0 0 0" color="#F1F3F4" fontSize="14px">{n.post.content}</Text>
                    </Grid>
                    <Grid display="flex" height="19%" width="100%" >
                      <ImgBox>
                      <img src={Profile} alt='프로필'/>
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 3% 0 0" color="#BDC1C6" fontSize="12px">{n.post.nickname}</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="12px"><BiTimeFive/>{n.post.createdAt}</Text>
                      </InfoBox>
                    </Grid>
                    <hr/>
                    <Grid padding="0.5% 5% 0 0" justify_content="space-between" display="flex" height="25%" width="100%">
                      <Text p margin="0" color="#BDC1C6" fontSize="14px">부트톡톡 <AiOutlineRight/> {n.post.category}</Text>
                      <Text cursor="pointer" color="#7879F1" fontSize="14px"><BsBookmarkFill/></Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
                :
                <Grid margin="12px 0 0 0" height="211px" width="100%">
                  <Grid display="flex" align_items="center" text_align="center" height="203px" width="100%" border="5px dotted #2E3134" borderRadius="12px">
                    <Text fontSize="18px" color="#FFFFFF" >북마크를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                  </Grid>
                </Grid>
                }
              </Grid>
              <Grid height="279px" width="100%" margin="48px 0 0 0">
              <Grid padding="18px 20px" flexDirection="row" align_items="flex-start" justify_content="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">내가 쓴 글</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%"
                  // _onClick={()=>{history.push(`/mypage/mypost/${postId}`)}}
                  >더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 게시글이 없을 경우
                <Grid margin="12px 0" height="203px" width="100%">
                  <Grid display="flex" align_items="center" text_align="center" height="203px" width="100%" border="5px dotted #2E3134" borderRadius="12px">
                    <Text fontSize="18px" color="#FFFFFF" >글을 작성해주세요 ㄟ(≧◇≦)ㄏ</Text>
                  </Grid>
                </Grid> */}
                {/* 게시글이 있을 경우 */}
                <Grid display="flex" margin="12px 0" height="211px" width="100%">
                {[1, 2, 3].map((p, idx) => {
              return (
                  <Grid margin="0 16px 0 0" padding="0 1.5%" height="203px" width="32%" backgroundColor="#202124" borderRadius="5px">
                    <Grid overflow="hidden" padding="2% 7% 0 0" height="55%" width="100%" >
                      <Text p margin="2% 0" color="#F1F3F4" fontSize="18px">부트톡톡</Text>
                      <Text p margin="2% 0 0 0" color="#F1F3F4" fontSize="14px">온라인 부트캠프라서 공간적 제약이 없고 소득공유 결제 모델이 있어서 당장 지금..</Text>
                    </Grid>
                    <Grid display="flex" height="19%" width="100%" >
                      <ImgBox>
                      <img src={Profile} alt='프로필'/>
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 3% 0 0" color="#BDC1C6" fontSize="12px">username</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="12px"><BiTimeFive/> 2021.07.25</Text>
                      </InfoBox>
                    </Grid>
                    <hr/>
                    <Grid padding="0.5% 5% 0 0" justify_content="space-between" display="flex" height="25%" width="100%">
                      <Text p margin="0" color="#BDC1C6" fontSize="14px">부트톡톡 <AiOutlineRight/> 정보게시판</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const ProfileBox = styled.div`
width: 72px;
height: 72px;
margin: 12% auto;

`;

const TextBox = styled.div`
text-align: center;
display: flex;
padding: 6% 0;
margin: auto;
justify-content: center;
`;

const ImgBox = styled.div`
margin: 2% 3% 0 0;
`;

const InfoBox = styled.div`
display: flex;
width: 100%;
padding: 2% 0;
`;

const BookMarkBox = styled.div`
`;

const Count = styled.span`
color: #5F6368;
font-size: 18px;
`;

const ImageBox = styled.div`
width: 30%;
justify-content: middle;
margin: auto;
`;

export default Mypage;
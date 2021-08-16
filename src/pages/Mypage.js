import React, { useEffect } from 'react';
import { history } from '../redux/ConfigureStore';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Stars from '../components/Stars';
import Profile from '../image/profile_small.png';
import CampImg from '../image/bootcamp_default.png';
import Mid_Profile from '../image/mypage_profile.svg';
import Badge from '../image/badge 1.png';
import { Text, Button, Grid, Input, Image } from '../elements/index';
import { BiTimeFive, BiBadgeCheck} from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as mypageActions} from '../redux/modules/mypage';
import {actionCreators as campActions} from '../redux/modules/bootcamp';

const Mypage = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);

  // 관심있는 부트캠프
  const myboot_list = useSelector((state) => state.mypage.myboot_list);
  // 관심있는 부트캠프 3개 추출
  const myboot = myboot_list.slice(0,3);
  // 관심있는 부트캠프 3개 이름만 추출
  let myboot_name = [];
  myboot.map((boot) => {
    myboot_name.push(boot.bootcampName);
  });
  // 부트캠프 전체 목록
  const camp_list = useSelector((state) => state.bootcamp.camp_list);
  // 관심있는 부트캠프 3개 정보까지 추출
  let myboot_info = [];
  camp_list.map((camp) => {
    if (myboot_name.includes(camp.bootcampName)) {
      myboot_info.push(camp);
    };
  });

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);
  // 삭제된 post의 경우 안띄워줌
  const mypost_list = all_post.filter((posts) => posts.post !== null);
  // 내가쓴글 3개 추출
  const mypost = mypost_list.slice(0,3);

  // 부트톡톡 북마크 리스트
  const all_mytalk = useSelector((state) => state.mypage.mytalk_list);
  // 삭제된 post의 경우 안띄워줌
  const mytalk_list = all_mytalk.filter((talk) => talk.post !== null);
  // 부트톡톡 북마크 3개 추출
  const mytalk = mytalk_list.slice(0,3);

  // 질문과 답변 리스트
  const all_qna = useSelector((state) => state.mypage.myqna_list);
  // 삭제된 qna의 경우 안띄워줌
  const myqna_list = all_qna.filter((qnas) => qnas.post !== null);
  // 질문과답변 3개 추출
  const myqna = myqna_list.slice(0,3);

  // 커뮤니티 리스트
  const all_commu = useSelector((state) => state.mypage.mycommu_list);
  // 삭제된 commu의 경우 안띄워줌
  const mycommu_list = all_commu.filter((commu) => commu.post !== null);
  // 커뮤니티 3개 추출
  const mycommu = mycommu_list.slice(0,3);
  

  // 부트캠프, 부트톡톡 북마크
  useEffect(()  => {
    dispatch(mypageActions.setMyBootDB(nickname));
    dispatch(campActions.setCampsDB(1));
    dispatch(mypageActions.setMypostDB(nickname));
    dispatch(mypageActions.setMyTalkDB(nickname));
    dispatch(mypageActions.setMyQnaDB(nickname));
    dispatch(mypageActions.setMyCommuDB(nickname));
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
              <ProfileBox>
                <img src={Mid_Profile} alt='프로필'/>
              </ProfileBox>
              <Grid height="30%">
                {/* 닉네임 표시 */}
              <Text p color="#F8F9FA" text_align="center" margin="5px 0 5px 0" fontSize="24px" fontWeight="bold">
                  {nickname} <Text fontSize="24px" color="#7879F1"></Text>
                </Text>
                {/* 이메일 표시 */}
                {/* <Text p color="#5F6368" text_align="center" margin="0" fontSize="14px">sparta@coding.kr</Text> */}
              </Grid>
               {/* 인증 됐을 때 */}
              {/* <ProfileBox>
              <img src={Mid_Profile} alt='프로필'/>
              </ProfileBox>
              <Grid height="30%">
                <Text p color="#F8F9FA" text_align="center" margin="5px 0 5px 0" fontSize="24px" fontWeight="bold">
                  스파르타 <Text fontSize="24px" color="#7879F1"><img src={Badge} alt='배지'/></Text>
                </Text>
                <Text p color="#5F6368" text_align="center" margin="0" fontSize="14px">sparta@coding.kr</Text>
              </Grid> */}
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
                {/* <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                   font_size="14px" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                </TextBox> */}
              </Grid>
            </Grid>
          </Grid>
          {/* 북마크된 부트캠프, 글들 */}
          <Grid height="100%" width="73%" >
            <Grid height="100%" width="100%" >
              <Grid height="172px" width="100%" >
                <Grid padding="18px 20px" justify_content="space-between" flexDirection="row" align_items="flex-start" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">관심있는 부트캠프</Text>
                    <Count> {'('}{myboot_list.length}{')'} </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 관심있는 부트캠프가 있을 때만 보여줌 */}
                {myboot_list.length !== 0 ?
                <Grid display="flex" margin="12px 0" justify_content="space-between" height="65%" width="100%">
                {myboot_info.map((mb, idx) => {
              return (
                  <Grid margin="0 16px 0 0" display="flex" padding="0 1.5%" height="96px" width="32%" backgroundColor="#202124"  borderRadius="5px"
                  _onClick={()=>{history.push(`/boot/${mb.bootcampName}/info`)}}
                  >
                    <ImageBox>
                     <Image shape="CircleLogo" src={mb.logo ? mb.logo : CampImg}/>
                    </ImageBox>
                    <Grid padding="10px 0" width="67%">
                      <Grid display="flex" justify_content="space-between">
                      <Text p margin="0 0 5px 10px" color="#F1F3F4" fontSize="18px">{mb.bootcampName}</Text>
                      <Text margin="0 0 0 2px" cursor="pointer" color="#7879F1" fontSize="24px"><BsHeartFill/></Text>
                      </Grid>
                      
                      <Text p margin="2px 0px 0px 10px" color="#F1F3F4" fontSize="14px"><Stars score={mb.star} size='14px' withScore /></Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
                :
                <Grid display="flex" margin="1% 0" justify_content="space-between" height="65%" width="100%">
                  <Grid height="80%" width="100%" border="4px dotted #2E3134" borderRadius="5px" padding="2.5% 32%">
                    <Grid margin="auto" height="100%" width="98%" >
                    <Text fontSize="16px" color="#FFFFFF">부트캠프를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                    </Grid>
                  </Grid>
                </Grid>
                }
                
              </Grid>
              <Grid height="287px" width="100%" margin="48px 0 0 0" >
              <Grid padding="18px 20px" flexDirection="row" align_items="flex-start" justify_content="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">내 북마크</Text>
                    <Count> {'('}{mytalk_list.length} {')'} </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%"
                  _onClick={()=>{history.push('/mypage/mybookmarks')}}
                  >더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 북마크가 있을 경우에만 보여줌 */}
                {mytalk_list.length !== 0 ?
                <Grid display="flex" margin="12px 0" height="211px" width="100%">
                {mytalk.map((n, idx) => {
                  
              return (
                  <Grid margin="0 16px 0 0" padding="0 1.5%" height="211px" width="32%" backgroundColor="#202124" borderRadius="5px"
                  _onClick={()=>{history.push(`/common/detail/${n.postId}`)}}
                  >
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
                      <Text p margin="2px 0 0 0" color="#BDC1C6" fontSize="14px">부트톡톡 <AiOutlineRight/> {n.post.category}</Text>
                      <Text cursor="pointer" color="#7879F1" fontSize="24px"><BsBookmarkFill/></Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
                :
                <Grid margin="12px 0 0 0" height="211px" width="98%">
                  <Grid display="flex" align_items="center" text_align="center" height="203px" width="100%" padding="2.5% 32%" border="5px dotted #2E3134" borderRadius="12px">
                    <Text fontSize="16px" color="#FFFFFF" >북마크를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                  </Grid>
                </Grid>
                }
              </Grid>
              <Grid height="279px" width="100%" margin="48px 0 0 0">
              <Grid padding="18px 20px" flexDirection="row" align_items="flex-start" justify_content="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                  <BookMarkBox>
                   <Text fontSize="18px" color="#F1F3F4">{nickname} 님의 글</Text>
                    <Count> {'('}{mypost_list.length} {')'} </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%"
                  _onClick={()=>{history.push('/mypage/mypost')}}
                  >더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 내가 쓴글이 있을 경우에만 보여줌 */}
                {mypost_list.length !== 0 ?
                <Grid display="flex" margin="12px 0" height="211px" width="100%">
                {mypost.map((p, idx) => {
              return (
                  <Grid margin="0 16px 0 0" padding="0 1.5%" height="203px" width="32%" backgroundColor="#202124" borderRadius="5px"
                  _onClick={()=>{history.push(`/common/detail/${p.postId}`)}}
                  >
                    <Grid overflow="hidden" padding="2% 7% 0 0" height="55%" width="100%" >
                      <Text p margin="2% 0" color="#F1F3F4" fontSize="18px">{p.title}</Text>
                      <Text p margin="2% 0 0 0" color="#F1F3F4" fontSize="14px"
                      >{p.content}</Text>
                    </Grid>
                    <Grid display="flex" height="19%" width="100%" >
                      <ImgBox>
                      <img src={Profile} alt='프로필'/>
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 3% 0 0" color="#BDC1C6" fontSize="12px">{p.nickname}</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="12px"><BiTimeFive/>{p.createdAt}</Text>
                      </InfoBox>
                    </Grid>
                    <hr/>
                    <Grid padding="0.5% 5% 0 0" justify_content="space-between" display="flex" height="25%" width="100%">
                      <Text p margin="0" color="#BDC1C6" fontSize="14px">부트톡톡 <AiOutlineRight/> {p.category}</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
                :
                <Grid margin="12px 0" height="203px" width="98%">
                  <Grid display="flex" align_items="center" text_align="center" padding="2.5% 32%" height="203px" width="100%" border="5px dotted #2E3134" borderRadius="12px">
                    <Text fontSize="18px" color="#FFFFFF" >글을 작성해주세요 ㄟ(≧◇≦)ㄏ</Text>
                  </Grid>
                </Grid>
                }
                
                
                
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
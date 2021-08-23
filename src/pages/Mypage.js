import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Grid, Image } from '../elements';
import { Sidebar, Body, Stars } from '../components';
import { Profile_small, Profile_medium, CampLogo_default } from '../image';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { history } from '../redux/ConfigureStore';
import { getCookie } from '../shared/cookie';

const Mypage = (props) => {
  const dispatch = useDispatch();

  const nickname = getCookie('nickname');
  const provider = getCookie('provider');
  const profilePic = getCookie('profilePic');
  const user_profile_url = `http://13.209.12.149${profilePic}`;

  useEffect(() => {
    dispatch(mypageActions.setMyBootDB(nickname));
    dispatch(campActions.setCampsDB(1));
    dispatch(mypageActions.setMypostDB(nickname));
    dispatch(mypageActions.setMyTalkDB(nickname));
    dispatch(mypageActions.setMyQnaDB(nickname));
  }, []);

  // 관심있는 부트캠프
  const myboot_list = useSelector((state) => state.mypage.myboot_list);
  // 관심있는 부트캠프 3개 추출
  const myboot = myboot_list.slice(0, 3);

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);
  // 삭제된 post의 경우 안띄워줌
  const mypost_list = all_post.filter((posts) => posts.post !== null);
  // 내가쓴글 3개 추출
  const mypost = mypost_list.slice(0, 3);

  // 부트톡톡 북마크 리스트
  const all_mytalk = useSelector((state) => state.mypage.mytalk_list);
  // 삭제된 post의 경우 안띄워줌
  const mytalk_list = all_mytalk.filter((talk) => talk.post !== null);
  // 부트톡톡 북마크 3개 추출
  const mytalk = mytalk_list.slice(0, 3);

  // 질문과 답변 리스트
  const all_qna = useSelector((state) => state.mypage.myqna_list);
  // 삭제된 qna의 경우 안띄워줌
  const myqna_list = all_qna.filter((qnas) => qnas.post !== null);
  // 질문과답변 3개 추출
  const myqna = myqna_list.slice(0, 3);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header footer>
          <Outter>
            {/* 왼쪽 프로필 */}
            <ProfileOutter>
              <ProfileInner>
                {/* 인증 안됐을 때 */}
                <ProfileBox>
                  <Profile src={profilePic === 'null' ? Profile_medium : user_profile_url} alt='프로필' onClick={() => history.push('/mypage/pic')} />
                </ProfileBox>
                <Grid>
                  {/* 닉네임 표시 */}
                  <Nickname>
                    {nickname}
                  </Nickname>
                  {/* 소셜 로그인 표시 */}
                  <Status>{provider} 로그인 이용 중</Status>
                </Grid>
              </ProfileInner>
            </ProfileOutter>
            {/* 북마크된 부트캠프, 글들 */}
            <ResponSiveOutter height="100%" width="100%" >
              <Grid height="100%" width="100%">
                <Grid height="172px" width="100%" >
                  <Grid padding="18px 20px" justifyContent="space-between" flexDirection="row" alignItems="flex-start" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                    <BookMarkBox>
                      <Text fontSize="18px" color="#F1F3F4" cursor='default'>관심있는 부트캠프</Text>
                      <Count> {'('}{myboot_list.length}{')'} </Count>
                    </BookMarkBox>
                    <MoreButton onClick={() => history.push('/mypage/mycamp')}>더보기 <span style={{ verticalAlign: 'middle' }}><AiOutlineRight /></span></MoreButton>
                  </Grid>
                  {/* 관심있는 부트캠프가 있을 때만 보여줌 */}
                  {myboot_list.length !== 0 ?
                    <BootBox>
                      {myboot.map((mb, idx) => {
                        return (
                          <BootCard key={idx + 100} className={`bootcard${idx}`} onClick={() => { history.push(`/boot/${mb.bootcampName}`) }}
                          >
                            <ImageBox>
                              <Logo>
                                <Img src={mb.bootcamp.logo ? mb.bootcamp.logo : CampLogo_default} />
                              </Logo>
                            </ImageBox>
                            <Grid padding="10px 0" width="67%">
                              <Grid display="flex" justifyContent="space-between">
                                <Text p margin="0 0 5px 15px" color="#F1F3F4" fontSize="18px">{mb.bootcampName}</Text>
                                <Text margin="0 0 0 2px" cursor="pointer" color="#7879F1" fontSize="24px"><BsHeartFill /></Text>
                              </Grid>
                              <Text p margin="2px 0px 0px 15px" color="#F1F3F4" fontSize="14px"><Stars score={mb.stars} size='14px' withScore /></Text>
                            </Grid>
                          </BootCard>
                        );
                      })}
                    </BootBox>
                    :
                    <Grid display="flex" margin="12px 0 0 0" justifyContent="space-between" height="96px" width="98.5%">
                      <Grid height="100%" width="100%" border="4px dotted #2E3134" borderRadius="5px" display='flex' alignItems='center'>
                        <Text fontSize="16px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>부트캠프를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <Grid width="100%" margin="48px 0 0 0" >
                  <Grid padding="18px 20px" flexDirection="row" alignItems="flex-start" justifyContent="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                    <BookMarkBox>
                      <Text fontSize="18px" color="#F1F3F4" cursor='default'>내 북마크</Text>
                      <Count> {'('}{mytalk_list.length} {')'} </Count>
                    </BookMarkBox>
                    <MoreButton onClick={() => { history.push('/mypage/mybookmarks') }}
                    >더보기 <span style={{ verticalAlign: 'middle' }}><AiOutlineRight /></span></MoreButton>
                  </Grid>
                  {/* 북마크가 있을 경우에만 보여줌 */}
                  {mytalk_list.length !== 0 ?
                    <Grid display="flex" margin="12px 0" height="211px" width="100%">
                      {mytalk.map((p, idx) => {
                        return (
                          <Grid key={idx} margin="0 16px 16px 0" padding="15px 20px" height="211px" width="32.3%" backgroundColor="#202124" borderRadius="12px"
                            _onClick={() => { history.push(`/common/detail/${p.postId}`) }} cursor='pointer'>
                            <Grid overflow="hidden" height="100px" width="100%" >
                              <Text p margin="0 0 13px 0" color="#F1F3F4" fontSize="18px" height="26px"
                                overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                              >{p.post.title}
                              </Text>
                              <Text p color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="2" wbo="vertical"
                                margin="0 0 24px 0" height="44px" TABfontSize="12px"
                              >{p.post.content}</Text>
                            </Grid>
                            <Grid display="flex" height="45px" width="100%" borderBottom="1px solid #5F6368">
                              <ImgBox>
                                <ProfileImg src={Profile_small} alt='프로필' />
                              </ImgBox>
                              <InfoBox>
                                <Text p margin="0 8px 0 0" color="#BDC1C6" fontSize="12px" TABfontSize="10px">{p.post.nickname}</Text>
                                <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"><BiTimeFive />{p.post.createdAt}</Text>
                              </InfoBox>
                            </Grid>
                            <Grid padding="3px 5px 0 0" justify_content="space-between" display="flex" height="24px" width="100%">
                              <Text p margin="12px 0 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.post.category} </Text>
                            </Grid>

                          </Grid>
                        );
                      })}
                    </Grid>
                    :
                    <Grid margin="12px 0 0 0" height="211px" width="98.5%">
                      <Grid display="flex" alignItems="center" height="203px" width="100%" border="4px dotted #2E3134" borderRadius="12px">
                        <Text fontSize="16px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>북마크를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <Grid height="279px" width="100%" margin="48px 0 0 0">
                  <Grid padding="18px 20px" flexDirection="row" alignItems="flex-start" justifyContent="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" height="64px" width="98.5%">
                    <BookMarkBox>
                      <Text fontSize="18px" color="#F1F3F4" cursor='default'>{nickname} 님의 글</Text>
                      <Count> {'('}{mypost_list.length}{')'} </Count>
                    </BookMarkBox>
                    <MoreButton color="#5F6368" bg="transparent" border="none" font_size="18px" fontWeight="bold" width="10%"
                      onClick={() => { history.push('/mypage/mypost') }}
                    >더보기 <span style={{ verticalAlign: 'middle' }}><AiOutlineRight /></span></MoreButton>
                  </Grid>
                  {/* 내가 쓴글이 있을 경우에만 보여줌 */}
                  {mypost_list.length !== 0 ?
                    <Grid display="flex" margin="12px 0" height="211px" width="100%">
                      {mypost.map((p, idx) => {
                        return (
                          <Grid key={idx + 50} margin="0 16px 16px 0" padding="15px 20px" height="211px" width="32.3%" backgroundColor="#202124" borderRadius="12px"
                            _onClick={() => { history.push(`/common/detail/${p.postId}`) }} cursor='pointer' hover='opacity: 0.7'>
                            <Grid overflow="hidden" height="100px" width="100%" >
                              <Text p margin="0 0 13px 0" color="#F1F3F4" fontSize="18px" height="26px"
                                overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                              >{p.title}
                              </Text>
                              <Text p color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="3" wbo="vertical"
                                margin="0 0 24px 0" height="44px" TABfontSize="12px"
                              >{p.content}</Text>
                            </Grid>
                            <Grid display="flex" height="45px" width="100%" borderBottom="1px solid #5F6368">
                              <ImgBox>
                                <ProfileImg src={profilePic === 'null' ? Profile_small : profilePic} alt='프로필' />
                              </ImgBox>
                              <InfoBox>
                                <Text margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"><span style={{ marginRight: '4px' }}><BiTimeFive /></span>{p.createdAt}</Text>
                              </InfoBox>
                            </Grid>
                            <Grid padding="3px 5px 0 0" justifyContent="space-between" display="flex" height="24px" width="100%">
                              <Text p margin="12px 0 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.category} </Text>
                            </Grid>

                          </Grid>
                        );
                      })}
                    </Grid>
                    :
                    <Grid margin="12px 0 0 0" height="203px" width="98%">
                      <Grid display="flex" alignItems="center" height="203px" width="100%" border="5px dotted #2E3134" borderRadius="12px">
                        <Text fontSize="18px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>글을 작성해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </ResponSiveOutter>
          </Outter>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const Outter = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  grid-template-columns: 30% 68%;

  @media screen and (min-width: 768px) and (max-width: 1090px) {
    grid-template-columns: 100%;
    display: grid;
  }
`;


const ProfileOutter = styled.div`
  height: auto;
  width: 24%;
  margin: 0 16px 0 0;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 98.5%;
    height: auto;
    margin: 0 0 32px 0;
  }
`;

const ProfileInner = styled.div`
  background-color: #202124;
  width: 302px;
  height: 325px;
  margin: auto;
  border: 1px solid #202124;
  border-radius: 12px;
  @media screen and (min-width: 992px) and (max-width: 1460px) { 
    width: 100%;
    height: 325px;
  }
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 99.5%;
    height: 136px;
    display: flex;
  }
`;

const ProfileBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 70px auto 0;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 100px;
    height: 100px;
    margin: 24px 64px;
    }
`;

const Profile = styled.img`
  width: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Nickname = styled.p`
  color: #F8F9FA;
  text-align: center;
  margin: 50px 0 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    text-align: start;
    margin: 32px 0 0 24px;
    }
`;

const Status = styled.p`
  color: #5f6368;
  text-align: center;
  margin: 0;
  font-size: 14px;
  cursor: default;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    text-align: start;
    margin: 10px 24px;
  }
`;

const ImgBox = styled.div`
  margin: 0px 15px 0 0;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    margin: 0px 8px 0 0;
    }
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ProfileImg = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 16px;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 5px 0;
  vertical-align: middle;
`;

const MoreButton = styled.button`
  color: #bdc1c6;
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: bold;
  width: 13%;
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 12%;
    font-size: 14px;
  }
`;

const BootBox = styled.div`
  display: flex;
  margin: 12px 0;
  height: 96px;
  width: 100%;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    height: 100%;
    .bootcard2 {
      display: none;
    }
}
`;

const BootCard = styled.div`
  margin: 0 16px 0 0;
  display: flex;
  padding: 0 15px;
  height: 96px;
  width: 32.3%;
  background-color:#202124;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 1090px) {
      width: 49.25%;
      height: 96px;
      margin-bottom: 12px;
      box-shadow: none;
    }
`;

const ResponSiveOutter = styled.div`
  height: auto;
  width: 100%;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    height: 100%;
    width: 100%;
  }
`;

const BookMarkBox = styled.div`
`;

const Count = styled.span`
  color: #5F6368;
  font-size: 18px;
`;

const ImageBox = styled.div`
  width: 35%;
  justify-content: middle;
  margin: auto;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 40%;
  }
`;

export default Mypage;
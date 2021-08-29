import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../elements';
import { Sidebar, Body, Stars } from '../components';
import { Profile_small, Profile_medium, CampLogo_default } from '../image';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { history } from '../redux/ConfigureStore';
import { getCookie } from '../shared/cookie';
import NotFound from '../shared/NotFound';

const Mypage = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector(state => state.user.is_login);
  const nickname = useSelector(state => state.user.user.nickname);
  const provider = getCookie('provider');
  const profilePic = useSelector(state => state.user.user.profilePic);
  const user_profile_url = `http://fw3efsadfcv.shop${profilePic}`;

  useEffect(() => {
    dispatch(mypageActions.setMyBootDB(nickname));
    dispatch(mypageActions.setMypostDB(nickname));
    dispatch(mypageActions.setMyBookmarkDB(nickname))
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

  const editInfo = () => {
    // history.push('/mypage/pic');
    window.alert('지금은 에러 처리 중입니다!\n빠르게 복구하여 돌아오겠습니다! ;-/')
  }

  if (!provider) {
    return <NotFound />
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header footer>
          <Outter>
            {/* 왼쪽 프로필 */}
            <ProfileOutter>
              <ProfileInner>
                <ProfileBox>
                  <Profile src={profilePic == null ? Profile_medium : user_profile_url} alt='프로필' onClick={() => editInfo()} />
                </ProfileBox>
                <Grid>
                  {/* 닉네임 표시 */}
                  <Nickname>
                    {nickname}
                  </Nickname>
                  {/* 소셜 로그인 표시 */}
                  <Status>{provider} 로그인 이용 중</Status>
                  <Line />
                  {/* 개인정보 수정 버튼 */}
                  <Status purple onClick={() => history.push('/mypage/pic')}>회원정보 수정</Status>
                </Grid>
              </ProfileInner>
            </ProfileOutter>
            {/* 북마크된 부트캠프, 글들 */}
            <ResponsiveOutter>
              <Grid height="100%">
                <Grid height="172px" MOBheight='fit-content'>
                  <Grid padding="18px 20px" justifyContent="space-between" flexDirection="row" alignItems="flex-start" display="flex" borderRadius="12px" backgroundColor="#202124" MOBbackgroundColor='#17181d' height="64px" MOBheight='40px' MOBpadding='8px 0' width="100%">
                    <div>
                      <Text fontSize="18px" MOBfontSize='16px' color="#F1F3F4" cursor='default'>관심있는 부트캠프</Text>
                      <Count> {'('}{myboot_list.length}{')'} </Count>
                    </div>
                    <MoreButton onClick={() => history.push('/mypage/mycamp')}><WordMOBNone>더보기 </WordMOBNone><Text verticalAlign='middle'><AiOutlineRight /></Text></MoreButton>
                  </Grid>
                  {/* 관심있는 부트캠프가 있을 때만 보여줌 */}
                  {myboot_list.length !== 0 ?
                    <BootBox>
                      {myboot.map((mb, idx) => {
                        return (
                          <BootCard key={idx + 100} className={`bootcard${idx}`} onClick={() => { history.push(`/boot/${mb.bootcampName}`) }}
                          >
                            <Logo>
                              <Img src={mb.bootcamp.logo ? mb.bootcamp.logo : CampLogo_default} />
                            </Logo>
                            <Grid padding="10px 0" TABpadding='16px 0' width="67%" MOBdisplay='none'>
                              <Grid display="flex" justifyContent="space-between">
                                <Text p margin="0 0 5px 15px" TABmargin='0 0 5px 0' color="#F1F3F4" fontSize="18px">{mb.bootcampName}</Text>
                                <Text margin="0 0 0 2px" TABmargin='0' cursor="pointer" color="#7879F1" fontSize="24px"><BsHeartFill /></Text>
                              </Grid>
                              <Text p margin="2px 0px 0px 15px" TABmargin='2px 0 0' color="#F1F3F4" fontSize="14px"><Stars score={mb.stars == null ? 0 : mb.stars} size='12px' withScore /></Text>
                            </Grid>
                          </BootCard>
                        );
                      })}
                    </BootBox>
                    :
                    <Grid display="flex" margin="12px 0 0 0" justifyContent="space-between" height="96px" width="98.5%" MOBdisplay='none'>
                      <Grid height="100%" width="100%" border="4px dotted #2E3134" borderRadius="5px" display='flex' alignItems='center'>
                        <Text fontSize="16px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>부트캠프를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <Grid width="100%" margin="48px 0 0" MOBmargin='16px 0 0'>
                  <Grid padding="18px 20px" MOBpadding='8px 0' flexDirection="row" alignItems="flex-start" justifyContent="space-between" display="flex" borderRadius="12px" backgroundColor="#202124" MOBbackgroundColor='#17181d' height="64px" MOBheight='40px' width="100%">
                    <div>
                      <Text fontSize="18px" MOBfontSize='16px' color="#F1F3F4" cursor='default'>내 북마크</Text>
                      <Count> {'('}{mytalk_list.length}{')'} </Count>
                    </div>
                    <MoreButton onClick={() => { history.push('/mypage/mybookmarks') }}
                    ><WordMOBNone>더보기 </WordMOBNone><span style={{ verticalAlign: 'middle' }}><AiOutlineRight /></span></MoreButton>
                  </Grid>
                  {/* 북마크가 있을 경우에만 보여줌 */}
                  {mytalk_list.length !== 0 ?
                    <Grid display="flex" margin="12px 0" MOBmargin='4px 0 33px' height="211px" MOBheight='fit-content' width="100%">
                      {/* 내 북마크 카드 */}
                      {mytalk.map((p, idx) => {
                        return (
                          <Grid key={idx} margin="0 16px 16px 0" MOBmargin='0 4px' padding="15px 20px" MOBpadding='14px' height="fit-content" MOBheight='180px' width="32.3%" MOBwidth='49%' backgroundColor="#202124" borderRadius="12px"
                            _onClick={() => { history.push(`/common/detail/${p.postId}`) }} cursor='pointer' hover='opacity: 0.7'>
                            <Grid overflow="hidden" height="fit-content">
                              {/* 제목 */}
                              <Text margin="0 0 12px" color="#F1F3F4" fontSize="18px"
                                overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                                MOBfontSize='14px'
                              >{p.post.title}
                              </Text>
                              {/* 내용 */}
                              <Text p color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="2" MOBwlc='3' wbo="vertical"
                                margin="0 0 24px"
                                MOBmargin='0 0 16px' height="42px"
                                TABheight='36px'
                                MOBheight='44px'
                                TABfontSize="12px"
                                MOBfontSize='10px'
                              >{p.post.content}</Text>
                            </Grid>
                            {/* 작성자 프로필 */}
                            <Grid display="flex" height="fit-content" width="100%">
                              <ImgBox>
                                <Img src={Profile_small} alt='프로필' />
                              </ImgBox>
                              <InfoBox>
                                <Text p margin="0 8px 0 0" color="#BDC1C6" fontSize="12px" TABfontSize="10px" MOBfontSize='8px'>{p.post.nickname}</Text>
                                {/* 작성일시 */}
                                <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"
                                  MOBfontSize='8px'><Text margin="0 4px 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="12px"
                                    MOBfontSize='10px'
                                  ><BiTimeFive /></Text>{p.post.createdAt}</Text>
                              </InfoBox>
                            </Grid>
                            <CardLine />
                            {/* 게시판 및 카테고리 */}
                            <Grid padding="0 5px 0 0" justify_content="space-between" display="flex" height="24px" width="100%">
                              <Text color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.post.category} </Text>
                            </Grid>

                          </Grid>
                        );
                      })}
                    </Grid>
                    :
                    <Grid margin="12px 0 0 0" height="211px" width="100%" MOBdisplay='none'>
                      <Grid display="flex" alignItems="center" height="203px" width="100%" border="4px dotted #2E3134" borderRadius="12px">
                        <Text fontSize="16px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>북마크를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <Grid width="100%" margin="48px 0 0" MOBmargin='16px 0 0'>
                  <Grid padding="18px 20px"
                    MOBpadding='8px 0' flexDirection="row" alignItems="flex-start" justifyContent="space-between" display="flex" borderRadius="12px" backgroundColor="#202124"
                    MOBbackgroundColor='#17181d' height="64px" MOBheight='40px' width="100%">
                    <div>
                      <Text fontSize="18px" MOBfontSize='16px' color="#F1F3F4" cursor='default'>{nickname} 님의 글</Text>
                      <Count> {'('}{mypost_list.length}{')'} </Count>
                    </div>
                    <MoreButton onClick={() => { history.push('/mypage/mypost') }}
                    ><WordMOBNone>더보기 </WordMOBNone><span style={{ verticalAlign: 'middle' }}><AiOutlineRight /></span></MoreButton>
                  </Grid>
                  {/* 내가 쓴글이 있을 경우에만 보여줌 */}
                  {mypost_list.length !== 0 ?
                    <Grid display="flex" margin="12px 0" MOBmargin='4px 0 33px' height="211px" MOBheight='fit-content' width="100%">
                      {/* 내가 쓴 글 카드 */}
                      {mypost.map((p, idx) => {
                        return (
                          <Grid key={idx + 50} margin="0 16px 16px 0" OBmargin='0 4px' padding="15px 20px" MOBpadding='14px' height="fit-content" MOBheight='170px' width="32.3%" MOBwidth='49%' backgroundColor="#202124" borderRadius="12px"
                            _onClick={() => { history.push(`/common/detail/${p.postId}`) }} cursor='pointer' hover='opacity: 0.7'>
                            <Grid overflow="hidden" height="fit-content">
                              <Text p margin="0 0 12px" color="#F1F3F4" fontSize="18px"
                                overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                                MOBfontSize='14px'
                              >{p.title}
                              </Text>
                              <Text p color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="2" MOBwlc='3' wbo="vertical" margin="0 0 24px"
                                MOBmargin='0 0 16px' height="42px"
                                TABheight='36px'
                                MOBheight='44px'
                                TABfontSize="12px"
                                MOBfontSize='10px'
                              >{p.content}</Text>
                            </Grid>
                            <Grid display="flex" height="fit-content">
                              <ImgBox>
                                <ProfileImg src={Profile_small} alt='프로필' />
                              </ImgBox>
                              <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"
                                MOBfontSize='8px'><Text margin="0 4px 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="12px"
                                  MOBfontSize='10px'
                                ><BiTimeFive /></Text>{p.createdAt}</Text>
                            </Grid>
                            <CardLine />
                            <Grid padding="0 5px 0 0" justifyContent="space-between" display="flex" height="24px" width="100%">
                              <Text color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.category} </Text>
                            </Grid>

                          </Grid>
                        );
                      })}
                    </Grid>
                    :
                    <Grid margin="12px 0 0 0" height="203px" width="100%" MOBdisplay='none'>
                      <Grid display="flex" alignItems="center" height="203px" width="100%" border="5px dotted #2E3134" borderRadius="12px">
                        <Text fontSize="18px" color="#FFFFFF" TABfontSize="16px" cursor='default' margin='auto'>글을 작성해주세요 ㄟ(≧◇≦)ㄏ</Text>
                      </Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </ResponsiveOutter>
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
  @media screen and (max-width: 1090px) {
    grid-template-columns: 100%;
    display: grid;
  }
`;


const ProfileOutter = styled.div`
  height: auto;
  width: 24%;
  margin: 0 16px 0 0;
  @media screen and (max-width: 1090px) {
    width: 100%;
    height: auto;
    margin: 0 0 32px 0;
  }
  @media screen and (max-width: 767px) {
    margin: 0 0 16px 0;
  }
`;

const ProfileInner = styled.div`
  background-color: #202124;
  width: 302px;
  height: 325px;
  margin: auto;
  border: 1px solid #202124;
  border-radius: 12px;
  @media screen and (max-width: 1460px) { 
    width: 100%;
    height: 325px;
  }
  @media screen and (max-width: 1090px) {
    width: 100%;
    height: 136px;
    display: flex;
  }
  @media screen and (max-width: 767px) {
    background-color: #17181d;
    border: none;
    height: 110px;
  }
`;

const ProfileBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 70px auto 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 1090px) {
    width: 100px;
    height: 100px;
    margin: 24px 64px;
  }
  @media screen and (max-width: 767px) {
    width: 68px;
    height: 68px;
    margin: 24px 0;
  }
`;

const Profile = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Nickname = styled.p`
  color: #F8F9FA;
  text-align: center;
  margin: 30px 0 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
  @media screen and (max-width: 1090px) {
    text-align: start;
    margin: 24px 0 0 24px;
  }
  @media screen and (max-width: 767px) {
    font-size: 18px;
    margin: 24px 0 0 20px;
  }
`;

const Status = styled.p`
  color: ${(props) => props.purple ? '#7879f1' : '#5f6368'};
  text-align: center;
  margin: 0;
  font-size: 14px;
  cursor: ${(props) => props.purple ? 'pointer' : 'default'};
  ${(props) => props.purple ? ':hover {opacity: 0.8}' : ''};
  @media screen and (max-width: 1090px) {
    text-align: start;
    margin: 10px 24px;
  }
  @media screen and (max-width: 767px) {
    margin: ${(props) => props.purple ? '-10px 0 0 20px' : '4px 20px 16px'};
    font-size: 10px;
  }
`;

const Line = styled.hr`
  border: 1px solid #333;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ImgBox = styled.div`
  width: 24px;
  height: 24px;
  margin: 0px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 1090px) {
    width: 16px;
    height: 16px;
    margin: 0px 8px 0 0;
  }
  @media screen and (max-width: 767px) {
    width: 14px;
    height: 14px;
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
  max-width: 100%;
  max-height: 100%;
`;

const InfoBox = styled.div`
  width: 100%;
  vertical-align: middle;
`;

const CardLine = styled.hr`
  border: 1px solid #282A2D;
`;

const MoreButton = styled.button`
  color: #bdc1c6;
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: bold;
  width: 13%;
  cursor: pointer;
  @media screen and (max-width: 1090px) {
    width: fit-content;
    font-size: 14px;
  }
`;

const WordMOBNone = styled.span`
  @media screen and (max-width: 767px) {
    display: none;
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
  @media screen and (max-width: 1090px) {
    height: 76px;
  }
`;

const ResponsiveOutter = styled.div`
  height: auto;
  width: 100%;
  @media screen and (max-width: 1090px) {
    height: 100%;
  }
`;

const Count = styled.span`
  color: #5F6368;
  font-size: 18px;
  @media screen and (max-width: 767px) {
    font-size: 16px;
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
  @media screen and (max-width: 1090px) {
    width: 49.25%;
    height: 96px;
    margin-bottom: 12px;
    box-shadow: none;
  }
  @media screen and (max-width: 767px) {
    width: 33.3%;
    height: 76px;
    margin: 0 0 33px;
    box-shadow: none;
    padding: 0;
    background-color: #17181d;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const ImageBox = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: auto;
  @media screen and (max-width: 1090px) {
    width: 40%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Mypage;
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body } from '../components';
import { Profile_small } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { history } from '../redux/ConfigureStore';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import NotFound from '../shared/NotFound';

const MypagePost = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.user.user.nickname);
  const is_login = useSelector(state => state.user.is_login);

  // 부트캠프, 부트톡톡 북마크
  useEffect(() => {
    dispatch(mypageActions.setMyBookmarkDB(nickname));
  }, []);

  // 부트톡톡 북마크 리스트
  const all_mytalk = useSelector((state) => state.mypage.mytalk_list);
  // 삭제된 post의 경우 안띄워줌
  const mytalk_list = all_mytalk.filter((talk) => talk.post !== null);

  // 질문과 답변 리스트
  const all_qna = useSelector((state) => state.mypage.myqna_list);
  // 삭제된 post의 경우 안띄워줌
  const myqna_list = all_qna.filter((qnas) => qnas.question !== null);

  if (!is_login) {
    return <NotFound />
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header footer>
          <Grid height="fit-content">
            <Grid>
              <Text fontSize="32px" MOBfontSize='16px' fontWeight='700' lineHeight="46px" color="#F8F9FA" TABfontSize="20px" cursor='default'>내 북마크</Text>
            </Grid>
            <Card>
              {mytalk_list.map((p, idx) => {
                return (
                  <Post onClick={() => { history.push(`/common/detail/${p.postId}`) }}
                  >
                    <Grid overflow="hidden" height="fit-content">
                      <Text p margin="0 0 12px 0" color="#F1F3F4" fontSize="18px" overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px" MOBfontSize='14px'
                      >{p.post.title}
                      </Text>
                      <Text p color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="3" wbo="vertical" margin="0 0 24px" MOBmargin='0 0 16px' height="60px" TABheight='52px' MOBheight='48px' TABfontSize="12px" MOBfontSize='10px'
                      >{p.post.content}</Text>
                    </Grid>
                    <Grid display="flex">
                      <ImgBox>
                        <ProfileImg src={p.post.user.profilePic ? `https://fw3efsadfcv.shop${p.post.user.profilePic}` :Profile_small} alt='프로필' />
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 8px 0 0" color="#BDC1C6" fontSize="12px" TABfontSize="10px">{p.post.nickname}</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"><BiTimeFive />{p.post.createdAt}</Text>
                      </InfoBox>
                    </Grid>
                    <Line />
                    <Grid>
                      <Text margin="12px 0 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.post.category} </Text>
                    </Grid>
                  </Post>
                );
              })}
            </Card>
          </Grid>
          <Grid height="24px" width="100%" is_center>
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page>1</Page></Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text> */}
            </PageBox>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const Card = styled.div`
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  display: grid;
  width: 100%;
  margin-top: 33px;
  @media screen and (max-width: 1090px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 16px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const Post = styled.div`
  padding: 15px 20px;
  height: 211px;
  width: 100%;
  background-color: #202124;
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  word-break: break-all;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1090px) {
    margin: 0;
  }
  @media screen and (max-width: 767px) {
    height: 188px;
    padding: 14px 14px 10px;
  }
`;

const ImgBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin: 0px 15px 0 0;
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

const ProfileImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
`;

const Line = styled.hr`
  border: 1px solid #282a2d;
`;

const PageBox = styled.div`
font-size: 14px;
display: inline-block;
height: 100%;
margin: 32px 0;
`;

const Page = styled.span`
opacity: 0.5;
cursor: pointer;
color: #F8F9FA;
&:hover {
    opacity: 1;
  }
`;

export default MypagePost;
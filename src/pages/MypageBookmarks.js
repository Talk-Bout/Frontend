import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
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
              {mytalk_list && mytalk_list.map((p, idx) => {
                return (
                  <PostCard key={p.postId} title={p.post.title} content={p.post.content} nickname={p.post.nickname} createdAt={p.post.createdAt} profilePic={p.post.user.profilePic} category_bool='true' board_name='부트톡톡' category_name={p.post.category}/>
                );
              })}
              {myqna_list && myqna_list.map((p, idx) => {
                return (
                  <PostCard key={p.questionId} title={p.question.title} content={p.question.content} nickname={p.question.nickname} createdAt={p.question.createdAt} profilePic={p.question.user.profilePic} category_bool='true' board_name='질문과 답변'/>
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
  @media screen and (max-width: 1150px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 16px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
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
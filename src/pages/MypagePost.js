import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { history } from '../redux/ConfigureStore';
import NotFound from '../shared/NotFound';

const MypagePost = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);
  const is_login = useSelector((state) => state.user.is_login);

  // 내가 쓴글 리스트
  const mypost_all = useSelector((state) => state.mypage.mypost_list);
  const mypost_answers = mypost_all.answers;
  const mypost_posts = mypost_all.posts;
  const mypost_questions = mypost_all.questions;
  const mypost_reviews = mypost_all.reviews;
  let mypost_list = [];
  mypost_answers && mypost_list.push(...mypost_answers);
  mypost_posts && mypost_list.push(...mypost_posts);
  mypost_questions && mypost_list.push(...mypost_questions);
  mypost_reviews && mypost_list.push(...mypost_reviews);

  // 부트캠프, 부트톡톡 북마크
  useEffect(() => {
    dispatch(mypageActions.setMypostDB(nickname));
  }, []);

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
              <Text fontSize="32px" MOBfontSize='16px' lineHeight="46px" fontWeight='700' color="#F8F9FA" TABfontSize="20px" cursor='default'>{nickname} 님의 글<Text color="#5F6368" margin='0 8px 0'> ({mypost_list ? mypost_list.length : 0})</Text></Text>
            </Grid>
            <Cards>
              {mypost_list.map((p, idx) => {
                if (p.hasOwnProperty('answerId')) {
                  return (
                    <PostCard key={idx} width_point='1460px' answer_bool='true' title='질문에 대한 답변' content={p.content} createdAt={p.createdAt} nickname={p.nickname} profilePic={null} category_bool='true' board_name='질문과 답변' mypost_bool='true' TABheight='206px' _onClick={() => { history.push(`/question/${p.questionId}`) }}/>
                  );
                } else if (p.hasOwnProperty('postId')) {
                  return (
                    <PostCard key={idx} width_point='1460px' title={p.title} content={p.content} createdAt={p.createdAt} nickname={p.nickname} profilePic={null} category_bool='true' board_name='부트톡톡' category_name={p.category} mypost_bool='true' TABheight='206px' _onClick={() => { history.push(`/common/detail/${p.postId}`) }}/>
                  );
                } else if (p.hasOwnProperty('reviewId')) {
                  return (
                    <PostCard key={idx} width_point='1460px' title={p.title} content={`장점: ${p.cons} // 단점: ${p.pros}`} createdAt={p.createdAt} nickname={p.nickname} profilePic={null} category_bool='true' board_name='부트캠프' category_name={p.bootcampName} mypost_bool='true' TABheight='206px' _onClick={() => { history.push(`/boot/${p.bootcampName}`) }}/>
                  );
                } else if (p.hasOwnProperty('questionId')) {
                  return (
                    <PostCard key={idx} width_point='1460px' question_bool='true' title={p.title} content={p.content} createdAt={p.createdAt} nickname={p.nickname} profilePic={null} category_bool='true' board_name='질문과 답변' mypost_bool='true' TABheight='206px' _onClick={() => { history.push(`/question/${p.questionId}`) }}/>
                  );
                }
              })}
            </Cards>
            <Grid height="10%" width="100%" is_center>
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const Cards = styled.div`
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
  @media screen and (max-width: 1150px) {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    }
  @media screen and (max-width: 767px) {
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(2, 1fr);
  }
`;

const Line = styled.hr`
  border: 1px solid #282A2D;
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
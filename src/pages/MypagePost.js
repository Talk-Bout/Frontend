import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import NotFound from '../shared/NotFound';

const MypagePost = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);
  const is_login = useSelector((state) => state.user.is_login);

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);

  // 삭제된 post의 경우 안띄워줌
  const mypost_list = all_post.filter((posts) => posts.post !== null);

  // 부트캠프, 부트톡톡 북마크
  useEffect(() => {
    dispatch(mypageActions.setMypostDB(nickname));
  }, []);

  if (!is_login) {
    return <NotFound />
  }

  console.log(mypost_list);

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
                return (
                  <PostCard key={p.postId} title={p.title} content={p.content} createdAt={p.createdAt} category_bool='true' board_name='부트톡톡' category_name={p.category} mypost_bool='true'/>
                );
              })}
            </Cards>
            <Grid height="10%" width="100%" is_center>
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
import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body } from '../components';
import { Profile_small } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { BiTimeFive, BiBadgeCheck } from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { getCookie } from '../shared/cookie';

const MypagePost = (props) => {
  const dispatch = useDispatch();
  // const nickname = useSelector((state) => state.user.user.nickname);
  const nickname = getCookie('nickname');

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);
  // console.log(all_post);
  // 삭제된 post의 경우 안띄워줌
  const mypost_list = all_post.filter((posts) => posts.post !== null);

  // 부트캠프, 부트톡톡 북마크
  React.useEffect(() => {
    dispatch(mypageActions.setMypostDB(nickname));
  }, []);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header footer>
          <Grid height="fit-content">
            <Grid>
              <Text fontSize="32px" lineHeight="46px" fontWeight='700' color="#F8F9FA" TABfontSize="20px" cursor='default'>{nickname} 님의 글</Text>
              <Text fontSize="32px" lineHeight="46px" fontWeight='700' color="#5F6368" TABfontSize="20px" cursor='default' margin='0 8px 0'> ({mypost_list ? mypost_list.length : 0})</Text>
            </Grid>
            <Cards>
              {mypost_list.map((p, idx) => {
                return (
                  <Grid key={idx} TABheight='201px' width="95%" backgroundColor="#202124" borderRadius="12px" cursor='pointer' hover='opacity: 0.7'
                  // _onClick={()=>{history.push(`/common/detail/${p.postId}`)}}
                  >
                    <Grid padding='24px 24px 16px' TABpadding='16px 16px 13px' borderBottom='1px solid #5F6368'>
                      <Text p margin="0 0 13px 0" color="#F1F3F4" fontSize="18px" overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                      >{p.title}
                      </Text>
                      <Text p color="#F1F3F4" fontSize="14px" letterSpacing='0.2px' lineHeight='22px' overflow="hidden" display="-webkit-box" wlc="2" TABwlc='4' wbo="vertical"
                        margin="13px 0 16px" TABmargin='11px 0 21px' height='44px' TABheight='64px' TABfontSize="12px"
                      >{p.content}</Text>
                      <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px" padding='0 0 3px'><span style={{ marginRight: '4px' }}><BiTimeFive /></span>{p.createdAt}</Text>
                    </Grid>
                    <Grid padding='12px 24px' TABpadding='11px 16px'>
                      <Text p margin='0' color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight /> {p.category} </Text>
                    </Grid>
                  </Grid>
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    }
`;

const Line = styled.hr`
  border: 1px solid #282A2D;;
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
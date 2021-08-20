import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body } from '../components';
import { Profile_small } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as mypageActions} from '../redux/modules/mypage';
import { BiTimeFive, BiBadgeCheck} from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";

const MypagePost = (props) => {
  const dispatch = useDispatch();
  // const nickname = useSelector((state) => state.user.user.nickname);
  const nickname = sessionStorage.getItem('nickname');

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);
  // console.log(all_post);
  // 삭제된 post의 경우 안띄워줌
  const mypost_list = all_post.filter((posts) => posts.post !== null);

   // 부트캠프, 부트톡톡 북마크
  React.useEffect(()  => {
    dispatch(mypageActions.setMypostDB(nickname));
  }, []);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid height="fit-content">
            <Grid height="9%" width="100%">
              
              <Text fontSize="32px" lineHeight="46px" color="#F8F9FA" TABfontSize="20px">{nickname}님의 글</Text>
            </Grid>
            <Card display="flex" height="81%" width="100%">
            {mypost_list.map((p, idx) => {
              return (
                <Grid key={idx} margin="0 16px 16px 0" padding="15px 20px" height="211px" width="95%" backgroundColor="#202124" borderRadius="12px"
            // _onClick={()=>{history.push(`/common/detail/${p.postId}`)}}
                  >
                    <Grid overflow="hidden" height="100px" width="100%" >
                      <Text p margin="0 0 13px 0" color="#F1F3F4" fontSize="18px" height="26px"
                      overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px"
                      >{p.title}
                      </Text>
                      <Text p  color="#F1F3F4" fontSize="14px" overflow="hidden" display="-webkit-box" wlc="3" wbo="vertical"
                      margin="0 0 24px 0" height="44px" TABfontSize="12px"
                      >{p.content}</Text>
                    </Grid>
                    <Grid display="flex" height="45px" width="100%" borderBottom="1px solid #5F6368">
                      <ImgBox>
                      <ProfileImg src={Profile_small} alt='프로필'/>
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 8px 0 0" color="#BDC1C6" fontSize="12px" TABfontSize="10px">{p.nickname}</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="12px" TABfontSize="10px"><BiTimeFive/>{p.createdAt}</Text>
                      </InfoBox>
                    </Grid>
                    <Grid padding="3px 5px 0 0" justifyContent="space-between" display="flex" height="24px" width="100%">
                      <Text p margin="12px 0 0 0" color="#BDC1C6" fontSize="14px" TABfontSize="10px"> 부트톡톡 <AiOutlineRight/> {p.category} </Text>
                    </Grid>
                    
                  </Grid>
                  );
                })}
            </Card>
            <Grid height="10%" width="100%"  is_center>
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

const Card = styled.div`
grid-template-rows: repeat(3, minmax(auto, auto));
grid-template-columns: repeat(4, 1fr);
display: grid;
width: 100%;
@media screen and (min-width: 768px) and (max-width: 992px) {
  width: 100%;
  grid-template-rows: repeat(1, minmax(auto, auto));
  grid-template-columns: repeat(3, 1fr);
  }

`;

const ImgBox = styled.div`
margin: 0px 15px 0 0;
@media screen and (min-width: 768px) and (max-width: 992px) {
  margin: 0px 8px 0 0;
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 16px;
  }
`;

const InfoBox = styled.div`
display: flex;
width: 100%;
padding: 2% 0;
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
import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text} from '../elements';
import Profile from '../image/profile_small.png';
import { BiTimeFive, BiBadgeCheck} from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";

import {actionCreators as mypageActions} from '../redux/modules/mypage';
import { useDispatch, useSelector } from 'react-redux';

const MypagePost = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);

  // 내가 쓴글 리스트
  const all_post = useSelector((state) => state.mypage.mypost_list);
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
        <Body header footer>
          <Grid height="85vh">
            <Grid height="9%" width="100%">
              <Text fontSize="32px" lineHeight="46px" color="#F8F9FA"> 님의 글</Text>
            </Grid>
            <Card display="flex" height="81%" width="100%" backgroundColor="green">
            {mypost_list.map((p, idx) => {
              return (
            <Grid margin="0 16px 16px 0" padding="0 1.5%" height="235px" width="96%" backgroundColor="#202124" borderRadius="12px"
                  // _onClick={()=>{history.push(`/common/detail/${p.postId}`)}}
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
                      <Text p margin="0" color="#BDC1C6" fontSize="14px">부트톡톡 <AiOutlineRight/>{p.category} </Text>
                    </Grid>
                    
                  </Grid>
                  );
                })}
            </Card>
            {/* <Grid height="10%" width="100%"  is_center>
            <PageBox>
              앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              앞 페이지 번호는 0일 때는 안 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page>1</Page></Text>
              가운데 페이지 번호는 현재 페이지 번호로 띄우기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
              다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기
              <Text lineHeight='14px' margin='0 20px 0'><Page></Page></Text>
            </PageBox>
             </Grid> */}
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

`;

const ImgBox = styled.div`
margin: 2% 3% 0 0;
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
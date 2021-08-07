import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Profile from '../image/profile_small.png';
import Badge from '../image/badge 1.png';
import { Text, Button, Grid, Input, Image } from '../elements/index';
import { BiTimeFive, BiBadgeCheck} from 'react-icons/bi';
import { AiOutlineRight } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";

const templateN = (props) => {
  
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid display="flex" backgroundColor="#17181b" height="93vh">
          {/* 왼쪽 프로필 */}
          <Grid height="100%" width="25%">
            <Grid backgroundColor="#202124" height="48vh" width="90%" margin="auto"
            border="1px solid #202124" borderRadius="5px" >
              {/* 인증 안됐을 때 */}
              {/* <ProfileBox>
                <Image margin="15% auto" shape='BigProfileImage' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' size='7.5'></Image>
              </ProfileBox> */}
               {/* 인증 됐을 때 */}
              <ProfileBox>
                <Image margin="15% auto" shape='BigProfileImage' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' size='7.5'></Image>
              </ProfileBox>

              <Grid height="30%">
                <Text p color="#F8F9FA" text_align="center" margin="0" fontSize="4.2vh" fontWeight="bold">
                  스파르타 <Text fontSize="5vh" color="#7879F1"><img src={Badge} alt='배지'/></Text>
                </Text>
                <Text p color="#5F6368" text_align="center" margin="0" fontSize="2.2vh">sparta@coding.kr</Text>
              </Grid>
              {/* 인증 안됐을 때 */}
              <Grid height="30%" margin="auto">
                <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                  margin="0 7% 0 0" font_size="1.8vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                  <Button font_size="1.8vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">부트캠프 인증하기</Button>
                </TextBox>
              </Grid>
              {/* 인증 됐을 때 */}
              {/* <Grid height="30%" margin="auto">
                <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                   font_size="1.8vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                </TextBox>
              </Grid> */}
            </Grid>
          </Grid>
          {/* 북마크된 부트캠프, 글들 */}
          <Grid height="100%" width="73%" >
            <Grid height="100%" width="100%" >
              <Grid height="24%" width="100%" >
                <Grid justify_content="space-between" display="flex" borderRadius="5px" backgroundColor="#202124" height="35%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.4vh" color="#F1F3F4">관심있는 부트캠프</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 게시글이 없을 경우 */}
                {/* <Grid display="flex" margin="1% 0" justify_content="space-between" height="65%" width="100%">
                  <Grid height="80%" width="100%" border="4px dotted #2E3134" borderRadius="5px">
                    <Grid margin="auto" height="100%" width="100%" padding="2.5% 32%">
                    <Text fontSize="2.6vh" color="#FFFFFF">부트캠프를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                    </Grid>
                  </Grid>
                </Grid> */}
                {/* 게시글이 있을 경우 */}
                <Grid display="flex" margin="1% 0" justify_content="space-between" height="65%" width="100%">
                {[1, 2, 3].map((n, idx) => {
              return (
                  <Grid display="flex" padding="0 1.5%" height="80%" width="32%" backgroundColor="#202124"  borderRadius="5px">
                    <ImageBox>
                     <Image shape="CircleLogo"/>
                    </ImageBox>
                    <Grid padding="6% 0" height="100%" width="67%">
                      <Grid padding="0 8.5% 0 0" display="flex" justify_content="space-between">
                      <Text p margin="0" color="#F1F3F4" fontSize="2.2vh">부트캠프명</Text>
                      <Text cursor="pointer" color="#7879F1" fontSize="2.5vh"><BsHeartFill/></Text>
                      </Grid>
                      
                      <Text p margin="0" color="#F1F3F4" fontSize="2.2vh">★★☆☆☆ 2.2</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
              </Grid>
              <Grid height="37%" width="100%" >
                <Grid justify_content="space-between" display="flex" borderRadius="5px" backgroundColor="#202124" height="25%" width="100%" padding="1.6% 1.5% 0 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.4vh" color="#F1F3F4">내 북마크</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button padding="0 0 1% 0" color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 게시글이 없을 경우 */}
                {/* <Grid display="flex" margin="1% 0" justify_content="space-between" height="80%" width="100%">
                  <Grid height="80%" width="100%" border="5px dotted #2E3134" borderRadius="5px">
                    <Grid margin="auto" height="100%" width="100%" padding="7% 34%">
                    <Text fontSize="2.6vh" color="#FFFFFF">북마크를 추가해주세요 ㄟ(≧◇≦)ㄏ</Text>
                    </Grid>
                  </Grid>
                </Grid> */}
                {/* 게시글이 있을 경우 */}
                <Grid display="flex" margin="1% 0" justify_content="space-between" height="80%" width="100%">
                {[1, 2, 3].map((n, idx) => {
              return (
                  <Grid padding="0 1.5%" height="85%" width="32%" backgroundColor="#202124" borderRadius="5px">
                    <Grid overflow="hidden" padding="2% 7% 0 0" height="55%" width="100%" >
                      <Text p margin="2% 0" color="#F1F3F4" fontSize="2.3vh">부트톡톡</Text>
                      <Text p margin="2% 0 0 0" color="#F1F3F4" fontSize="1.8vh">온라인 부트캠프라서 공간적 제약이 없고 소득공유 결제 모델이 있어서 당장 지금..</Text>
                    </Grid>
                    <Grid display="flex" height="19%" width="100%" >
                      <ImgBox>
                      <img src={Profile} alt='프로필'/>
                      </ImgBox>
                      <InfoBox>
                        <Text p margin="0 3% 0 0" color="#BDC1C6" fontSize="1.5vh">username</Text>
                        <Text p margin="0" color="#BDC1C6" fontSize="1.5vh"><BiTimeFive/> 2021.07.25</Text>
                      </InfoBox>
                    </Grid>
                    <hr/>
                    <Grid padding="0.5% 5% 0 0" justify_content="space-between" display="flex" height="25%" width="100%">
                      <Text p margin="0" color="#BDC1C6" fontSize="2vh">부트톡톡 <AiOutlineRight/> 정보게시판</Text>
                      <Text cursor="pointer" color="#7879F1" fontSize="2.5vh"><BsBookmarkFill/></Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
              </Grid>
              <Grid height="37%" width="100%">
                <Grid justify_content="space-between" display="flex" borderRadius="5px" backgroundColor="#202124" height="25%" width="100%" padding="1.6% 1.5% 0 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.4vh" color="#F1F3F4">내가 쓴 글</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button padding="0 0 1% 0" color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                {/* 게시글이 없을 경우 */}
                <Grid display="flex" margin="1% 0" justify_content="space-between" height="80%" width="100%">
                  <Grid height="80%" width="100%" border="5px dotted #2E3134" borderRadius="5px">
                    <Grid margin="auto" height="100%" width="100%" padding="7% 36%">
                    <Text fontSize="2.6vh" color="#FFFFFF">글을 작성해주세요 ㄟ(≧◇≦)ㄏ</Text>
                    </Grid>
                  </Grid>
                </Grid>
                {/* 게시글이 있을 경우 */}
                {/* <Grid display="flex" margin="1% 0" justify_content="space-between" height="80%" width="100%">
                {[1, 2, 3].map((n, idx) => {
              return (
                  <Grid padding="0 1.5%" height="85%" width="32%" backgroundColor="#202124"  borderRadius="5px">
                    <Grid overflow="hidden" padding="2% 7% 0 0" height="55%" width="100%" >
                      <Text p margin="2% 0" color="#F1F3F4" fontSize="2.3vh">부트톡톡</Text>
                      <Text p margin="2% 0 0 0" color="#F1F3F4" fontSize="1.8vh">온라인 부트캠프라서 공간적 제약이 없고 소득공유 결제 모델이 있어서 당장 지금..</Text>
                    </Grid>
                    <Grid padding="1.5% 0" display="flex" height="17%" width="100%" >
                        <Text p margin="0" color="#BDC1C6" fontSize="1.6vh"><BiTimeFive/> 2021.07.25</Text>
                    </Grid>
                    <hr/>
                    <Grid padding="1.5% 5% 0 0" justify_content="space-between" display="flex" height="25%" width="100%">
                      <Text p margin="0" color="#BDC1C6" fontSize="2vh">부트톡톡 <AiOutlineRight/> 정보게시판</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid> */}
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
height: 35%;
`;

const AuthImageBox = styled.span`
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
font-size: 2.6vh;
`;

const ImageBox = styled.div`
width: 30%;
justify-content: middle;
margin: auto;
`;

export default templateN;
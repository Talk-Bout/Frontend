import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { Text, Button, Grid, Input, Image } from '../elements/index';
import { AiOutlineRight } from "react-icons/ai";
const templateN = (props) => {
  
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid display="flex" backgroundColor="#17181b" height="93vh">
          <Grid height="100%" width="25%">
            <Grid backgroundColor="#202124" height="50%" width="90%" margin="auto"
            border="1px solid #202124" borderRadius="3vh">
              <ProfileBox>
                <Image margin="15% auto" shape='BigProfileImage' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' size='7.5'></Image>
              </ProfileBox>
              <Grid height="30%">
                <Text p color="#F8F9FA" text_align="center" margin="0" fontSize="4.5vh" fontWeight="bold">스파르타</Text>
                <Text p color="#5F6368" text_align="center" margin="0" fontSize="2.2vh">sparta@coding.kr</Text>
              </Grid>
              <Grid height="30%" margin="auto">
                <TextBox>
                  <Button _onClick={() => history.push('/mypage/edit')}
                  margin="0 7% 0 0" font_size="1.8vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">정보 수정</Button>
                  <Button font_size="1.8vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center">부트캠프 인증하기</Button>
                </TextBox>
              
              </Grid>
            </Grid>
          </Grid>
          <Grid height="100%" width="73%">
            <Grid height="100%" width="100%">
              <Grid height="30%" width="100%">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.6vh" color="#F1F3F4">관심있는 부트캠프</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
                </Grid>
                <Grid display="flex" backgroundColor="#202124" margin="1% 0" justify_content="space-between" height="70%" width="100%">
                {[1, 2, 3].map((n, idx) => {
              return (
                  <Grid display="flex" padding="0 1.5%" height="80%" width="32%">
                    <ImageBox>
                     <Image shape="CircleLogo"/>
                    </ImageBox>
                    <Grid padding="12% 0" height="100%" width="67%">
                      <Text p margin="0" color="#5F6368" fontSize="2.7vh">부트캠프명</Text>
                      <Text p margin="0" color="#5F6368" fontSize="2.7vh">★★☆☆☆ 2.2</Text>
                    </Grid>
                  </Grid>
               );
              })}
                </Grid>
              </Grid>
              <Grid height="34%" width="100%" margin="2% 0">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.6vh" color="#F1F3F4">내 북마크</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>
                </Grid>
                <Grid display="flex" backgroundColor="#202124" margin="1% 0" justify_content="space-between" height="70%" width="100%">

                </Grid>
              </Grid>
              <Grid height="34%" width="100%">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="2.6vh" color="#F1F3F4">내가 쓴 글</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>
                </Grid>
                <Grid display="flex" backgroundColor="#202124" margin="1% 0" justify_content="space-between" height="70%" width="100%">

                </Grid>
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

const TextBox = styled.div`
text-align: center;
display: flex;
padding: 6% 0;
margin: auto;
justify-content: center;
`;

const BookMarkBox = styled.div`
margin: 0.3% 0 0 0;
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
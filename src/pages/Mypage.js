import React from 'react';
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
          <Grid height="100%" width="30%">
            <Grid backgroundColor="#202124" height="55%" width="90%" margin="auto"
            border="1px solid #202124" borderRadius="3vh">
              <Grid backgroundColor="skyblue" height="45%">
                <Image size="5"></Image>
              </Grid>
              <Grid height="30%">
                <Text p color="#F8F9FA" text_align="center" margin="0" fontSize="5.5vh" fontWeight="bold">스파르타</Text>
                <Text p color="#5F6368" text_align="center" margin="0" fontSize="2.7vh">sparta@coding.kr</Text>
              </Grid>
              <Grid height="25%" margin="auto">
                <TextBox>
                  <Button margin="0 7% 0 0" font_size="2.2vh" fontWeight="bold" width="30%" border="none" bg="transparent" color="#7879F1" text_align="center" fontSize="2.5vh">정보 수정</Button>
                  <Button font_size="2.2vh" fontWeight="bold" width="40%" border="none" bg="transparent" color="#7879F1" text_align="center" fontSize="2.5vh">부트캠프 인증하기</Button>
                </TextBox>
              
              </Grid>
            </Grid>
          </Grid>
          <Grid height="100%" width="70%">
            <Grid height="100%" width="100%">
              <Grid height="30%" width="100%">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="3vh" color="#F1F3F4">관심있는 부트캠프</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2.2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>   
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
              <Grid backgroundColor="pink" height="34%" width="100%" margin="2% 0">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="3vh" color="#F1F3F4">내 북마크</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2.2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>
                </Grid>
                <Grid display="flex" backgroundColor="#202124" margin="1% 0" justify_content="space-between" height="70%" width="100%">

                </Grid>
              </Grid>
              <Grid backgroundColor="purple" height="34%" width="100%">
                <Grid justify_content="space-between" display="flex" borderRadius="2vh" backgroundColor="#202124" height="30%" width="100%" padding="1.6% 1.5%">
                  <BookMarkBox>
                   <Text fontSize="3vh" color="#F1F3F4">내가 쓴 글</Text>
                    <Count> (5) </Count>
                  </BookMarkBox>
                  <Button color="#5F6368" bg="transparent" border="none" font_size="2.2vh" fontWeight="bold" width="10%">더보기 <AiOutlineRight/></Button>
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

const TextBox = styled.div`
text-align: center;
display: flex;
padding: 6% 0;
margin: auto;
justify-content: center;
`;

const BookMarkBox = styled.div`
`;

const Count = styled.span`
color: #5F6368;
font-size: 3vh;
`;

const ImageBox = styled.div`
width: 30%;
justify-content: middle;
margin: auto;
`;

export default templateN;
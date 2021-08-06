import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text, Image, Button} from '../elements';

const PageEdit = (props) => {
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid height="100vh" padding="3vh">
          <Grid width="30vw" height="95vh" margin="auto" padding="3vh 3vw"  backgroundColor="#202124">
          <Grid height='100%'>
          <Grid height='10%' display="flex" width="100%" justify_content="space-between">
            <TextBox><Text width="50%" color="#F8F9FA" lineHeight='6vh' fontSize='2.7vh' fontWeight='700'>회원정보 수정</Text></TextBox>
            <TextBox>
              <Button _onClick={() => history.push('/mypage/deleteuser')}
              bg="transparent" border="none" width="4.5vw" color="#80868B" lineHeight='6vh' fontSize='1.5vh' fontWeight='700'>회원탈퇴
              </Button></TextBox>
          </Grid>
          <Grid height='13%'>
            <form>
              <TextBox><label><Text color="#80868B" fontSize='1.7vh' fontWeight='700'>이메일</Text></label></TextBox>
              <InputBox>
                <Input readonly/>
                <Text fontSize='2.5vh' color="#80868B" margin='0 5px'>@</Text>
                <Input readonly/>
              </InputBox>
            </form>
          </Grid>
          <Grid height='13%' >
            <form>
              <TextBox><label><Text color="#80868B" fontSize='1.7vh' fontWeight='700'>비밀번호</Text></label></TextBox>
              <TextBox><Text color="#80868B" fontSize='1.5vh'>8자 이상 입력해주세요</Text></TextBox>
              <InputBox><Input style={{width: '98%'}} type='password'/></InputBox>
            </form>
          </Grid>
          <Grid height='14%' margin="1.5% 0">
          <form>
              <TextBox><label><Text color="#80868B" fontSize='1.7vh' fontWeight='700'>비밀번호 확인</Text></label></TextBox>
              <InputBox><Input style={{width: '98%'}} type='password'/></InputBox>
            </form>
            {/* <Text fontSize='1.2vh' color='red'>비밀번호가 일치하지 않습니다.</Text> */}
            {/* <RightText >비밀번호가 일치합니다.</RightText> */}
          </Grid>
          <Grid height='14%'>
          <form>
              <TextBox><label><Text color="#80868B" fontSize='1.7vh' fontWeight='700'>닉네임</Text></label></TextBox>
              <InputBox><Input style={{width: '98%'}} /></InputBox>
            </form>
            {/* <Text fontSize='1.2vh' color='red'>이미 사용중인 닉네임입니다.</Text> */}
            {/* <RightText>사용가능한 닉네임입니다.</RightText> */}
          </Grid>
          <Grid height='26%' margin="4% 0 0 0">
            <TextBox><Text color="#80868B" fontSize='1.7vh' fontWeight='700'>프로필 이미지</Text></TextBox>
            <ImageBox>
              <Image shape='BigProfileImage' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' size='7.5'></Image>
            </ImageBox>
          </Grid>
          <Grid height='10%'>
            <Button height="90%" border="none" border_radius="1.5vh" bg="#7879F1" color="#F8F9FA" font_size="1.8vh">수정 완료</Button>
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
  text-align: left;
`;

const InputBox = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 44.5%;
  height: 5vh;
  border: 1px solid #80868B;
  outline: none;
  border-radius: 1vh;
  background-color: transparent;
`;

const RightText = styled.div`
font-size: 1.2vh;
color: #B2F37F;
`;

const ImageBox = styled.div`
  margin-top: 5px;
`;

export default PageEdit;
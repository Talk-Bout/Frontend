import React from 'react';
import styled from "styled-components";

import {Text, Button, Grid, Input, Image} from "../elements/index";
import Header from "../components/Header";

const Mypage = (props) => {

    return (
      <React.Fragment>
      <Header/>
      <Grid backgroundColor="#E5E5E5" height="93vh">
        <Grid height="100%" width="55%" margin="auto" display="flex" padding="5vh 0">
          <Grid height="100%" width="25%" >
            <Grid height="40%" >
              <ProfileInnerBox>

                <ProfileImage>
                  <Image margin="auto" size="60"/>
                </ProfileImage>
                <ProfileName>
                 <Text p margin="0 0 3% 0" fontWeight="bold">스파르타</Text>
                 <Text p margin="1% 0 0 0" fontSize="1vh" color="#696969" > 닉네임 | sparta@gmail.com</Text>
                </ProfileName>
                <ProfileEditButton>
                  <Button margin="5% 0 0 0" color="#C4C4C4" height="50%" width="50%" font_size="1vh" bg="#FFFFFF" border="none" cursor="pointer">정보 수정</Button>
                </ProfileEditButton>
                
              </ProfileInnerBox>
            </Grid>
            <Grid height="60%"></Grid>
          </Grid>
          <Grid height="100%" width="74%" margin="0 0 0 1%">
            <Grid height="30%" margin="0 0 2% 0">
              <DetailHeader>
                <Text p lineHeight="7vh" margin="0" padding="0% 5%" > 내 북마크 <span> (5) </span> </Text>
              </DetailHeader>
              <Grid height="70%" display="flex" justify_content="space-evenly">
                <DetailCard>
                  <CardTitle>
                    <Text p margin="0" fontSize="0.3vh" fontWeight="bold">리뷰제목</Text>
                    <Text p fontSize="0.3vh" color="#E5E5E5">2021.07.25</Text>
                    <Text p margin="0" fontSize="0.3vh" fontWeight="bold">장점</Text>
                  </CardTitle>
                  <CardContent>
                    <Text p margin="0" fontSize="1vh">
                    온라인 부트캠프라서 공간적 제약이 없고 소득공유 결제 모델이 있어서 당장 자금...
                    </Text>
                    <Text p fontSize="0.5vh" color="#E5E5E5">자유게시판</Text>
                  </CardContent>
                </DetailCard>
                <DetailCard>
                </DetailCard>
                <DetailCard></DetailCard>
              </Grid>
            </Grid>
            <Grid height="30%" margin="0 0 2% 0">
              <DetailHeader>
                <Text p lineHeight="7vh" margin="0" padding="0% 5%" > 내 북마크 <span> (0) </span> </Text>
              </DetailHeader>
              <Grid backgroundColor="green" height="70%">
                <NoresultCard>
                  <Text display="block" text_align="center" vertical_align="middle" > 작성된 글이 없어요 :( </Text>
                </NoresultCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
    )
};

const ProfileInnerBox = styled.div`
height: 100%;
width: 100%;

`;

const ProfileImage = styled.div`
background-color: #FFFFFF;
height: 35%;
padding-top: 10%;
`;

const ProfileName = styled.div`
text-align: center;
background-color: #FFFFFF;
height: 35%;
`;

const ProfileEditButton = styled.div`
background-color: #FFFFFF;
height: 20%;
text-align: center;
`;

const DetailHeader = styled.div`
background-color: #FFFFFF;
height: 28%;
margin: 0 0 1% 0;
`;

const DetailCard = styled.div`
background-color: #FFFFFF;
width: 30%;
height: 100%;
overflow: hidden;
`;

const CardTitle = styled.div`
background-color: #FFFFFF;
height: 45%;
margin: auto;
padding: 3% 3% 0% 3%;
`;

const CardContent = styled.div`
background-color: #FFFFFF;
height: 55%;
margin: auto;
padding: 0% 3% 3% 3%;
`;

const NoresultCard = styled.div`
background-color: #FFFFFF;
height: 100%;
`;


export default Mypage;
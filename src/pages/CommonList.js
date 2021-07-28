import React from 'react';
import styled from "styled-components";
import {Text, Button, Grid} from "../elements/index";
import { BiTimeFive } from 'react-icons/bi'; 
import { BiLike } from 'react-icons/bi'; 
import { BiComment } from 'react-icons/bi';
import { history } from '../redux/ConfigureStore';

import Header from '../components/Header';

const CommonBoardList = (props) => {

  
  return (
    <React.Fragment>
      <Grid padding="10%">
      <Grid>
          <Text p margin="0px 0px 10px 0px">자유게시판</Text>
      </Grid>
      <Grid styles={{display:"flex"}}>
          <Categories>
              <Button cursor= "pointer" bg= "#FAFAFA" border_radius="30px" width="20vw" margin="0px 5px">항해99</Button>
              <Button cursor= "pointer" bg= "#FAFAFA" border_radius="30px" width="20vw" margin="0px 5px">항해99</Button>
              <Button cursor= "pointer" bg= "#FAFAFA" border_radius="30px" width="20vw" margin="0px 5px">항해99</Button>
              <Button cursor= "pointer" bg= "#FAFAFA" border_radius="30px" width="20vw" margin="0px 5px">항해99</Button>
              <Button cursor= "pointer" bg= "#FAFAFA" border_radius="30px" width="20vw" margin="0px 5px">항해99</Button>
          </Categories>
      </Grid>
      <Grid>
          <WriteBox>
          <button style={{float: "right", cursor: 'pointer'}} onClick={() => history.push('/common/write')}>글쓰기</button>
          </WriteBox>
      </Grid>
      <Hr/>
      <Contents flex_wrap="wrap">
      {[1, 2, 3, 4, 5, 6].map((n, idx) => {
            return (
        <Content>
        <Text p margin="0px" padding="2%" fontWeight="bold">개발자는 커뮤니케이션 능력이 중요한 것 같아요...</Text>
        <Text p margin="0px" padding="2%" fontSize="14px">뭐랄까...</Text>
        <Text p margin="0px" padding="2%" fontSize="11px">글쓴이</Text>
        <Grid is_flex width="100%">
        <Text padding="2%" width="33.3%" fontSize="11px"><BiTimeFive/> 2021.07.27</Text>
        <Text padding="2%" width="33.3%" fontSize="11px"><BiLike/> 10</Text>
        <Text padding="2%" width="33.3%" fontSize="11px"><BiComment/> 2</Text>
        </Grid>
        </Content>
        );
          })}
      </Contents>
      </Grid>
    </React.Fragment>
  )
};

const Categories = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
width: 100%;
height: 15%;
left: 8vw;
top: 8vh;
`;

const WriteBox = styled.div`
height: 5%;
padding: 4%;
margin-bottom: 2%;
`;

const Hr = styled.hr`
border:  0.5px solid #E5E5E5;
`;

const Contents = styled.div`
grid-template-rows: repeat(2, minmax(100px, auto));
grid-template-columns: repeat(2, 1fr);
display: grid;
align-items: center;
place-items: center;
height: 75%;
margin: 3%;
border: 1px solid DarkGrey;
box-sizing: border-box;
`;

const Content = styled.div`
z-index: 1;
align-content: center;
justify-content: center;
border: 1px solid #E5E5E5;
width: 100%;
height: 100%;
background-size: cover;
box-sizing: border-box;
padding: 3%;
`;

export default CommonBoardList;
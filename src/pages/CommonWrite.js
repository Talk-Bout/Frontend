import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from "styled-components";
import {Text, Button, Grid, Input} from "../elements/index";
import { VscMention, VscSymbolNumeric, VscFileMedia} from "react-icons/vsc";
import { BiMenu } from "react-icons/bi";

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const CommonWrite = (props) => {
  
  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='100vh'>
        <Sidebar />
        <Body header>
          <Grid display="flex" width="100%" height="100%" >
          <Grid margin="auto" width="100vh" height="60vh" backgroundColor="#3C4043" >
            <Grid display="flex" margin="auto" justify_content="space-between" width="90%" height="12.5%">
              <Grid width="auto" height="100%">
                <Button border="none" bg="#3C4043" cursor="pointer" font_size="3vh" color="#FFFFFF"
                _onClick={() => history.goBack()}>
                  X</Button>
              </Grid>
              <Grid  width="auto" height="100%" display="flex" align_items="center">
               <Text bg="#3C4043" fontSize="2.5vh" fontWeight="bold" color="#FFFFFF">글쓰기</Text>
              </Grid>
              <Grid width="auto" height="100%" backgroundColor="red">
                <Button border="none" bg="#3C4043" cursor="pointer" font_size="2.5vh" color="#FFFFFF">등록</Button>
              </Grid>
            </Grid>
            <Grid width="100%" height="12.5%" backgroundColor="green" borderTop="1px solid #FFFFFF">
              {/* 카테고리 선택 */}
            <SelectBox>
              {/* <Dropdown
              // onChange={this._onSelect}/> */}
              <Option value=""> ≡  &nbsp; &nbsp; 주제를 선택해주세요 </Option>
              <Option value="정보">정보게시판</Option>
              <Option value="잡담">잡담방</Option>
            </SelectBox>
            </Grid>
            {/* 글쓰기 */}
            <Grid width="100%" height="63%">
              <Grid display="flex" width="100%" height="15%" borderTop="1px solid #FFFFFF">
              <Input font_size="1.5vh" width="80%" margin="0 0 0 3.5%" bg="#3C4043" outline="none" color="#FFFFFF" placeholder="제목을 입력해주세요" border="none"></Input>
              </Grid>
                <Hr/>
              <Grid width="100%" height="70%">
              <Input multiLine font_size="1.3vh" outline="none" width="80%" margin="0 0 0 5%" bg="#3C4043" color="#FFFFFF" placeholder="내용을 입력해주세요" border="none" ></Input>
              </Grid>
            </Grid>
            <Grid width="100%" height="12%" backgroundColor="#2E3134">
              {/* 기능 */}
            <BoardFooter>
              <Icon><VscFileMedia size={27}/></Icon>
              <Icon><VscMention size={27}/></Icon>
              <Icon><VscSymbolNumeric size={27}/></Icon> 
            </BoardFooter>
            </Grid>
          </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const SelectBox = styled.select`
width: 100%;
height: 7.5vh;
background-color: #3C4043;
border: none;
color: #FFFFFF;
outline: none;
font-size: 1.8vh;
display: block;
/* text-align-last: center;
text-align: center; */
padding: 0 5%;
appearance: none;
`;

const Option = styled.option`
font-size: 1.7vh;

`;

const Hr = styled.hr`
width: 90%;
`;

const BoardFooter = styled.div`
display: flex;
align-items: center;
height: 7vh;
margin: 0 0 0 5.5%;
`;

const Icon = styled.span`
cursor: pointer;
margin: 2%;
color: #FFFFFF;
`;

export default CommonWrite;
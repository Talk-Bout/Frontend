import React from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input} from "../elements/index";
import { VscChromeClose, VscMention, VscSymbolNumeric, VscFileMedia, VscListFlat, VscChevronDown } from "react-icons/vsc";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const CommonBoardWrite = (props) => {

  const options = [
    '항해99', '바닐라코딩', '코드스테이츠'
  ];
  

  return (
    <React.Fragment>
      <Grid is_flex overflow="hidden" box-sizing= "border-box" margin="20%" height="65vh" width="60%" border="1px solid black">
      <BoardHeader>
        <VscChromeCloseBox>
          <VscChromeClose/>
        </VscChromeCloseBox>
        <TextBox>
        <Text fontSize="13px">글쓰기</Text>
        </TextBox>
        <ButtonBox>
        <Button border="none" bg="transparent" cursor="pointer" font_size="13px">등록</Button>
        </ButtonBox>
      </BoardHeader>
      <Grid height="17%" margin="10px 0px">
        <DropDownBox>
        <Dropdown options={options}
        // onChange={this._onSelect}
        value= "주제를 선택해주세요"/>
        </DropDownBox>
      </Grid>
      <Grid height="48%" margin="15px 0px">
        <Input outline="none" placeholder="제목을 입력해주세요" border="none"></Input>
        <Hr/>
        <Input margin="0px 20px" outline="none" border="none" placeholder="내용을 입력해주세요"></Input>
      </Grid>
      <BoardFooter>
      <Icon><VscFileMedia/></Icon>
      <Icon><VscMention/></Icon>
      <Icon><VscSymbolNumeric/></Icon> 
      </BoardFooter>
      </Grid>
    </React.Fragment>
  )
};

const BoardHeader = styled.div`
padding: 0% 2%;
display: flex;
justify-content: space-between;
align-items: flex-start;
height: 8%;
width: 100%;
box-sizing: border-box;
margin-bottom: 5px;
hover: {background-color: #ddd;}
align-items: center;
`;

const VscChromeCloseBox = styled.span`
cursor: pointer;
float: right;
`;

const TextBox = styled.div`

`;

const ButtonBox = styled.div`
`;


const DropDownBox = styled.div`
display: inline-block;
position: relative;
width: 100%;
border: none;
`;


const Hr = styled.hr`
width: 90%;
`;

const BoardFooter = styled.div`
display: flex;
align-items: center;
height: 15%;
background-color: #E5E5E5;
position: relative;
`;

const Icon = styled.span`
cursor: pointer;
margin: 0px 5px;
padding: 5px;
`;

export default CommonBoardWrite;
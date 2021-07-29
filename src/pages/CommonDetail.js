import React from 'react';
import { history } from '../redux/ConfigureStore';

import styled from "styled-components";
import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';

//icons
import { BiTimeFive } from 'react-icons/bi'; 
import { BiLike } from 'react-icons/bi'; 
import { BiComment } from 'react-icons/bi';


const CoomonBoardDetail = (props) => {

  return (
    <React.Fragment>
      <Header/>
        {/* 게시물 */}
      <Outter>
      <Grid float="right" padding="60px 0px 60px 40px">
      <Grid>
        <Text padding="2%" fontSize="10px">토픽 &gt; 회사생활</Text>
        <Text p fontSize="13px" margin="0px" padding="2%" width="10%" fontWeight="bold">개발자는 커뮤니케이션 능력이 중요한 것 같아요...</Text>
        <Grid display="flex" width="100%" >
            <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/> 2021.07.27</Text>
            <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
            <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 버튼 추가 */}
          <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
            <Button _onClick={() => history.push('/common/write')} border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0" >
              수정
            </Button>
            <Button border="none" color="white" bg="Grey" width="45%" >
              삭제
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Hr/>
      {/* 게시물 본문 */}
      <Grid padding="2%">
          <Text fontSize="11px" style={{wordBreak:"break-all"}}>
          뭐랄까...  일단 마음을 비우고 (Null) 특정 상황에 대한  (Input)
          맥락적 해석을 하고 답을 내야 하는과정 (Output).
          조크든 위트든 프로젝트 커뮤가 되었던 process를 잘 따르는 사람이 커뮤를 잘한다고 봅니다.
          </Text>
      </Grid>
      <Hr/>
        {/* 댓글 남기기 */}
      <Grid>
        <Text padding="2%" fontWeight="bold" fontSize="10px">댓글5</Text>
        <CommentBox>
        <Input font_size="9px" border="1px solid #E5E5E5;"placeholder="댓글을 남겨주세요"/>
        <Button border="none" height="40px" color="white" bg="Grey" cursor="pointer" width="15%">등록</Button>
        </CommentBox>
        <Hr/>
        <div style={{textAlign: "center"}}>
        <Text style={{display: "inline-block"}} padding="2%" fontWeight="bold" fontSize="11px">댓글1개더보기</Text>
        <Hr/>
        </div>
      </Grid>
        {/* 댓글 달기 */}
      <Grid>
        {[1, 2, 3, 4, 5].map((p, index) => {
        return (
          <Content>
            <Text padding="0% 2%" color="Grey" fontSize="7px">글쓴이</Text>
            <Text p margin="0px" padding="0% 2%" fontSize="11px">흥미로운 것 같아요</Text>
            <Grid display="flex" width="100%" >
              <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/> 2021.07.27</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 버튼 추가 */}
              <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
                <Button border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0" >
                  수정
                </Button>
                <Button border="none" color="white" bg="Grey" width="45%" >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </Content>
        )
      })}
      </Grid>
      </Grid>
      </Outter>
      {/* 다른 게시물 */}
      <Side >
        <Grid padding="30px" float="left" width="30%">
        <Another>
          <Text padding="2%" fontSize="11px" fontWeight="bold">
            다른 게시물 <br/>
          </Text>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p, index) => {
            return (
          <AnotherList> ● 부트캠프 질문드립니다! <br/></AnotherList>
          )
        })}
        </Another>
      </Grid>
      </Side>
    </React.Fragment>
  )
};

const Outter = styled.div`
padding: 0;
float: left;
width: 60%
`;

const CommentBox = styled.div`
display: flex;
padding: 2%;
`;

const Hr = styled.hr`
border: 0.5px solid #E5E5E5;
margin: 7px 0px;
`;

const Content = styled.div`
border-bottom: 1px solid #E5E5E5;
width: 100%;
height: 100%;
padding: 1% 2%;
`;

const Side = styled.div`
padding: 15px 0px;
float: right;
width: 40%;
`;

const Another = styled.div`
border: 1px solid #E5E5E5;
width: 25%;
height: 35%;
padding: 2%;
position: absolute;
`;
const AnotherList = styled.a`
padding: 2%;
border: none;
margin: 10px 0px;
font-size: 10px;
`;

export default CoomonBoardDetail;
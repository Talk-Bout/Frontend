import React from 'react';
import styled from "styled-components";
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';
import Comment from '../components/Comment';
import { actionCreators as commentActions} from "../redux/modules/comment";
import { actionCreators as postActions} from "../redux/modules/post";
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';

const CoomonBoardDetail = (props) => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  //리덕스 : 게시글 상세 조회, 해당 게시물 댓글 리스트 조회
  const common_list = useSelector(state => state.post.list);

  const common_find = common_list.find((comment)=> comment.postId == postId);
  const comment_list = useSelector((state) => state.comment.list);

  React.useEffect(() => {
    if (common_find){
      return;
    }
    dispatch(postActions.setOnePostDB(postId));
  }, []);

  if (!common_find){
    return(
      <></>
    )
  }

  return (
    <React.Fragment>
      <Header/>
        {/* 게시물 */}
      <Outter>
      <Grid float="right" padding="60px 0px 60px 40px">
      <Grid>
        <Text padding="2%" fontSize="10px">토픽 &gt; 회사생활</Text>
        <Text p fontSize="13px" margin="0px" padding="2%" width="10%" fontWeight="bold">
        {common_find.title}
        </Text>
        <Text p margin="0" padding="2%" fontSize="11px">
          {common_find.author}
        </Text>
        <Grid display="flex" width="100%" >
            <Text padding="2%" width="33.3%" fontSize="12px">
              <BiTimeFive/> {common_find.createdAt}
            </Text>
            <Text padding="2%" width="33.3%" fontSize="12px">
              <BiLike/> {common_find.likes}
            </Text>
            <Text padding="2%" width="33.3%" fontSize="12px">
              <BiComment/>
            2
            </Text>

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
          {common_find.content}
          </Text>
      </Grid>
      <Hr/>
        {/* comment component */}
        <Comment postId={postId}/>
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
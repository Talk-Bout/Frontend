import React from 'react';
import styled from "styled-components";
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';
import Comment from '../components/Comment';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
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
      <Grid display='flex' overflow="auto" height='100vh' backgroundColor="#17181B">
         <Sidebar />
         <Body header>
          <Grid display="flex" width="100%" height="100%" backgroundColor="red">
            <Grid width="50%" height="100%" backgroundColor="orange">
              <Grid width="100%" height="100%" backgroundColor="green">
                <Grid></Grid>
              </Grid>
              <Grid></Grid>
              <Grid></Grid>
            </Grid>
            <Grid width="50%" height="100%" backgroundColor="yellow"></Grid>
          </Grid>
         </Body>
      </Grid>
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
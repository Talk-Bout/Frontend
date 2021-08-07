import React, {useState} from 'react';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions} from "../redux/modules/post";

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Comment from '../components/Comment';
import PopBootContents from '../components/PopBootContents';

import styled from 'styled-components';
import {Text, Grid, Input, Image} from "../elements/index";
import { BiTimeFive, BiLike, BiComment, BiShow, BiPencil, BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { BsThreeDotsVertical, BsBookmark } from 'react-icons/bs';

const CommonDetail = (props) => {
  const dispatch = useDispatch();
  //게시글 상세 조회, 해당 게시물 댓글 리스트 조회
  const postId = props.match.params.id;
  const common_list = useSelector(state => state.post.list);
  const common_find = common_list.find((comment)=> comment.postId === parseInt(postId));
  console.log(common_find);
  const username = useSelector(state => state.user.user.nickname);
  const [MenuLink, setMenuLink] = useState(null);
  

  React.useEffect(() => {
    if (common_find){
      return;
    }
    dispatch(postActions.setOnePostDB(postId));
  }, []);

  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  }

  const handleClose = () => {
    setMenuLink(null);
  }

  // 게시글 삭제
  const deleteCommon = () => {
    const deleted_post = {
      postId: postId,
    };
    dispatch(postActions.deletePostDB(deleted_post));
    history.push('/common/list');
  }

  if (!common_find){
    return(
      <></>
    );
  };
return (
  <React.Fragment>
  <Grid className='background' overflow="auto" display='flex' backgroundColor="#17181B">
    <Sidebar />
    <Body header>
    <Grid display="flex" width="100%">
      <Grid width="70%" height="100vh">
        {/* 게시물 */}
        <Grid width="100%" height="45vh">
          <Grid width="100%" height="45%">
            <Grid width="100%" height="100%">
              <Grid padding="2% 0" width="100%" height="15%">
              <Text fontSize="1.3vh" color="#BDC1C6"> 부트톡톡 &gt; 정보게시판</Text>
              </Grid>
              <Grid justify_content="space-between" display="flex" padding="2% 0" width="100%" height="45%">
                <Grid width="20%" height="100%">
                <Text p margin="0" fontSize="2.5vh" color="#F1F3F4" fontWeight="bold">
                {common_find.title}
                </Text>
                </Grid>
                <Grid padding="" display="flex" width="13%" height="100%">
                  <Text color='#9aa0a6' fontSize='3vh' vertical_align='middle' cursor='pointer' hover='opacity: 0.7'><BsBookmark /></Text>
                  <Button margin="0 0 0 20px" width="30%" bg="transparent" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Text color='#9AA0A6' fontSize='3vh' hover='opacity: 0.8'><BsThreeDotsVertical /></Text>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={MenuLink}
                    keepMounted
                    open={Boolean(MenuLink)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => {history.push(`/common/write/${postId}`)}}>수정하기<Text margin='0 0 0 10px'><BiPencil /></Text></MenuItem>
                    <MenuItem onClick={() => {handleClose(); deleteCommon()}}>삭제하기<Text margin='0 0 0 10px'><BiTrashAlt /></Text></MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              <Grid width="100%" height="50%">
              <Grid display="flex" width="100%" height="100%">
                <Grid width="4.5%" height="80%" >
                  <Image margin="5%" size="3"/>
                </Grid>
                <Grid width="30%" height="80%" >
                <Text p margin="0 0 0 6%" fontSize="1.4vh" color="#BDC1C6">
                {common_find.nickname}
                </Text>
                <Text p margin="0 0 0 6%" fontSize="1.4vh" color="#BDC1C6">
                {common_find.createdAt}
                </Text>
                </Grid>
                <Grid width="63.5%" height="80%" >
                  {/* <ButtonBox>
                    <EditDeleteButton
                    onClick={() => {deleteCommon()}}>
                      삭제
                    </EditDeleteButton>
                    <EditDeleteButton
                    onClick={() => {history.push(`/common/write/${postId}`)}}>
                      수정
                    </EditDeleteButton>
                  </ButtonBox> */}
                </Grid>
              </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid width="70%" height="41%" >
          <Grid padding="0 1% 2% 1%" >
            <Text fontSize="1.5vh" color="#DADCE0" style={{wordBreak:"break-all"}}>
            {common_find.content}
            </Text>
          </Grid>
          </Grid>
          <Grid width="100%" height="100%">
          <HistoryButton>
            <BiLike/> &nbsp; 17
          </HistoryButton>
          <Text margin="0 0 0 2%" color="#DADCE0" width="10%" height="100%" fontSize="2vh">
            <BiComment/> &nbsp;  15
          </Text>
          <Text margin="0 0 0 3%" color="#DADCE0" width="10%" height="100%" fontSize="2vh">
            <AiOutlineEye/> &nbsp;  354
          </Text>
          </Grid>
        </Grid>
        {/* 댓글 작성과 리스트 */}
        <Grid width="97%" height="15vh" borderTop="1.5px solid #DADCE0">
          <Comment postId={postId}  />
        </Grid>
        <Grid width="100%" height="40vh">
        </Grid>
      </Grid>
      {/* 인기 부트톡톡 */}
      <Grid width="27%" height="100%" >
        <PopBootContents/>
      </Grid>
    </Grid>
    </Body>
  </Grid>
</React.Fragment>
  )
};


const HistoryButton = styled.button`
width: 8%;
height: 10%;
font-size: 2vh;
background-color: transparent;
border-radius: 40vh;
border: none;
cursor: pointer;
color: #DADCE0;
&:hover {
  background-color: #282A2D;
  color: #7879F1;
  }
`;

const ButtonBox = styled.div`
width: 100%;
height: 100%;
margin: 0 1% 0 0;
`;

const EditDeleteButton = styled.button`
float: right;
background-color: #FFFFFF;
margin: 0 3% 0 0;
font-size: 1.5vh;
height: 50%;
border: none;
color: #121212;
cursor: pointer;
width: 13%;
border-radius: 5px;
font-weight: bold;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }
`;



export default CommonDetail;
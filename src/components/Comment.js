import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';
import { actionCreators as commentActions} from "../redux/modules/comment";
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';

const Comment = (props) => {

    const dispatch = useDispatch();
    const editRef = useRef(null);
    const addRef = useRef(null);
    const comment_list = useSelector(state => state.comment.list);
    const is_edit = useSelector((store)=> store.comment.is_edit);
    const postId = props.postId;

    const [content, setComments] = useState('');
    const [editId, setEditId] = useState('');

    const checkComments = (e) => {
      setComments(e.target.value);
    }

    // 댓글 조회
    useEffect(() => {
      dispatch(commentActions.setCommentDB(postId));
      // dispatch(commentActions.isEdit(true));
  }, []);

    //댓글 등록
    const addComment = () => {
      const addCommentRef = addRef.current.value;
      console.log(addCommentRef);
      const new_comment = {
        content : addCommentRef,
        nickname : "username"
    }

      if (addCommentRef === "") {
        window.alert("댓글을 입력해주세요!");
        return;
      }
      
      
    dispatch(commentActions.addCommentDB(new_comment, postId));
    addRef.current.value = "";
    }

    // 댓글 수정
    const editComment = () => {
      const editCommentRef = editRef.current.value;
      // const edit_ref = editRef.current.value;
      // console.log(editRef.current.value);

        const edit_comment = {
          nickname : "username",
          content : editCommentRef
        }
        dispatch(commentActions.editCommentDB(edit_comment, editId, postId));
        // editRef.current.value = "";
    }
    
    const editOn = (commentId) => {
      setEditId(commentId);
      dispatch(commentActions.isEdit(true));
    }
    // 댓글 삭제
    const deleteComment = (postId, commentId) => {
      dispatch(commentActions.deleteCommentDB(postId, commentId));
    }

    if(is_edit){
      return (
        <React.Fragment>
        <Grid>
        <Text padding="2%" fontWeight="bold" fontSize="10px">
          댓글5
        </Text>
        <CommentBox>
        <Input font_size="9px" border="1px solid #E5E5E5;"
        placeholder="댓글을 남겨주세요" _ref={addRef} onSubmit={addComment}/>
        <Button border="none" height="40px" color="white" bg="Grey" cursor="pointer" width="15%"
        _onClick={() => addComment()}>
          등록
        </Button>
        </CommentBox>
        <Hr/>
        <div style={{textAlign: "center"}}>
        <Text style={{display: "inline-block"}} padding="2%" fontWeight="bold" fontSize="11px">댓글1개더보기</Text>
        <Hr/>
        </div>
      </Grid>
        {/* 댓글 달기 */}
      <Grid>
        {comment_list && comment_list.map((ct, index) => {
          if(ct.commentId === editId){
            return(
              <Content>
            <Text padding="0% 2%" color="Grey" fontSize="7px">{ct.nickname}</Text>
            
            <input p margin="0px" padding="0% 2%" fontSize="11px"
            ref={editRef} defaultValue={ct.content}/>
            
            <Grid display="flex" width="100%" >
              <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/>{ct.createdAt}</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 수정, 삭제 버튼 */}
              <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
                <Button border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0"
                _onClick={()=>editComment(postId, ct.commentId)} >
                  수정
                </Button>
                <Button border="none" color="white" bg="Grey" width="45%"
                _onClick={()=>deleteComment(postId, ct.commentId)} >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </Content>
            )
          }
        return (
          
          <Content>
            <Text padding="0% 2%" color="Grey" fontSize="7px">{ct.nickname}</Text>

            <Text p margin="0px" padding="0% 2%" fontSize="11px"> {ct.content}</Text>
            
            <Grid display="flex" width="100%" >
              <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/>{ct.createdAt}</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 수정, 삭제 버튼 */}
              <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
                <Button border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0"
                _onClick={()=>editOn(ct.commentId)} >
                  수정
                </Button>
                <Button border="none" color="white" bg="Grey" width="45%"
                _onClick={()=>deleteComment(postId, ct.commentId)} >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </Content>
        )
      })}
      </Grid>
        </React.Fragment>
    );

    } else {
      return (
        <React.Fragment>
        <Grid>
        <Text padding="2%" fontWeight="bold" fontSize="10px">
          댓글5
        </Text>
        <CommentBox>
        <Input font_size="9px" border="1px solid #E5E5E5;"
        placeholder="댓글을 남겨주세요" _ref={addRef} onSubmit={addComment}/>
        <Button border="none" height="40px" color="white" bg="Grey" cursor="pointer" width="15%"
        _onClick={()=> {addComment();}}>
          등록
        </Button>
        </CommentBox>
        <Hr/>
        <div style={{textAlign: "center"}}>
        <Text style={{display: "inline-block"}} padding="2%" fontWeight="bold" fontSize="11px">댓글1개더보기</Text>
        <Hr/>
        </div>
      </Grid>
        {/* 댓글 달기 */}
      <Grid>
        {comment_list && comment_list.map((ct, index) => {
        return (
          
          <Content>
            <Text padding="0% 2%" color="Grey" fontSize="7px">{ct.nickname}</Text>
            
            <Text p margin="0px" padding="0% 2%" fontSize="11px"> {ct.content}</Text>
            
            
            <Grid display="flex" width="100%" >
              <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/>{ct.createdAt}</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 수정, 삭제 버튼 */}
              <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
                <Button border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0"
                _onClick={()=>editOn(ct.commentId)} >
                  수정
                </Button>
                <Button border="none" color="white" bg="Grey" width="45%"
                _onClick={()=>deleteComment(postId, ct.commentId)} >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </Content>
        )
      })}
      </Grid>
        </React.Fragment>
    )
    }
    
}

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

const CommentBox = styled.div`
display: flex;
padding: 2%;
`;

export default Comment;
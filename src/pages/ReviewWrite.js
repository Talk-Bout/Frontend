import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import {history} from '../redux/ConfigureStore';
import {actionCreators as postActions} from '../redux/modules/post';

const ReviewWrite = (props) => {
  const dispatch = useDispatch();
  const [edit_mode, setEditMode] = useState(false);
  const post_id = props.match.params.id;
  useEffect(() => {
    if (post_id) {
      setEditMode(true);
    }
  }, []);
  const post_list = useSelector(state => state.post.list);
  const old_post = post_list.find((post) => post.postId == post_id);
  console.log(post_list, old_post);
  const titleInput = useRef(null);
  const contentInput = useRef(null);
  const addPost = () => {
    const new_post = {
      postId: post_id,
      title: titleInput.current.value,
      content: contentInput.current.value,
      nickname: 'username',
      category: 'testing',
    }
    if (edit_mode) {
      dispatch(postActions.editPostDB(new_post));
    } else {
      dispatch(postActions.addPostDB(new_post));
    }
  }

  return (
    <React.Fragment>
      <Grid backgroundColor='gray' height='100vh' padding='15vh'>
        <Grid backgroundColor='#fff' width='45vw' height='65vh' margin='auto'>
          <WindowInner>
            <HeaderBox>
              <Button width='7%' _onClick={() => history.push('/review/list')}> X </Button>
              <Text margin='0 11vw' fontSize='2vh' fontWeight='700' lineHeight='4vh'>부트캠프 리뷰작성</Text>
              <Button width='7%' _onClick={() => addPost()}>{edit_mode ? '수정' : '등록'}</Button>
            </HeaderBox>
            <hr style={{margin: '1vh 0', borderTop: '1px solid #eee'}}/>
            <BodyBox>
              <Row>
                <Key>부트캠프명</Key><input type='text' placeholder='부트캠프명을 입력해주세요' defaultValue={edit_mode ? old_post.title : null} ref={titleInput}></input>
              </Row>
              <Row>
                <Key>기수</Key>
                <select>
                  <option value=''>--선택해주세요--</option>
                  <option value='수강중'>수강중</option>
                  <option vaoue='수강완료'>수강완료</option>
                </select>
              </Row>
              <Row>
                <Key>총 평점</Key>
                <Text fontSize='1.8vh'>★ ★ ☆ ☆ ☆</Text>
              </Row>
              <Row>
                <Key>부트캠프의 장점</Key>
                <textarea placeholder='부트캠프의 장점을 입력해주세요' defaultValue={edit_mode ? old_post.content : null} ref={contentInput} rows='7' cols='50' style={{resize: 'none'}}></textarea>
              </Row>
              <Row>
                <Key>부트캠프의 단점</Key>
                <textarea placeholder='부트캠프의 단점을 입력해주세요' rows='7' cols='50' style={{resize: 'none'}}></textarea>
              </Row>
            </BodyBox>
          </WindowInner>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const WindowInner = styled.div`
  padding: 2vh 2vw;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-evenly;
`;

const BodyBox = styled.div`
  padding: 1vh 0;
`;

const Row = styled.div`
  margin: 2vh 0;
`;

const Key = styled.span`
  font-size: 1.8vh;
  font-weight: 700;
  margin-right: 2vw;
`;

export default ReviewWrite;
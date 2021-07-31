import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { BsX } from 'react-icons/bs';
import { history } from '../redux/ConfigureStore';
import { actionCreators as postActions } from '../redux/modules/post';

const BootReviewWrite = (props) => {
  // const dispatch = useDispatch();
  // const [edit_mode, setEditMode] = useState(false);
  // const post_id = props.match.params.id;
  // useEffect(() => {
  //   if (post_id) {
  //     setEditMode(true);
  //   }
  // }, []);
  // const post_list = useSelector((state) => state.post.list);
  // const old_post = post_list.find((post) => post.postId == post_id);
  // console.log(post_list, old_post);
  // const titleInput = useRef(null);
  // const contentInput = useRef(null);
  // const addPost = () => {
  //   const new_post = {
  //     postId: post_id,
  //     title: titleInput.current.value,
  //     content: contentInput.current.value,
  //     nickname: 'username',
  //     category: 'testing',
  //   };
  //   if (edit_mode) {
  //     dispatch(postActions.editPostDB(new_post));
  //   } else {
  //     dispatch(postActions.addPostDB(new_post));
  //   }
  // };

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='100vh'>
        <Sidebar />
        <Body>
          <Grid className='body-inner' height='110%' padding='10vh 0 0'>
            <Window>
              <Grid className='header-box' height='10%' display='flex' borderBottom='1px solid #8f9091'>
                <Grid className='exit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='4vh' color='#e5e5e5' lineHeight='7.5vh'><BsX /></Text>
                </Grid>
                <Grid className='title' width='53.33%' is_center>
                  <Text fontSize='2.5vh' fontWeight='700' color='#e5e5e5' lineHeight='6.5vh'>부트캠프 리뷰작성</Text>
                </Grid>
                <Grid className='submit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='2.5vh' fontWeight='700' color='#848484' lineHeight='6.5vh' float='right'>등록</Text>
                </Grid>
              </Grid>
              <Grid className='body-box' backgroundColor='green' height='90%'></Grid>
            </Window>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Window = styled.div`
  background-color: #383838;
  width: 60%;
  height: 90%;
  margin: auto;
`;

export default BootReviewWrite;

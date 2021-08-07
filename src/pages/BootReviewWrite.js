import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { BsX } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { history } from '../redux/ConfigureStore';
import { actionCreators as postActions } from '../redux/modules/post';
import StarRatingComponent from 'react-star-rating-component';

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

  let star = 0;
  const [rating, setRating] = useState('');
  const onClickStar = (e) => {
    // console.log(e);
    star = e;
    console.log(star);
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' backgroundColor='#17181b' minHeight='100vh'>
        <Sidebar />
        <Body>
          <Grid className='body-inner' height='110%' padding='5vh 0 0'>
            <Window>
              <Grid className='header-box' height='10%' display='flex' borderBottom='1px solid #8f9091'>
                <Grid className='exit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='4vh' color='#e5e5e5' lineHeight='7.5vh' cursor='pointer' _onClick={() => history.push('/boot/review')}><BsX /></Text>
                </Grid>
                <Grid className='title' width='53.33%' is_center>
                  <Text fontSize='2.5vh' fontWeight='700' color='#e5e5e5' lineHeight='7vh'>부트캠프 리뷰작성</Text>
                </Grid>
                <Grid className='submit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='2.5vh' fontWeight='700' color='#848484' lineHeight='7vh' float='right' cursor='pointer'>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                <div style={{padding: '25px 0 0'}}><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프명</Text></div>
                <div><Input placeholder='부트캠프명을 입력해주세요'/></div>
                <div style={{padding: '25px 0 0'}}><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>기수</Text></div>
                <div><Input placeholder='수강중'/></div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>총 평점</Text></div>
                <div><Text fontSize='3vh' fontWeight='700' color='#848484'><StarRatingComponent name='Stars' onStarClick={(e) => onClickStar(e)} renderStarIcon={() => <IoStar />} starColor='#e5e5e5' emptyStarColor='#848484'/></Text></div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프의 장점<br /></Text><Text fontSize='1.7vh' color='#848484'>최소 20자</Text></div>
                <div><Textarea rows='5' minlength='40' placeholder='부트캠프의 장점을 입력해주세요'/></div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프의 단점<br /></Text><Text fontSize='1.7vh' color='#848484'>최소 20자</Text></div>
                <div><Textarea rows='5' minlength='40' placeholder='부트캠프의 단점을 입력해주세요'/></div>
              </BodyBox>
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

const BodyBox = styled.div`
  height: 90%;
  display: grid;
  padding: 20px 40px;
  grid-template-columns: 30% 70%;
  & > div {
    padding: 20px 0;
  }
`;

const Input = styled.input`
  border: 1px solid #8f9091;
  background-color: #383838;
  padding: 10px;
  font-size: 1.7vh;
  color: #e5e5e5;
  width: 50%;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #8f9091;
  width: 90%;
  resize: none;
  padding: 10px;
  font-size: 1.7vh;
  background-color: #383838;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

export default BootReviewWrite;

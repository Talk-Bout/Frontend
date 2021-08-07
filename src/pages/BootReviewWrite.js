import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { BsX } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { history } from '../redux/ConfigureStore';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import StarRatingComponent from 'react-star-rating-component';

const BootReviewWrite = (props) => {
  const dispatch = useDispatch();
  const camp_name = props.location.state.camp_name;
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

  // 별점을 state에 저장하기
  const [stars, setStars] = useState(0);
  const onClickStar = (e) => {
    setStars(e);
  }

  // 수료 여부, 장점, 단점에 useRef 설정
  const courseInput = useRef(null); 
  const prosInput = useRef(null);
  const consInput = useRef(null);

  // 리뷰 [등록] 버튼 누르면 호출되는 함수
  const addReview = () => {
    if (courseInput.current.value === '') {
      window.alert('수료 여부를 선택해주세요.')
      return;
    }
    if (stars === 0) {
      window.alert('평점을 매겨주세요.')
      return;
    }
    if (prosInput.current.value === '') {
      window.alert('부트캠프의 장점을 입력해주세요.')
      return;
    }
    if (consInput.current.value === '') {
      window.alert('부트캠프의 단점을 입력해주세요.')
      return;
    }
    if (prosInput.current.value.length < 20 || consInput.current.value.length < 20) {
      window.alert('장점과 단점은 각각 20자 이상 입력해주세요.')
      return;
    }
    const new_review = {
      nickname: 'realmot',
      bootcampName: camp_name,
      season: courseInput.current.value,
      pros: prosInput.current.value,
      cons: consInput.current.value,
      stars: stars,
    };
    dispatch(campActions.addReviewDB(new_review));
    // if (edit_mode) {
  //     dispatch(postActions.editPostDB(new_post));
  //   } else {
      // dispatch(postActions.addPostDB(new_post));
  //   }
  };

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
                  <Text fontSize='2.5vh' fontWeight='700' color='#e5e5e5' lineHeight='7vh'>{camp_name} 리뷰작성</Text>
                </Grid>
                <Grid className='submit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='2.5vh' fontWeight='700' color='#848484' lineHeight='7vh' float='right' cursor='pointer' _onClick={() => addReview()}>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                <div style={{padding: '25px 0 0'}}><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프명</Text></div>
                <div><Input value={camp_name} readOnly/></div>
                <div style={{padding: '25px 0 0'}}><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>수료 여부</Text></div>
                <div>
                  <Select ref={courseInput}>
                    <option value=''>선택해주세요</option>
                    <option value='수강중'>수강중</option>
                    <option value='수료'>수료</option>
                  </Select>
                </div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>총 평점</Text></div>
                <div><Text fontSize='3vh' fontWeight='700' color='#848484'><StarRatingComponent name='Stars' onStarClick={(e) => onClickStar(e)} renderStarIcon={() => <IoStar />} starColor='#e5e5e5' emptyStarColor='#848484'/></Text></div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프의 장점<br /></Text><Text fontSize='1.7vh' color='#848484'>최소 20자</Text></div>
                <div><Textarea rows='5' minlength='40' placeholder='부트캠프의 장점을 입력해주세요' ref={prosInput}/></div>
                <div><Text fontSize='2vh' fontWeight='700' color='#e5e5e5'>부트캠프의 단점<br /></Text><Text fontSize='1.7vh' color='#848484'>최소 20자</Text></div>
                <div><Textarea rows='5' minlength='40' placeholder='부트캠프의 단점을 입력해주세요' ref={consInput}/></div>
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

const Select = styled.select`
  border: 1px solid #8f9091;
  background-color: #383838;
  padding: 10px;
  font-size: 1.7vh;
  color: #e5e5e5;
  width: 50%;
  &:focus {
    outline: none;
  }
  & > option {
    font-size: 1.5vh;
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

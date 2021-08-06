import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { Grid, Text } from '../elements';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { RiAtLine } from 'react-icons/ri';
import { FiHash } from 'react-icons/fi';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const BootCommuWrite = (props) => {
  const dispatch = useDispatch();
  // const username = useSelector(state => state.user.user.user.nickname);      // 로그인 상태일 때 리덕스에서 닉네임 가져오기
  const username = 'realmot';   // 로그인 안 해도 테스트할 수 있도록 임시로 설정한 닉네임(실제 유저 닉네임)
  const post_id = parseInt(window.location.pathname.split('/write/')[1]);
  const post_list = useSelector(state => state.post.list);
  const post_found = post_list.find((p) => p.postId == post_id);

  const titleRef = useRef('');
  const contentRef = useRef('');
  const imageRef = useRef();                                      // 선택한 이미지에 대한 ref 설정
  const preview = useSelector(state => state.image.preview);      // 이미지 파일 선택 후 리덕스에서 가져오는 미리보기 데이터

  const selectFile = (e) => {                            // 이미지 파일을 선택하면, 이미지 정보를 리덕스에 넘기는 함수 실행
      dispatch(imageActions.getPreview(e));
  };

  const addPost = () => {
    if (titleRef.current.value === '') {
      window.alert('제목을 입력해주세요.');
      return;
    }
    if (contentRef.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }
    if (post_id) {
      const edited_post = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: 'testing',
        postId: post_id,
      }
      dispatch(postActions.editPostDB(edited_post));
    } else {
      const new_post = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: 'testing',
      }
      dispatch(postActions.addPostDB(new_post));
    }
  }

  const uploadFile = () => {                            // 게시글 등록 버튼 누르면, 이미지 저장 함수 실행
    const uploaded_image = imageRef.current.files[0];
    console.log(uploaded_image);
    dispatch(imageActions.uploadImageDB(uploaded_image)); // 파일 객체를 보내기
    dispatch(imageActions.getPreview(null));                    // 게시글 등록이 끝나면 이미지 미리보기 초기화
    titleRef.current.value = '';                                // 게시글 등록이 끝나면 제목 초기화
    contentRef.current.value = '';                              // 게시글 등록이 끝나면 내용 초기화
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' backgroundColor='#17181b' minHeight='100vh'>
        <Sidebar />
        <Body>
          <Grid className='body-inner' height='110%' padding='2vh 0 0'>
            <Window>
              <Grid className='header-box' height='10%' display='flex' borderBottom='1px solid #8f9091'>
                <Grid className='exit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='4vh' color='#e5e5e5' lineHeight='7.5vh' cursor='pointer' _onClick={() => history.push('/boot/community')}><BsX /></Text>
                </Grid>
                <Grid className='title' width='53.33%' is_center>
                  <Text fontSize='2.5vh' fontWeight='700' color='#e5e5e5' lineHeight='7vh'>글쓰기</Text>
                </Grid>
                <Grid className='submit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='2.5vh' fontWeight='700' color='#848484' lineHeight='7vh' float='right' cursor='pointer' _onClick={() => {addPost(); uploadFile()}}>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                <TitleBox><Input placeholder='제목을 입력해주세요' ref={titleRef} defaultValue={post_id ? post_found.title : null}/></TitleBox>
                <ContentBox><Textarea rows='5' placeholder='내용을 입력해주세요' ref={contentRef} defaultValue={post_id ? post_found.content : null}/></ContentBox>
                <div style={{textAlign: 'center'}}>
                  {/* 이미지 preview가 있으면 preview와 파일명을 보여주고, 없으면 빈 칸 보여주기 */}
                  {preview ?
                  <><Preview><Img src={preview}/></Preview><Text fontSize='1.5vh' color='#8f9091' margin='auto'>{imageRef.current.files[0].name}</Text></>
                  :
                  <Preview><Text fontSize='1.7vh' color='#8f9091' lineHeight='35vh'>이미지 미리보기</Text></Preview>
                  }
                </div>
              </BodyBox>
              <FooterBox>
                <label for='file'><Text fontSize='2.5vh' color='#b3b3b3' margin='0 10px 0 0' cursor='pointer'><BiImageAdd /></Text><ImgInput type='file' ref={imageRef} onChange={selectFile} accept='image/*' id='file'/></label>
                <Text fontSize='2.5vh' color='#b3b3b3' margin='0 0 0 10px' cursor='pointer'><FiHash /></Text>
              </FooterBox>
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
  height: 80%;
  padding: 40px 40px;
`;

const TitleBox = styled.div`
  height: 5vh;
  border-bottom: 1px solid #8f9091;
  padding-bottom: 20px;
`;

const ContentBox = styled.div`
  height: fit-content;
  padding: 20px 0;
`;

const Preview = styled.div`
  width: 100%;
  height: 35vh;
  border: 1px solid #8f9091;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Input = styled.input`
  background-color: #383838;
  padding: 10px;
  font-size: 1.7vh;
  color: #e5e5e5;
  width: 97.7%;
  border: none;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 97.7%;
  resize: none;
  padding: 10px;
  font-size: 1.7vh;
  background-color: #383838;
  border: none;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const FooterBox = styled.div`
  background-color: #414141;
  height: 10%;
  padding: 20px 40px 20px;
`;

const ImgInput = styled.input`                // 이미지 파일 선택 버튼 숨기기
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

export default BootCommuWrite;
import React, { useRef } from 'react';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Text, Grid} from '../elements/index';
import { BsX } from 'react-icons/bs';
import { FiHash } from 'react-icons/fi';
import { BiImageAdd } from 'react-icons/bi';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const CommonWrite = (props) => {
  const dispatch = useDispatch();

  // 로그인 상태일 때 리덕스에서 닉네임 가져오기
  const postId = parseInt(window.location.pathname.split('/common/write/')[1]);
  const common_list = useSelector(state => state.post.list);
  const post_found = common_list.find((p) => p.postId == postId);
  const username = useSelector(state => state.user.user.nickname);

  // 게시글 등록
  const addTitleRef = useRef('');
  const addContentRef = useRef('');
  
  // 카테고리 셀렉트
  // const onSelect = (e) => {
  //   dispatch()
  // }

  const addCommon = () => {
    if (addTitleRef.current.value === '') {
      window.alert('제목을 입력해주세요.');
      return;
    }
    if (addContentRef.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }
    if(postId) {
      const edited_post = {
        title: addTitleRef.current.value,
        content: addContentRef.current.value,
        nickname: username,
        category: 'testing',
        postId: postId,
      }
      dispatch(postActions.editPostDB(edited_post));
      history.push(`/common/detail/${postId}`)
      
    } else {
      const new_post = {
        title: addTitleRef.current.value,
        content: addContentRef.current.value,
        nickname: username,
        category: 'testing',
      }
      dispatch(postActions.addPostDB(new_post));
      history.push(`/common/list`)
    }
  };
  

  // 이미지 업로드
  const imageRef = useRef();
  const preview = useSelector(state => state.image.preview);
  // 이미지 미리보기 실행 함수
  const selectFile = (e) => {
      dispatch(imageActions.getPreview(e));
  };
  // 이미지 저장 실행 함수
  const uploadFile = () => {
    const uploaded_image = imageRef.current.files[0];
    dispatch(imageActions.uploadImageDB(uploaded_image));
    dispatch(imageActions.getPreview(null));
  }
  // 이미지 미리보기 삭제 함수
  const exitPage = () => {
    dispatch(imageActions.getPreview(null));
  }


  return (
    <React.Fragment>
      <Grid className='background' display='flex' backgroundColor='#17181b' padding='0 0 42px'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          <Grid className='body-inner' padding='24px 0 0'>
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid height='84px' display='flex' borderBottom='1px solid #5f6368'>
                {/* 나가기 버튼 */}
                <Grid width='23.33%' padding='0 40px'>
                  <Text fontSize='35px' color='#e5e5e5' lineHeight='84px' cursor='pointer' _onClick={() => {history.goBack(); exitPage()}}><BsX /></Text>
                </Grid>
                {/* 타이틀 */}
                <Grid width='53.33%' is_center>
                  <Text fontSize='24px' fontWeight='700' color='#e5e5e5' lineHeight='84px'>글쓰기</Text>
                </Grid>
                {/* 등록 버튼 */}
                <Grid width='23.33%' padding='0 40px'>
                  <Text fontSize='24px' fontWeight='700' color='#7879F1' lineHeight='84px' float='right' cursor='pointer' _onClick={() => {addCommon(); uploadFile()}}>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                 {/* 카테고리 선택 */}
                 <SelectBox 
                //  onChange={onSelect}
                >
                  <Option value="none"> ≡ &nbsp; &nbsp; 주제를 선택해주세요</Option>
                  <Option value="info">정보게시판</Option>
                  <Option value="chitchat">잡담방</Option>
                </SelectBox>
                {/* 제목 입력 칸 */}
                <TitleBox><Input placeholder='제목을 입력해주세요' ref={addTitleRef} defaultValue={postId ? post_found.title : null}/></TitleBox>
                {/* 내용 입력 칸 */}
                <ContentBox><Textarea rows='5' placeholder='내용을 입력해주세요' ref={addContentRef} defaultValue={postId ? post_found.content : null}/></ContentBox>
                {/* 이미지 미리보기 */}
                <div style={{textAlign: 'center'}}>
                  {/* 이미지 preview가 있으면 preview와 파일명을 보여주고, 없으면 빈 칸 보여주기 */}
                  {preview ?
                  <><Preview><Img src={preview}/></Preview><Text p fontSize='16px' color='#5f6368' margin='0 auto 80px'>{imageRef.current.files[0].name}</Text></>
                  :
                  <Preview style={{margin: '0 auto 80px'}}><Text fontSize='16px' color='#5f6368' lineHeight='500px'>이미지 미리보기</Text></Preview>
                  }
                </div>
              </BodyBox>
              {/* 작성 페이지 푸터 */}
              <FooterBox>
                {/* 이미지 추가 버튼 */}
                <label for='file'><ImageButton><BiImageAdd /></ImageButton><ImgInput type='file' ref={imageRef} onChange={selectFile} accept='image/*' id='file'/></label>
                {/* 해시태그 추가 버튼 */}
                <HashButton><FiHash /></HashButton>
              </FooterBox>
            </Window>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Window = styled.div`
  background-color: #282a2d;
  width: 1044px;
  height: fit-content;
  margin: auto;
`;

const BodyBox = styled.div`
  padding: 0 40px;
`;

const SelectBox = styled.select`
  width: 100%;
  height: 7.5vh;
  background-color: #282a2d;
  border: none;
  color: #5f6368;
  outline: none;
  font-size: 18px;
  display: block;
  appearance: none;
  
`;

const Option = styled.option`
  font-size: 18px;
  color: #FFFFFF; 
`;

const TitleBox = styled.div`
  height: 72px;
  border-bottom: 1px solid #5f6368;
`;

const ContentBox = styled.div`
  height: 144px;
  margin: 0 0 80px;
`;

const Input = styled.input`
  background-color: #282a2d;
  padding: 24px;
  font-size: 16px;
  color: #DADCE0;
  width: 97.7%;
  border: none;
  &::placeholder {
    color: #5f6368;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 97.7%;
  resize: none;
  padding: 24px;
  font-size: 16px;
  background-color: #282a2d;
  border: none;
  color: #dadce0;
  &::placeholder {
    color: #5f6368;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Preview = styled.div`
  width: 884px;
  height: 500px;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
  margin: 0 auto 16px;
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FooterBox = styled.div`
  background-color: #2E3134;
  height: 24px;
  padding: 28px 40px;
  
`;

const ImageButton = styled.text`
font-size: 24px;
color: #b3b3b3;
margin: 0 32px 0 0;
cursor: pointer;
&:hover {
  background-color: #282A2D;
  color: #7879F1;
  }
`;

// 이미지 파일 선택하는 기본 버튼 숨기기
const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

const HashButton = styled.text`
font-size: 24px;
color: #b3b3b3;
cursor: pointer;
&:hover {
  background-color: #282A2D;
  color: #7879F1;
  }
`;

export default CommonWrite;

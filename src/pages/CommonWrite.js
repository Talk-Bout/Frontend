import React, { useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { Grid, Text } from '../elements';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { FiHash } from 'react-icons/fi';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const BootCommuWrite = (props) => {
  const dispatch = useDispatch();

  // 로그인 상태일 때 리덕스에서 닉네임 가져오기
  const username = useSelector(state => state.user.user.nickname);

  const postId = parseInt(window.location.pathname.split('/common/write/')[1]);
  const commu_found = useSelector((state) => state.post.one_post);
  const image_url = useSelector((state) => state.image.image_url);

  const titleRef = useRef('');
  const contentRef = useRef('');
  
  // 카테고리 설정
  const categoryRef = useRef('');

  // 이미지 업로드
  const imageRef = useRef();
  const preview = useSelector((state) => state.image.preview);
  // 이미지 미리보기 실행 및 서버 업로드 함수
  const selectFile = (e) => {
    const uploaded_image = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('image', uploaded_image);
    dispatch(imageActions.getPreview(e));
    dispatch(imageActions.uploadImageDB(formData));
  };
  // 이미지 미리보기 삭제 함수
  const exitPage = () => {
    dispatch(imageActions.getPreview(null));
  };

  // 게시글 등록(수정)
  const addPost = () => {
    if (titleRef.current.value === '') {
      window.alert('제목을 입력해주세요.');
      return;
    }
    if (contentRef.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }
    if (postId) {
      const edited_image = preview ? image_url : commu_found.image
      const edited_post = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: categoryRef.current.value,
        postId: postId,
        image: edited_image,
      };
      dispatch(postActions.editPostDB(edited_post));
      dispatch(imageActions.getPreview(null));
      history.push(`/common/detail/${postId}`)
      titleRef.current.value = '';
      contentRef.current.value = '';
    } else {
      const new_post = {
        
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: categoryRef.current.value,
        image: image_url,
      };
      dispatch(postActions.addPostDB(new_post));
      dispatch(imageActions.getPreview(null));
      history.push(`/common/list`)
      titleRef.current.value = '';
      contentRef.current.value = '';
    }
  };

  return (
    <React.Fragment>
      <Grid
        className="background"
        display="flex"
        backgroundColor="#17181b"
        padding="0 0 42px"
      >
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          <Grid className="body-inner" padding="24px 0 0">
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid
                height="84px"
                display="flex"
                borderBottom="1px solid #5f6368"
              >
                {/* 나가기 버튼 */}
                <Grid width="23.33%" padding="0 40px">
                  <Text
                    fontSize="35px"
                    color="#e5e5e5"
                    lineHeight="84px"
                    cursor="pointer"
                    _onClick={() => {
                      history.goBack();
                      exitPage();
                    }}
                  >
                    <BsX />
                  </Text>
                </Grid>
                {/* 타이틀 */}
                <Grid width="53.33%" is_center>
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="#e5e5e5"
                    lineHeight="84px"
                  >
                    글쓰기
                  </Text>
                </Grid>
                {/* 등록(수정) 버튼 */}
                <Grid width="23.33%" padding="0 40px">
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="#848484"
                    lineHeight="84px"
                    float="right"
                    cursor="pointer"
                    _onClick={() => addPost()}
                  >
                    {postId ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                {/* 카테고리 선택 */}
                <SelectBox 
                 ref={categoryRef}
                >
                  <Option value=""> ≡ &nbsp; &nbsp; 주제를 선택해주세요</Option>
                  <Option value="info">정보방</Option>
                  <Option value="chitchat">잡담방</Option>
                </SelectBox>
                {/* 제목 입력 칸 */}
                <TitleBox>
                  <Input
                    placeholder="제목을 입력해주세요"
                    ref={titleRef}
                    defaultValue={postId ? commu_found.title : null}
                  />
                </TitleBox>
                {/* 내용 입력 칸 */}
                {/* 이미지 preview가 있으면 입력 칸 크기 줄이고, preview와 파일명을 보여주기*/}
                {/* 글 수정 중이라면 저장된 제목과 내용 보여주기 */}
                <ContentBox>
                  <Textarea
                    rows={preview ? '5' : '15'}
                    placeholder="내용을 입력해주세요"
                    ref={contentRef}
                    defaultValue={postId ? commu_found.content : null} />
                </ContentBox>
                {preview ?
                  <div style={{ textAlign: 'center' }}>
                    <Preview>
                      <Img src={preview} />
                    </Preview>
                    <Text
                      p
                      fontSize="16px"
                      color="#5f6368"
                      margin="0 auto 80px"
                    >
                      {preview ? imageRef.current.files[0].name : ''}
                    </Text>
                  </div>
                    : '' }
              </BodyBox>
              {/* 작성 페이지 푸터 */}
              <FooterBox>
                {/* 이미지 추가 버튼 */}
                <form>
                  <label for="file">
                    <Text
                      fontSize="24px"
                      color="#b3b3b3"
                      margin="0 32px 0 0"
                      cursor="pointer"
                    >
                      <BiImageAdd />
                    </Text>
                    <ImgInput
                      type="file"
                      ref={imageRef}
                      onChange={selectFile}
                      accept="image/*"
                      id="file"
                    />
                  </label>
                </form>
                {/* 해시태그 추가 버튼 */}
                {/* <Text fontSize="24px" color="#b3b3b3" cursor="pointer">
                  <FiHash />
                </Text> */}
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

const TitleBox = styled.div`
  height: 72px;
  border-bottom: 1px solid #5f6368;
`;

const ContentBox = styled.div`
  height: fit-content;
  margin: 0 0 80px;
`;

const Input = styled.input`
  background-color: #282a2d;
  padding: 24px;
  font-size: 16px;
  color: #dadce0;
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
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #5f6368;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    display: none;
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
  background-color: #2e3134;
  height: 24px;
  padding: 28px 40px;
  display: flex;
`;

// 이미지 파일 선택하는 기본 버튼 숨기기
const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
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
export default BootCommuWrite;

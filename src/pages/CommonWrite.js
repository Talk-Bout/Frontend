import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Body } from '../components';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const BootCommuWrite = (props) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState('');

  // 로그인 상태일 때 리덕스에서 닉네임 가져오기
  const username = useSelector(state => state.user.user.nickname);

  const postId = parseInt(window.location.pathname.split('/common/write/')[1]);
  const commu_found = useSelector((state) => state.post.one_post);
  const preview = useSelector((state) => state.image.preview);

  useEffect(() => {
    if (preview) {
      setImage(preview);
    } else if (commu_found && commu_found.image) {
      setImage(`https://fw3efsadfcv.shop${commu_found.image}`);
    } else {
      setImage('');
    }
  }, [preview]);

  const image_url = useSelector((state) => state.image.image_url);
  const titleRef = useRef('');
  const contentRef = useRef('');

  // 카테고리 설정
  const categoryRef = useRef('');

  // 이미지 업로드
  const imageRef = useRef();
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
    if (window.confirm("변경사항이 저장되지 않을 수 있습니다.")) {
      history.goBack();
      dispatch(imageActions.getPreview(null));
    }
  };

  const removeImage = () => {
    if (window.confirm('업로드한 이미지 파일을 삭제하시겠습니까?')) {
      if (postId) {
        dispatch(postActions.editPostDB_img(commu_found));
      }
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl());
      setImage('');
    }
  }

  // 게시글 등록(수정)
  const addPost = () => {
    if (categoryRef.current.value === '') {
      window.alert('카테고리를 입력해주세요.');
      return;
    }
    if (titleRef.current.value === '') {
      window.alert('제목을 입력해주세요.');
      return;
    }
    if (contentRef.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }

    if (postId) {
      const edited_image = preview ? image_url : image;
      const edited_post = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: commu_found.category,
        postId: postId,
        image: edited_image,
      };
      dispatch(postActions.editPostDB(edited_post));
      
    } else {
      const new_post = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        nickname: username,
        category: categoryRef.current.value,
        image: image_url,
      };
      dispatch(postActions.addPostDB(new_post));
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
        {/* 바디 */}
        <Body MOBnopadding>
          <Grid className="body-inner" padding="24px 0 0" MOBpadding='0'>
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid
                height="84px"
                MOBheight='48px'
                display="flex"
                borderBottom="1px solid #5f6368"
                backgroundColor='#202124'
              >
                {/* 나가기 버튼 */}
                <Grid width="23.33%" padding="0 40px" MOBpadding='0 10px'>
                  <Text
                    fontSize="35px"
                    MOBfontSize='20px'
                    color="#e5e5e5"
                    lineHeight="84px"
                    MOBlineHeight='48px'
                    cursor="pointer"
                    _onClick={() => {
                      exitPage();
                    }}
                  >
                    <BsX />
                  </Text>
                </Grid>
                {/* 타이틀 */}
                <Grid width="53.33%" is_center>
                  <Text fontSize="24px" TABfontSize='20px' MOBfontSize='16px' fontWeight="700" color="#e5e5e5" lineHeight="84px" MOBlineHeight='48px' cursor='default'>
                    글쓰기
                  </Text>
                </Grid>
                {/* 등록(수정) 버튼 */}
                <Grid width="23.33%" padding="0 40px" MOBpadding='0 10px'>
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="#848484"
                    lineHeight="84px"
                    float="right"
                    cursor="pointer"
                    MOBdisplay='none'
                    _onClick={() => addPost()}
                  >
                    {postId ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                {/* 카테고리 선택 */}
                {postId ?
                <SelectBox>
                  <option value={commu_found.category}>{commu_found.category === 'info' ? '정보' : commu_found.category === 'chitchat' ? '잡담' : commu_found.category === 'job' ? '취업' : '인터넷 강의'}</option>
                </SelectBox>
                :
                <SelectBox
                  ref={categoryRef}
                >
                  <option value=""> ≡ &nbsp; &nbsp; 주제를 선택해주세요</option>
                  <option value="info">정보</option>
                  <option value="chitchat">잡담</option>
                  <option value="job">취업</option>
                  <option value="lecture">인터넷 강의</option>
                </SelectBox>
                }
                
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
                    rows={image !== '' ? '5' : '15'}
                    placeholder="내용을 입력해주세요"
                    ref={contentRef}
                    defaultValue={postId ? commu_found.content : null} />
                </ContentBox>
                {image !== '' ?
                  <div style={{ textAlign: 'center' }}>
                    <Preview>
                      <Img src={preview ? preview : image} />
                    </Preview>
                    <Text
                      p
                      fontSize="16px"
                      MOBfontSize='10px'
                      color="#5f6368"
                      margin="0 auto 80px"
                    >
                      {preview ? imageRef.current.files[0].name : ''}
                    </Text>
                  </div>
                  : ''}
              </BodyBox>
              {/* 작성 페이지 푸터 */}
              <FooterBox>
                {/* 이미지 추가 버튼 */}
                <form>
                  <label htmlFor="file">
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
                {/* 이미지 삭제 버튼 */}
                {image !== '' ?
                <Text fontSize="24px" color="#b3b3b3" cursor="pointer" _onClick={() => removeImage()}>
                  <FcCancel />
                </Text>
                :
                ''}
                <ButtonMobile onClick={() => {
                  addPost()
                }}><Text MOBfontSize='16px' fontWeight='700' color='#848484'>등록</Text></ButtonMobile>
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
  @media screen and (max-width: 1150px) {
    width: 688px;
    height: fit-content;
  }
  @media screen and (max-width: 767px) {
    min-height: 100vh;
    margin: 0;
    width: 100%;
  }
`;

const BodyBox = styled.div`
  padding: 0 40px;
  @media screen and (max-width: 767px) {
    padding: 20px 20px 40px;
  }
`;

const TitleBox = styled.div`
  height: 72px;
  border-bottom: 1px solid #5f6368;
  @media screen and (max-width: 767px) {
    border-top: 1px solid #5f6368;
    height: 60px;
  }
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
    font-size: 16px;
    @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  }
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 40px);
    padding: 20px 0;
    font-size: 14px;
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
    font-size: 16px;
    @media screen and (max-width: 767px) {
    font-size: 14px;
  }
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
  @media screen and (max-width: 767px) {
    font-size: 14px;
    padding: 20px 0;
  }
`;

const Preview = styled.div`
  width: 884px;
  height: 500px;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin: 0 auto 16px;
  @media screen and (max-width: 1150px) {
    width: 608px;
    height: fit-content;
  }
  @media screen and (max-width: 767px) {
    max-width: calc(100% - 36px);
  }
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const FooterBox = styled.div`
  background-color: #2e3134;
  height: 10%;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    position: fixed;
    bottom: 0;
    width: calc(100% - 40px);
    height: 40px;
    padding: 18px 20px;
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

const SelectBox = styled.select`
  width: 250px;
  height: 72px;
  background-color: #282a2d;
  box-sizing: border-box;
  border: none;
  color: #5f6368;
  font-size: 18px;
  display: block;
  appearance: none;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 767px) {
    height: 20px;
    font-size: 14px;
    width: calc(100% - 40px);
    margin-bottom: 20px;
  }
`;

const ButtonMobile = styled.button`
  cursor: pointer;
  background-color: #202124;
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 80px;
  margin: 0 0 0 auto;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default BootCommuWrite;

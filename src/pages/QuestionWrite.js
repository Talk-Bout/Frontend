//질문 업로드 임의 게시판
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Body } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { actionCreators as imageActions } from '../redux/modules/image';
import { history } from '../redux/ConfigureStore';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
// import { FiHash } from 'react-icons/fi';

const QuestionWrite = (props) => {
  const dispatch = useDispatch();

  //리뷰 콘텐츠 작성
  const titleInput = useRef(null);
  const contentInput = useRef(null);

  const user_name = useSelector(state => state.user.user.nickname);

  //이미지 불러오기
  const image_url = useSelector((state) => state.image.image_url);

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
    if (window.confirm('변경사항이 저장되지 않을 수 있습니다.')) {
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl());
      history.goBack();
    }
  };

  //setOnePost 불러오기
  useEffect(() => {
    if (question_id) {
      setEditMode(true);
    }
  }, []);

  // 콘텐츠 수정
  const [edit_mode, setEditMode] = React.useState(false);
  const question_id = parseInt(props.match.params.id);
  const question_list = useSelector((state) => state.question.list);
  //수정 전 게시물
  const old_question = question_list.find(
    (question) => question.questionId === question_id
  );

  //포스트 작성
  const create_question = () => {
    if (titleInput.current.value === '') {
      window.alert('제목을 입력해주세요');
      return;
    }
    if (contentInput.current.value === '') {
      window.alert('내용을 입력해주세요');
      return;
    }
    if (edit_mode) {
      const edited_image = preview ? image_url : old_question.image;
      const edit_question = {
        questionId: question_id,
        title: titleInput.current.value,
        content: contentInput.current.value,
        nickname: user_name,
        image: edited_image,
      };
      dispatch(questionActions.editQuestionDB(edit_question));
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl()); //이미지 url 삭제하기
    } else {
      const new_question = {
        title: titleInput.current.value,
        content: contentInput.current.value,
        nickname: user_name,
        image: image_url,
      };
      dispatch(questionActions.createQuestionDB(new_question));
      dispatch(imageActions.getPreview(null)); //이미지 미리보기를 없애기
      dispatch(imageActions.DeleteImageUrl()); //이미지 url 삭제하기
    }
  };

  return (
    <React.Fragment>
      <Grid
        className="background"
        display="flex"
        backgroundColor="#17181b"
        padding='0 0 42px'>
        {/* 바디 */}
        <Body MOBnopadding>
          <Grid className="body-inner" height="100%" padding="24px 0 0" MOBpadding='0'>
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid
                className="header-box"
                height="84px" MOBheight='48px'
                display="flex"
                borderBottom="1px solid #5f6368"
                backgroundColor="#202124"
              >
                {/* 나가기 버튼 */}
                <Grid className="exit-button" width="23.33%" padding="0 40px" MOBpadding='0 10px'>
                  <Text
                    fontSize="35px" TABfontSize='28px' MOBfontSize='20px'
                    color="#e5e5e5"
                    lineHeight="84px" MOBlineHeight='48px'
                    cursor="pointer"
                    _onClick={() => {
                      exitPage();
                    }}
                  >
                    <BsX />
                  </Text>
                </Grid>
                {/* 타이틀 */}
                <Grid className="title" width="53.33%" is_center>
                  <Text fontSize="24px" TABfontSize='20px' MOBfontSize='16px' fontWeight="700" color="#e5e5e5" lineHeight="84px" MOBlineHeight='48px' cursor='default'>
                    질문하기
                  </Text>
                </Grid>
                {/* 등록 버튼 */}
                <Grid className="submit-button" width="23.33%" padding="0 40px" MOBpadding='0 10px'>
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="#848484"
                    lineHeight="84px"
                    float="right"
                    cursor="pointer"
                    _onClick={() => create_question()}
                  >
                    {edit_mode ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                {/* 질문글 제목 */}
                <TitleBox>
                  <Text
                    margin="auto 0"
                    color="#e5e5e5"
                    fontSize="18px"
                    MOBfontSize='16px'
                    fontWeight="700"
                  >
                    Q
                  </Text>
                  <TitleInput
                    placeholder="제목을 입력해주세요."
                    ref={titleInput}
                    defaultValue={edit_mode ? old_question.title : null}
                  />
                </TitleBox>
                <ContentBox>
                  <Textarea
                    rows={preview ? '5' : '15'}
                    placeholder="내용을 입력해주세요."
                    ref={contentInput}
                    defaultValue={edit_mode ? old_question.content : null}
                  />
                </ContentBox>
                {preview ? (
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
                ) : (
                  ''
                )}
              </BodyBox>
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

                {/* <Text
                  fontSize="2.5vh"
                  color="#b3b3b3"
                  margin="0 0 0 10px"
                  cursor="pointer"
                >
                  <FiHash />
                </Text> */}
                <ButtonMobile onClick={() => {
                  create_question();
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
  width: 80%;
  max-width: 1044px;
  height: fit-content;
  margin: auto;
  @media screen and (max-width: 1090px) {
    width: 688px;
    margin: auto;
  }
  @media screen and (max-width: 767px) {
    margin: 0;
    width: 100%;
  }
`;

const BodyBox = styled.div`
  height: 80%;
  padding: 40px 40px 0;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;

const TitleBox = styled.div`
  border-bottom: 1px solid #8f9091;
  padding-bottom: 20px;
  display: flex;
  text-align: center;
  background-color: #282a2d;
  @media screen and (max-width: 767px) {
    border-bottom: 1px solid #5f6368;
  }
`;

const HoverActionBtn = styled.text`
  color: #5f6368;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  line-height: 84px;
  float: right;
  :hover {
    color: #7879f1;
  }
  @media screen and (max-width: 1090px) {
    font-size: 20px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ContentBox = styled.div`
  height: fit-content;
  margin: 0 0 80px;
`;

const TitleInput = styled.input`
  padding: 10px;
  font-size: 16px;
  color: #e5e5e5;
  background-color: #282A2D;
  width: 80%;
  border: none;
  &::placeholder {
    color: #8f9091;
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

const Textarea = styled.textarea`
  width: 95%;
  resize: none;
  padding: 10px;
  margin: 0 10px;
  font-size: 16px;
  background-color: #282a2d;
  border: none;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 16px;
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
  @media screen and (max-width: 1090px) {
    width: 568px;
  }
  @media screen and (max-width: 767px) {
    width: 90%;
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
  @media screen and (max-width: 1090px) {
    width: 608px;
    height: fit-content;
  }
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FooterBox = styled.div`
  background-color: #2e3134;
  height: 10%;
  padding: 20px 40px 20px;
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

export default QuestionWrite;

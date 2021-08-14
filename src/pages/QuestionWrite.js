//질문 업로드 임의 게시판
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { actionCreators as imageActions } from '../redux/modules/image';
//icons
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { FiHash } from 'react-icons/fi';

const QuestionWrite = (props) => {
  const dispatch = useDispatch();

  //리뷰 콘텐츠 작성
  const titleInput = useRef(null);
  const contentInput = useRef(null);
  const user_name = useSelector((state) => state.user.user.nickname);

  //이미지 불러오기
  const image_url = useSelector((state) => state.image.image_url);
  console.log(image_url);

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

  //setOnePost 불러오기
  useEffect(() => {
    if (question_id) {
      setEditMode(true);
    }
  }, []);
  //title, title을 변경할 수 있는 setTitle
  // 수정하고 목록으로 돌아가면 ,setPost 됨. 서버의 내용을 도로 가져오는 함수가 있기 때문에
  // 콘텐츠 수정
  const [edit_mode, setEditMode] = React.useState(false);
  const question_id = props.match.params.id; //작성페이지, 수정페이지인지 구분할 수 있는 부분
  const question_list = useSelector((state) => state.question.list);
  //수정 전 게시물
  const old_question = question_list.find(
    (question) => question.questionId == question_id
  );
  // console.log(old_question);
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
        minHeight="100vh"
      >
        <Sidebar />
        <Body>
          <Grid className="body-inner" height="100%" padding="5vh 0 0">
            <Window>
              <Grid
                className="header-box"
                height="10%"
                display="flex"
                borderBottom="1px solid #8f9091"
                backgroundColor="#212123"
              >
                <Grid className="exit-button" width="23.33%" padding="0 25px">
                  <Text
                    fontSize="4vh"
                    color="#e5e5e5"
                    lineHeight="7.5vh"
                    cursor="pointer"
                    _onClick={() => {
                      history.goBack();
                      exitPage();
                    }}
                  >
                    <BsX />
                  </Text>
                </Grid>
                <Grid className="title" width="53.33%" is_center>
                  <Text
                    fontSize="2.5vh"
                    fontWeight="700"
                    color="#e5e5e5"
                    lineHeight="7vh"
                  >
                    질문하기
                  </Text>
                </Grid>
                <Grid className="submit-button" width="23.33%" padding="0 25px">
                  <Text
                    fontSize="24px"
                    fontWeight="700"
                    color="#848484"
                    lineHeight="84px"
                    float="right"
                    hover="color= '#7879F1'" // 호버 확인!!!!!!!!
                    _onClick={() => {
                      create_question();
                      history.goBack();
                    }}
                  >
                    {edit_mode ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                <TitleBox>
                  <Text margin="auto 0%" color="#e5e5e5">
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
                    rows={preview ? '5' : '10'}
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
                      {/* {imageRef.current.files[0].name} */}
                    </Text>
                  </div>
                ) : (
                  ''
                )}
              </BodyBox>
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

                {/* <Text
                  fontSize="2.5vh"
                  color="#b3b3b3"
                  margin="0 0 0 10px"
                  cursor="pointer"
                >
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
  background-color: #383838;
  width: 80%;
  height: 90%;
  margin: auto;
`;

const saveBtn = styled.text`
  font-size: 2.5vh;
  font-weight: 700;
  color: #848484;
  line-height: 7vh;
  float: right;
  cursor: pointer;
`;

const BodyBox = styled.div`
  height: 80%;
  padding: 20px 40px;
  background-color: #282a2d;
`;

const TitleBox = styled.div`
  height: 5vh;
  border-bottom: 1px solid #8f9091;
  padding-bottom: 20px;
  display: flex;
  text-align: center;
  background-color: #282a2d;
`;

const ContentBox = styled.div`
  height: 40vh;
  padding-top: 20px;
  background-color: #282a2d;
`;

const TitleInput = styled.input`
  background-color: #383838;
  padding: 10px;
  font-size: 1.7vh;
  color: #e5e5e5;
  background-color: #282a2d;
  width: 80%;
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
  margin-left: 10px;
  font-size: 1.7vh;
  background-color: #282a2d;
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

export default QuestionWrite;

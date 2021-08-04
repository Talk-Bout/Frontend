//질문 업로드 임의 게시판
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { RiAtLine } from 'react-icons/ri';
import { FiHash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';

const QuestionWrite = (props) => {
  const dispatch = useDispatch();
  //리뷰 콘텐츠 작성
  // const [title, setTitle] = React.useState('');
  // const [content, setContent] = React.useState('');
  const titleInput = useRef(null);
  const contentInput = useRef(null);

  //title, title을 변경할 수 있는 setTitle
  // 수정하고 목록으로 돌아가면 ,setPost 됨. 서버의 내용을 도로 가져오는 함수가 있기 때문에
  // 콘텐츠 수정
  const [edit_mode, setEditMode] = React.useState(false);
  const question_id = props.match.params.id; //작성페이지, 수정페이지인지 구분할 수 있는 부분
  const board_name = 'question';
  console.log(question_id);

  //setOnePost 불러오기
  useEffect(() => {
    if (question_id) {
      setEditMode(true);
    }
  }, []);
  const question_list = useSelector((state) => state.post.list);
  const old_question = question_list.find((post) => post.postId == question_id);
  console.log(old_question);
  //포스트 작성
  const addQuestion = () => {
    console.log(titleInput, contentInput);
    const new_post = {
      postId: question_id,
      title: titleInput.current.value,
      content: contentInput.current.value,
      nickname: 'username',
      category: 'testing',
      board_name: board_name,
    };
    if (edit_mode) {
      dispatch(questionActions.editPostDB(new_post));
    } else {
      dispatch(questionActions.addPostDB(new_post));
      history.goBack();
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
          <Grid className="body-inner" height="110%" padding="5vh 0 0">
            <Window>
              <Grid
                className="header-box"
                height="10%"
                display="flex"
                borderBottom="1px solid #8f9091"
              >
                <Grid className="exit-button" width="23.33%" padding="0 25px">
                  <Text
                    fontSize="4vh"
                    color="#e5e5e5"
                    lineHeight="7.5vh"
                    cursor="pointer"
                    _onClick={() => history.push('/question')}
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
                    fontSize="2.5vh"
                    fontWeight="700"
                    color="#848484"
                    lineHeight="7vh"
                    float="right"
                    cursor="pointer"
                    _onClick={() => addQuestion()}
                  >
                    {edit_mode ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                <TitleBox>
                  <TitleInput
                    placeholder="제목을 입력해주세요"
                    ref={titleInput}
                    defaultValue={edit_mode ? old_question.title : null}
                  />
                </TitleBox>
                <ContentBox>
                  <Textarea
                    rows="15"
                    placeholder="내용을 입력해주세요"
                    ref={contentInput}
                    defaultValue={edit_mode ? old_question.content : null}
                  />
                </ContentBox>
              </BodyBox>
              <FooterBox>
                <Text
                  fontSize="2.5vh"
                  color="#b3b3b3"
                  margin="0 10px 0 0"
                  cursor="pointer"
                >
                  <BiImageAdd />
                </Text>
                <Text
                  fontSize="2.5vh"
                  color="#b3b3b3"
                  margin="0 10px 0"
                  cursor="pointer"
                >
                  <RiAtLine />
                </Text>
                <Text
                  fontSize="2.5vh"
                  color="#b3b3b3"
                  margin="0 0 0 10px"
                  cursor="pointer"
                >
                  <FiHash />
                </Text>
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
  height: 40vh;
  padding-top: 20px;
`;

const TitleInput = styled.input`
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

export default QuestionWrite;

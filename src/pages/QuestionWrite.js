//질문 업로드 임의 게시판
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import { history } from '../redux/ConfigureStore';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';

const QuestionWrite = (props) => {
  const dispatch = useDispatch();
  //리뷰 콘텐츠 작성
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  // 콘텐츠 수정
  const [edit_mode, setEditMode] = React.useState(false);
  const question_id = props.match.params.id; //작성페이지, 수정페이지인지 구분할 수 있는 부분
  const board_name = 'question';

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
    console.log(title, content);
    const new_post = {
      postId: question_id,
      title: title,
      content: content,
      nickname: 'username',
      category: 'testing',
      board_name: board_name,
    };
    //동시에 3가지 액션을 띄우려고 하니 다른 페이지로 이동해서 바로 새로고침이 되고 새로운 데이터가 들어가는 것을 보여줄 시간이 없다.
    // history.push, window.alert를 다른 곳에서 지정해줘야 한다.
    if (edit_mode) {
      dispatch(questionActions.editPostDB(new_post));
      // history.push(`/question/detail/${old_question.postId}`);
    }
    // window.alert('질문이 수정되었습니다');
    // history.push(`/question/detail/${old_question.postId}`);
    else {
      dispatch(questionActions.addPostDB(new_post));
      // window.alert('질문이 등록되었습니다');
      // history.goBack();
    }
  };

  return (
    <React.Fragment>
      <Grid backgroundColor="gray" height="100vh" padding="15vh">
        <Grid backgroundColor="#fff" width="45vw" height="65vh" margin="auto">
          <WindowInner>
            <HeaderBox>
              <Button width="7%" _onClick={() => history.goBack()}>
                X
              </Button>
              <Text
                margin="0 13vw"
                fontSize="2vh"
                fontWeight="700"
                lineHeight="4vh"
              >
                질문 작성
              </Text>
              <Button
                width="7%"
                _onClick={() => {
                  addQuestion();
                }}
              >
                {edit_mode ? '수정' : '등록'}
              </Button>
            </HeaderBox>
            <hr style={{ margin: '1vh 0', borderTop: '1px solid #eee' }} />
            <BodyBox>
              <Row>
                <Key>제목</Key>
                <input
                  placeholder={'제목을 입력해주세요'}
                  defaultValue={edit_mode ? old_question.title : null}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </Row>

              <Row>
                <Key>내용</Key>
                <input
                  multiLine
                  placeholder={'무엇을 질문하고 싶나요?'}
                  defaultValue={edit_mode ? old_question.content : null}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></input>
              </Row>
            </BodyBox>
          </WindowInner>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const WindowInner = styled.div`
  padding: 2vh 2vw;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-evenly;
`;

const BodyBox = styled.div`
  padding: 1vh 0;
`;

const Row = styled.div`
  margin: 2vh 0;
`;

const Key = styled.span`
  font-size: 1.8vh;
  font-weight: 700;
  margin-right: 2vw;
`;

export default QuestionWrite;

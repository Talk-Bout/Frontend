import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, AnswerCard } from '../components';
import { Profile_medium } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { history } from '../redux/ConfigureStore';
import { BiLike, BiComment, BiPencil, BiTrashAlt } from 'react-icons/bi';
import { BsEye, BsThreeDotsVertical, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Button, Menu, MenuItem } from '@material-ui/core';

const QuestionDetail = (props) => {
  const dispatch = useDispatch();
  const question_id = parseInt(
    window.location.pathname.split('/question/detail/')[1]
  );
  const question_list = useSelector((state) => state.question.list);
  const question_found = question_list.find(
    (question) => question.questionId === question_id
  );

  const user_name = useSelector(state => state.user.user.nickname);
  const profilePic = useSelector(state => state.user.user.profilePic);
  const [MenuLink, setMenuLink] = useState(null);
  const is_login = useSelector((state) => state.user.is_login);

  //Answer 작성
  const answerInput = useRef(null);
  const all_answer = useSelector((state) => state.question.answer_list);
  const answer_list = all_answer.filter(
    (answer) => answer.questionId === question_id
  );

  const [answer_page, setAnswerPage] = useState(2);

  //북마크 목록
  const question_bookmark_list = useSelector(
    (state) => state.question.bookmark_list
  );
  const question_bookmark = question_bookmark_list.find(
    (bookmark) => bookmark.questionId === question_id
  );

  // 질문 좋아요 목록
  const question_like_list = useSelector(
    (state) => state.question.question_like_list
  );

  const question_like = question_like_list.find(
    (like) => like.nickname === user_name
  );

  useEffect(() => {
    dispatch(questionActions.setOneQuestionDB(question_id));
    dispatch(questionActions.setAnswerDB(question_id, 1));
    if (is_login) {
      dispatch(questionActions.setQuestionBookmarkDB(user_name));
    }
  }, [question_id]);

  if (!question_found) {
    return <></>;
  }

  // 질문 작성자 프로필 사진
  const user_profile = question_found.user.profilePic;
  const user_profile_url = `https://fw3efsadfcv.shop${question_found.user.profilePic}`

  // 수정 삭제 버튼
  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  };

  const handleClose = () => {
    setMenuLink(null);
  };

  const editBtn = () => {
    history.push(`/question/write/${question_id}`);
  };

  const deleteBtn = () => {
    dispatch(questionActions.deleteQuestionDB(question_id));
    history.push(`/question`);
  };

  // 답변 작성
  const createAnswerBtn = () => {
    const new_answer = {
      content: answerInput.current.value,
      nickname: user_name,
      questionId: question_id,
    };
    if (!is_login) {
      window.alert('로그인 후에 이용 가능합니다.');
      return;
    }
    if (answerInput.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }
    dispatch(questionActions.createAnswerDB(new_answer, profilePic));
    answerInput.current.value = '';
  };

  //Answer 더보기
  const moreAnswer = () => {
    dispatch(questionActions.setNextAnswerDB(question_id, answer_page));
    setAnswerPage(answer_page + 1);
  };

  //북마크
  const add_bookmark = () => {
    dispatch(questionActions.addQuestionBookmarkDB(question_id, user_name));
  };

  const delete_bookmark = (bookmark_id) => {
    dispatch(
      questionActions.deleteQuestionBookmarkDB(question_id, bookmark_id)
    );
  };

  //질문 좋아요
  const likeQuestion = () => {
    dispatch(questionActions.likeQuestionDB(question_id, user_name));
  };

  const unlikeQuestion = (questionLikeId) => {
    dispatch(questionActions.unlikeQuestionDB(question_id, questionLikeId));
  };

  return (
    <React.Fragment>
      <Grid display="flex">
        <Sidebar />
        <Body header footer>
          <Grid>
            {/* 질문 카드 */}
            <QuestionBox>
              <Grid display="flex">
                <Grid width="100%" TABmargin='11px 0 0' MOBmargin='6px 0 0'>
                  {/* 제목 */}
                  <Text fontSize="24px" MOBfontSize='16px' fontWeight="700" color="#ffffff" cursor='default'>
                    Q
                  </Text>
                  <Text fontSize="24px" MOBfontSize='16px' fontWeight="700" margin="0 8px" color="#ffffff" cursor='text' userSelect='text'>
                    {question_found.title}
                  </Text>
                </Grid>
                {/* 북마크와 수정 삭제 */}
                {/* 북마크 버튼은 로그인한 사용자만 보여주기 */}
                <ButtonBox>
                  {is_login &&
                    <>
                      {question_bookmark ?
                        <Text padding="0" color="#7879F1" fontSize="24px" MOBfontSize='18px' lineHeight="35px" verticalAlign="middle" cursor="pointer" hover="opacity: 0.7" _onClick={() => delete_bookmark(question_bookmark.questionBookmarkId)}>
                          <BsBookmarkFill />
                        </Text>
                        :
                        <Text padding="0" color="#9aa0a6" fontSize="24px" MOBfontSize='18px' lineHeight="35px" verticalAlign="middle" cursor="pointer" hover="opacity: 0.7" _onClick={() => add_bookmark()}>
                          <BsBookmark />
                        </Text>
                      }
                    </>
                  }
                  {/* 드롭 다운 버튼 */}
                  {question_found.nickname === user_name ?
                    <>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Text padding="0" color="#9AA0A6" fontSize="24px" MOBfontSize='18px' lineHeight="35px" hover="opacity: 0.8">
                          <BsThreeDotsVertical />
                        </Text>
                      </Button>
                      <Menu id="simple-menu" anchorEl={MenuLink} keepMounted open={Boolean(MenuLink)} onClose={handleClose}>
                        <MenuItem onClick={() => { handleClose(); editBtn() }}>
                          수정하기
                          <Text margin="0 0 0 10px"><BiPencil /></Text>
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); deleteBtn(); }}>
                          삭제하기
                          <Text margin="0 0 0 10px"><BiTrashAlt /></Text>
                        </MenuItem>
                      </Menu>
                    </>
                    :
                    ''
                  }
                </ButtonBox>
              </Grid>
              {/* {Question 글쓴이 프로필 }*/}
              <Grid display="flex" justifyContent='space-between' margin="10px 0" TABmargin='24px 0 32px' MOBmargin='16px 0'>
                <Grid width='fit-content' display='flex'>
                  <Grid width="40px" MOBwidth='28px'>
                    <Image src={user_profile == null || user_profile === 'null' ? Profile_medium : user_profile_url}></Image>
                  </Grid>
                  <Grid width="fit-content">
                    <Text p margin="auto 10px" fontSize="14px" MOBfontSize='12px' fontWeight="600" color="#9aa0a6" cursor='default'>
                      {question_found.nickname}
                    </Text>
                    <Text p margin="auto 10px" fontSize='14px' MOBfontSize='8px' color="#bdc1c6" cursor='default'>
                      {question_found.createdAt}
                    </Text>
                  </Grid>
                </Grid>
                {/* 모바일 버전에서는 북마크, 수정/삭제 버튼이 작성자 닉네임 옆에 오기 */}
                <ButtonBoxMOB>
                  {is_login &&
                    <>
                      {question_bookmark ?
                        <Text padding="0" color="#7879F1" fontSize="24px" MOBfontSize='18px' lineHeight="35px" verticalAlign="middle" cursor="pointer" hover="opacity: 0.7" onClick={() => delete_bookmark(question_bookmark.questionBookmarkId)}>
                          <BsBookmarkFill />
                        </Text>
                        :
                        <Text padding="0" color="#9aa0a6" fontSize="24px" MOBfontSize='18px' lineHeight="35px" verticalAlign="middle" cursor="pointer" hover="opacity: 0.7" onClick={() => add_bookmark()}>
                          <BsBookmark />
                        </Text>
                      }
                    </>
                  }
                  {/* 드롭 다운 버튼 */}
                  {question_found.nickname === user_name ?
                    <>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Text padding="0" color="#9AA0A6" fontSize="24px" MOBfontSize='18px' lineHeight="35px" hover="opacity: 0.8">
                          <BsThreeDotsVertical />
                        </Text>
                      </Button>
                      <Menu id="simple-menu" anchorEl={MenuLink} keepMounted open={Boolean(MenuLink)} onClose={handleClose}>
                        <MenuItem onClick={() => { handleClose(); editBtn() }}>
                          수정하기
                          <Text margin="0 0 0 10px"><BiPencil /></Text>
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); deleteBtn(); }}>
                          삭제하기
                          <Text margin="0 0 0 10px"><BiTrashAlt /></Text>
                        </MenuItem>
                      </Menu>
                    </>
                    :
                    ''
                  }
                </ButtonBoxMOB>
              </Grid>
              {/* Question 본문 내용 */}
              <Text p margin="50px 0" TABmargin='0 0 48px' MOBmargin='0 0 24px' fontSize="16px" MOBfontSize='14px' color="#bdc1c6" cursor='text' userSelect='text' whiteSpace='pre-line' wordBreak='break-all'>
                {question_found.content}
              </Text>
              {question_found.image ?
                <ImageBox>
                  <Image src={`https://fw3efsadfcv.shop${question_found.image}`} />
                </ImageBox>
                :
                ''
              }
              {/* 좋아요 수 */}
              {/* 내가 좋아요를 눌렀다면, 보라색 */}
              {/* 누르지 않았다면, 하얀색으로 보여주기 */}
              <Grid display="flex" margin="56px 0 47px" MOBmargin='24px 0' verticalAlign="center">
                <Text backgroundColor='#202124' padding='8px 16px' borderRadius='10px'>
                  {is_login ?
                    question_like ?
                      <Text color="#7879F1" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => unlikeQuestion(question_like.questionLikeId)}>
                        <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' verticalAlign='middle' lineHeight='30px'><BiLike /></Text>
                        {question_like_list.length}
                      </Text>
                      :
                      <Text color="#BDC1C6" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => likeQuestion()}>
                        <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' verticalAlign='middle' lineHeight='30px'><BiLike /></Text>
                        {question_like_list.length}
                      </Text>
                    :
                    <Text color="#BDC1C6" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="default">
                      <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' verticalAlign='middle' lineHeight='30px'><BiLike /></Text>
                      {question_like_list.length}
                    </Text>
                  }
                </Text>
                {/* 답변 수 */}
                <Text color="#C4C4C4" fontSize='12px' margin="auto 16px" cursor='default'>
                  <Text fontSize='20px' MOBfontSize='14px' lineHeight='30px' margin='0 6px 0 0' verticalAlign='middle'>
                    <BiComment />
                  </Text>
                  {question_found.answerNumber}
                </Text>
                {/* 조회수 */}
                <Text color="#C4C4C4" fontSize='12px' margin="auto 16px auto 0" cursor='default'>
                  <Text fontSize='20px' MOBfontSize='14px' lineHeight='30px' margin='0 6px' verticalAlign='middle'>
                    <BsEye />
                  </Text>
                  {question_found.viewCount}
                </Text>
              </Grid>
            </QuestionBox>
          </Grid>
          <AnswerBox>
            {/* 답변 등록 input */}
            {/* 로그인 상태에서만 보여주기 */}
            {is_login &&
              <AddAnswerSection>
                <Text p fontWeight="700" fontSize="14px" color="#E2E2E3" cursor='default'>
                  답변
                </Text>
                <ACommentBox>
                  <AInput rows="4" placeholder="답변을 남긴 이후에는 수정 및 삭제가 불가하오니,
신중하게 작성해 주시길 부탁드립니다." ref={answerInput} />
                  <AnswerSaveButton onClick={() => createAnswerBtn()}>
                    답변 추가하기
                  </AnswerSaveButton>
                </ACommentBox>
              </AddAnswerSection>
            }
            {/* 답변 목록  */}
            {answer_list && answer_list.map((answer, idx) => {
              return <AnswerCard key={answer.answerId} {...answer} />;
            })}
            {/* 답변이 하나도 없는 경우 보여주는 문구 */}
            {answer_list.length === 0 &&
              <Grid margin='50px auto 0' width='fit-content' is_center>
                <Text p color='#9aa0a6' fontSize='14px' margin='0' cursor='default'>아직 답변을 기다리고 있는 질문입니다.</Text>
                <Text color='#9aa0a6' fontSize='14px' cursor='default'>{is_login ? '' : '로그인 하신 후, '}첫 번째 답변의 주인공이 되어주세요!</Text>
              </Grid>
            }
            {/* 총 답변 개수가 5개 이상인 경우 화살표(더보기) 버튼 보여주기  */}
            {all_answer.length >= 5 &&
              <Grid margin="auto" width="fit-content">
                <Button onClick={() => moreAnswer()}>
                  <MdKeyboardArrowDown size="40" color="#F2F3F4" />
                </Button>
              </Grid>
            }
          </AnswerBox>
        </Body>
      </Grid >
    </React.Fragment >
  );
};

const QuestionBox = styled.div`
  width: 1041px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    width: 800px;
  }
  @media screen and (max-width: 1150px) {
    width: 660px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ButtonBox = styled.div`
  min-width: 90px;
  float: right;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ButtonBoxMOB = styled.div`
  min-width: fit-content;
  float: right;
  @media screen and (min-width: 768px) {
    display: none;
  }
  .MuiButton-root {
    min-width: fit-content;
  }
`;

const ImageBox = styled.div`
  width: 70%;
  border: none;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
  margin: 32px auto;
  @media screen and (max-width: 767px) {
    width: 80%;
    margin: 0 auto;
    padding: 0;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  object-fit: contain; //가로세로 비율 콘텐츠 박스 크기에 맞춤
`;

//Answer Section
const AnswerBox = styled.div`
  min-height: 100vh;
  margin: 0 -40px -80px -40px;
  padding: 10px 0 120px;
  background-color: #282a2d;
  @media screen and (max-width: 1150px) {
    margin: 0 -18px -65px -18px;
    padding-bottom: 65px;
  }
  @media screen and (max-width: 767px) {
    margin: 0 -18px;
    padding: 10px 0 50px;
  }
`;

const ACommentBox = styled.div`
  background-color: #212123;
  border-radius: 12px;
  border: 1px solid #9aa0a6;
  width: 100%;
  overflow: hidden;
`;

const AddAnswerSection = styled.div`
  width: 1044px;
  margin: 10px auto;
  @media screen and (max-width: 1200px) {
    width: 800px;
  }
  @media screen and (max-width: 1150px) {
    width: 660px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 36px);
    padding: 0 18px;
  }
`;

const AInput = styled.textarea`
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  border: none;
  border-radius: 12px;
  background-color: #212123;
  color: #dadce0;
  resize: none;
  padding: 20px;
  width: 1000px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #4e5357;
    line-height: 24px;
    font-size: 18px;
  }
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
  @media screen and (max-width: 1200px) {
    width: 760px;
  }
  @media screen and (max-width: 1150px) {
    width: 620px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 36px);
  }
`;

const AnswerSaveButton = styled.button`
  border-radius: 8px;
  border: 0;
  outline: 0;
  color: #121212;
  font-weight: 700;
  padding: 15px 40px;
  margin-left: 866px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 630px;
  }
  @media screen and (max-width: 1150px) {
    margin-left: 490px;
  }
  @media screen and (max-width: 767px) {
    font-weight: 400;
    font-size: 12px;
    margin-left: 10px;
    padding: 10px 25px;
  }
`;

export default QuestionDetail;

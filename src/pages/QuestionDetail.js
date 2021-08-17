import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { history } from '../redux/ConfigureStore';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import AnswerCard from '../components/AnswerCard';

//icons
import { BiLike, BiComment, BiPencil, BiTrashAlt } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { Button, Menu, MenuItem } from '@material-ui/core';
import {
  BsThreeDotsVertical,
  BsBookmark,
  BsBookmarkFill,
} from 'react-icons/bs';
import profile_medium from '../image/profile_medium.png';
import { MdKeyboardArrowDown } from 'react-icons/md';

const QuestionDetail = (props) => {
  const dispatch = useDispatch();
  const question_id = parseInt(
    window.location.pathname.split('/question/detail/')[1]
  );
  const question_list = useSelector((state) => state.question.list);
  const question_found = question_list.find(
    (question) => question.questionId == parseInt(question_id)
  );

  const user_name = useSelector((state) => state.user.user.nickname);
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
    (bookmark) => bookmark.questionId == question_id
  );

  // 질문 좋아요 목록
  const question_like_list = useSelector(
    (state) => state.question.question_like_list
  );

  const question_like = question_like_list.find(
    (like) => like.nickname == user_name
  );

  // 콘솔이 두 번씩 찍힘 : 들어왔을때 콘솔 +1(렌더링), 셋원포스트 +1(useEffect)
  // 한 번 더 렌더링이 되면서 날아감
  useEffect(() => {
    dispatch(questionActions.setOneQuestionDB(question_id));
    dispatch(questionActions.setAnswerDB(question_id, 1));
    dispatch(questionActions.setQuestionBookmarkDB());
  }, []);

  if (!question_found) {
    return <></>;
  }

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

    dispatch(questionActions.createAnswerDB(new_answer));
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
            <Grid width="1041px" margin="10px auto">
              <Grid display="flex">
                <Grid width="80%">
                  <Text fontSize="24px" fontWeight="600" color="#ffffff">
                    Q
                  </Text>
                  <Text
                    fontSize="24px"
                    fontWeight="600"
                    margin="auto 2%"
                    color="#ffffff"
                  >
                    {question_found.title}
                  </Text>
                </Grid>
                {/* 북마크와 수정 삭제 */}
                <Grid display="flex" width="auto" margin="0 0 0 auto">
                  {question_bookmark ? (
                    <Button
                      padding="0"
                      width="16.33px"
                      height="21px"
                      onClick={() =>
                        delete_bookmark(question_bookmark.questionBookmarkId)
                      }
                    >
                      <Text
                        padding="0"
                        color="#7879F1"
                        fontSize="24px"
                        lineHeight="35px"
                        vertical_align="middle"
                        cursor="pointer"
                        hover="opacity: 0.7"
                      >
                        <BsBookmarkFill />
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      padding="0"
                      width="16.33px"
                      height="21px"
                      onClick={() => add_bookmark()}
                    >
                      <Text
                        padding="0"
                        color="#9aa0a6"
                        fontSize="24px"
                        lineHeight="35px"
                        vertical_align="middle"
                        cursor="pointer"
                        hover="opacity: 0.7"
                      >
                        <BsBookmark />
                      </Text>
                    </Button>
                  )}

                  {/* 드롭 다운 버튼 */}
                  {question_found.nickname === user_name ? (
                    <>
                      <Button
                        padding="0"
                        width="16.33px"
                        height="21px"
                        bg="transparent"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <Text
                          padding="0"
                          color="#9AA0A6"
                          fontSize="24px"
                          lineHeight="35px"
                          hover="opacity: 0.8"
                        >
                          <BsThreeDotsVertical />
                        </Text>
                      </Button>

                      <Menu
                        id="simple-menu"
                        anchorEl={MenuLink}
                        keepMounted
                        open={Boolean(MenuLink)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => {
                            editBtn();
                          }}
                        >
                          수정하기
                          <Text margin="0 0 0 10px">
                            <BiPencil />
                          </Text>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            deleteBtn();
                          }}
                        >
                          삭제하기
                          <Text margin="0 0 0 10px">
                            <BiTrashAlt />
                          </Text>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
              {/* {Question 글쓴이 프로필 }*/}
              <Grid display="flex" margin="10px 0">
                <Grid width="40px">
                  <Image src={profile_medium} size="5"></Image>
                </Grid>

                <Grid width="40%">
                  {question_found.nickname === null ? (
                    <Text
                      p
                      margin="auto 10px"
                      fontSize="14px"
                      fontWeight="600"
                      color="#ffffff"
                    >
                      탈퇴한 회원입니다.
                    </Text>
                  ) : (
                    <Text
                      p
                      margin="auto 10px"
                      fontSize="14px"
                      fontWeight="600"
                      color="#ffffff"
                    >
                      {question_found.nickname}
                    </Text>
                  )}

                  <Text p margin="auto 10px" color="#C4C4C4">
                    {question_found.createdAt}
                  </Text>
                </Grid>
              </Grid>

              {/* Question 본문 내용 */}
              <Text p margin="50px 0%" fontSize="16px" color="#C4C4C4">
                {question_found.content}
              </Text>

              {question_found.image ? (
                <ImageBox>
                  <Image src={`http://13.209.12.149${question_found.image}`} />
                </ImageBox>
              ) : (
                ''
              )}

              {/* 좋아요/ 댓글수/ 조회수 */}
              <Grid display="flex" margin="3% 0%" vertical-align="center">
                {question_like ? (
                  <span
                    style={{
                      backgroundColor: '#202124',
                      padding: '8px 16px',
                      borderRadius: '10px',
                    }}
                  >
                    <Text
                      color="#7879F1"
                      fontSize="14px"
                      fontWeight="700"
                      lineHeight="18px"
                      cursor="pointer"
                      _onClick={() =>
                        unlikeQuestion(question_like.questionLikeId)
                      }
                    >
                      <span
                        style={{
                          fontSize: '24px',
                          margin: '0 8px 0 0',
                          verticalAlign: 'middle',
                          lineHeight: '30px',
                        }}
                      >
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {question_like_list.length}
                    </Text>
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: '#202124',
                      padding: '8px 16px',
                      borderRadius: '10px',
                    }}
                  >
                    <Text
                      color="#BDC1C6"
                      fontSize="14px"
                      fontWeight="700"
                      lineHeight="18px"
                      cursor="pointer"
                      _onClick={() => likeQuestion()}
                    >
                      <span
                        style={{
                          fontSize: '24px',
                          margin: '0 8px 0 0',
                          verticalAlign: 'middle',
                          lineHeight: '30px',
                        }}
                      >
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {question_like_list.length}
                    </Text>
                  </span>
                )}

                <Text color="#C4C4C4" margin="auto 6px">
                  <span style={{ lineHeight: '30px', verticalAlign: 'middle' }}>
                    <BiComment /> {all_answer.length}
                  </span>
                </Text>

                <Text color="#C4C4C4" margin="auto 6px">
                  <span
                    style={{
                      lineHeight: '30px',
                      verticalAlign: 'middle',
                    }}
                  >
                    <BsEye />
                    {question_found.viewCount}
                  </span>
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <AnswerBox>
            {/* 답변 등록 input */}
            <AddAnswerSection>
              <Text p fontWeight="600" fontSize="14px" color="#E2E2E3">
                답변
              </Text>
              <ACommentBox>
                <AInput
                  rows="5"
                  placeholder="부트캠퍼들의 질문에 답변을 남겨주세요.
답변을 남긴 이후에는 수정 및 삭제가 불가하오니 신중하게 써주시길 부탁드립니다."
                  ref={answerInput}
                />
                <AnswerSaveButton onClick={() => createAnswerBtn()}>
                  답변 추가하기
                </AnswerSaveButton>
              </ACommentBox>
            </AddAnswerSection>
            {/* 새롭게 작성되는 답변 내용  */}
            {answer_list &&
              answer_list.map((answer, idx) => {
                return <AnswerCard key={answer.answerId} {...answer} />;
              })}

            {all_answer.length < 5 ? null : (
              <Grid margin="auto" width="10%">
                <Button onClick={() => moreAnswer()}>
                  <MdKeyboardArrowDown size="40" color="#F2F3F4" />
                </Button>
              </Grid>
            )}
          </AnswerBox>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

//Answer Section
const AnswerBox = styled.div`
  min-height: 100vh;
  margin: 0 -40px -80px -40px;
  padding-bottom: 80px;
  /* width: 1340px; */
  background-color: #282a2d;
  /* background-color: yellow; */
`;

const ACommentBox = styled.div`
  /* color: #5d6065; */
  background-color: #212123;
  border-radius: 12px;
  border: 1px solid #9aa0a6;
  width: 100%;
`;
const ImageBox = styled.div`
  width: 70%;
  border: none;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
  margin: 32px auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain; //가로세로 비율 콘텐츠 박스 크기에 맞춤
`;

const AddAnswerSection = styled.div`
  width: 1044px;
  margin: 10px auto;
  padding-top: 30px;
`;

const AInput = styled.textarea`
  font-size: 14px;
  line-height: 18px;
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
`;

export default QuestionDetail;

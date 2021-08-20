import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text, FloatingBtn, Emoji } from '../elements';
import { Sidebar, Body, QnaCard } from '../components';
import { Fire_emoji } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { history } from '../redux/ConfigureStore';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';

const QuestionList = (props) => {
  const dispatch = useDispatch();
  const qna_list = useSelector((state) => state.question.list);
  const pop_qna_list = useSelector((state) => state.question.popular_list);

  const [popPage, setPopPage] = useState(false);
  const [page, setPage] = useState(1);

  //인기순정렬
  const set_popular = () => {
    dispatch(questionActions.setQuestionPopDB(page));
    setPopPage(true);
  };

  const set_latest = () => {
    dispatch(questionActions.setQuestionDB(page));
    setPopPage(false);
  };

  //페이지네이션
  useEffect(() => {
    if (popPage) {
      dispatch(questionActions.setQuestionPopDB(page));
    } else {
      dispatch(questionActions.setQuestionDB(page));
    }
  }, [page]);

  //1 페이지
  const question_page = qna_list.slice(0, 12);
  const pop_question_page = pop_qna_list.slice(0, 12);

  //이전 페이지로 이동
  const toPrePage = () => {
    setPage(page - 1);
  };
  //다음 페이지로 이동
  const toNextPage = () => {
    setPage(page + 1);
  };

  return (
    <React.Fragment>
      <FloatingBtn _onClick={() => history.push(`/question/write`)} />
      <Grid display="flex">
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header footer>
          <Grid
            className="Title-btn"
            display="flex"
            width="100%"
            justifyContent="space-between"
          >
            {/* Q&A 게시판 타이틀 */}
            <div>
              <Text
                p
                color="#F8F9FA"
                fontWeight="700"
                fontSize="32px"
                TABfontSize='20px'
                margin="0 0 8px"
              >
                <Emoji src={Fire_emoji} alt='불' height='32px' TABheight='20px' margin='0 8px 0 0'/>질문과 답변
              </Text>
              <Text color="#BDC1C6" fontSize="20px" TABfontSize='12px'>
                &nbsp;&nbsp;const 질문과_답변 = ( Question) =&gt; &#123; return Answer
                &#125;
              </Text>
            </div>
            <div
              style={{
                padding: '10px 0px',
                textAlign: 'right',
                // margin: '0 10px',
                alignItems: 'center',
                // backgroundColor: 'yellow',
              }}
            >
              {/* 인기순 정렬 버튼 */}
              {popPage ? (
                <Text
                  fontSize="16px"
                  color="#F8F9fA"
                  lineHeight="32px"
                  margin="0 16px"
                  cursor="pointer"
                  _onClick={() => set_latest()}
                >
                  <span
                    style={{
                      fontSize: '24px',
                      marginRight: '8px',
                      verticalAlign: 'middle',
                    }}
                  >
                    <RiArrowUpDownFill />
                  </span>
                  인기순
                </Text>
              ) : (
                <Text
                  fontSize="16px"
                  color="#F8F9fA"
                  lineHeight="32px"
                  margin="0 16px"
                  cursor="pointer"
                  _onClick={() => set_popular()}
                >
                  <span
                    style={{
                      fontSize: '24px',
                      marginRight: '8px',
                      verticalAlign: 'middle',
                    }}
                  >
                    <RiArrowUpDownFill />
                  </span>
                  최신순
                </Text>
              )}

              {/* 글쓰기 버튼 */}
              <WriteBtn onClick={() => history.push('/question/write')}>
                <Text fontSize="16px" color="#7879F1">
                  <BiPencil /> 글쓰기
                </Text>
              </WriteBtn>
            </div>
          </Grid>
          {/* Q&A 게시글 목록 */}

          {popPage ? (
            <CardList>
              {pop_question_page.map((q, idx) => {
                return (
                  <QnaCard
                    key={q.questionId}
                    {...q}
                    _onClick={() =>
                      history.push(`/question/detail/${q.questionId}`)
                    }
                  />
                ); //props 넘기기(이름포함)
              })}
            </CardList>
          ) : (
            <CardList>
              {question_page.map((q, idx) => {
                return (
                  <QnaCard
                    key={q.questionId}
                    {...q}
                    _onClick={() =>
                      history.push(`/question/detail/${q.questionId}`)
                    }
                  />
                ); //props 넘기기(이름포함)
              })}
            </CardList>
          )}

          {/* 페이지네이션 */}
          <Grid height="7vh" is_center margin="8px 0 0">
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
              <Text fontSize="14px" margin="0 20px 0 0">
                <Page onClick={() => toPrePage()}>
                  {page === 1 ? '' : <BsChevronLeft />}
                </Page>
              </Text>
              {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text fontSize="14px" margin="0 20px 0">
                <Page onClick={() => toPrePage()}>
                  {page === 1 ? '' : page - 1}
                </Page>
              </Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
              <Text fontSize="14px" margin="0 20px 0">
                <Page style={{ opacity: 1 }}>{page}</Page>
              </Text>
              {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
              <Text fontSize="14px" margin="0 20px 0">
                {popPage ? (
                  <Page onClick={() => toNextPage()}>
                    {pop_qna_list.length > 12 ? page + 1 : ''}
                  </Page>
                ) : (
                  <Page onClick={() => toNextPage()}>
                    {qna_list.length > 12 ? page + 1 : ''}
                  </Page>
                )}
              </Text>
              {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
              <Text fontSize="14px" margin="0 0 0 20px">
                {popPage ? (
                  <Page onClick={() => toNextPage()}>
                    {pop_qna_list.length > 12 ? <BsChevronRight /> : ''}
                  </Page>
                ) : (
                  <Page onClick={() => toNextPage()}>
                    {qna_list.length > 12 ? <BsChevronRight /> : ''}
                  </Page>
                )}
              </Text>
            </PageBox>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const WriteBtn = styled.button`
  width: 120px;
  height: 48px;
  background-color: transparent;
  border: 1px solid #7879f1;
  border-radius: 8px;
  cursor: pointer;
  vertical-align: middle;
  &:active {
    opacity: 0.7;
  }
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const CardList = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  gap: 24px 16px;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    gap: 24px 12px;
  }
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin-top: 24px;
  }
`;

const Page = styled.span`
  opacity: 0.5;
  cursor: pointer;
  /* color: rgba(255, 255, 255, 0.87); // 선택된 페이지 색깔 */
  color: rgba(255, 255, 255, 0.33); // 선택되지 않은 페이지 색깔
  &:hover {
    opacity: 1;
  }
`;

export default QuestionList;

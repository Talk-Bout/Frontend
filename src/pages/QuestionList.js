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

  const is_login = useSelector(state => state.user.is_login);

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
      <Grid display="flex">
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          {/* 질문과 답변 타이틀 */}
          <Grid className='Title' height='fit-content' TABmargin='15px 0 0'>
            <Text color="#F8F9FA" fontWeight="700" fontSize="32px" TABfontSize='20px' TABmargin='15px 0 0' cursor='default'>
              <Emoji src={Fire_emoji} alt='불' height='32px' TABheight='20px' margin='0 8px 0 0' />질문과 답변
            </Text>
          </Grid>
          <Grid className='Descr-btn' display='flex' justifyContent='space-between' height='fit-content'>
            <Text color="#BDC1C6" fontSize="20px" TABfontSize='12px' lineHeight='52px' TABlineHeight='32px' cursor='default'>궁금한 점을 자유롭게 묻고 답하는 공간이에요!</Text>
            <div>
              {/* 인기순, 최신순 정렬 버튼 */}
              <Text color="#F1F3F4" fontSize='24px' TABfontSize='16px' lineHeight="52px" TABlineHeight='24px' verticalAlign='middle' margin='8px'><RiArrowUpDownFill /></Text>
              {popPage ?
                <Text fontSize="16px" TABfontSize='14px' color="#F8F9fA" lineHeight="48px" TABlineHeight='24px' margin="10px 16px 0 0" cursor="pointer" _onClick={() => set_latest()}>최신순</Text>
                :
                <Text fontSize="16px" TABfontSize='14px' color="#F8F9fA" lineHeight="48px" TABlineHeight='24px' margin="10px 16px 0 0" cursor="pointer" _onClick={() => set_popular()}>인기순</Text>
              }
              {/* 글쓰기 버튼 */}
              {is_login ?
                <>
                  <WriteBtn onClick={() => history.push('/question/write')}>
                    <Text fontSize="16px" color="#7879F1">
                      <BiPencil /> 글쓰기
                    </Text>
                  </WriteBtn>
                  <FloatingBtn _onClick={() => history.push(`/question/write`)} />
                </>
                :
                <>
                  <WriteBtn onClick={() => window.alert('로그인 후에 이용 가능합니다.')}>
                    <Text fontSize="16px" color="#7879F1">
                      <BiPencil /> 글쓰기
                    </Text>
                  </WriteBtn>
                </>
              }
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
          <Grid is_center>
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
  @media screen and (max-width: 1090px) {
    display: none;
  }
`;

const CardList = styled.div`
  margin-top: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 24px;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    row-gap: 16px;
    margin-top: 15px;
  }
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
  margin-top: 40px;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
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

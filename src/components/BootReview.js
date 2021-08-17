/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import { history } from '../redux/ConfigureStore';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import Stars from './Stars';

const BootReview = (props) => {
  const dispatch = useDispatch();
  const {camp} = props;

  // 페이지네이션
  const [page, setPage] = useState(1);
  // 페이지 번호가 바뀔 때마다 리뷰 목록 불러오는 함수 호출
  useEffect(() => {
    dispatch(campActions.setReviewsDB(camp.bootcampName, page));
  }, [page]);
  // 불러오는 3페이지짜리 리뷰 목록
  const all_review = useSelector(state => state.bootcamp.review_list);
  // 1페이지에 보여줄 개수로만 자른 목록
  const review_list = all_review.slice(0, 5);
  // 앞 페이지로 가는 함수
  const toPrePage = () => {
    setPage(page - 1);
  }
  // 다음 페이지로 가는 함수
  const toNextPage = () => {
    setPage(page + 1);
  }

  const is_login = useSelector(state => state.user.is_login);

  return (
    <Grid className='contents-postlist' backgroundColor='#202124' width='64%' padding='40px 40px 0 40px'>
      <Grid className='review-title' display='flex' justify_content='space-between' padding='0 0 40px' borderBottom='1px solid #8f9091'>
        {/* 리뷰 페이지 타이틀 */}
        <Text fontSize='24px' fontWeight='700' color='#e8eaed'>{camp.bootcampName} 리뷰</Text>
        {/* 리뷰 남기기 버튼 */}
        {/* 로그인 상태가 아니면 로그인 후에 이용 가능하다는 얼럿 띄우기 */}
        {is_login ?
        <WriteBtn onClick={() => history.push({pathname: `/boot/${camp.bootcampName}/review/write`})}><Text fontSize='14px' color='#7879F1'><span style={{fontSize: '20px', verticalAlign: 'middle', marginRight: '10px'}}><BiPencil /></span>리뷰 남기기</Text></WriteBtn>
        :
        <WriteBtn onClick={() => window.alert('로그인 후에 이용 가능합니다.')}><Text fontSize='14px' color='#7879F1'><span style={{fontSize: '20px', verticalAlign: 'middle', marginRight: '10px'}}><BiPencil /></span>리뷰 남기기</Text></WriteBtn>
        }
      </Grid>
      {/* 부트캠프 리뷰 목록 */}
      {review_list && review_list.map((review, idx) => {
        // 각 페이지의 마지막 리뷰인 경우
        if ((idx + 1) % 3 === 0 || (idx + 1) === review_list.length) {
          return (
            <Post key={review.reviewId}>
              {/* 별점 */}
              <StarBox>
                <Text p fontSize='18px' fontWeight='700' color='#e8eaed' margin='0'>{review.stars}</Text>
                <Stars score={review.stars} size='16px' marginRight='4px'/>
              </StarBox>
              {/* 리뷰 */}
              <PostBoxThird>
                {/* 리뷰 제목 */}
                <Text p fontSize='18px' fontWeight='700' color='#e8eaed' margin='0'>{review.title}</Text>
                {/* 작성자 닉네임, 작성일자 */}
                <Text p fontSize='14px' color='#80868b' margin='4px 0 0'>
                  {review.status === '수료' ? '수료자: ' : '작성자: ' }{review.nickname} - {review.createdAt}
                </Text>
                {/* 장점 */}
                <Text p fontSize='14px' fontWeight='700' color='#e8eaed' margin='24px 0 0'>장점</Text>
                <Text p fontSize='14px' color='#e8eaed' margin='4px 0 0'>{review.pros}</Text>
                <Text p fontSize='14px' fontWeight='700' color='#e8eaed' margin='16px 0 0'>단점</Text>
                <Text p fontSize='14px' color='#e8eaed' margin='4px 0 0'>{review.cons}</Text>
              </PostBoxThird>
            </Post>
          )
        }
        return (
          <Post key={review.reviewId}>
            {/* 별점 */}
            <StarBox>
              <Text p fontSize='18px' fontWeight='700' color='#e8eaed' margin='0'>{review.stars}</Text>
              <Stars score={review.stars} size='16px' marginRight='4px'/>
            </StarBox>
            {/* 리뷰 */}
            <PostBox>
              {/* 리뷰 제목 */}
              <Text p fontSize='18px' fontWeight='700' color='#e8eaed' margin='0'>리뷰 제목</Text>
              {/* 작성자 닉네임, 작성일자 */}
              <Text p fontSize='14px' color='#80868b' margin='4px 0 0'>
                {review.status === '수료' ? '수료자: ' : '작성자: ' }{review.nickname} - {review.createdAt}
              </Text>
              {/* 장점 */}
              <Text p fontSize='14px' fontWeight='700' color='#e8eaed' margin='24px 0 0'>장점</Text>
              <Text p fontSize='14px' color='#e8eaed' margin='4px 0 0'>{review.pros}</Text>
              <Text p fontSize='14px' fontWeight='700' color='#e8eaed' margin='16px 0 0'>단점</Text>
              <Text p fontSize='14px' color='#e8eaed' margin='4px 0 0'>{review.cons}</Text>
            </PostBox>
          </Post>
        )
      })}
      <Grid className='pagination' is_center borderTop='1px solid #8f9091'>
        {/* 페이지네이션 */}
        <PageBox>
          {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
          <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
          {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
          <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
          {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
          <Text lineHeight='14px' margin='0 20px 0'><Page style={{opacity: 1}}>{page}</Page></Text>
          {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
          <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_review.length > 3 ? page + 1 : ''}</Page></Text>
          {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
          <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_review.length > 3 ? <BsChevronRight /> : ''}</Page></Text>
        </PageBox>
      </Grid>
    </Grid>
  )
};

const WriteBtn = styled.button`
  height: 48px;
  width: 152px;
  background-color: transparent;
  border: 1px solid #7879F1;
  border-radius: 7px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const Post = styled.div`
  display: flex;
  padding: 40px 0 0;
`;

const StarBox = styled.div`
  height: 100%;
  width: fit-content;
  min-width: 100px;
`;

const PostBox = styled.div`
  width: 90%;
  min-width: 300px;
  border-bottom: 1px solid #8f9091;
  padding: 0 0 40px 24px;
`;

const PostBoxThird = styled.div`
  width: 80%;
  min-width: 300px;
  padding: 0 0 40px 24px;
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
  margin: 32px 0;
`;

const Page = styled.span`
  opacity: 0.5;
  cursor: pointer;
  color: #F8F9FA;
  &:hover {
    opacity: 1;
  }
`;

export default BootReview;
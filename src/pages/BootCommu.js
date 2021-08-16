/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import BootRoot from '../components/BootRoot';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import { AiOutlineEye } from 'react-icons/ai';
import { BiLike, BiComment } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import BootOthers from '../components/BootOthers';

const BootCommu = (props) => {
  const dispatch = useDispatch();

  // 부트캠프 정보를 props로 받는다.
  const bootcampName = props.location.pathname.split('/')[2];
  const url_word = props.location.pathname.split('/')[3];

  const camp_list = useSelector(state => state.bootcamp.camp_list);
  const this_camp = camp_list.find((camp) => camp.bootcampName === bootcampName);

  // 페이지네이션
  const [page, setPage] = useState(1);
  // 페이지 번호가 바뀔 때마다 커뮤니티글 목록 불러오는 함수 호출
  useEffect(() => {
    dispatch(campActions.setCampsDB(1));
    dispatch(campActions.setCommusDB(bootcampName, page));
  }, [page]);
  // 불러오는 3페이지짜리 커뮤니티글 목록
  const all_commu = useSelector(state => state.bootcamp.commu_list);
  // 1페이지에 보여줄 개수로만 자른 목록
  const commu_list = all_commu.slice(0, 5);
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
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
        <BootRoot camp={this_camp} url_word={url_word}/>
          {/* 커뮤니티 페이지 */}
          <Grid className='contents-box' padding='24px 0' display='flex' justify_content='space-between'>
            <Grid className='contents-postlist' backgroundColor='#202124' width='64%' padding='40px 40px 0 40px'>
              <Grid className='community-title' display='flex' justify_content='space-between' borderBottom='1px solid #8f9091' padding='0 0 40px'>
                {/* 커뮤니티 페이지 타이틀 */}
                <Text fontSize='24px' fontWeight='700' color='#e8eaed'>{bootcampName} 커뮤니티</Text>
                <Grid width='auto' height='fit-content'>
                  {/* 인기순, 최신순 정렬 */}
                  {/* <Text fontSize='14px' color='#757577' margin='0 20px' vertical_align='middle'>인기순<span style={{color: '#E8EAED', margin: '0 5px'}}>|</span>최신순</Text> */}
                  {/* 글쓰기 버튼 */}
                  {/* 로그인 상태에서만 보여주기 */}
                  {is_login &&
                  <WriteBtn onClick={() => history.push({pathname: `/boot/${bootcampName}/community/write`, state: {camp_name: bootcampName}})}><Text fontSize='14px' color='#7879F1'>글쓰기</Text></WriteBtn>
                  }
                </Grid>
              </Grid>
              {/* 커뮤니티 게시글 목록 */}
              {commu_list.map((c, idx) => {
                return (
                  <Post key={idx} onClick={() => history.push(`/boot/${bootcampName}/post/${c.communityId}`)}>
                    {/* 제목 */}
                    <Text p fontSize='18px' fontWeight='700' color='#dadce0' margin='0'>{c.title}</Text>
                    {/* 내용 */}
                    <Text p fontSize='14px' color='#80868b' margin='16px 0 0' overflow='hidden' display='-webkit-box' wlc='2' wbo='vertical'>{c.content}</Text>
                    <div style={{height: 'fit-content', marginTop: '16px'}}>
                      {/* 추천 수 */}
                      <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0'>
                        <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiLike /></span>{c.communityLike ? c.communityLike.length : '0'}
                      </Text>
                      {/* 댓글 수 */}
                      <Text fontSize='12px' color='#bdc1c6' margin='0 8px'>
                        <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiComment /></span>{c.communityComment ? c.communityComment.length : '0'}</Text>
                      {/* 조회수 */}
                      <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px'>
                        <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><AiOutlineEye /></span>{c.viewCount}</Text>
                    </div>
                  </Post>
                )
              })}
              <Grid className='pagination' is_center>
                {/* 페이지네이션 */}
                <PageBox>
                  {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
                  {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
                  {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page style={{opacity: 1}}>{page}</Page></Text>
                  {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_commu.length > 5 ? page + 1 : ''}</Page></Text>
                  {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_commu.length > 5 ? <BsChevronRight /> : ''}</Page></Text>
                </PageBox>
              </Grid>
            </Grid>
            {/* 다른 부트캠프 목록 */}
            <BootOthers />
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const WriteBtn = styled.button`
  height: 40px;
  width: 80px;
  background-color: transparent;
  border: 1px solid #7879F1;
  border-radius: 7px;
  cursor: pointer;
  vertical-align: middle;
  &:active {
    opacity: 0.7;
  }
`;

const Post = styled.div`
  padding: 24px 24px 15px;
  border-bottom: 1px solid #8f9091;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Camp = styled.div`
  height: 104px;
  display: flex;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  height: 72px;
  width: 72px;
  border-radius: 36px;
  margin-top: 16px;
  background-size: cover;
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

export default BootCommu;
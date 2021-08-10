import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import { AiOutlineEye } from 'react-icons/ai';
import { BiLike, BiComment } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const BootCommu = (props) => {
  const dispatch = useDispatch();

  // 부트캠프 정보를 props로 받는다
  const {bootcampName, desc, review} = props.location.state.camp;

  useEffect(() => {
    dispatch(campActions.setCommusDB(bootcampName));
  }, []);
  
  // 페이지네이션
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [page, setPage] = useState(1);
  const all_commu = useSelector(state => state.bootcamp.commu_list);
  const commu_list = all_commu.slice(start, end);
  // 앞 페이지로 가는 함수
  const toPrePage = () => {
    setPage(page - 1);
    setStart(start - 5);
    setEnd(end - 5);
  }
  // 다음 페이지로 가는 함수
  const toNextPage = () => {
    setPage(page + 1);
    setStart(start + 5);
    setEnd(end + 5);
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          {/* 부트캠프 로고 */}
          <LogoBox>로고</LogoBox>
          <Grid className='info-button' padding='24px 0'>
            <InfoBtn>
              <div>
              {/* 부트캠프 이름 */}
              <Text fontSize='32px' color='#F8F9FA' fontWeight='700'>{bootcampName}</Text>
              <Text p fontSize='14px' color='#dadce0' margin='0 0 17px'>{desc}</Text>
              </div>
              {/* 홈페이지 바로가기 버튼 */}
              <Button><Text fontSize='14px' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
            </InfoBtn>
            {/* 부트캠프 평점, 리뷰 개수 */}
            <Text fontSize='14px' color='#dadce0'>★<span style={{margin: '0 8px'}}>{review[0].stars}</span>(164개 리뷰)</Text>
          </Grid>
          {/* 정보, 리뷰, 커뮤니티 탭 */}
          <Grid className='nav-box' height='54px' margin='40px 0 0' borderBottom='2px solid #5F6368'>
            <Menu><Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: '/boot/info', state: {camp: props.location.state.camp}})}>정보</Text></Menu>
            <Menu><Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: '/boot/review', state: {camp: props.location.state.camp}})}>리뷰</Text></Menu>
            <Menu style={{borderBottom: '4px solid #e8eaed'}}><Text fontSize='24px' color='#e8eaed'>커뮤니티</Text></Menu>
          </Grid>
          {/* 커뮤니티 페이지 */}
          <Grid className='contents-box' padding='24px 0' display='flex' justify_content='space-between'>
            <Grid className='contents-postlist' backgroundColor='#202124' width='64%' padding='40px 40px 0 40px'>
              <Grid className='community-title' display='flex' justify_content='space-between' borderBottom='1px solid #8f9091' padding='0 0 40px'>
                {/* 커뮤니티 페이지 타이틀 */}
                <Text fontSize='24px' fontWeight='700' color='#e8eaed'>{bootcampName} 커뮤니티</Text>
                <Grid width='auto' height='fit-content'>
                  {/* 인기순, 최신순 정렬 */}
                  <Text fontSize='14px' color='#757577' margin='0 20px' vertical_align='middle'>인기순<span style={{color: '#E8EAED', margin: '0 5px'}}>|</span>최신순</Text>
                  {/* 글쓰기 버튼 */}
                  <WriteBtn onClick={() => history.push('/boot/community/write')}><Text fontSize='14px' color='#7879F1'>글쓰기</Text></WriteBtn>
                </Grid>
              </Grid>
              {/* 커뮤니티 게시글 목록 */}
              {commu_list.map((c, idx) => {
                return (
                  <Post key={idx} onClick={() => history.push(`/boot/community/post/${c.communityId}`)}>
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
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_commu.length > page * 5 ? page + 1 : ''}</Page></Text>
                  {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                  <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_commu.length > page * 5 ? <BsChevronRight /> : ''}</Page></Text>
                </PageBox>
              </Grid>
            </Grid>
            {/* 다른 부트캠프 목록 */}
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='491px' padding='24px'>
              <Text fontSize='18px' fontWeight='700' color='#e8eaed'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c, idx) => {
                return (
                  <Camp key={idx} onClick={() => history.push('/boot/info')}>
                    {/* 다른 부트캠프 로고 */}
                    <ImageDiv style={{backgroundImage: `url('https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`}}/>
                    <div style={{padding: '29px 16px'}}>
                      {/* 다른 부트캠프 이름 */}
                      <Text p className='camp-name' fontSize='18px' fontWeight='700' color='#f1f3f4' margin='0 0 4px'>부트캠프명</Text>
                      {/* 다른 부트캠프 별점 */}
                      <Stars score='2.2' size='16px' marginRight='4px' withScore/>
                    </div>
                  </Camp>
                )
              })}
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const LogoBox = styled.div`
  height: 112px;
  width: 190px;
  border: 1px solid whitesmoke; // 로고 있으면 없애기
  align-items: center;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 204px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #2E3134;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const Menu = styled.div`
  display: inline-block;
  margin-right: 48px;
  cursor: pointer;
  padding-bottom: 16px;
`;

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
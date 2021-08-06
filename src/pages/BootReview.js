import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Grid, Text, Image} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';
import { BsChevronLeft, BsChevronRight, BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import Stars from '../components/Stars';

const BootReview = (props) => {
  const dispatch = useDispatch();
  const camp_name = props.match.params.name;      // 주소창에서 부트캠프 이름을 가져온다.             

  useEffect(() => {                                       // 렌더링 될 때마다
    dispatch(campActions.setReviewsDB(camp_name));        // bootcamp 모듈에서 이 부트캠프의 리뷰를 불러오는 함수를 호출한다.
  }, [])

  // 페이지네이션
  const [start, setStart] = useState(0);                    // 한 페이지에 불러올 첫 리뷰 번호 0번
  const [end, setEnd] = useState(3);                       // 한 페이지에 불러올 리뷰 개수 3개
  const [page, setPage] = useState(1);                      // 페이지 번호는 1부터 시작한다.
  const all_review = useSelector(state => state.bootcamp.review_list);    // bootcamp 모듈의 review_list를 가져온다.
  const review_list = all_review.slice(start, end);         // 0부터 (end-1)번째 리뷰까지 한 페이지에 출력한다.
  const toPrePage = () => {                               // 앞 페이지로 가는 함수
    setPage(page - 1);
    setStart(start - 3);
    setEnd(end - 3);
  }
  const toNextPage = () => {                             // 다음 페이지로 가는 함수
    setPage(page + 1);
    setStart(start + 3);
    setEnd(end + 3);
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid clasName='logo-box' height='20%'>
            <LogoBox><TextBox><Text lineHeight='15vh' fontSize='3vh' color='#5F6368'>LOGO</Text></TextBox></LogoBox>
          </Grid>
          <Grid className='info-button' height='15%' padding='40px 0'>
            <InfoBtn>
              <Text fontSize='3.5vh' color='#F8F9FA' fontWeight='700'>{camp_name}</Text>
              <Button><Text fontSize='1.6vh' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
            </InfoBtn>
            <Text fontSize='1.6vh' color='#80868B'>★ 2.2 (164개 리뷰)</Text>
          </Grid>
          <Grid className='nav-box' height='80px' margin='20px 0 0' borderBottom='2px solid #5F6368'>
            <Menu><Text fontSize='2.5vh' color='#5f6368' _onClick={() => history.push(`/boot/camp/${camp_name}/info`)}>정보</Text></Menu>
            <Menu style={{borderBottom: '4px solid #e8eaed'}}><Text fontSize='2.5vh' color='#e8eaed'>리뷰</Text></Menu>
            <Menu><Text fontSize='2.5vh' color='#5F6368' _onClick={() => history.push(`/boot/camp/${camp_name}/community`)}>커뮤니티</Text></Menu>
          </Grid>
          <Grid className='contents-box' height='55%' padding='40px 0' display='flex' justify_content='space-between' position='relative'>
            <Grid className='contents-postlist' backgroundColor='#202124' width='64%' height='100%' padding='0 40px'>
              <PostList>
                <Grid className='review-title' display='flex' justify_content='space-between' borderBottom='1px solid #8f9091' padding='20px 0'>
                  <TitleBox><Text p fontSize='2.5vh' fontWeight='700' color='#e8eaed'>{camp_name} 리뷰</Text></TitleBox>
                  <WriteBtn onClick={() => history.push('/boot/review/write')}><Text fontSize='1.4vh' color='#7879F1'><span style={{fontSize: '2.5vh', verticalAlign: 'middle', marginRight: '10px'}}><BsPlus /></span>리뷰 남기기</Text></WriteBtn>
                </Grid>
                {review_list && review_list.map((review, idx) => {
                  if ((idx + 1) % 3 === 0 || (idx + 1) === review_list.length) {
                    return (
                      <Post>
                        <StarBox>
                          <Text className='score' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>{review.stars}</Text>
                          <Text className='star' p fontSize='2vh' color='#e8eaed' margin='0'><Stars score={review.stars} size='2vh'/></Text>
                        </StarBox>
                        <PostBoxThird>
                          <Text className='title' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>리뷰 제목</Text>
                          <Text className='user' p fontSize='1.3vh' color='#80868b' margin='0'>수료자 : {review.nickname[0]}{review.nickname[1]}***** - {review.createdAt}</Text>
                          <Text className='strong-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='20px 0 0'>장점</Text>
                          <Text className='strong-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>{review.pros}</Text>
                          <Text className='week-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='15px 0 0'>단점</Text>
                          <Text className='wee-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>{review.cons}</Text>
                        </PostBoxThird>
                      </Post>
                    )
                  }
                  return (
                    <Post>
                      <StarBox>
                        <Text className='score' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>{review.stars}</Text>
                        <Text className='star' p fontSize='2vh' color='#e8eaed' margin='0'><Stars score={review.stars} size='2vh'/></Text>
                      </StarBox>
                      <PostBox>
                        <Text className='title' p fontSize='2vh' fontWeight='700' color='#e8eaed' margin='0'>리뷰 제목</Text>
                        <Text className='user' p fontSize='1.3vh' color='#80868b' margin='0'>수료자 : {review.nickname[0]}{review.nickname[1]}***** - {review.createdAt}</Text>
                        <Text className='strong-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='20px 0 0'>장점</Text>
                        <Text className='strong-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>{review.pros}</Text>
                        <Text className='week-point' p fontSize='1.5vh' fontWeight='700' color='#e8eaed' margin='15px 0 0'>단점</Text>
                        <Text className='wee-content' p fontSize='1.5vh' color='#e8eaed' margin='0'>{review.cons}</Text>
                      </PostBox>
                    </Post>
                  )
                })}
              </PostList>
              <Grid className='pagination' height='8vh' is_center borderTop='1px solid #8f9091'>
                {/* 페이지네이션 */}
                <PageBox>
                  {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
                  {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
                  {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page style={{opacity: 1}}>{page}</Page></Text>
                  {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toNextPage()}>{all_review.length > page * 3 ? page + 1 : ''}</Page></Text>
                  {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                  <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toNextPage()}>{all_review.length > page * 3 ? <BsChevronRight /> : ''}</Page></Text>
                </PageBox>
              </Grid>
            </Grid>
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='450px' position='absolute'>
              <Text className='other-camps' p fontSize='2vh' fontWeight='700' color='#e2e2e2' margin='20px 20px 0'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c) => {
                return (
                  <Camp onClick={() => history.push('/boot/info')}>
                    <ImgBox><Image size='4.5' margin='10px' src='https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'></Image></ImgBox>
                    <CampBox>
                      <Text className='camp-name' p fontSize='2vh' fontWeight='700' color='#f1f3f4' margin='20px 0 0'>부트캠프명</Text>
                      <Text className='camp-star' p fontSize='1.5vh' color='#a5a5a5' margin='0' >★★☆☆☆ 2.2</Text>
                    </CampBox>
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
  height: 100%;
  width: 15vw;
  min-width: 150px;
  border: 1px solid #5F6368;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  height: 100%;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0 40px;
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
  margin-right: 60px;
  padding-top: 20px;
  cursor: pointer;
  height: 70%;
`;

const PostList = styled.div`
  width: 100%;
  height: 100%;
`;

const WriteBtn = styled.button`
  /* float: right; */
  margin: 20px 0;
  padding: 0 15px;
  background-color: transparent;
  border: 1px solid #7879F1;
  border-radius: 7px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const TitleBox = styled.div``;

const Post = styled.div`
  display: flex;
`;

const StarBox = styled.div`
  height: 100%;
  width: 25%;
  padding: 40px 0;
`;

const PostBox = styled.div`
  height: 100%;
  width: 75%;
  border-bottom: 1px solid #8f9091;
  padding: 40px 0;
`;

const PostBoxThird = styled.div`
  height: 100%;
  width: 75%;
  padding: 40px 0;
`;

const Camp = styled.div`
  height: 100px;
  display: flex;
  border-bottom: 1px solid #8f9091;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100px;
  overflow: hidden;
`;

const CampBox = styled.div`
  width: 80%;
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
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
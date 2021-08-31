import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';
import { Text, Grid, FloatingBtn, Emoji } from '../elements';
import { Sidebar, Body, CommonPostList } from '../components';
import { Megaphone_emoji } from '../image';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { BiPencil } from 'react-icons/bi';
import { setCookie } from '../shared/cookie';

const CommonList = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 인기순, 최신순 정렬
  const [PopArray, setPopArray] = useState(false);

  // 카테고리
  const [category, setCategory] = useState('all');

  // 페이지네이션
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (PopArray) {
      dispatch(postActions.setPostPopDB(page));
      setCategory('all');
    } else {
      dispatch(postActions.setPostDB(page, ''));
    }
    window.scrollTo(0, 0);
  }, [page]);

  // 불러오는 3페이지짜리 최신순 커뮤니티글 목록
  const new_post = useSelector((state) => state.post.list);
  // 1페이지에 보여줄 개수로만 자른 최신순 목록
  const newPost_list = new_post.slice(0, 8);

  // 불러오는 3페이지짜리 인기순 커뮤니티글 목록
  const pop_post = useSelector((state) => state.post.pop_list);
  // 1페이지에 보여줄 개수로만 자른 인기순 목록
  const popPost_list = pop_post.slice(0, 8);

  // 앞 페이지로 가는 함수
  const toPrePage = () => {
    setPage(page - 1);
  };
  // 다음 페이지로 가는 함수
  const toNextPage = () => {
    setPage(page + 1);
  };
  // 카테고리 정보방 게시물 
  const info_category = () => {
    dispatch(postActions.setPostDB(page, 'info'));
  };
  // 카테고리 잡담방 게시물
  const chitchat_category = () => {
    dispatch(postActions.setPostDB(page, 'chitchat'));
  };
  // 카테고리 전체 게시물
  const total_category = () => {
    dispatch(postActions.setPostDB(page, ''));
    setPopArray(false);
  };

  // 인기순 조회
  const setPop = () => {
    dispatch(postActions.setPostPopDB(page));
    setPopArray(true);
    setCategory('all');
  };

  const loginAlert = () => {
    if (window.confirm('로그인 후에 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?')) {
      history.push('/login');
    }
  }
  
  return (
    <React.Fragment>
      <Grid className="background" display="flex" overflow="auto">
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          <Grid>
            {/* 부트톡톡 타이틀 */}
            <Grid height="fit-content" margin="0 0 24px 0" TABmargin='14px 0 8px'>
              <Text p fontSize="32px" TABfontSize='20px' MOBfontSize='16px' color="#F8F9FA" fontWeight="700" margin='0 0 8px' TABmargin='0' cursor='default'>
                <Emoji src={Megaphone_emoji} height='32px' TABheight='20px' MOBheight='16px' margin='0 8px 0 0' />부트톡톡</Text>
              <Text color="#BDC1C6" fontSize="20px" TABfontSize='12px' MOBfontSize='10px' cursor='default'>부트캠퍼들의 자유로운 Talk Talk</Text>
            </Grid>
            {/* 게시판 카테고리 */}
            <Grid display="flex" justifyContent="space-between" margin="0 0 24px 0" TABmargin='0 0 16px 0' MOBmargin='0 0 8px 0'>
              <Categories>
                <CategoryButton url={category === 'all' && 'white'}
                  onClick={() => { setCategory('all'); total_category(); setPopArray(false); }}>
                  전체
                </CategoryButton>
                <CategoryButton url={category === 'info' && 'white'}
                  onClick={() => { setCategory('info'); info_category(); setPopArray(false) }}>
                  정보
                </CategoryButton>
                <CategoryButton url={category === 'chitchat' && 'white'}
                  onClick={() => { setCategory('chitchat'); chitchat_category(); setPopArray(false) }}>
                  잡담
                </CategoryButton>
              </Categories>
              <Grid width="fit-content" display="flex">
                {/* 인기순, 최신순 정렬 버튼 */}
                <Text color="#F1F3F4" fontSize='24px' TABfontSize='16px' MOBfontSize='14px' lineHeight="52px" MOBlineHeight='43px' verticalAlign='middle'><RiArrowUpDownFill /></Text>
                <SelectButton>
                  {PopArray ?
                    <Options onClick={() => setPopArray(false)}><Text fontSize='16px' TABfontSize='14px' MOBfontSize='10px'>인기순</Text></Options>
                    :
                    <Options onClick={() => { setPopArray(true); setPop(); setCategory('all') }}><Text fontSize='16px' TABfontSize='14px' MOBfontSize='10px'>최신순</Text></Options>
                  }
                </SelectButton>
                {/* 글쓰기버튼 (로그인 후 이용가능) */}
                {is_login ?
                  <div>
                    <WriteButton onClick={() => history.push('/common/write')}><BiPencil />&nbsp; 글쓰기</WriteButton>
                  </div>
                  :
                  <div>
                    <WriteButton onClick={() => loginAlert()}><BiPencil />&nbsp; 글쓰기</WriteButton>
                  </div>}
              </Grid>
            </Grid>
          </Grid>
          <Line style={{ border: '1px solid #80868B' }} />
          {/* 태블릿 사이즈 이하에서만 나오는 플로팅 버튼 */}
          {is_login ?
            <>
              <FloatingBtn _onClick={() => history.push('/common/write')}>
                <Text fontSize='32px' color='#dadce0'><BiPencil /></Text></FloatingBtn>
            </>
            :
            ''
          }
          {/* import 부트톡톡 게시물  */}
          <Grid width="100%" height='850px' TABheight='730px' MOBheight='fit-content'>
            {PopArray ? (
              <Contents>
                {popPost_list.map((c, idx) => {
                  return <CommonPostList key={c.postId} {...c} />;
                })}
              </Contents>)
              : (
                <Contents>
                  {newPost_list.map((c, idx) => {
                    return <CommonPostList key={c.postId} {...c} />;
                  })}
                </Contents>
              )}
          </Grid>
          {/* 페이지네이션 */}
          <Grid is_center>
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
              <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                <Page onClick={() => toPrePage()}>
                  {page === 1 ? '' : <BsChevronLeft />}
                </Page>
              </Text>
              {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                <Page onClick={() => toPrePage()}>
                  {page === 1 ? '' : page - 1}
                </Page>
              </Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
              <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                <Page style={{ opacity: 1 }}>{page}</Page>
              </Text>
              {!PopArray ? (
                <>
                  {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
                  <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                    <Page onClick={() => toNextPage()}>
                      {new_post.length > 8 ? page + 1 : ''}
                    </Page>
                  </Text>
                  {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                  <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                    <Page onClick={() => toNextPage()}>
                      {new_post.length > 8 ? <BsChevronRight /> : ''}
                    </Page>
                  </Text>
                </>
              ) : (
                <>
                  {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
                  <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                    <Page onClick={() => toNextPage()}>
                      {pop_post.length > 8 ? page + 1 : ''}
                    </Page>
                  </Text>
                  {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                  <Text lineHeight="14px" margin="0 20px 0" MOBfontSize='10px'>
                    <Page onClick={() => toNextPage()}>
                      {pop_post.length > 8 ? <BsChevronRight /> : ''}
                    </Page>
                  </Text>
                </>
              )}
            </PageBox>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Categories = styled.div`
  display: flex;
  align-items: flex-start;
  height: 44px;
  @media screen and (max-width: 1090px) {
    height: 34px;
  }
  @media screen and (max-width: 767px) {
    height: 26px;
  }
`;

const CategoryButton = styled.div`
  cursor: pointer;
  background-color: #202124;
  border: none;
  border-radius: 20px;
  margin: 5px 8px 0 0;
  padding: 5px 30px;
  color: #80868b;
  ${(props) => props.url === 'white' && 'background-color: #BDC1C6; color: #0E1013'};
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  justify-content: center;
  &:hover {
    background-color: #bdc1c6;
    color: #0e1013;
  }
  @media screen and (max-width: 1090px) {
    padding: 3px 20px;
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    padding: 0px 16px;
    font-size: 10px;
    border-radius: 14px;
  }
`;

const SelectButton = styled.div`
  border: none;
  background-color: transparent;
  color: #F1F3F4;
  width: fit-content;
  height: 48px;
  appearance: none;
  line-height: 24px;
  margin: 3px 16px 0 8px;
  @media screen and (max-width: 767px) {
    height: 14px;
    line-height: 8px;
    margin: 3px;
    }
`;

const Options = styled.div`
  margin: 10px 0 0 0;
  cursor: pointer;
`;

const WriteButton = styled.button`
  background-color: transparent;
  font-size: 16px;
  border: none;
  color: #7879f1;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
  width: 120px;
  height: 48px;
  padding: 10px 0px;
  border: 1px solid #7879F1;
  @media screen and (max-width: 1090px) {
    display: none;
  }
`;

const Line = styled.hr`
  border: 1px solid #80868B;
  @media screen and (max-width: 1090px) {
    display: none;
  }
`;

const Notice = styled.div`
border-bottom: 1px solid #3C4043;
display: flex;
justify-content: space-between;
width: 100%;
height: 60px;
margin-top: 16px;
@media screen and (min-width: 768px) and (max-width: 1090px) {
  height: 48px;
}
`;

const NoticeHead = styled.span`
text-align: center;
color: #7879F1;
padding: 8px 32px;
width: 90px;
height: 34px;
border: 1px solid #7879F1;
box-sizing: border-box;
border-radius: 8px;
margin: 17px 24px;
font-size: 14px;
line-height: 18px;
vertical-align: middle;
@media screen and (min-width: 768px) and (max-width: 1090px) {
  margin: 0 16px;
  padding: 6px 20px;
  line-height: 16px;
}
`;

const NoticeText = styled.span`
font-weight: bold;
color: #7879F1;
font-size: 18px;
line-height: 18px;
letter-spacing: 0.2px;
vertical-align: middle;
@media screen and (min-width: 768px) and (max-width: 1090px) {
  font-size: 14px;
}
`;

const Contents = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
  margin: 32px 0;
  @media screen and (max-width: 767px) {
    padding: 0 0 50px;
  }
`;

const Page = styled.span`
  opacity: 0.5;
  cursor: pointer;
  color: #f8f9fa;
  &:hover {
    opacity: 1;
  }
`;

export default CommonList;

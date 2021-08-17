import React, { useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';
import { Text, Grid} from '../elements/index';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators as postActions} from "../redux/modules/post";
//icons
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa";
import { RiArrowUpDownFill} from 'react-icons/ri';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import CommonPostList from '../components/CommonPostList';

const CommonBoardList = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 인기순, 최신순 정렬
  const [PopArray, setPopArray] = useState(false);
  
  // 페이지네이션
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    if(PopArray){
      dispatch(postActions.setPostPopDB(page));
    } else {
      dispatch(postActions.setPostDB(page, ''));
    }
  }, [page]);

  // 불러오는 3페이지짜리 최신순 커뮤니티글 목록
  const new_post = useSelector(state => state.post.list);
  // 1페이지에 보여줄 개수로만 자른 최신순 목록
  const newPost_list = new_post.slice(0, 8);

  // 불러오는 3페이지짜리 인기순 커뮤니티글 목록
  const pop_post = useSelector(state => state.post.pop_list);
  // 1페이지에 보여줄 개수로만 자른 인기순 목록
  const popPost_list = pop_post.slice(0, 8);

  // 앞 페이지로 가는 함수
  const toPrePage = () => {
    setPage(page - 1);
  }
  // 다음 페이지로 가는 함수
  const toNextPage = () => {
    setPage(page + 1);
  }
  // 카테고리 정보방 게시물 (default)
  const info_category = () => {
    dispatch(postActions.setPostDB(page, 'info'));
  }
  // 카테고리 잡담방 게시물
  const cc_category = () => {
    dispatch(postActions.setPostDB(page, 'chitchat'));
  }
  // 카테고리 전체 게시물
  const total_category = () => {
    dispatch(postActions.setPostDB(page, ''));
    setPopArray(false);
  }

   // 인기순 조회
   const setPop = () => {
    dispatch(postActions.setPostPopDB(page));
    setPopArray(true);
   }


  // 로그인 후 글쓰기 가능
  const login_check = () => {
    if (!is_login) {
      window.alert('로그인 후 이용해주세요!');
      return;
    };
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' >
        <Sidebar />
        <Body header footer>
        <Grid height="100%" >
          <Grid height="70px" margin="0 0 24px 0">
            <Text p fontSize="32px"  color="#F8F9FA" fontWeight="bold" margin='0 0 8px'>📣부트톡톡
            </Text>
            <Text color='#BDC1C6' fontSize='20px'>&nbsp;&nbsp;&nbsp;부트캠퍼들의 자유로운 Talk Talk</Text>
          </Grid>
            {/* 게시판 카테고리 */}
                <Grid display="flex" height="44px" justify_content="space-between" margin="0 0 25px 0">
                  <Categories >
                  <CategoryButton
                  onClick={()=>total_category()}>
                    전체글
                  </CategoryButton>
                  <CategoryButton
                  onClick={()=>info_category()}>
                    정보
                  </CategoryButton>
                  <CategoryButton
                  onClick={()=>cc_category()}>
                    잡담
                  </CategoryButton>
                  </Categories>
                 
                  <Grid width="18%" display="flex">
                    {/* 인기순, 최신순 */}
                   <div style={{color: "#F1F3F4", lineHeight: "48px", marginRight: "10px" }}><RiArrowUpDownFill /></div> 
                    <SelectButton
                    >
                      {PopArray?
                      <Options onClick={()=>total_category()}
                      >최신순</Options>
                      :
                      <Options onClick={()=>setPop()}
                      >인기순</Options>
                      }
                    
                      </SelectButton>
                      {/* 글쓰기버튼 (로그인 후 이용가능) */}
                      {is_login ?
                      <div>
                      <WriteButton
                        onClick={() => history.push('/common/write')}
                      >
                        <FaPlus/>&nbsp; 글쓰기
                      </WriteButton>
                    </div>
                      :
                      <div>
                      <WriteButton
                        onClick={() => login_check()}
                      >
                        <FaPlus/>&nbsp; 글쓰기
                      </WriteButton>
                    </div>}
                  </Grid>
                </Grid>
            </Grid>
            
            {/* 공지 */}
            <Grid height="134px">
              {[1, 2].map((n, idx) => {
                  return (
                <Grid key={n.postId} display="flex" width="100%">
                  <Notice>
                    <NoticeHead>공지</NoticeHead>
                    <NoticeText>스파르타코딩클럽 항해99 얼리버드 모집 안내</NoticeText>
                    <Text color="#9AA0A6" fontSize="14px" margin="23px 0 0 0" lineHeight="22px">2021.08.03</Text>
                  </Notice>
                </Grid>
                );
              })}
            </Grid>
            {/* import 부트톡톡 게시물  */}
            <Grid height="840px">
              <Grid width="100%" height="764px" margin="30px 0 0 0">
                {PopArray?
                <>
                <Contents>
                {popPost_list.map((c, idx) => {
                return (
                <CommonPostList key={c.postId} {...c}/>
                  );
                    })}
                </Contents>
                </>
                :
                <>
                <Contents>
                {newPost_list.map((c, idx) => {
                return (
                <CommonPostList key={c.postId} {...c}/>
                  );
                    })}
                </Contents>
                </>
                }
              
              </Grid>     
            </Grid>
            <Grid height="0px" is_center>
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
              {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page style={{opacity: 1}}>{page}</Page></Text>
              {!PopArray?
              <>
              {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{new_post.length > 8 ?  page + 1 : ''}</Page></Text>
              {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{new_post.length > 8 ? <BsChevronRight /> : ''}</Page></Text>
              </>
              :
              <>
              {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{pop_post.length > 8 ?  page + 1 : ''}</Page></Text>
              {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{pop_post.length > 8 ? <BsChevronRight /> : ''}</Page></Text>
              </>}
              
            </PageBox>
            </Grid> 
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 450px;
  height: 44px;
  left: 142px;
  top: 210px;
`;

const CategoryButton = styled.div`
cursor: pointer;
background-color: #202124;
border: none;
border-radius: 100px;
margin: 7px 10px 0 10px;
width: 110px;
height: 44px;
left: 0px;
top: 0px;
color: #80868B;
text-align: center;
font-size: 16px;
line-height: 45px;
&:hover {
  background-color: #BDC1C6;
  color: #0E1013;
  }
`;

const SelectButton = styled.div`
border: none;
background-color: #17181B;
color: #F1F3F4;
width: fit-content;
height: 48px;
font-size: 16px;
margin-right: 16px;
appearance: none;
`;

const Options = styled.div`
margin: 10px 0 0 0;
`;

const WriteButton = styled.button`
background-color: transparent;
font-size: 16px;
border: none;
color: #7879F1;
cursor: pointer;
width: 98.5%;
border-radius: 8px;
font-weight: bold;
width: 120px;
height: 48px;
padding: 10px 0px;
border: 1px solid #4D4E93;
&:hover {
  background-color: #282A2D;
  color: #F1F3F4;;
  }
`;


const Notice = styled.div`
border-top: 1px solid #9AA0A6;
grid-template-rows: repeat(2, minmax(auto, auto));
grid-template-columns: repeat(6, 1fr);
display: flex;
margin: 5px 0;
width: 98.5%;
padding: 5px 0px 0px 0px;
`;

const NoticeHead = styled.span`
text-align: center;
color: #7879F1;
padding: 8px 32px;
width: 95px;
height: 34px;
left: 24px;
top: 17px;
border: 1px solid #7879F1;
box-sizing: border-box;
border-radius: 8px;
margin: 15px 10px;
font-size: 14px;
line-height: 15px;
`;

const NoticeText = styled.span`
font-weight: bold;
margin: 18px 5px;
color: #7879F1;
width: 82%;
height: 27px;
left: 138px;
top: 20px;
font-size: 18px;
line-height: 27px;
letter-spacing: 0.2px;
`;

const Contents = styled.div`
  border-top: 1px solid #9AA0A6;
  grid-template-rows: repeat(4, minmax(191px, 191px));
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  align-items: center;
  place-items: center;
  box-sizing: border-box;
  cursor: pointer;
  width: 98.5%;
  height: 191px;
  gap: 16px;
`;

const PageBox = styled.div`
font-size: 14px;
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

export default CommonBoardList;
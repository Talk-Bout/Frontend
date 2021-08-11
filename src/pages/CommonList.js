import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { history } from '../redux/ConfigureStore';
import { Text, Button, Grid, Image } from '../elements/index';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators as commentActions} from "../redux/modules/comment";
import { actionCreators as postActions} from "../redux/modules/post";
//icons
import { BiTimeFive, BiLike, BiComment, BiSort} from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa";
import { RiArrowUpDownFill } from 'react-icons/ri';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import CommonPostList from '../components/CommonPostList';

const CommonBoardList = (props) => {
  const dispatch = useDispatch();
  // 게시글 리스트 조회
  const common_list = useSelector(state => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.setPostDB());
  }, []);

  // 게시물 최신순으로 구현하는 함수
const all_common = common_list.slice(0, common_list.length)
.sort(function(a, b) {
  const timeA = a.createdAt; const timeB = b.createdAt; 
  if (timeA < timeB) return 1; if (timeA > timeB) return -1; });

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid height="100%" >
          <Grid height="3%" margin="0 0 24px 0">
            <Text fontSize="32px" padding="0 1%" color="#F8F9FA" fontWeight="bold">
              부트톡톡
            </Text>
          </Grid>
            {/* 게시판 카테고리 */}
                <Grid display="flex" height="10%" justify_content="space-between" margin="0 0 25px 0">
                  <Categories >
                  {[1, 2, 3, 4].map((n, idx) => {
                    return (
                    <CategoryButton>
                      정보게시판
                    </CategoryButton>
                    );
                  })}
                  </Categories>
                 
                  <Grid width="17%" display="flex">
                    {/* 인기순 셀렉트 */}
                   <div style={{color: "#F1F3F4", lineHeight: "48px", marginRight: "10px" }}><RiArrowUpDownFill /></div> 
                    <SelectButton type="select">
                        <Options>인기순</Options>
                        <Options>최신순</Options>
                      </SelectButton>
                      {/* 글쓰기버튼 */}
                      <div>
                        <WriteButton
                          onClick={() => history.push('/common/write')}
                        >
                          <FaPlus/>&nbsp; 글쓰기
                        </WriteButton>
                      </div>
                  </Grid>
                </Grid>
            </Grid>
            
            {/* 공지 */}
            <hr/>
            <Grid height="10vh">
              {[1, 2].map((n, idx) => {
                  return (
                <Grid display="flex" width="100%">
                  <Notice>
                    <NoticeHead>공지</NoticeHead>
                    <NoticeText>스파르타코딩클럽 항해99 얼리버드 모집 안내</NoticeText>
                    <Text color="#9AA0A6" fontSize="14px" margin="0.2% 0 0 0" lineHeight="18px">2021.08.03</Text>
                  </Notice>
                </Grid>
                );
              })}
            </Grid>
            {/* import 부트톡톡 게시물  */}
            <Grid height="85vh">
              <Grid width="100%" height="100%" margin="2% 0 0 0">
              <Contents>
                {all_common.map((c, idx) => {
                return (
                <CommonPostList key={c.commentId} {...c}/>
            );
              })}
          </Contents>
              </Grid>     
            </Grid>
            
            <Grid height="3%">
              <PageBox>
                <Text margin="0 0.7%" fontSize="2.3vh"><Page><BsChevronLeft /></Page></Text>
                <Text margin="0 0.7%" fontSize="2.3vh"><Page>01</Page></Text>
                <Text margin="0 0.7%" fontSize="2.3vh"><Page>02</Page></Text>
                <Text margin="0 0.7%" fontSize="2.3vh"><Page>03</Page></Text>
                <Text margin="0 0.7%" fontSize="2.3vh"><Page><BsChevronRight /></Page></Text>
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
  /* width: 100%;
  height: 15%;
  left: 8vw;
  top: 8vh; */
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
margin: 0px 10px;
width: 110px;
height: 44px;
left: 0px;
top: 0px;
color: #80868B;
text-align: center;
font-size: 16px;
line-height: 4vh;
&:hover {
  background-color: #BDC1C6;
  color: #0E1013;
  }
`;

const SelectButton = styled.select`
border: none;
background-color: #17181B;
color: #F1F3F4;
width: fit-content;
height: 48px;
font-size: 16px;
margin-right: 16px;
appearance: none;
`;

const Options = styled.option`
`;

const WriteButton = styled.button`
background-color: transparent;
font-size: 16px;
border: none;
color: #7879F1;
cursor: pointer;
width: 100%;
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
grid-template-rows: repeat(2, minmax(auto, auto));
grid-template-columns: repeat(1, 1fr);
display: flex;
/* width: 100%;
height: 50%; */
margin: 5px 0 5px 0;
border-bottom: 1px solid #9AA0A6;
width: 100%;
height: 55px;
left: 142px;
top: 346px;

`;

const NoticeHead = styled.span`
/* width: 8%; */
/* margin: 0.6% 1% 0.6% 0; */
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

margin: 0px 10px;
font-size: 14px;
line-height: 18px;
`;

const NoticeText = styled.span`
/* width: 80%; */
font-weight: bold;
/* font-size: 1.8vh; */
margin: 0% 1%;
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
  grid-template-rows: repeat(8, minmax(auto, auto));
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  align-items: center;
  place-items: center;
  /* width: 100%;
  height: 100%; */
  /* margin: 0.5% 0 0 0; */
  box-sizing: border-box;
  cursor: pointer;
  // 나중에 페이징하면 수정
  overflow: auto;
  width: 100%;
  height: 1050px;
  left: 284px;
  top: 826px;
`;

const Content = styled.div`
  z-index: 1;
  align-content: center;
  justify-content: center;
  /* width: 100%;
  height: 100%; */
  /* padding: 0% 3%; */
  width: 620px;
  height: 191px;
  left: 142px;
  top: 986px;

  background-size: cover;
  box-sizing: border-box;
 
  &:hover {
    opacity: 0.7;
  }
`;

const ProfileImage = styled.div`
display: flex;
height: 10%;
padding: 3%;
`;

const PageBox = styled.div`
text-align: center;
font-size: 1.8vh;;
/* margin: 2% 0 0 0; */
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
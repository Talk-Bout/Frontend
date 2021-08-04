import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { history } from '../redux/ConfigureStore';
import { Text, Button, Grid, Image } from '../elements/index';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';

import { actionCreators as commentActions} from "../redux/modules/comment";
import { actionCreators as postActions} from "../redux/modules/post";
//icons
import { BiTimeFive, BiLike, BiComment} from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const CommonBoardList = (props) => {
  const dispatch = useDispatch();

  // 게시글 리스트 조회
  const common_list = useSelector(state => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.setPostDB());
  }, []);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
        <Grid height="100%" >
          <Grid height="7%">
              <Text p fontSize="2.2vh;" padding="0 1%" color="#F8F9FA">
                부트톡톡
              </Text>
            </Grid>
            {/* 게시판 카테고리 */}
            <Grid display="flex" height="7%"  >
                <Grid display="flex" height="100%" width="100%">
                  <Categories >
                  {[1, 2, 3, 4].map((n, idx) => {
                    return (
                    <CategoryButton>
                      정보게시판
                    </CategoryButton>
                    );
                  })}
                  </Categories>
                  {/* 글쓰기, 인기순 */}
                    <Grid width="10%">
                    <WriteBox>
                      <WriteButton
                        onClick={() => history.push('/common/write')}
                      >
                        글쓰기
                      </WriteButton>
                    </WriteBox>
                  </Grid>
                <Grid width="10%" >
                  <SelectButton type="select">
                    <Options>인기순</Options>
                    <Options>최신순</Options>
                  </SelectButton>
                </Grid>
              </Grid>
            </Grid>
            {/* 자유게시판 게시물  */}
            <Grid height="77%">
              <Grid width="100%" height="100%">
              <Contents>
                {common_list.map((c, idx) => {
                return (
                <Content key={c.postId} onClick={() => history.push(`/common/detail/${c.postId}`)}
                >
                <Text p color="#F1F3F4" fontSize="2.6vh" margin="0px" padding="2% 2% 1% 2%" fontWeight="bold">
                 {c.title}
                </Text>
                <Text p color="#9AA0A6" fontSize="2.1vh" margin="0px" padding="0% 2%">
                 {c.content}
               </Text>
              <ProfileImage>
                <Image margin="0 0 3% 0" size="2"/>
                <Text fontSize="1.8vh" color="#9AA0A6" margin="0 0 0 2%" >
                {c.nickname}
                </Text>
              </ProfileImage>
            
              {/* 게시한 날짜, 좋아요, 댓글 */}
            <Grid width="100%" float="left">
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" >
              <BiTimeFive/> &nbsp;
              {c.createdAt}
              </Text>
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%">
              <BiLike/> &nbsp;
              {c.likes}
              </Text>
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" >
              <BiComment/> &nbsp; 2
            </Text>
            <hr/>
            </Grid>
            </Content>
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
  width: 100%;
  height: 15%;
  left: 8vw;
  top: 8vh;
`;

const CategoryButton = styled.div`
cursor: pointer;
background-color: #202124;
border: none;
border-radius: 40vh;
width: 9%;
height: 4vh;
margin: 0.6%;
color: #80868B;
text-align: center;
font-size: 1.3vh;
line-height: 4vh;
&:hover {
  background-color: #BDC1C6;
  color: #0E1013;
  }
`;

const WriteBox = styled.div`
 width: 100%;
 height: 100%;
`;

const WriteButton = styled.button`
background-color: #FFFFFF;
font-size: 1.5vh;
margin: 4%;
border: none;
color: #4D4E93;
cursor: pointer;
width: 70%;
border-radius: 10vh;
font-weight: bold;
height: 4vh;
border: 1px solid #4D4E93;
&:hover {
  background-color: #282A2D;
  color: #F1F3F4;;
  }
`;

const SelectButton = styled.select`
border: none;
background-color: #17181B;
font-size: 1rem;
color: #F1F3F4;
height: 3vh;
margin: 5%;
width: 70%;
`;

const Options = styled.option`

`;

const Contents = styled.div`
  grid-template-rows: repeat(5, minmax(auto, auto));
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  align-items: center;
  place-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-top: 1.5px solid #F1F3F4;
  cursor: pointer;
  // 나중에 페이징하면 수정
  overflow: hidden;
  margin: 0.5% 0 0 0;
`;

const Content = styled.div`
  z-index: 1;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  box-sizing: border-box;
  padding: 0% 3%;
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

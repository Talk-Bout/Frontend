import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { history } from '../redux/ConfigureStore';
import { Text, Button, Grid } from '../elements/index';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';

import { actionCreators as commentActions} from "../redux/modules/comment";
import { actionCreators as postActions} from "../redux/modules/post";
//icons
import { BiTimeFive, BiLike, BiComment} from 'react-icons/bi';


const CommonBoardList = (props) => {
  const dispatch = useDispatch();

  // 리덕스 : 게시글 리스트 조회
  const common_list = useSelector(state => state.post.list);
  
  React.useEffect(() => {
    dispatch(postActions.setPostDB());
  }, []);

  return (
    <React.Fragment>
      <Header />
      {/* 자유게시판 */}
      <Grid padding="10%">
        <Grid>
          <Text p margin="0px 0px 10px 0px">
            자유게시판
          </Text>
        </Grid>
        {/* 게시판 카테고리 */}
        <Grid styles={{ display: 'flex' }}>
          <Categories>
          {[1, 2, 3, 4, 5, 6].map((n, idx) => {
            return (
            <Button
              cursor="pointer"
              bg="#FAFAFA"
              border_radius="30px"
              width="20vw"
              margin="0px 5px"
            >
              항해99
            </Button>
            );
          })}
          </Categories>
        </Grid>
        <Grid>
          <WriteBox>
            <button
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => history.push('/common/write')}
            >
              글쓰기
            </button>
          </WriteBox>
      </Grid>
      <Hr/>
      {/* 자유게시판 게시물  */}
      <Contents>
      {common_list.map((c, idx) => {
            return (
        <Content onClick={() => history.push(`/common/detail/${c.postId}`)}>
        <Text p margin="0px" padding="2%" fontWeight="bold">
          {c.title}
        </Text>
        <Text p margin="0px" padding="2%" fontSize="14px">
          {c.content}
          </Text>
        <Text p margin="0px" padding="2%" fontSize="11px">
          {c.author}
          </Text>
          {/* 게시한 날짜, 좋아요, 댓글 */}
        <Grid is_flex width="100%">
        <Text padding="2%" width="33.3%" fontSize="11px">
          <BiTimeFive/> 
          {c.createdAt}
          </Text>
        <Text padding="2%" width="33.3%" fontSize="11px">
          <BiLike/>
          {c.likes}
          </Text>
        <Text padding="2%" width="33.3%" fontSize="11px">
          <BiComment/>
          2
        </Text>
        </Grid>
        </Content>
        );
          })}
      </Contents>
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

const WriteBox = styled.div`
  height: 5%;
  padding: 4%;
  margin-bottom: 2%;
`;

const Hr = styled.hr`
  border: 0.5px solid #e5e5e5;
`;

const Contents = styled.div`

  grid-template-rows: repeat(2, minmax(100px, auto));
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  align-items: center;
  place-items: center;
  width: 100%;
  height: 75%;
  margin: 3%;
  border: 1px solid DarkGrey;
  box-sizing: border-box;
`;

const Content = styled.div`
  z-index: 1;
  align-content: center;
  justify-content: center;
  border: 1px solid #e5e5e5;
  width: 100%;
  height: 100%;
  background-size: cover;
  box-sizing: border-box;
  padding: 3%;
  &:hover {
    opacity: 0.7;
  }
`;

export default CommonBoardList;

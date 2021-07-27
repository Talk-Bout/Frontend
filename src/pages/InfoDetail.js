import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input } from '../elements';
//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const InfoDetail = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid width="70%" padding="5%">
          <Text fontSize="30px" fontWeight="600">
            게시물 제목
          </Text>
          <Text p margin="3% 0%" color="#C4C4C4">
            닉네임
          </Text>

          <Grid is_flex width="30%" margin="3% 0%">
            <Text fontSize="15px" color="#C4C4C4">
              <BiTimeFive />
              2021.07.25
            </Text>
            <Text fontSize="15px" color="#C4C4C4">
              <BiLike />
              17
            </Text>
            <Text fontSize="15px" color="#C4C4C4">
              <BiComment />1
            </Text>
          </Grid>

          <hr color="#E5E5E5" />

          <Text p margin="10% 0%">
            Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex minim
            ullamco dolore eiusmod velit eu fugiat excepteur. Culpa amet aliqua
            consectetur culpa consectetur ad cillum non cillum proident velit
            Lorem do id. Exercitation aliquip incididunt aute officia in in
            excepteur. Ea cupidatat et est sit qui. Eiusmod excepteur et nisi
            ullamco voluptate cillum nisi culpa velit dolore. Culpa do
            adipisicing voluptate pariatur fugiat.
          </Text>
          <hr color="#E5E5E5" />

          {/* commentWrite */}
          <Grid margin="5% 0%">
            <Text p fontWeight="600">
              댓글 5개
            </Text>
            <Grid is_flex>
              <Input placeholder={'댓글을 남겨주세요'} />
              <Button width="10%" margin="0% 1%" height="5vh">
                등록
              </Button>
            </Grid>
          </Grid>
          <hr color="#E5E5E5" />

          {/* commentListButton???? */}
          <Grid is_center margin="4% 0%">
            <Text fontWeight="600">댓글 1개 더보기</Text>
          </Grid>
          <hr color="#E5E5E5" />

          {/* commentList : component로 만들기*/}
          <Grid>
            <Text p margin="3% 0%" color="#C4C4C4">
              닉네임
            </Text>
            <Text>댓글내용</Text>
            <Grid is_flex width="30%" margin="3% 0%">
              <Text fontSize="15px" color="#C4C4C4">
                <BiTimeFive />
                2021.07.25
              </Text>
              <Text fontSize="15px" color="#C4C4C4">
                <BiLike />
                17
              </Text>
              <Text fontSize="15px" color="#C4C4C4">
                <BiComment />1
              </Text>
            </Grid>
            <hr color="#E5E5E5" />
          </Grid>

          {/* 대댓글: NestedReply 여기 색 고치기*/}
          <Grid backgroundColor="#F8F8F8">
            <Text p margin="3% 5%" color="#C4C4C4">
              대댓글 닉네임
            </Text>
            <Text p margin="3% 5%">
              대댓글 댓글내용
            </Text>
            <Grid is_flex width="30%" margin="3% 5%">
              <Text fontSize="15px" color="#C4C4C4">
                <BiTimeFive />
                2021.07.25
              </Text>
              <Text fontSize="15px" margin="auto" color="#C4C4C4">
                <BiLike />
                17
              </Text>
            </Grid>
            <hr color="#E5E5E5" />
          </Grid>
        </Grid>
        {/* 다른 게시물 추천 */}

        <RecommandOtherInfo>
          <Text fontWeight="600" margin="5% 0%">
            다른 게시물
          </Text>
          <li>다른 게시물 제목</li>
          <li>다른 게시물 제목</li>
          <li>다른 게시물 제목</li>
          <li>다른 게시물 제목</li>
        </RecommandOtherInfo>
      </Grid>
    </React.Fragment>
  );
};

const RecommandOtherInfo = styled.div`
  width: 300px;
  padding: 2%;
  margin: 0% 5% 0% 0%;
  height: 100%;
  border: 1.5px solid #b5b5b5;
  border-radius: 3px;
  box-sizing: border-box;
`;

export default InfoDetail;

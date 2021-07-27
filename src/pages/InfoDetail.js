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
      <Grid padding="10%">
        <Text fontSize="30px" fontWeight="600">
          게시물 제목
        </Text>
        <Text p margin="3% 0%" color="#C4C4C4">
          닉네임
        </Text>

        <Grid is_flex width="40%" margin="3% 0%">
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
          ullamco voluptate cillum nisi culpa velit dolore. Culpa do adipisicing
          voluptate pariatur fugiat.
        </Text>
        <hr color="#E5E5E5" />

        <Grid>
          <Text p fontSize="13px" fontWeight="600">
            댓글 개수
          </Text>
          <Input />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InfoDetail;

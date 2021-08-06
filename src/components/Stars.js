import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';
import { IoStar } from 'react-icons/io5';

const Stars = (props) => {          // 부트캠프별 별점 표시
  const {score} = props;
  const countingStar = () => {
    const star_full = parseInt(score).toFixed(0);
    const star_empty = 5 - star_full;
    let result = [];
    for (let i = 0; i < star_full; i++) {
      result.push(<StarFull><IoStar /></StarFull>);
    }
    for (let i = 0; i < star_empty; i++) {
      result.push(<StarEmpty><IoStar /></StarEmpty>);
    }
    return result;
  }

  return (
    <React.Fragment>
      {countingStar()} {score}
    </React.Fragment>
  )
};

const StarFull = styled.span`
  font-weight: 700;
  color: #e5e5e5;
  vertical-align: middle;
`;

const StarEmpty = styled.span`
  font-weight: 700;
  color: #848484;
  vertical-align: middle;
`;

export default Stars;
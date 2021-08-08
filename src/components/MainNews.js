import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';

const MainNews = (props) => {

  return (
    <React.Fragment>
      <Grid className='top-boot' padding='48px 0 19px'>
        {/* 최신 뉴스 */}
        <Text fontSize='24px' fontWeight='700' color='#F8F9FA'>최신 뉴스</Text>
        <TextBox>
          {/* 개발 관련 최신 뉴스 */}
          <Text fontSize='14px' color='#BDC1C6'>개발 관련 최신 뉴스</Text>
          {/* 뉴스 더보기 버튼 */}
          <Text fontSize='14px' color='#BDC1C6' cursor='pointer'>뉴스 더보기 &gt;</Text>
        </TextBox>
        {/* 뉴스 목록 */}
        <CardList>
          {[1, 2, 3, 4].map((n, idx) => {
            return (
              <NewsCard key={idx} onClick={() => {}}>
                {/* 뉴스 컨텐츠 */}
              </NewsCard>
            );
          })}
        </CardList>
      </Grid>
    </React.Fragment>
  )
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  margin-top: 4px;
`;

const CardList = styled.div`
  height: 335px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NewsCard = styled.div`
  background-color: #202124;
  width: 24%;
  height: 335px;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default MainNews;
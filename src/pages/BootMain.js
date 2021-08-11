import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const BootMain = (props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(campActions.setCampsDB(page));
  }, []);

  const camp_list = useSelector(state => state.bootcamp.camp_list);

  // const baseURL = 'http://13.209.12.149/'     // 서버 URL ; camp.logo 앞에 붙였으나 이미지 불러오기 실패

  // 페이지네이션
  const [page, setPage] = useState(1);
  // 앞 페이지로 가는 함수
  const toPrePage = () => {
    setPage(page - 1);
  }
  // 다음 페이지로 가는 함수
  const toNextPage = () => {
    setPage(page + 1);
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          {/* 부트캠프 */}
          <Text color='#F8F9FA' fontSize='32px' fontWeight='700'>부트캠프</Text>
          {/* 부트캠프 목록 */}
          <CardList>
            {camp_list.map((camp, idx) => {
              return (
                <Card key={idx} onClick={() => history.push({
                  pathname: `/boot/${camp.bootcampName}/info`,
                  state: {camp: camp}
                })}>
                  {/* 부트캠프 로고 */}
                  <ImageDiv>
                    <img src={camp.logo} alt={camp.bootcampName}></img>
                  </ImageDiv>
                  {/* 부트캠프 이름 */}
                  <Text p fontSize="18px" fontWeight="700" margin="16px 0 0" color='#F8F9FA'>
                    {camp.bootcampName}
                  </Text>
                  {/* 부트캠프 설명 */}
                  <Text p fontSize="14px" color="#BDC1C6" margin="3px 0 24px">
                    {camp.desc}
                  </Text>
                  {/* 부트캠프 별점 */}
                  <Text fontSize="14px" color='#E8EAED'>
                    {camp.review[0] ? <Stars score={camp.review[0].stars} size='16px' marginRight='4px' withScore/> : '별점/리뷰 없음'}
                  </Text>
                </Card>
              );
            })}
          </CardList>
          <Grid className='pagination' is_center>
            {/* 페이지네이션 */}
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
              {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page style={{opacity: 1}}>{page}</Page></Text>
              {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{camp_list.length > page * 12 ? page + 1 : ''}</Page></Text>
              {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{camp_list.length > page * 12 ? <BsChevronRight /> : ''}</Page></Text>
            </PageBox>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const CardList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 24px;
`;

const Card = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: 240px;
  border-radius: 8px;
  padding: 24px 36px;
  margin: 0 0 24px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  text-align: center;
  width: 344px;
  height: 86px;
`;

const PageBox = styled.div`
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

export default BootMain;

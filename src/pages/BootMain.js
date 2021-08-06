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
  const [start, setStart] = useState(0);        // 한 페이지에 불러올 첫 게시글 번호 0번
  const [end, setEnd] = useState(12);            // 한 페이지에 불러올 게시글 개수 12개
  const [page, setPage] = useState(1);          // 페이지 번호는 1부터 시작
  const all_camp = useSelector(state => state.bootcamp.camp_list);
  const camp_list = all_camp.slice(start, end);               // 0부터 (end-1)번째까지 출력

    // const baseURL = 'http://13.209.12.149/'     // 서버 URL ; camp.logo 앞에 붙였으나 이미지 불러오기 실패

  useEffect(() => {
    dispatch(campActions.setCampsDB());
  }, []);

  const toPrePage = () => {                        // 앞 페이지로 가는 함수
    setPage(page - 1);
    setStart(start - 12);
    setEnd(end - 12);
  }

  const toNextPage = () => {                      // 다음 페이지로 가는 함수
    setPage(page + 1);
    setStart(start + 12);
    setEnd(end + 12);
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid className='body-inner' minHeight='80.5vh'>
            <Text p color='#F8F9FA' fontSize='3vh' fontWeight='700'>부트캠프</Text>
            <CardList>
              {camp_list.map((camp, idx) => {
                return (
                  <Card key={idx} onClick={() => history.push(`/boot/info/${camp.bootcampName}`)}>
                    <ImageDiv>
                      <img src={camp.logo} alt={camp.bootcampName}></img>
                    </ImageDiv>
                    <Text p fontSize="2vh" fontWeight="700" margin="10vh 0 0" color='#F8F9FA'>
                      {camp.bootcampName}
                    </Text>
                    <Text fontSize="1.5vh" color="#BDC1C6" margin="1px 0 0">
                      {camp.desc}
                    </Text>
                    <Text p fontSize="1.8vh" color='#E8EAED'>
                      {camp.review[0] ? <Stars score={camp.review[0].stars} size='1.7vh' withScore/> : '별점/리뷰 없음'}
                    </Text>
                  </Card>
                );
              })}
            </CardList>
            <Grid className='pagination' height='7vh' is_center>
              {/* 페이지네이션 */}
              <PageBox>
                {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
                <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
                {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
                <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
                {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
                <Text lineHeight='8vh' margin='0 1vw 0'><Page style={{opacity: 1}}>{page}</Page></Text>
                {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
                <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toNextPage()}>{all_camp.length > page * 12 ? page + 1 : ''}</Page></Text>
                {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
                <Text lineHeight='8vh' margin='0 1vw 0'><Page onClick={() => toNextPage()}>{all_camp.length > page * 12 ? <BsChevronRight /> : ''}</Page></Text>
              </PageBox>
            </Grid>
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
  align-items: center;
`;

const Card = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: 35vh;
  border: 0.5vh solid #202124;
  border-radius: 8px;
  margin: 0 0 30px;
  box-sizing: border-box;
  padding: 5vh 2vw 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  text-align: center;
  margin-top: 3vh;
`;

const PageBox = styled.div`
  display: inline-block;
  height: 100%;
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

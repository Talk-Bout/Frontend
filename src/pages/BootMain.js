import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text, Emoji, ToTopBtn } from '../elements';
import { Sidebar, Body, Stars } from '../components';
import { LogoIcon, Rocket_emoji } from '../image';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const BootMain = (props) => {
  const dispatch = useDispatch();

  // 페이지네이션
  const [page, setPage] = useState(1);
  // 페이지 번호가 바뀔 때마다 부트캠프 목록 불러오는 함수 호출
  useEffect(() => {
    dispatch(campActions.setCampsDB(page));
    window.scrollTo(0, 0);
  }, [page]);
  // 불러오는 3페이지짜리 부트캠프 목록
  const all_camp = useSelector(state => state.bootcamp.camp_list);
  // 1페이지에 보여줄 개수로만 자른 목록
  const camp_list = all_camp.slice(0, 12);
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
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          {/* 부트캠프 */}
          <Text p color='#F8F9FA' fontSize='32px' TABfontSize='20px' MOBfontSize='16px' fontWeight='700' margin='0 0 8px' TABmargin='14px 0 0' cursor='default'><Emoji src={Rocket_emoji} alt='로켓' height='32px' TABheight='20px' MOBfontSize='16px' margin='0 8px 0 0' />부트캠프</Text>
          <Text color='#BDC1C6' fontSize='20px' TABfontSize='12px' MOBfontSize='10px' cursor='default'> 부트캠프별 정보를 공유하고 별점도 매겨보세요!</Text>
          {/* 부트캠프 목록 */}
          <CardList>
            {camp_list.map((camp, idx) => {
              return (
                <Card key={idx} onClick={() => history.push(`/boot/${camp.bootcampName}`)}>
                  {/* 부트캠프 로고 */}
                  <ImageDiv>
                    {camp.logo ?
                      <Logo src={camp.logo} alt={camp.bootcampName}></Logo>
                      :
                      <Logo src={LogoIcon} alt={camp.bootcampName} style={{ width: 'auto', height: 'auto' }}></Logo>
                    }
                  </ImageDiv>
                  <div>
                    {/* 부트캠프 이름 */}
                    <Text p fontSize="18px" MOBfontSize='14px' fontWeight="700" position="absolute" top="140px" TABtop='110px' MOBtop='10px' margin="0 0 0 15px" TABmargin='0 0 0 24px' color='#F8F9FA'>
                      {camp.bootcampName}
                    </Text>
                    {/* 부트캠프 설명 */}
                    <Text p fontSize="14px" MOBfontSize='10px' position="absolute" top="172px" TABtop='142px' MOBtop='35px' margin="0 0 0 15px" TABmargin='0 0 0 24px' color='#F8F9FA' MOBcolor='#BDC1C6' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'>
                      {camp.desc}
                    </Text>
                    {/* 부트캠프 별점 */}
                    <Text fontSize="14px" MOBfontSize='12px' color='#E8EAED' MOBcolor='#BDC1C6' position="absolute" top="200px" TABtop='154px' MOBtop='50px' margin="0 0 0 15px" TABmargin='16px 0 16px 24px'>
                      {camp.reviewNumber > 0 ? <Stars score={camp.star} size='16px' TABsize='14px' MOBsize='10px' marginRight='4px' withScore /> : '별점/리뷰 없음'}
                    </Text>
                  </div>
                </Card>
              );
            })}
          </CardList>
          <Grid className='pagination' is_center>
            {/* 페이지네이션 */}
            <PageBox>
              {/* 앞 페이지로 이동하는 화살표는 1페이지에서는 안 보이게 하기 */}
              <Text lineHeight='14px' MOBfontSize='12px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : <BsChevronLeft />}</Page></Text>
              {/* 앞 페이지 번호는 0일 때는 안 보이게 하기 */}
              <Text lineHeight='14px' MOBfontSize='12px' margin='0 20px 0'><Page onClick={() => toPrePage()}>{page === 1 ? '' : page - 1}</Page></Text>
              {/* 가운데 페이지 번호는 현재 페이지 번호로 띄우기 */}
              <Text lineHeight='14px' MOBfontSize='12px' margin='0 20px 0'><Page style={{ opacity: 1 }}>{page}</Page></Text>
              {/* 마지막 페이지 번호는 마지막 페이지에 게시글이 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' MOBfontSize='12px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_camp.length > 12 ? page + 1 : ''}</Page></Text>
              {/* 다음 페이지로 이동하는 화살표는 다음 페이지가 있을 때만 보이게 하기 */}
              <Text lineHeight='14px' MOBfontSize='12px' margin='0 20px 0'><Page onClick={() => toNextPage()}>{all_camp.length > 12 ? <BsChevronRight /> : ''}</Page></Text>
            </PageBox>
            <ToTopBtn />
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
  gap: 30px 15px;
  margin-top: 24px;
  @media screen and (max-width: 1150px) {
    margin-top: 16px;
    gap: 12px;
  }
`;

const Card = styled.div`
width: 32%;
height: 240px;
border-radius: 8px;
box-sizing: border-box;
cursor: pointer;
position: relative;
@media screen and (max-width: 1150px) {
  width: 49%;
  height: 208px;
}
@media screen and (max-width: 768px) {
  width: 100%;
  height: 96px;
  display: flex;
}
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.9;
    ::before {
      position: absolute;
      bottom: 0;
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,.6) 100%);
    }
  }
  @media screen and (max-width: 1150px) {
    opacity: 0.6;
  }
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  border-radius: 8px;
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

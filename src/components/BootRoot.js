import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import { history } from '../redux/ConfigureStore';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions} from '../redux/modules/bootcamp';

const BootRoot = (props) => {
  const dispatch = useDispatch();

  // 부트캠프 이름, 설명, 리뷰(별점), 현재 탭 url 주소를 props로 받는다.
  const {bootcampName, desc, review, url} = props.camp;
  // 현재 접속 중인 사용자의 닉네임
  const username = useSelector(state => state.user.user);
  // 사용자가 북마크한 부트캠프 목록
  const my_camps = useSelector(state => state.bootcamp.my_camp_list);
  // 사용자가 이 부트캠프를 북마크했다면, this_camp에 넣는다.
  const this_camp = my_camps.find((camp) => camp.bootcampName === bootcampName);

  useEffect(() => {
    dispatch(campActions.setMyCampDB(username));
  }, []);
  
  // 부트캠프 북마크 표시
  const markBoot = () => {
    dispatch(campActions.addMyCampDB(username, bootcampName));
  }

  // 부트캠프 북마크 해제
  const unmarkBoot = (bookmark_id) => {
    dispatch(campActions.deleteMyCampDB(bootcampName, bookmark_id));
  }

  return (
    <React.Fragment>
      {/* 부트캠프 로고 */}
      <LogoBox>로고</LogoBox>
      <Grid className='info-button' padding='24px 0'>
        <InfoBtn>
          <div>
          {/* 부트캠프 이름, 북마크 표시 */}
          <Text fontSize='32px' color='#F8F9FA' fontWeight='700'>{bootcampName}
            {/* 이 부트캠프를 북마크했다면, 하트를 클릭했을 때 북마크 해제 함수 호출 */}
            {this_camp ? <Heart check onClick={() => unmarkBoot(this_camp.bootcampBookmarkId)}><HiHeart /></Heart>

            : <Heart onClick={() => markBoot()}><HiOutlineHeart /></Heart>}
          </Text>
          <Text p fontSize='14px' color='#dadce0' margin='0 0 17px'>{desc}</Text>
          </div>
          {/* 홈페이지 바로가기 버튼 */}
          <Button><Text fontSize='14px' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
        </InfoBtn>
        {/* 부트캠프 평점, 리뷰 개수 */}
        <Text fontSize='14px' color='#dadce0'>★<span style={{margin: '0 8px'}}>{review[0].stars}</span>(164개 리뷰)</Text>
      </Grid>
      {/* 정보, 리뷰, 커뮤니티 탭 */}
      {/* url에 따라 메뉴 CSS 달라지게 함 */}
      <Grid className='nav-box' height='54px' margin='40px 0 0' borderBottom='2px solid #5F6368'>
        <Menu url={url === 'info' && 'white'}>
          <Text fontSize='24px' color='#e8eaed' _onClick={() => history.push({pathname: `/boot/${bootcampName}/info`, state: {camp: props.camp}})}>
            정보</Text>
        </Menu>
        <Menu url={url === 'review' && 'white'}>
          <Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: `/boot/${bootcampName}/review`, state: {camp: props.camp}})}>
            리뷰</Text>
        </Menu>
        <Menu url={url === 'community' && 'white'}>
          <Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: `/boot/${bootcampName}/community`, state: {camp: props.camp}})}>
            커뮤니티</Text>
        </Menu>
      </Grid>
    </React.Fragment>
  )
};
BootRoot.defaultProps = {
  bootcampName: '부트캠프명',
  desc: '부트캠프 설명',
  review: [
    {
      stars: 5
    }
  ]
};

const LogoBox = styled.div`
  height: 112px;
  width: 190px;
  border: 1px solid whitesmoke; // 로고 있으면 없애기
  align-items: center;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heart = styled.span`
  font-size: 32px;
  color: ${(props) => props.check ? '#7879F1' : '#9aa0a6'};
  vertical-align: top;
  line-height: 50px;
  margin-left: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 204px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #2E3134;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const Menu = styled.div`
  display: inline-block;
  margin-right: 48px;
  cursor: pointer;
  padding-bottom: 16px;
  ${(props) => props.url === 'white' && 'border-bottom: 4px solid #e8eaed'};
`;

export default BootRoot;
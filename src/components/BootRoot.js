import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { LogoIcon } from '../image';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { getCookie } from '../shared/cookie';

const BootRoot = (props) => {
  const dispatch = useDispatch();

  // 부트캠프 이름, 설명, 리뷰(별점), 현재 탭 url 주소를 props로 받는다.
  const { camp } = props;
  // 현재 접속 중인 사용자의 닉네임
  // const username = useSelector(state => state.user.user.nickname);
  const username = getCookie('nickname');
  const is_login = useSelector(state => state.user.is_login);

  // 사용자가 북마크한 부트캠프 목록
  const my_camps = useSelector(state => state.bootcamp.my_camp_list);
  // 사용자가 이 부트캠프를 북마크했다면, my_camp에 넣는다.
  const my_camp = my_camps.find((c) => c.bootcampName === camp.bootcampName);

  useEffect(() => {
    dispatch(campActions.setMyCampDB());
  }, []);

  // 부트캠프 북마크 표시
  const markBoot = () => {
    dispatch(campActions.addMyCampDB(username, camp.bootcampName));
  }

  // 부트캠프 북마크 해제
  const unmarkBoot = (bookmark_id) => {
    dispatch(campActions.deleteMyCampDB(camp.bootcampName, bookmark_id));
  }

  if (!props.camp) {
    return (
      <></>
    )
  }

  return (
    <React.Fragment>
      {/* 부트캠프 로고 */}
      {camp.logo ?
        <LogoBox><Image src={camp.logo} /></LogoBox>
        :
        <LogoBox style={{ textAlign: 'center' }}><Image src={LogoIcon} style={{ width: '150px', height: '150px' }} /></LogoBox>
      }
      <Grid className='info-button' padding='24px 0' MOBpadding='6px 0 0'>
        <InfoBtn>
          <div>
            {/* 부트캠프 이름, 북마크 표시 */}
            <Text fontSize='32px' MOBfontSize='18px' color='#F8F9FA' fontWeight='700' cursor='default'>{camp.bootcampName}
              {/* 이 부트캠프를 북마크했다면, 하트를 클릭했을 때 북마크 해제 함수 호출 */}
              {is_login ?
                my_camp ?
                  <Heart check onClick={() => unmarkBoot(my_camp.bootcampBookmarkId)}><HiHeart /></Heart>
                  :
                  <Heart onClick={() => markBoot()}><HiOutlineHeart /></Heart>
                :
                ''
              }
            </Text>
            <Text p fontSize='14px' MOBfontSize='12px' color='#dadce0' margin='0 0 17px' MOBmargin='-10px 0 16px' cursor='default'>{camp.desc}</Text>
          </div>
          {/* 홈페이지 바로가기 버튼 */}
          <Button onClick={() => window.open(`${camp.url}`, '_blank')}><Text fontSize='14px' MOBfontSize='10px' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
        </InfoBtn>
        {/* 부트캠프 평점, 리뷰 개수 */}
        <Text fontSize='14px' MOBfontSize='12px' color='#dadce0' cursor='default'>★<span style={{ margin: '0 8px' }}>{Number(camp.star).toFixed(1)}</span>({camp.reviewNumber}개 리뷰)</Text>
        <ButtonMobile onClick={() => window.open(`${camp.url}`, '_blank')}><Text fontSize='14px' MOBfontSize='10px' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></ButtonMobile>
      </Grid>
    </React.Fragment>
  )
};

const LogoBox = styled.div`
  height: 112px;
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 1090px) {
    margin-top: 22px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 6px;
    height: 72px;
    width: 122px;
  }
`;

const Image = styled.img`
  max-width: 100%;
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
  @media screen and (max-width: 767px) {
    vertical-align: middle;
    font-size: 26px;
  }
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
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ButtonMobile = styled.button`
  @media screen and (min-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    width: 116px;
    height: 35px;
    display: block;
    border: none;
    border-radius: 8px;
    background-color: #2E3134;
    cursor: pointer;
    margin-top: 16px;
  }
`;

export default BootRoot;
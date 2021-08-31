import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { Profile_small } from '../image';
import { BiTimeFive } from 'react-icons/bi';

const WriterInfo = (props) => {
  const { userInfo, width_point, mypost_bool } = props;

  return (
    <React.Fragment>
      {/* 화면 너비 (width_point)px 초과일 때 보이기 */}
      <SingleLine width_point={width_point}>
          {/* 작성자 프로필 이미지 */}
          <ProfileBox mypost_bool={mypost_bool}>
          <ProfileImg src={userInfo.profilePic != null && userInfo.profilePic !== 'null' ? `https://fw3efsadfcv.shop${userInfo.profilePic}` : Profile_small}/>
          </ProfileBox>
          {/* 작성자 닉네임 */}
          {mypost_bool ? 
          ''
          :
          <Text fontSize="12px" MOBfontSize='8px' color="#80868b" lineHeight="24px" margin="0 16px 0 8px" TABmargin='0 4px 0' MOBmargin='0 12px 0 4px'>
            {userInfo.nickname}
          </Text>
          }
          {/* 작성일자 */}
          <Text fontSize="12px" color="#80868b" lineHeight="24px" TABfontSize="8px">
            <Text fontSize="16px" TABfontSize="10px" verticalAlign="middle" margin="0 4px 0 0" TABmargin="0 2px 0 0"><BiTimeFive /></Text>
            {userInfo.createdAt}
          </Text>
        </SingleLine>
        {/* 화면 너비 (width_point)px 이하일 때 보이기 */}
        <MultiLine width_point={width_point} >
          {/* 작성자 프로필 이미지 */}
          <ProfileBox mypost_bool={mypost_bool}>
          <ProfileImg src={userInfo.profilePic != null && userInfo.profilePic !== 'null' ? `https://fw3efsadfcv.shop${userInfo.profilePic}` : Profile_small}/>
          </ProfileBox>
          {/* 작성자 닉네임 */}
          {mypost_bool ? 
          ''
          :
          <Text color="#80868b" fontSize='12px' lineHeight='24px' TABfontSize="10px" margin='0 16px 0 8px' TABmargin="0 4px 0">
            {userInfo.nickname}
          </Text>
          }
          <div>
            {/* 작성일자 */}
            <Text fontSize='12px' color="#80868b" lineHeight='24px' TABfontSize="8px">
              <Text fontSize='16px' verticalAlign="middle" TABfontSize="10px" margin='0 4px 0 0' TABmargin="0 2px 0 0"><BiTimeFive /></Text>
              {userInfo.createdAt}
            </Text>
          </div>
        </MultiLine>
    </React.Fragment>
  )
};

WriterInfo.defaultProps = {
  width_point: '1150px',
  userInfo: {
    profilePic: null,
    nickname: 'anonymous',
    createdAt: '2021년 9월 1일 00:00'
  }
}

const SingleLine = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media screen and (min-width: 768px) and (max-width: ${(props) => props.width_point}) {
    display: none;
  }
`;

const MultiLine = styled.div`
  @media screen and (min-width: ${(props) => (parseInt(props.width_point.split('px')[0]) + 1)}px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ProfileBox = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  ${(props) => props.mypost_bool ? 'display: none' : ''};
  @media screen and (max-width: 1150px) {
    width: 16px;
    height: 16px;
    vertical-align: sub;
  }
  @media screen and (max-width: 767px) {
    width: 14px;
    height: 14px;
  }
`;


const ProfileImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  vertical-align: top;
`;

export default WriterInfo;
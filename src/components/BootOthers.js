import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Stars } from '../components';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import CampImg from '../image/talkbout_final_logo.png';

// 다른 부트캠프 목록
const BootOthers = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(campActions.setCampsDB(1));
  }, []);

  // 부트캠프 1페이지 목록 중 4개 랜덤으로 추출
  const all_camps = useSelector(state => state.bootcamp.camp_list); 
  const random_start = Math.floor(Math.random() * 5);
  const others_list = all_camps.slice(random_start, random_start + 4);

  return (
    <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='491px' padding='24px' TABdisplay='none'>
      <Text fontSize='18px' fontWeight='700' color='#e8eaed'>다른 부트캠프</Text>
      {others_list.map((other, idx) => {
        return (
          <Camp key={idx} onClick={() => history.push({pathname: `/boot/${other.bootcampName}/info`, state: {camp: {bootcampName: other.bootcampName}}})}>
            {/* 다른 부트캠프 로고 */}
            <ImageDiv>
              <Image src={other.logo ? other.logo : CampImg}/>
            </ImageDiv>
            <div style={{padding: '29px 16px'}}>
              {/* 다른 부트캠프 이름 */}
              <Text p className='camp-name' fontSize='18px' fontWeight='700' color='#f1f3f4' margin='0 0 4px'>{other.bootcampName}</Text>
              {/* 다른 부트캠프 별점 */}
              <Stars score={other.star} size='16px' marginRight='4px' withScore/>
            </div>
          </Camp>
        )
      })}
    </Grid>
  )
};

const Camp = styled.div`
  height: 104px;
  display: flex;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  height: 72px;
  width: 72px;
  border-radius: 36px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 72px;
`;

export default BootOthers;
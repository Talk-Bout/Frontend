import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid } from '../elements';
import { actionCreators as campActions } from '../redux/modules/bootcamp';

const BootInfo = (props) => {
  const dispatch = useDispatch();
  const bootcampName = decodeURI(window.location.pathname.split('boot/')[1]);

  useEffect(() => {
    dispatch(campActions.setOneCampDB(bootcampName));
  }, [bootcampName]);

  const camp_list = useSelector(state => state.bootcamp.camp_list);
  const one_camp = camp_list.find((camp) => camp.bootcampName === bootcampName);

  // 이게 없으면 자꾸 데이터 undefined라고 합니다.
  if (!one_camp) {
    return <></>
  }

  // 가격 정보가 객체일 경우와 문자열일 경우를 나누어 처리한다.
  let camp_cost;
  if (one_camp.bootcampInfo && typeof (one_camp.bootcampInfo.가격) === 'object') {
    let camp_array = [...Object.values(one_camp.bootcampInfo.가격)];
    camp_cost = Math.min.apply(null, camp_array) + '만원~';
  } else {
    camp_cost = one_camp.bootcampInfo.가격 + '만원';
  }

  // 커리큘럼은 '0주: 준비' 형식의 객체이므로 배열로 만들어 나열한다.
  let course = [];
  course = Object.entries(one_camp.bootcampInfo.커리큘럼);

  return (
    <Grid className='contents-info' backgroundColor='#202124' width='64%' TABwidth='100%' padding='40px' MOBpadding='18px'>
      <InfoList>
        <div><TextKey>코스</TextKey></div>
        <div><TextValue>{one_camp.bootcampInfo.코스}</TextValue></div>
        <div><TextKey>모집기간</TextKey></div>
        <div><TextValue>{one_camp.bootcampInfo.모집기간}</TextValue></div>
        <div><TextKey>가격</TextKey></div>
        <div><TextValue>{camp_cost}</TextValue></div>
        <div><TextKey>커리큘럼</TextKey></div>
        <Schedule>
          {course.map((c_list, idx) => {
            return (
              <>
                <div key={idx}><TextValue>{c_list[0]}</TextValue></div>
                <div><TextValue>{c_list[1]}</TextValue></div>
              </>
            )
          })}
        </Schedule>
      </InfoList>
    </Grid>
  )
};

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  & > div {
    margin-bottom: 16px;
    line-height: 30px;
    @media screen and (max-width: 1090px) {
      line-height: 24px;
    }
  }
`;

const Schedule = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
  @media screen and (max-width: 767px) {
    grid-template-columns: 20% 80%;
  }
`;

const TextKey = styled.span`
  font-size: 16px;
  color: #9aa0a6;
  cursor: default;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const TextValue = styled.span`
  font-size: 16px;
  color: #DADCE0;
  cursor: default;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

export default BootInfo;
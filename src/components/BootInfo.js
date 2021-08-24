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

  // 이게 없으면 자꾸 데이터 undefined 라고 합니다.
  if (!one_camp) {
    return <></>
  }

  // console.log(one_camp)

  // 가격 정보가 객체일 경우와 문자열일 경우를 나누어 처리한다.
  // let camp_cost;
  // if (one_camp.bootcampInfo && typeof (one_camp.bootcampInfo.가격) === 'object') {
  //   let camp_array = [...Object.values(one_camp.bootcampInfo.가격)];
  //   camp_cost = Math.min.apply(null, camp_array) + '만원~';
  // } else {
  //   camp_cost = one_camp.bootcampInfo.가격 + '만원';
  // }

  // 커리큘럼은 '0주: 준비' 형식의 객체이므로 배열로 만들어 나열한다.
  let course = [];
  let course_raw = [];

  course = Object.entries(one_camp.bootcampInfo['커리큘럼']).sort((a, b) => a[0].localeCompare(b[0]));
  // console.log(course);

  // 정보란에 보여줄 모든 정보를 배열로 만들어 나열한다.
  let info = [];
  info = Object.entries(one_camp.bootcampInfo);
  // .sort((a, b) => a[0].localCompare(b[0]));

  return (
    <Grid className='contents-info' backgroundColor='#202124' width='64%' TABwidth='100%' padding='40px' MOBpadding='18px'>
      <InfoList>
        {info.map((i, idx) => {
          // 정보의 key가 커리큘럼이지만 value가 없다면, 커리큘럼 자체를 삭제한다.
          if (i[0].includes('커리큘럼') && !i[1]) {
            return (
              <></>
            )
            // 정보의 key가 커리큘럼이라면, 위에서 만든 커리큘럼 배열을 나열한다.
          } else if (i[0].includes('커리큘럼') && i[1]) {
            return (
              <>
                <div><TextKey key={idx}>{i[0]}</TextKey></div>
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
              </>
            )
            // 정보의 key가 커리큘럼 아닌 나머지라면, 단순 대입한다.
          } else {
            return (
              <>
                <div><TextKey key={idx}>{i[0]}</TextKey></div>
                <div><TextValue>{i[1]}</TextValue></div>
              </>
            )
          }
        })}
      </InfoList>
    </Grid>
  )
};

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  & > div {
    margin: 0 0 16px;
    line-height: 30px;
    @media screen and (max-width: 1090px) {
      line-height: 24px;
    }
  }
`;

const Schedule = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 25% 75%;
  & > div {
    margin-bottom: 4px;
  }
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
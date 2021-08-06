import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_CAMPS = 'SET_CAMPS';

// 액션생성함수
const setCamps = createAction(SET_CAMPS, (camp_list) => ({camp_list}));

// 기본값 정하기
const initialState = {
    camp_list: [],
};

// 액션함수
const setCampsDB = () => {
  return function (dispatch) {
    instance.get('/bootcamp').then((response) => {
      dispatch(setCamps(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 전체 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

export default handleActions({
    [SET_CAMPS]: (state, action) => produce(state, (draft) => {
        draft.camp_list = [...action.payload.camp_list];
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
    setCampsDB,
}

export {
    actionCreators
};
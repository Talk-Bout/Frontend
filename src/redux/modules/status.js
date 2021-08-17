import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';

// 액션타입
const SET_LOADING = 'status/SET_LOADING';
const END_LOADING = 'status/END_LOADING';

// 액션생성함수
const setLoading = createAction(SET_LOADING, (is_loading) => ({is_loading}));
const endLoading = createAction(END_LOADING, (is_loading) => ({is_loading}));

// 기본값 정하기
const initialState = {
    is_loading: false,
};

// 액션함수
// const setNewsDB = () => {
//     return function (dispatch) {
//         instance.get('/')
//       .then((response) => {
//                 dispatch(setNews(response.data));
//             })
//             .catch((err) => {
//                 console.log(`에러 발생: ${err}`);
//             });
//     };
// };

export default handleActions({
    [SET_LOADING]: (state, action) => produce(state, (draft) => {
        draft.is_loading = true;
    }),
    [END_LOADING]: (state, action) => produce(state, (draft) => {
        draft.is_loading = false;
    })
}, initialState);


// 액션 생성자
const actionCreators = {
    setLoading,
    endLoading,
}

export {
    actionCreators
};
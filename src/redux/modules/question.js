import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_QUESTION = 'SET_QUESTION';

// 액션생성함수
const setQuestion = createAction(SET_QUESTION, (question_list) => ({question_list}));

// 기본값 정하기
const initialState = {
    list: [],
};

// 액션함수
const setQuestionDB = () => {
    return function (dispatch) {
        instance.get('/questions').then((response) => {
            console.log(response.data);
            dispatch(setQuestion(response.data));
            })
            .catch((err) => {
                console.error(`모든 질문 불러오기 에러 발생: ${err}`);
            });
    };
};

export default handleActions({
    [SET_QUESTION]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.question_list;
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
    setQuestionDB,
}

export {
    actionCreators
};
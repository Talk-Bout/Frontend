import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// 액션타입
const ADD_TASK = 'status/ADD_TASKS';
const END_TASK = 'status/END_TASK';

// 액션생성함수
const addTask = createAction(ADD_TASK);
const endTask = createAction(END_TASK);

// 기본값 정하기
const initialState = {
    is_loading: false,
    tasks: 0,
};

// 리듀서
export default handleActions({
    [ADD_TASK]: (state, action) => produce(state, (draft) => {
        draft.tasks += 1;
        if (draft.tasks === 1) {
            draft.is_loading = true;
        };
    }),
    [END_TASK]: (state, action) => produce(state, (draft) => {
        draft.tasks -= 1;
        if (draft.tasks === 0) {
            draft.is_loading = false;
        };
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
    addTask,
    endTask,
}

export {
    actionCreators
};
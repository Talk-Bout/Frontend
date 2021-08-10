import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const ADD_BOOKMARK = 'ADD_BOOKMARK';

// 액션생성함수
const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));

// 기본값 정하기
const initialState = {
    list: [],
};

// 액션함수
const addBookmarkDB = (bookmark) => {
    return function (dispatch) {
      const postId = bookmark.postId;
      const nickname = bookmark.nickname;
        instance.get(`/users/${nickname}/bookmark`,{
          postId : postId,
          nickname : nickname,
        })
      .then((response) => {
                dispatch(addBookmark(response.data));
            })
            .catch((err) => {
                console.log(`에러 발생: ${err}`);
            });
    };
};

export default handleActions({
    [ADD_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.bookmark);
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
  addBookmarkDB,
}

export {
    actionCreators
};
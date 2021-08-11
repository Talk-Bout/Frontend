// import {createAction, handleActions} from "redux-actions";
// import {produce} from 'immer';
// import {history} from '../ConfigureStore';
// import instance from '../../shared/Request';

// // 액션타입
// const ADD_BOOKMARK = 'ADD_BOOKMARK';
// const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
// // 액션생성함수
// const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));
// const deleteBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));

// // 기본값 정하기
// const initialState = {
//   list: [],
// };

// // 액션함수
// const addBookmarkDB = (add_bookmark) => {
//   console.log(add_bookmark);
//     return function (dispatch) {
//       const postId = parseInt(add_bookmark.postId);
//       const nickname = add_bookmark.nickname;
//         instance.post(`/posts/${postId}/postBookmarks`,{
//           postId : postId,
//           nickname : nickname,
//         })
//       .then((response) => {
//                 dispatch(addBookmark(response.data));
//                 console.log(response.data);
//                 console.log(response);
//             })
//             .catch((err) => {
//                 console.log(`에러 발생: ${err}`);
//             });
//     };
// };

// const deleteBookmarkDB = () => {
//   return function (dispatch) {
//       instance.get(`/users/${nickname}/bookmark/${bookmarkId}`)
//     .then((response) => {
//               dispatch(deleteBookmark(response.data));
//           })
//           .catch((err) => {
//               console.log(`에러 발생: ${err}`);
//           });
//   };
// };

// export default handleActions({
//     [ADD_BOOKMARK]: (state, action) => produce(state, (draft) => {
//       draft.list.unshift(action.payload.bookmark);
//     }),
//     [DELETE_BOOKMARK]: (state, action) =>
//     produce(state, (draft) => {
//       const deleted_bookmark = draft.list.filter((bookmark) => {
//         if(bookmark.bookmarkId !== action.payload.bookmark){
//           return bookmark;
//         }
//       })
//       draft.list = deleted_bookmark;
//     }),
// }, initialState);


// // 액션 생성자
// const actionCreators = {
//   addBookmarkDB,
// }

// export {
//     actionCreators
// };
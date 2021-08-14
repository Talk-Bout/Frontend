import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import instance from '../../shared/Request';

// API
// 해당 게시물의 댓글 불러오기 /posts/:postId/comments
// 댓글 작성 "POST" /posts/:postId/comments
// 댓글 수정 "PATCH" /posts/:postId/comments/:commentId
// 댓글 삭제 "DELETE" /posts/:postId/comments/:commentId

// 액션타입
const SET_COMMENT = 'comment/SET_COMMENT';         // 댓글 불러오기
const SET_NEXT_COMMENT = 'comment/SET_NEXT_COMMENT';    // 댓글 더보기
const ADD_COMMENT = 'comment/ADD_COMMENT';         // 댓글 추가하기
const EDIT_COMMENT = 'comment/EDIT_COMMENT';       // 댓글 수정하기
const DELETE_COMMENT = 'comment/DELETE_COMMENT';   // 댓글 삭제하기
const IS_EDIT = 'IS_EDIT';

// 액션생성함수
const setComment = createAction(SET_COMMENT, (comment_list) => ({comment_list}));
const setNextComment = createAction(SET_NEXT_COMMENT, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (comment) => ({comment}));
const editComment = createAction(EDIT_COMMENT, (comment) => ({comment}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({commentId}));
const isEdit = createAction(IS_EDIT, (is_edit) => ({is_edit}));

// 기본값 정하기
const initialState = {
    list: [],
  is_edit: false,
};

//액션함수
const setCommentDB = (postId, page) => {
// 댓글 불러오는 함수
return function (dispatch) {
  instance.get(`/posts/${postId}/postComments?page=${page}`, {
  })
  .then((response) => {
        if (page !== 1){
            if (response.data.length !== 0) {
                dispatch(setNextComment(response.data));
              } else {
                window.alert('마지막 댓글입니다.');
                return;
              }
        } else {
            dispatch(setComment(response.data));
        }
        // console.log(setComment(response.data));
    })
    .catch((err) => {
        console.error(`부트톡톡 댓글 불러오기 에러 발생: ${err}`);
    });
};
};

const addCommentDB = (new_comment) => {           // 댓글 추가하는 함수
    return function (dispatch, {history}) {
        const nickname = new_comment.nickname;
        const content = new_comment.content;
        const postId = parseInt(new_comment.postId);
        const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
        instance.post(`/posts/${postId}/postComments`,
        {
            nickname: nickname,
            content: content,
            postId: postId,
        }, {headers: headers}).then((response) => {
            dispatch(addComment(response.data));
            // console.log(response.data);
            }).catch((err) => {
                console.error(`부트톡톡 댓글 추가하기 에러 발생: ${err}`);
            });
        };
    };

const editCommentDB = (edit_comment, postId) => {           // 댓글 수정하는 함수
return function (dispatch, getState, { history }) {
const postCommentId = edit_comment.postCommentId;
const content = edit_comment.content;
instance.patch(`/posts/${postId}/postComments/${postCommentId}`,
{ 
    content: content,
}).then((response) => {
        // console.log(response.data);
        dispatch(editComment(response.data));
    }).catch((err) => {
        console.error(`부트톡톡 댓글 수정하기 에러 발생: ${err}`);
    });
};
};


const deleteCommentDB = (postCommentId, postId) => {           // 댓글 삭제하는 함수
return function (dispatch) {
instance.delete(`/posts/${postId}/postComments/${postCommentId}`
)
.then((response) => {
        // console.log(response.data);
        dispatch(deleteComment(postCommentId));
    }).catch((err) => {
        console.error(`부트톡톡 댓글 삭제하기 에러 발생: ${err}`);
    });
}; 
};


// 리듀서
export default handleActions({
[SET_COMMENT]: (state, action) => produce(state, (draft) => {
    draft.list = [...action.payload.comment_list];
}),
[SET_NEXT_COMMENT] : (state, action) => produce(state, (draft) => {
    draft.list = [...draft.list].concat(action.payload.comment_list);
}),

[ADD_COMMENT]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.comment);
    // console.log(action.payload.comment);
}),

[DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
//     const new_comment_list = draft.list.filter((ct) => {
//         if(ct.commentId !== action.payload.commentId){
//     return ct
//     }
// })
//    draft.list = new_comment_list;
    let idx = draft.list.findIndex((ct)=> ct.commentId === action.payload.commentId);
    draft.list.splice(idx, 1);
}),

[EDIT_COMMENT]: (state, action) =>
produce(state, (draft) => {
    let idx = draft.list.findIndex((ct) => ct.commentId === action.payload.comment.commentId);
    draft.list[idx] = {
        ...draft.list[idx],
        ...action.payload.comment,
    };
   
}),

[IS_EDIT] : (state, action) => produce(state, (draft)=> {
    draft.is_edit = action.payload.is_edit
    }),

}, initialState);


// 액션 생성자
const actionCreators = {
    setComment,
    addComment,
    editComment,
    setCommentDB,
    addCommentDB,
    editCommentDB,
    deleteCommentDB,
    isEdit,
}

export {actionCreators} ;

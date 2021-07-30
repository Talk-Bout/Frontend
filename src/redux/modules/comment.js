import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';

// 액션타입
const SET_COMMENT = 'SET_COMMENT';               // 댓글 불러오기
const ADD_COMMENT = 'ADD_COMMNET';              // 댓글 불러오기
const EDIT_COMMENT = 'EDIT_COMMENT';            // 댓글 불러오기
const DELETE_COMMENT = 'DELETE_COMMENT';        // 댓글 불러오기

// 액션생성함수
const setComment = createAction(SET_COMMENT, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (comment) => ({comment}));
const editComment = createAction(EDIT_COMMENT, (comment) => ({comment}));
const deleteComment = createAction(DELETE_COMMENT, (comment) => ({comment}));

// 기본값 정하기
const initialState = {
    list: [],
};

// 액션함수
const setCommentDB = (postId) => {                        // 댓글 불러오는 함수
    return function (dispatch) {
        const axios = require('axios');
        axios.get(`http://15.165.18.118/posts/${postId}/comments`)
        .then((response) => {
            // console.log('setPostDB 함수 호출 성공!');
            // console.log(response.data);
                dispatch(setComment(response.data));
            })
            .catch((err) => {
                console.log(`에러 발생: ${err}`);
            });
    };
};

const addCommentDB = (new_comment, postId) => {           // 댓글 추가하는 함수
    return function (dispatch, {history}) {
        const nickname = new_comment.nickname;
        const content = new_comment.content;
        const axios = require('axios');
        axios.post(`http://15.165.18.118/posts/${postId}/comments`,
        {
            nickname: nickname,
            content: content,
        }).then((response) => {
                // console.log(response.data);
                dispatch(addComment(response.data));
                // history.push(`/posts/${postId}/comments`);
            }).catch((err) => {
                console.log(`댓글 추가하기 에러 발생: ${err}`);
            });
    };
};

const editCommentDB = (edit_comment, commentId) => {           // 댓글 수정하는 함수
    return function (dispatch, getState) {
        const _content = getState().comment.content;
        const _nickname = getState().comment.nickname;
        const postId = getState().comment.postId;
        const commentId = getState().comment.commentId;
        const axios = require('axios');
        axios.patch(`http://15.165.18.118/posts/${postId}/comments/${commentId}`,
        {

        }).then((response) => {
                console.log('editCommentDB 함수 호출 성공!');
                // history.push('/');
            }).catch((err) => {
                console.log(`댓글 수정하기 에러 발생: ${err}`);
            });
    };
};

const deleteCommentDB = (postId, commentId) => {           // 댓글 삭제하는 함수
    return function (dispatch) {
        const axios = require('axios');
        axios.delete(`http://15.165.18.118/posts/${postId}/comments/${commentId}`)
        .then((response) => {
                // console.log('deleteCommentDB 함수 호출 성공!');
                dispatch(deleteComment(commentId))
                // dispatch(deleteComment(response.data));
            }).catch((err) => {
                console.log(`댓글 삭제하기 에러 발생: ${err}`);
            });
    };
};


// reducer
export default handleActions({
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list = [...action.payload.comment_list];
        // console.log(action.payload.comment_list);
    }),

    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
    }),
    [DELETE_COMMENT]: (state, action) => produce(state,(draft) => {
        let new_comment_list = draft.list.filter((v) => {
            if(v.commentId !== action.payload.comment){
              return v
            }
          })
          draft.list = new_comment_list;
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
}

export {actionCreators} ;
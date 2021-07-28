import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../configureStore';

// 액션타입
const SET_POST = 'SET_POST';        // 게시글 불러오기
const ADD_POST = 'ADD_POST';        // 게시글 추가하기
const EDIT_POST = 'EDIT_POST';      // 게시글 수정하기
const DELETE_POST = 'DELETE_POST';  // 게시글 삭제하기

// 액션생성함수
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post) => ({post}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));

// 기본값 정하기
const initialState = {
    list: [
        {
            postId: 1,
            title: '스파르타 정말 괜찮은가요?',
            author: '코딩초보',
            content: '아무리 생각해도 어느 부트캠프가 좋은지 모르겠습니다.. 스파르타코딩클럽의 항해99라는 프로그램을 추천하는 분들도 계시는데, 믿을 만한 정보일까요? 확실하게 알고 싶습니다.',
            createdAt: '29 07 2021',
            likes: 3,
        },
        {
            postId: 2,
            title: '강의로만 따지자면 글쎄요...',
            author: '비대면조아요',
            content: '강의 질로만 따지자면 저는 차라리 독학하시라고 얘기하고도 싶은데, 독학이 어려우시면 드림코딩 추천합니다. 이해가 잘 돼요.',
            createdAt: '29 07 2021',
            likes: 1,
        },
        {
            postId: 3,
            title: '저 글 쓴 사람 알바 아닙니까?',
            author: '알바척결',
            content: '부트캠프 얘기하자고 모인 곳이잖아요. 왜 여기서 특정 업체 홍보를 하고 있는 겁니까? 저런 사람들 걸러서 내보내야 한다고 생각합니다. 확실한 사용자 인증이 필요한 이유가 바로 여기 있었군요!',
            createdAt: '29 07 2021',
            likes: 5,
        },
    ],
};

// 액션함수
const setPostDB = () => {                     // 전체 게시글 불러오는 함수
    return function (dispatch) {
        const axios = require('axios');
        axios.get('url').then((response) => {
                console.log('setPostDB 함수 호출 성공!');
                // dispatch(setPost(response.data));
            })
            .catch((err) => {
                console.log(`전체 게시글 불러오기 에러 발생: ${err}`);
            });
    };
};

const setOnePostDB = (id) => {                  // 개별 게시글 불러오는 함수
    return function (dispatch) {
        const postId = id;
        const axios = require('axios');
        axios.get('url').then((response) => {
                console.log('setPostDB 함수 호출 성공!');
                // dispatch(setPost(response.data));
            })
            .catch((err) => {
                console.log(`개별 게시글 불러오기 에러 발생: ${err}`);
            });
    };
};

const addPostDB = (new_post) => {           // 게시글 추가하는 함수
    return function (dispatch) {
        const title = new_post.title;
        const content = new_post.content;
        const author = new_post.author;
        const axios = require('axios');
        axios.post('url',
        {
            title: title,
            content: content,
            author: author,
        }).then((response) => {
                console.log('setPostDB 함수 호출 성공!');
                // dispatch(addPost(response.data));
                // history.push('/');
            }).catch((err) => {
                console.log(`게시글 추가하기 에러 발생: ${err}`);
            });
    };
};

const editPostDB = (edited_post) => {           // 게시글 수정하는 함수
    return function (dispatch) {
        const title = edited_post.title;
        const content = edited_post.content;
        const postId = edited_post.postId;
        const axios = require('axios');
        axios.patch('url',
        {
            title: title,
            content: content,
        }).then((response) => {
                console.log('editPostDB 함수 호출 성공!');
                // history.push('/');
            }).catch((err) => {
                console.log(`게시글 수정하기 에러 발생: ${err}`);
            });
    };
};

const deletePostDB = (id) => {           // 게시글 삭제하는 함수
    return function (dispatch) {
        const postId = id;
        const axios = require('axios');
        axios.delete('url').then((response) => {
                console.log('deletePostDB 함수 호출 성공!');
                // history.push('/');
            }).catch((err) => {
                console.log(`게시글 삭제하기 에러 발생: ${err}`);
            });
    };
};

// 리듀서
export default handleActions({
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = [...action.payload.post_list];
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
    setPostDB,
    setOnePostDB,
    addPostDB,
    editPostDB,
    deletePostDB,
}

export {
    actionCreators
};
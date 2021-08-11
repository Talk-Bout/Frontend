import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_CAMPS = 'SET_CAMPS'; // 부트캠프 전체 목록 불러오기

const SET_REVIEWS = 'SET_REVIEWS'; // 리뷰 불러오기
const ADD_REVIEW = 'ADD_REVIEW'; // 리뷰 작성하기

const SET_COMMUS = 'SET_COMMUS'; // 커뮤니티글 전체 목록 불러오기
const SET_ONECOMMU = 'SET_ONECOMMU' // 커뮤니티글 상세페이지 불러오기
const ADD_COMMU = 'ADD_COMMU'; // 커뮤니티글 작성하기
const EDIT_COMMU = 'EDIT_COMMU'; // 커뮤니티글 수정하기

const SET_COMMENTS = 'SET_COMMENTS'; // 커뮤니티 댓글 불러오기
const ADD_COMMENT = 'ADD_COMMENT'; // 커뮤니티 댓글 작성하기
const EDIT_COMMENT = 'EDIT_COMMENT'; // 커뮤니티 댓글 수정하기
const DELETE_COMMENT = 'DELETE_COMMENT'; // 커뮤니티 댓글 삭제하기

// 액션생성함수
const setCamps = createAction(SET_CAMPS, (camp_list) => ({camp_list}));
const setReviews = createAction(SET_REVIEWS, (review_list) => ({review_list}));
const addReview = createAction(ADD_REVIEW, (review) => ({review}));
const setCommus = createAction(SET_COMMUS, (commu_list) => ({commu_list}));
const setOneCommu = createAction(SET_ONECOMMU, (commu) => ({commu}));
const addCommu = createAction(ADD_COMMU, (commu) => ({commu}));
const editCommu = createAction(EDIT_COMMU, (commu) => ({commu}));
const setComments = createAction(SET_COMMENTS, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (comment) => ({comment}));
const editComment = createAction(EDIT_COMMENT, (comment) => ({comment}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({commentId}));


// 기본값 정하기
const initialState = {
    camp_list: [],    // 부트캠프 전체 목록을 담을 배열
    review_list: [],    // 리뷰 목록을 담을 배열
    commu_list: [],   // 커뮤니티글 목록을 담을 배열
    comment_list: [], // 커뮤니티글의 댓글 목록을 담을 배열
};

// 액션함수
const setCampsDB = (page) => {
  // 서버로부터 부트캠프 전체 목록 불러오는 함수(페이징)
  return function (dispatch) {
    instance.get(`/bootcamp?page=${page}`).then((response) => {
      dispatch(setCamps(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 전체 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setReviewsDB = (camp_name, page) => {
  // 서버로부터 리뷰 불러오는 함수(페이징)
  return function (dispatch) {
    instance.get(`/bootcamp/${camp_name}/review?page=${page}`).then((response) => {
      dispatch(setReviews(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      console.error(`부트캠프 리뷰 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addReviewDB = (new_review) => {
  // 서버에 리뷰 저장하는 함수
  return function (dispatch) {
    instance.post(`/bootcamp/${new_review.bootcampName}/review`, {
      nickname: new_review.nickname,
      bootcampName: new_review.bootcampName,
      status: new_review.status,
      pros: new_review.pros,
      cons: new_review.cons,
      stars: new_review.stars,
      title: new_review.title,
    }).then((response) => {
      dispatch(addReview(response.data));
      history.goBack();
    }).catch((err) => {
      console.error(`부트캠프 리뷰 작성하기 에러 발생: ${err} ### ${err.response}`);
    })
  }
};

const setCommusDB = (camp_name, page) => {
  // 서버로부터 커뮤니티글 목록 불러오는 함수(페이징)
  return function (dispatch) {
    instance.get(`/bootcamp/${camp_name}/community?page=${page}`).then((response) => {
      dispatch(setCommus(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 커뮤니티글 전체 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setOneCommuDB = (camp_name, commu_id) => {
  // 서버로부터 커뮤니티글 하나를 불러오는 함수
  return function (dispatch) {
    instance.get(`/bootcamp/${camp_name}/community/${commu_id}`).then((response) => {
      dispatch(setOneCommu(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 커뮤니티글 하나 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addCommuDB = (new_commu) => {
  // 서버에 커뮤니티글 저장하는 함수
  return function (dispatch) {
    instance.post(`/bootcamp/${new_commu.bootcampName}/community`, {
      nickname: new_commu.nickname,
      bootcampName: new_commu.bootcampName,
      title: new_commu.title,
      content: new_commu.content,
      image: new_commu.image,
    }).then((response) => {
      dispatch(addCommu(response.data));
      history.goBack();
    })
    .catch((err) => {
      console.error(`부트캠프 커뮤니티글 작성하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const editCommuDB = (edited_commu) => {
  // 서버의 커뮤니티글을 수정하는 함수
  return function (dispatch) {
    instance.patch(`/bootcamp/${edited_commu.bootcampName}/community/${edited_commu.communityId}`, {
      title: edited_commu.title,
      content: edited_commu.content
    }).then((response) => {
      dispatch(editCommu(response.data));
      history.push(`/boot/${edited_commu.bootcampName}/post/${edited_commu.communityId}`);
    })
    .catch((err) => {
      console.error(`부트캠프 커뮤니티글 수정하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const deleteCommuDB = (deleted_commu) => {
  // 서버의 커뮤니티글을 삭제하는 함수
  return function (dispatch) {
    instance.delete(`/bootcamp/${deleted_commu.bootcampName}/community/${deleted_commu.communityId}`).then(
      history.goBack()
    ).catch((err) => {
      console.error(`부트캠프 커뮤니티글 삭제하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setCommentsDB = (commu_id, page) => {
  // 서버로부터 커뮤니티글의 댓글 목록 불러오는 함수
  return function (dispatch) {
    instance.get(`/community/${commu_id}/communityComments?page=${page}`).then((response) => {
      dispatch(setComments(response.data));
    }).catch((err) => {
      console.error(`부트캠프 커뮤니티 댓글 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addCommentDB = (new_comment) => {
  // 서버에 커뮤니티글의 댓글 저장하는 함수
  return function (dispatch) {
    instance.post(`/community/${new_comment.communityId}/communityComments`, {
      content: new_comment.content,
      nickname: new_comment.nickname,
      communityId: new_comment.communityId,
    }).then((response) => {
      dispatch(addComment(response.data));
    }).catch((err) => {
      console.error(`부트캠프 커뮤니티 댓글 작성하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const editCommentDB = (edited_comment) => {
  // 서버의 커뮤니티 댓글 수정하는 함수
  return function (dispatch) {
    instance.patch(`community/${edited_comment.communityId}/communityComments/${edited_comment.communityCommentId}`, {
      content: edited_comment.content}).then((response) => {
      dispatch(editComment(response.data));
    }).catch((err) => {
      console.error(`부트캠프 커뮤니티 댓글 수정하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const deleteCommentDB = (deleted_comment) => {
  // 서버의 커뮤니티 댓글 삭제하는 함수
  return function (dispatch) {
    instance.delete(`/community/${deleted_comment.communityId}/communityComments/${deleted_comment.communityCommentId}`
    ).then(
        dispatch(deleteComment(deleted_comment.communityCommentId))
    ).catch((err) => {
      console.error(`부트캠프 커뮤니티 댓글 삭제하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

export default handleActions({
    [SET_CAMPS]: (state, action) => produce(state, (draft) => {
      draft.camp_list = [...action.payload.camp_list];
    }),
    [SET_REVIEWS]: (state, action) => produce(state, (draft) => {
      draft.review_list = [...action.payload.review_list];
    }),
    [ADD_REVIEW]: (state, action) => produce(state, (draft) => {
      draft.review_list.unshift(action.payload.review);
    }),
    [SET_COMMUS]: (state, action) => produce(state, (draft) => {
      draft.commu_list = [...action.payload.commu_list];
    }),
    [SET_ONECOMMU]: (state, action) => produce(state, (draft) => {
      draft.commu_list = [action.payload.commu];
    }),
    [ADD_COMMU]: (state, action) => produce(state, (draft) => {
      draft.commu_list.unshift(action.payload.commu);
    }),
    [EDIT_COMMU]: (state, action) => produce(state, (draft) => {
      let idx = draft.commu_list.findIndex((commu) => commu.communityId === action.payload.commu.communityId);
      draft.commu_list[idx] = action.payload.commu;
    }),
    [SET_COMMENTS]: (state, action) => produce(state, (draft) => {
      draft.comment_list = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.comment_list.unshift(action.payload.comment);
      let idx = draft.commu_list.findIndex((commu) => commu.communityId === action.payload.comment.communityId);
      draft.commu_list[idx].communityComment.unshift(action.payload.comment);
    }),
    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
      console.log(action.payload.comment);
      let idx = draft.comment_list.findIndex((comment) => comment.communityCommentId === action.payload.comment.communityCommentId);
      draft.comment_list[idx] = action.payload.comment;
    }),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.comment_list.findIndex((comment) => comment.communityCommentId === action.payload.commentId);
      draft.comment_list.splice(idx, 1);
    })
}, initialState);


// 액션 생성자
const actionCreators = {
    setCampsDB,
    setReviewsDB,
    addReviewDB,
    setCommusDB,
    setOneCommuDB,
    addCommuDB,
    editCommuDB,
    deleteCommuDB,
    setCommentsDB,
    addCommentDB,
    editCommentDB,
    deleteCommentDB,
}

export {
    actionCreators
};
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';
import { actionCreators as statusActions } from './status';

// 액션타입
const MAIN_CAMPS = 'bootcamp/MAIN_CAMPS' // 메인페이지 부트캠프 목록 불러오기(인기순)
const SET_CAMPS = 'bootcamp/SET_CAMPS'; // 부트캠프 전체 목록 불러오기
const SET_MY_CAMP = 'bootcamp/SET_MY_CAMP'; // 북마크한 부트캠프 목록 불러오기
const ADD_MY_CAMP = 'bootcamp/ADD_MY_CAMP'; // 부트캠프 북마크하기
const DELETE_MY_CAMP = 'bootcamp/DELETE_MY_CAMP'; // 부트캠프 북마크 해제하기

const SET_REVIEWS = 'bootcamp/SET_REVIEWS'; // 리뷰 불러오기
const ADD_REVIEW = 'bootcamp/ADD_REVIEW'; // 리뷰 작성하기

const SET_COMMUS = 'bootcamp/SET_COMMUS'; // 커뮤니티글 전체 목록 불러오기
const SET_ONE_COMMU = 'bootcamp/SET_ONECOMMU'; // 커뮤니티글 상세페이지 불러오기
const ADD_COMMU = 'bootcamp/ADD_COMMU'; // 커뮤니티글 작성하기
const EDIT_COMMU = 'bootcamp/EDIT_COMMU'; // 커뮤니티글 수정하기

const SET_MY_COMMU = 'bootcamp/SET_MY_COMMU'; // 북마크한 커뮤니티글 목록 불러오기
const ADD_MY_COMMU = 'bootcamp/ADD_MY_COMMU'; // 커뮤니티글 북마크하기
const DELETE_MY_COMMU = 'bootcamp/DELETE_MY_COMMU'; // 커뮤니티글 북마크 해제하기

const LIKE_COMMU = 'bootcamp/LIKE_COMMU'; // 커뮤니티글 좋아요 표시하기
const UNLIKE_COMMU = 'bootcamp/UNLIKE_COMMU'; // 커뮤니티글 좋아요 해제하기

const SET_COMMENTS = 'bootcamp/SET_COMMENTS'; // 커뮤니티 댓글 불러오기
const SET_NEXT_COMMENTS = 'bootcamp/SET_NEXT_COMMENTS'; // 커뮤니티 다음 페이지 댓글 불러오기(더보기 버튼 눌렀을 때)
const ADD_COMMENT = 'bootcamp/ADD_COMMENT'; // 커뮤니티 댓글 작성하기
const EDIT_COMMENT = 'bootcamp/EDIT_COMMENT'; // 커뮤니티 댓글 수정하기
const DELETE_COMMENT = 'bootcamp/DELETE_COMMENT'; // 커뮤니티 댓글 삭제하기

// 액션생성함수
const mainCamps = createAction(MAIN_CAMPS, (camp_list) => ({camp_list}));
const setCamps = createAction(SET_CAMPS, (camp_list) => ({camp_list}));
const setMyCamp = createAction(SET_MY_CAMP, (camp_list) => ({camp_list}));
const addMyCamp = createAction(ADD_MY_CAMP, (camp) => ({camp}));
const deleteMyCamp = createAction(DELETE_MY_CAMP, (bookmark_id) => ({bookmark_id}));
const setReviews = createAction(SET_REVIEWS, (review_list) => ({review_list}));
const addReview = createAction(ADD_REVIEW, (review) => ({review}));
const setCommus = createAction(SET_COMMUS, (commu_list) => ({commu_list}));
const setOneCommu = createAction(SET_ONE_COMMU, (commu) => ({commu}));
const addCommu = createAction(ADD_COMMU, (commu) => ({commu}));
const editCommu = createAction(EDIT_COMMU, (commu) => ({commu}));
const setMyCommu = createAction(SET_MY_COMMU, (commu_list) => ({commu_list}));
const addMyCommu = createAction(ADD_MY_COMMU, (commu) => ({commu}));
const deleteMyCommu = createAction(DELETE_MY_COMMU, (bookmark_id) => ({bookmark_id}));
const likeCommu = createAction(LIKE_COMMU, (like) => ({like}));
const unlikeCommu = createAction(UNLIKE_COMMU, (like) => ({like}));
const setComments = createAction(SET_COMMENTS, (comment_list) => ({comment_list}));
const setNextComments = createAction(SET_NEXT_COMMENTS, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (comment) => ({comment}));
const editComment = createAction(EDIT_COMMENT, (comment) => ({comment}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({commentId}));

// 기본값 정하기
const initialState = {
  camp_list: [], // 부트캠프 전체 목록
  my_camp_list: [], // 북마크한 부트캠프 목록
  review_list: [], // 리뷰 목록
  commu_list: [], // 커뮤니티글 목록
  one_commu: null, // 개별 커뮤니티글
  my_commu_list: [], // 북마크한 커뮤니티글 목록
  commu_like_list: [], // 커뮤니티글 좋아요 한 사용자 목록
  comment_list: [], // 커뮤니티글의 댓글 목록
};

// 액션함수
const mainCampsDB = () => {
  // 메인페이지 부트캠프 목록 불러오는 함수(인기순)
  return function (dispatch) {
    // dispatch(statusActions.setLoading());
    instance.get(`/popular/bootcamps`).then((response) => {
      dispatch(mainCamps(response.data));
      dispatch(statusActions.endLoading());
    }).catch((err) => {
      console.error(`메인페이지 부트캠프 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setCampsDB = (page) => {
  // 서버로부터 부트캠프 전체 목록 불러오는 함수(페이징)
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance
      .get(`/bootcamp?page=${page}`)
      .then((response) => {
        dispatch(setCamps(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(
          `부트캠프 전체 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setMyCampDB = () => {
  // 서버에 저장된 부트캠프 북마크 목록 불러오는 함수
  return function (dispatch) {
    instance
      .get('/tokenUser')
      .then((response) => {
        const nickname = response.data.nickname;
        instance
          .get(`/users/${nickname}/bootcampBookmarks`)
          .then((response) => {
            dispatch(setMyCamp(response.data));
          })
          .catch((err) => {
            console.error(
              `북마크한 부트캠프 불러오기 에러 발생: ${err} ### ${err.response}`
            );
          });
      })
      .catch((err) => {
        console.error(
          `사용자 닉네임 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const addMyCampDB = (nickname, bootcampName) => {
  // 부트캠프 북마크 표시하는 함수
  return function (dispatch) {
    if (nickname === undefined) {
      window.alert('로그인 후에 이용 가능합니다.');
      return;
    }
    instance
      .post(`/bootcamp/${bootcampName}/bootcampBookmarks`, {
        nickname: nickname,
        bootcampName: bootcampName,
      })
      .then((response) => {
        dispatch(addMyCamp(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 북마크 추가하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const deleteMyCampDB = (bootcampName, bootcampBookmarkId) => {
  // 부트캠프 북마크 해제하는 함수
  return function (dispatch) {
    instance
      .delete(
        `/bootcamp/${bootcampName}/bootcampBookmarks/${bootcampBookmarkId}`
      )
      .then((response) => {
        dispatch(deleteMyCamp(bootcampBookmarkId));
      })
      .catch((err) => {
        console.error(
          `부트캠프 북마크 해제하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setReviewsDB = (camp_name, page) => {
  // 서버로부터 리뷰 불러오는 함수(페이징)
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance
      .get(`/bootcamp/${camp_name}/review?page=${page}`)
      .then((response) => {
        dispatch(setReviews(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(
          `부트캠프 리뷰 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const addReviewDB = (new_review) => {
  // 서버에 리뷰 저장하는 함수
  return function (dispatch) {
    instance
      .post(`/bootcamp/${new_review.bootcampName}/review`, {
        nickname: new_review.nickname,
        bootcampName: new_review.bootcampName,
        status: new_review.status,
        pros: new_review.pros,
        cons: new_review.cons,
        stars: new_review.stars,
        title: new_review.title,
      })
      .then((response) => {
        dispatch(addReview(response.data));
        history.goBack();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          window.alert('리뷰는 한 번만 작성할 수 있습니다.');
          history.goBack();
          return;
        }
        console.error(
          `부트캠프 리뷰 작성하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setCommusDB = (camp_name, page) => {
  // 서버로부터 커뮤니티글 목록 불러오는 함수(페이징)
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance
      .get(`/bootcamp/${camp_name}/community?page=${page}`)
      .then((response) => {
        dispatch(setCommus(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 전체 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setOneCommuDB = (camp_name, commu_id) => {
  // 서버로부터 커뮤니티글 하나를 불러오는 함수
  return function (dispatch) {
    instance
      .get(`/bootcamp/${camp_name}/community/${commu_id}`)
      .then((response) => {
        dispatch(setOneCommu(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 하나 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const addCommuDB = (new_commu) => {
  // 서버에 커뮤니티글 저장하는 함수
  return function (dispatch) {
    instance
      .post(`/bootcamp/${new_commu.bootcampName}/community`, {
        nickname: new_commu.nickname,
        bootcampName: new_commu.bootcampName,
        title: new_commu.title,
        content: new_commu.content,
        image: new_commu.image,
      })
      .then((response) => {
        dispatch(addCommu(response.data));
        history.push(
          `/boot/${response.data.bootcampName}/post/${response.data.communityId}`
        );
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 작성하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const editCommuDB = (edited_commu) => {
  // 서버의 커뮤니티글을 수정하는 함수
  return function (dispatch) {
    instance
      .patch(
        `/bootcamp/${edited_commu.bootcampName}/community/${edited_commu.communityId}`,
        {
          title: edited_commu.title,
          content: edited_commu.content,
          image: edited_commu.image,
        }
      )
      .then((response) => {
        dispatch(editCommu(response.data));
        history.push(
          `/boot/${edited_commu.bootcampName}/post/${edited_commu.communityId}`
        );
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 수정하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const deleteCommuDB = (deleted_commu) => {
  // 서버의 커뮤니티글을 삭제하는 함수
  return function (dispatch) {
    instance
      .delete(
        `/bootcamp/${deleted_commu.bootcampName}/community/${deleted_commu.communityId}`
      )
      .then((response) => {
        history.goBack();
      })
      .catch((err) => {
        console.error(`부트캠프 커뮤니티글 삭제하기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const setMyCommuDB = () => {
  // 서버로부터 북마크한 커뮤니티글 목록 불러오는 함수
  return function (dispatch) {
    instance.get('/tokenUser').then((response) => {
      const nickname = response.data.nickname;
      instance.get(`/users/${nickname}/communityBookmarks`)
    }).then((result) => {
        dispatch(setMyCommu(result.data));
      }).catch((err) => {
        console.error(`부트캠프 커뮤니티글 북마크 목록 불러오기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const addMyCommuDB = (nickname, communityId) => {
  // 커뮤니티글 북마크 표시하는 함수
  return function (dispatch) {
    if (nickname === undefined) {
      window.alert('로그인 후에 이용 가능합니다.');
      return;
    }
    instance
      .post(`/community/${communityId}/communityBookmarks`, {
        nickname: nickname,
        communityId: communityId,
      })
      .then((response) => {
        dispatch(addMyCommu(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 북마크 추가하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const deleteMyCommuDB = (communityId, communityBookmarkId) => {
  // 커뮤니티글 북마크 해제하는 함수
  return function (dispatch) {
    instance
      .delete(
        `/community/${communityId}/communityBookmarks/${communityBookmarkId}`
      )
      .then((response) => {
        dispatch(deleteMyCommu(communityBookmarkId));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 북마크 해제하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const likeCommuDB = (communityId, nickname) => {
  // 커뮤니티글 좋아요 표시하는 함수
  return function (dispatch) {
    if (nickname === undefined) {
      window.alert('로그인 후에 이용 가능합니다.');
      return;
    }
    instance
      .post(`/community/${communityId}/communityLikes`, {
        communityId: communityId,
        nickname: nickname,
      })
      .then((response) => {
        dispatch(likeCommu(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 좋아요 표시하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const unlikeCommuDB = (communityId, communityLikeId) => {
  // 커뮤니티글 좋아요 해제하는 함수
  return function (dispatch) {
    instance
      .delete(`/community/${communityId}/communityLikes/${communityLikeId}`)
      .then((response) => {
        dispatch(unlikeCommu(communityId, communityLikeId));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티글 좋아요 해제하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setCommentsDB = (commu_id, page) => {
  // 서버로부터 커뮤니티글의 댓글 목록 불러오는 함수(페이징)
  return function (dispatch) {
    instance
      .get(`/community/${commu_id}/communityComments?page=${page}`)
      .then((response) => {
        if (page !== 1) {
          if (response.data.length !== 0) {
            dispatch(setNextComments(response.data));
          } else {
            window.alert('마지막 댓글입니다.');
            return;
          }
        } else {
          dispatch(setComments(response.data));
          dispatch(statusActions.endLoading());
        }
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티 댓글 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const addCommentDB = (new_comment) => {
  // 서버에 커뮤니티글의 댓글 저장하는 함수
  return function (dispatch) {
    if (new_comment.nickname === undefined) {
      window.alert('로그인 후에 이용 가능합니다.');
      return;
    }
    instance
      .post(`/community/${new_comment.communityId}/communityComments`, {
        content: new_comment.content,
        nickname: new_comment.nickname,
        communityId: new_comment.communityId,
      })
      .then((response) => {
        dispatch(addComment(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티 댓글 작성하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const editCommentDB = (edited_comment) => {
  // 서버의 커뮤니티 댓글 수정하는 함수
  return function (dispatch) {
    instance
      .patch(
        `community/${edited_comment.communityId}/communityComments/${edited_comment.communityCommentId}`,
        {
          content: edited_comment.content,
        }
      )
      .then((response) => {
        dispatch(editComment(response.data));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티 댓글 수정하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const deleteCommentDB = (deleted_comment) => {
  // 서버의 커뮤니티 댓글 삭제하는 함수
  return function (dispatch) {
    instance
      .delete(
        `/community/${deleted_comment.communityId}/communityComments/${deleted_comment.communityCommentId}`
      )
      .then((response) => {
        dispatch(deleteComment(deleted_comment.communityCommentId));
      })
      .catch((err) => {
        console.error(
          `부트캠프 커뮤니티 댓글 삭제하기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

export default handleActions({
  [MAIN_CAMPS]: (state, action) => produce(state, (draft) => {
    draft.camp_list = [...action.payload.camp_list];
  }),
  [SET_CAMPS]: (state, action) => produce(state, (draft) => {
    draft.camp_list = [...action.payload.camp_list];
  }),
  [SET_MY_CAMP]: (state, action) => produce(state, (draft) => {
    draft.my_camp_list = [...action.payload.camp_list];
  }),
  [ADD_MY_CAMP]: (state,action) => produce(state, (draft) => {
    draft.my_camp_list.push(action.payload.camp);
  }),
  [DELETE_MY_CAMP]: (state, action) => produce(state, (draft) => {
    let idx = draft.my_camp_list.findIndex((camp) => camp.bootcampBookmarkId === action.payload.bookmark_id);
    draft.my_camp_list.splice(idx, 1);
  }),
  [SET_REVIEWS]: (state, action) => produce(state, (draft) => {
    draft.review_list = [...action.payload.review_list];
  }),
  [ADD_REVIEW]: (state, action) => produce(state, (draft) => {
    draft.review_list.push(action.payload.review);
  }),
  [SET_COMMUS]: (state, action) => produce(state, (draft) => {
    draft.commu_list = [...action.payload.commu_list];
  }),
  [SET_ONE_COMMU]: (state, action) => produce(state, (draft) => {
    draft.one_commu = action.payload.commu;
    draft.commu_like_list = action.payload.commu.communityLike;
  }),
  [ADD_COMMU]: (state, action) => produce(state, (draft) => {
    draft.commu_list.push(action.payload.commu);
  }),
  [EDIT_COMMU]: (state, action) => produce(state, (draft) => {
    let idx = draft.commu_list.findIndex((commu) => commu.communityId === action.payload.commu.communityId);
    draft.commu_list[idx] = action.payload.commu;
  }),
  [SET_MY_COMMU]: (state, action) => produce(state, (draft) => {
    draft.my_commu_list = [...action.payload.commu_list];
  }),
  [ADD_MY_COMMU]: (state, action) => produce(state, (draft) => {
    draft.my_commu_list.push(action.payload.commu);
  }),
  [DELETE_MY_COMMU]: (state, action) => produce(state, (draft) => {
    let idx = draft.my_commu_list.findIndex((camp) => camp.communityBookmarkId === action.payload.bookmark_id);
    draft.my_commu_list.splice(idx, 1);
  }),
  [LIKE_COMMU]: (state, action) => produce(state, (draft) => {
    draft.commu_like_list.push(action.payload.like);
  }),
  [UNLIKE_COMMU]: (state, action) => produce(state, (draft) => {
    let like_idx = draft.commu_like_list.findIndex((like) => like.communityLikeId === action.payload.like.communityId);
    draft.commu_like_list.splice(like_idx, 1);
  }),
  [SET_COMMENTS]: (state, action) => produce(state, (draft) => {
    draft.comment_list = [...action.payload.comment_list];
  }),
  [SET_NEXT_COMMENTS]: (state, action) => produce(state, (draft) => {
    draft.comment_list = [...draft.comment_list].concat(action.payload.comment_list);
  }),
  [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
    if (draft.comment_list.length % 5 !== 0 || draft.comment_list.length === 0) {
      draft.comment_list.push(action.payload.comment);
    }
    draft.one_commu.communityComment.push(action.payload.comment);
  }),
  [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
    let idx = draft.comment_list.findIndex((comment) => comment.communityCommentId === action.payload.comment.communityCommentId);
    draft.comment_list[idx] = action.payload.comment;
  }),
  [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
    let idx = draft.comment_list.findIndex((comment) => comment.communityCommentId === action.payload.commentId);
    draft.comment_list.splice(idx, 1);
  }),
}, initialState);

// 액션 생성자
const actionCreators = {
  mainCampsDB,
  setCampsDB,
  addMyCampDB,
  setMyCampDB,
  deleteMyCampDB,
  setReviewsDB,
  addReviewDB,
  setCommusDB,
  setOneCommuDB,
  addCommuDB,
  editCommuDB,
  deleteCommuDB,
  setMyCommuDB,
  addMyCommuDB,
  deleteMyCommuDB,
  likeCommuDB,
  unlikeCommuDB,
  setCommentsDB,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};

export { actionCreators };

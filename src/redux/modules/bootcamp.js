import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';

// 액션타입
const MAIN_CAMPS = 'bootcamp/MAIN_CAMPS' // 메인페이지 부트캠프 목록 불러오기(인기순)
const SET_CAMPS = 'bootcamp/SET_CAMPS'; // 부트캠프 전체 목록 불러오기
const SET_ONE_CAMP = 'bootcamp/SET_ONE_CAMP'; // 부트캠프 개별 정보 불러오기
const SET_MY_CAMP = 'bootcamp/SET_MY_CAMP'; // 북마크한 부트캠프 목록 불러오기
const ADD_MY_CAMP = 'bootcamp/ADD_MY_CAMP'; // 부트캠프 북마크하기
const DELETE_MY_CAMP = 'bootcamp/DELETE_MY_CAMP'; // 부트캠프 북마크 해제하기
const SET_REVIEWS = 'bootcamp/SET_REVIEWS'; // 리뷰 불러오기
const ADD_REVIEW = 'bootcamp/ADD_REVIEW'; // 리뷰 작성하기
const SET_OTHERS = 'bootcamp/SET_OTHERS'; // 다른 부트캠프 목록 불러오기

// 액션생성함수
const mainCamps = createAction(MAIN_CAMPS, (camp_list) => ({ camp_list }));
const setCamps = createAction(SET_CAMPS, (camp_list) => ({ camp_list }));
const setOneCamp = createAction(SET_ONE_CAMP, (camp) => ({ camp }));
const setMyCamp = createAction(SET_MY_CAMP, (camp_list) => ({ camp_list }));
const addMyCamp = createAction(ADD_MY_CAMP, (camp) => ({ camp }));
const deleteMyCamp = createAction(DELETE_MY_CAMP, (bookmark_id) => ({ bookmark_id }));
const setReviews = createAction(SET_REVIEWS, (review_list) => ({ review_list }));
const addReview = createAction(ADD_REVIEW, (review) => ({ review }));
const setOthers = createAction(SET_OTHERS, (camp_list) => ({ camp_list }));

// 기본값 정하기
const initialState = {
  camp_list: [], // 부트캠프 전체 목록
  my_camp_list: [], // 북마크한 부트캠프 목록
  review_list: [], // 리뷰 목록
  others_list: [], // 다른 부트캠프 목록
};

// 액션함수
const mainCampsDB = () => {
  // 메인페이지 부트캠프 목록 불러오는 함수(인기순)
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance.get(`/popular/bootcamps`).then((response) => {
      dispatch(mainCamps(response.data));
      dispatch(statusActions.endTask());
    }).catch((err) => {
      // console.error(`메인페이지 부트캠프 불러오기 에러 발생: ${err} ### ${err.response}`);
      // if (window.confirm(`에러가 발생했습니다! :(\n[mainCampsDB: ${err}]\n새로고침하시겠습니까?`)) {
      //   window.location.reload();
      // }
      dispatch(statusActions.endTask());
    });
  };
};

const setCampsDB = (page) => {
  // 서버로부터 부트캠프 전체 목록 불러오는 함수(페이징)
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance
      .get(`/bootcamp?page=${page}`)
      .then((response) => {
        dispatch(setCamps(response.data));
        dispatch(statusActions.endTask());
      })
      .catch((err) => {
        // console.error(
        //   `부트캠프 전체 불러오기 에러 발생: ${err} ### ${err.response}`
        // );
        dispatch(statusActions.endTask());
        if (window.confirm(`에러가 발생했습니다! :( \n[setCampsDB: ${err}]\n메인으로 돌아가시겠습니까?`)) {
          history.push('/');
        };
      });
  };
};

const setOneCampDB = (bootcampName) => {
  // 서버로부터 부트캠프 개별 정보 불러오는 함수
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance.get(`/bootcamp/${bootcampName}`)
      .then((response) => {
        dispatch(setOneCamp(response.data));
        dispatch(statusActions.endTask());
      }).catch((err) => {
        // console.error(`부트캠프 개별 정보 불러오기 에러 발생: ${err} ### ${err.response}`);
        dispatch(statusActions.endTask());
        if (window.confirm(`에러가 발생했습니다! :( \n[setOneCampDB: ${err}]\n새로고침하시겠습니까?`)) {
          window.location.reload();
        };
      });
  };
};

const setMyCampDB = (nickname) => {
  // 서버에 저장된 부트캠프 북마크 목록 불러오는 함수
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance
      .get(`/users/${nickname}/bootcampBookmarks`)
      .then((response) => {
        dispatch(setMyCamp(response.data));
        dispatch(statusActions.endTask());
      })
      .catch((err) => {
        // console.error(
        //   `북마크한 부트캠프 불러오기 에러 발생: ${err} ### ${err.response}`);
        window.alert(`부트캠프 북마크 정보를 불러오는 데 문제가 발생했어요! :(`)
        dispatch(statusActions.endTask());
      });
  };
};

const addMyCampDB = (nickname, bootcampName) => {
  // 부트캠프 북마크 표시하는 함수
  return function (dispatch) {
    instance
      .post(`/bootcamp/${bootcampName}/bootcampBookmarks`, {
        nickname: nickname,
        bootcampName: bootcampName,
      })
      .then((response) => {
        dispatch(addMyCamp(response.data));
      })
      .catch((err) => {
        // console.error(
        //   `부트캠프 북마크 추가하기 에러 발생: ${err} ### ${err.response}`
        // );
        if (err.response.status === 500) {
          window.alert('이미 북마크한 부트캠프입니다.');
          return;
        }
        window.alert('부트캠프 북마크를 추가하는 데 문제가 발생했어요! :(')
      });
  };
};

const deleteMyCampDB = (bootcampName, bootcampBookmarkId) => {
  // 부트캠프 북마크 해제하는 함수
  return function (dispatch) {
    instance
      .delete(
        `/bootcamp/${bootcampName}/bootcampBookmarks`
      )
      .then((response) => {
        if (response.data.isDeleted === true) {
          dispatch(deleteMyCamp(bootcampBookmarkId));
        }
      })
      .catch((err) => {
        // console.error(
        //   `부트캠프 북마크 해제하기 에러 발생: ${err} ### ${err.response.status} ### ${err.response.message} ### ${err.response.meta}`
        // );
        window.alert('부트캠프 북마크를 해제하는 데 문제가 발생했어요! :(');
      });
  };
};

const setReviewsDB = (camp_name, page) => {
  // 서버로부터 리뷰 불러오는 함수(페이징)
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance
      .get(`/bootcamp/${camp_name}/review?page=${page}`)
      .then((response) => {
        dispatch(setReviews(response.data));
        dispatch(statusActions.endTask());
      })
      .catch((err) => {
        // console.error(
        //   `부트캠프 리뷰 불러오기 에러 발생: ${err} ### ${err.response}`
        // );
        dispatch(statusActions.endTask());
        if (window.confirm(`에러가 발생했습니다! :( \n[setReviewsDB: ${err}]\n새로고침하시겠습니까?`)) {
          window.location.reload();
        };
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
          window.alert('리뷰는 한 번만 작성할 수 있습니다.\n이전 페이지로 돌아갑니다.');
          history.goBack();
          return;
        }
        // console.error(
        //   `부트캠프 리뷰 작성하기 에러 발생: ${err} ### ${err.response}`
        // );
        window.alert(`에러가 발생했습니다! :(\n잠시 후 다시 시도해주세요.`);
        history.goBack();
      });
  };
};

const setOthersDB = (bootcampName) => {
  // 서버로부터 다른 부트캠프 목록 불러오는 함수
  return function (dispatch) {
    instance.get(`/bootcamp/${bootcampName}/notme`)
      .then((response) => {
        dispatch(setOthers(response.data));
      }).catch((err) => {
        // console.error(`다른 부트캠프 목록 불러오기 에러 발생: ${err} ### ${err.response} ### ${err.message} ### ${err.meta}`);
        window.alert('다른 부트캠프 목록을 불러오는 데 문제가 발생했어요! :(')
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
  [SET_ONE_CAMP]: (state, action) => produce(state, (draft) => {
    draft.camp_list = [action.payload.camp];
  }),
  [SET_MY_CAMP]: (state, action) => produce(state, (draft) => {
    draft.my_camp_list = [...action.payload.camp_list];
  }),
  [ADD_MY_CAMP]: (state, action) => produce(state, (draft) => {
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
    draft.review_list.unshift(action.payload.review);
  }),
  [SET_OTHERS]: (state, action) => produce(state, (draft) => {
    draft.others_list = [...action.payload.camp_list];
  })
}, initialState);

// 액션 생성자
const actionCreators = {
  mainCampsDB,
  setCampsDB,
  setOneCampDB,
  addMyCampDB,
  setMyCampDB,
  deleteMyCampDB,
  setReviewsDB,
  addReviewDB,
  setOthersDB,
};

export { actionCreators };

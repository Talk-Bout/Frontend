import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';
import { getCookie } from '../../shared/cookie';

// 액션타입
const MAIN_CAMPS = 'bootcamp/MAIN_CAMPS' // 메인페이지 부트캠프 목록 불러오기(인기순)
const SET_CAMPS = 'bootcamp/SET_CAMPS'; // 부트캠프 전체 목록 불러오기
const SET_MY_CAMP = 'bootcamp/SET_MY_CAMP'; // 북마크한 부트캠프 목록 불러오기
const ADD_MY_CAMP = 'bootcamp/ADD_MY_CAMP'; // 부트캠프 북마크하기
const DELETE_MY_CAMP = 'bootcamp/DELETE_MY_CAMP'; // 부트캠프 북마크 해제하기
const SET_REVIEWS = 'bootcamp/SET_REVIEWS'; // 리뷰 불러오기
const ADD_REVIEW = 'bootcamp/ADD_REVIEW'; // 리뷰 작성하기

// 액션생성함수
const mainCamps = createAction(MAIN_CAMPS, (camp_list) => ({ camp_list }));
const setCamps = createAction(SET_CAMPS, (camp_list) => ({ camp_list }));
const setMyCamp = createAction(SET_MY_CAMP, (camp_list) => ({ camp_list }));
const addMyCamp = createAction(ADD_MY_CAMP, (camp) => ({ camp }));
const deleteMyCamp = createAction(DELETE_MY_CAMP, (bookmark_id) => ({ bookmark_id }));
const setReviews = createAction(SET_REVIEWS, (review_list) => ({ review_list }));
const addReview = createAction(ADD_REVIEW, (review) => ({ review }));

// 기본값 정하기
const initialState = {
  camp_list: [], // 부트캠프 전체 목록
  my_camp_list: [], // 북마크한 부트캠프 목록
  review_list: [], // 리뷰 목록
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
    // instance
    //   .get('/tokenUser')
    //   .then((response) => {
    const nickname = getCookie('nickname');
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
    // })
    // .catch((err) => {
    //   console.error(
    //     `사용자 닉네임 불러오기 에러 발생: ${err} ### ${err.response}`
    //   );
    // });
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
    draft.review_list.push(action.payload.review);
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
};

export { actionCreators };

import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_CAMPS = 'SET_CAMPS'; // 부트캠프 전체 목록 불러오기
const SET_REVIEWS = 'SET_REVIEWS'; // 부트캠프 리뷰 불러오기
const ADD_REVIEW = 'ADD_REVIEW'; // 부트캠프 리뷰 작성하기

// 액션생성함수
const setCamps = createAction(SET_CAMPS, (camp_list) => ({camp_list}));
const setReviews = createAction(SET_REVIEWS, (review_list) => ({review_list}));
const addReview = createAction(ADD_REVIEW, (review) => ({review}));

// 기본값 정하기
const initialState = {
    camp_list: [],    // 부트캠프 전체 목록을 담을 빈 배열
    review_list: [],    // 부트캠프 리뷰 목록을 담을 빈 배열
};

// 액션함수
const setCampsDB = () => {    // 서버로부터 부트캠프 전체 목록 불러오는 함수
  return function (dispatch) {
    instance.get('/bootcamp').then((response) => {
      dispatch(setCamps(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 전체 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setReviewsDB = (camp_name) => {   // 서버로부터 부트캠프 리뷰 불러오는 함수
  return function (dispatch) {
    instance.get(`/bootcamp/${camp_name}/review`).then((response) => {
      dispatch(setReviews(response.data));
    })
    .catch((err) => {
      console.error(`부트캠프 리뷰 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addReviewDB = (new_review) => {     // 서버에 리뷰 저장하는 함수
  return function (dispatch) {
    instance.post(`/bootcamp/${new_review.bootcampName}/review`, {
      nickname: new_review.nickname,
      bootcampName: new_review.bootcampName,
      season: new_review.season,
      pros: new_review.pros,
      cons: new_review.cons,
      stars: new_review.stars,
    }).then((response) => {
      console.log(response.data);     // response.data = {isCreated: true} .......
    }).catch((err) => {
      console.error(`부트캠프 리뷰 작성하기 에러 발생: ${err} ### ${err.response}`);
    })
  }
};

export default handleActions({
    [SET_CAMPS]: (state, action) => produce(state, (draft) => {
      draft.camp_list = [...action.payload.camp_list];
    }),
    [SET_REVIEWS]: (state, action) => produce(state, (draft) => {
      draft.review_list = [...action.payload.review_list];
    }),
    [ADD_REVIEW]: (state, action) => produce(state, (draft) => {
      console.log(action.payload.review);
      // draft.review_list.unshift(action.payload.review);
    })
}, initialState);


// 액션 생성자
const actionCreators = {
    setCampsDB,
    setReviewsDB,
    addReviewDB,
}

export {
    actionCreators
};
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';

// QUESTION 액션타입
const SET_QUESTION = 'question/SET_QUESTION';
const SET_QUESTION_POP = 'question/SET_QUESTION_POP';
const SET_ONE_QUESTION = 'question/SET_ONE_QUESTION';
const CREATE_QUESTION = 'question/CREATE_QUESTION';
const EDIT_QUESTION = 'question/EDIT_QUESTION';
const DELETE_QUESTION = 'question/DELETE_QUESTION';

//ANSWER 액션타입
const SET_ANSWER = 'question/SET_ANSWER';
const CREATE_ANSWER = 'question/CREATE_ANSWER';
const SET_NEXT_ANSWER = 'question/SET_NEXT_ANSWER';

//북마크 액션타입
const SET_QUESTION_BOOKMARK = 'question/SET_QUESTION_BOOKMARK';
const ADD_QUESTION_BOOKMARK = 'question/ADD_QUESTION_BOOKMARK';
const DELETE_QUESTION_BOOKMARK = 'question/DELETE_QUESTION_BOOKMARK';

//좋아요 액션타입
const LIKE_QUESTION = 'question/LIKE_QUESTION';
const UNLIKE_QUESTION = 'question/UNLIKE_QUESTION';
const LIKE_ANSWER = 'question/LIKE_ANSWER';
const UNLIKE_ANSWER = 'question/UNLIKE_ANSWER';

// QUESTION 액션생성함수
const setQuestion = createAction(SET_QUESTION, (question_list) => ({ question_list }));
const setQuestionPop = createAction(SET_QUESTION_POP, (question_list) => ({ question_list }));
const setOneQuestion = createAction(SET_ONE_QUESTION, (question) => ({ question }));
const createQuestion = createAction(CREATE_QUESTION, (question) => ({ question }));
const editQuestion = createAction(EDIT_QUESTION, (question) => ({ question }));
const deleteQuestion = createAction(DELETE_QUESTION, (question_id) => ({ question_id }));

// ANSWER 액션생성함수
const setAnswer = createAction(SET_ANSWER, (answer_list) => ({ answer_list }));
const setNextAnswer = createAction(SET_NEXT_ANSWER, (answer_list) => ({ answer_list }));
const createAnswer = createAction(CREATE_ANSWER, (answer) => ({ answer }));

// BOOKMARK 액션생성함수
const setQuestionBookmark = createAction(SET_QUESTION_BOOKMARK, (bookmark_list) => ({ bookmark_list }));
const addQuestionBookmark = createAction(ADD_QUESTION_BOOKMARK, (question_bookmark) => ({ question_bookmark }));
const deleteQuestionBookmark = createAction(DELETE_QUESTION_BOOKMARK, (bookmark_id) => ({ bookmark_id }));

// 좋아요 액션생성함수
const likeQuestion = createAction(LIKE_QUESTION, (q_like) => ({ q_like }));
const unlikeQuestion = createAction(UNLIKE_QUESTION, (q_like_id) => ({ q_like_id }));
const likeAnswer = createAction(LIKE_ANSWER, (a_like) => ({ a_like }));
const unlikeAnswer = createAction(UNLIKE_ANSWER, (a_like) => ({ a_like }));

// 기본값 정하기
const initialState = {
  list: [],
  popular_list: [], // 인기순 정렬
  answer_list: [],
  bookmark_list: [],
  question_like_list: [], //질문 좋아요 리스트
  answer_like_list: [], // 답변 좋아요 리스트
};

// 액션함수
const setQuestionDB = (page) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance
      .get(`/questions?page=${page}`)
      .then((response) => {
        dispatch(setQuestion(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        // console.error(`모든 질문 불러오기 에러 발생: ${err}`);
        if (window.confirm(`에러가 발생했습니다! :(\n[setQuestionDB: ${err}]\n메인으로 돌아가시겠습니까?`)) {
          history.push('/');
          dispatch(statusActions.endLoading());
        }
      });
  };
};

const setQuestionPopDB = (page) => {
  // 질문글 인기순 정렬
  return function (dispatch) {
    if (window.location.pathname.split('/')[1] !== '') {
      dispatch(statusActions.setLoading());
    }
    instance
      .get(`/popular/questions?page=${page}`)
      .then((response) => {
        dispatch(setQuestionPop(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        // console.error(
        //   `질문 인기순 불러오기 에러 발생: ${err} ### ${err.response}`
        // );
        dispatch(statusActions.endLoading());
        if (window.confirm(`에러가 발생했습니다! :( \n[setQuestionPopDB: ${err}]\n새로고침하시겠습니까?`)) {
          window.location.reload();
        };
      });
  };
};

const setOneQuestionDB = (question_id) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    dispatch(statusActions.setLoading());
    instance
      .get(`/questions/${questionId}`)
      .then((response) => {
        dispatch(setOneQuestion(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        // console.error(`개별 질문 불러오기 에러 발생: ${err}`);
        dispatch(statusActions.endLoading());
        if (window.confirm(`에러가 발생했습니다! :( \n[setOneQuestionDB: ${err}]\n새로고침하시겠습니까?`)) {
          window.location.reload();
        };
      });
  };
};

const createQuestionDB = (new_question) => {
  return function (dispatch) {
    const title = new_question.title;
    const content = new_question.content;
    const nickname = new_question.nickname;
    const image = new_question.image;
    instance
      .post(`/questions`, {
        title: title,
        content: content,
        nickname: nickname,
        image: image,
      })
      .then((response) => {
        dispatch(createQuestion(response.data));
        history.push('/question');
      })
      .catch((err) => {
        // console.error(`질문 작성하기 에러: ${err}`);
        window.alert(`에러가 발생했습니다! :(\n잠시 후 다시 시도해주세요.`);
      });
  };
};

const editQuestionDB = (edit_question) => {
  return function (dispatch) {
    const title = edit_question.title;
    const content = edit_question.content;
    const questionId = parseInt(edit_question.questionId);
    const nickname = edit_question.nickname;
    const image = edit_question.image;
    instance
      .patch(`/questions/${questionId}`, {
        title: title,
        content: content,
        nickname: nickname,
        image: image,
      })
      .then((response) => {
        dispatch(editQuestion(response.data));
        history.push('/question');
      })
      .catch((err) => {
        // console.error(`질문 수정하기 에러: ${err}`);
        window.alert(`에러가 발생했습니다! :(\n잠시 후 다시 시도해주세요.`);
      });
  };
};

const deleteQuestionDB = (question_id) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    instance
      .delete(`/questions/${questionId}`)
      .then((response) => {
        if (response.data.isDeleted === true) {
          dispatch(deleteQuestion(questionId));
        }
      })
      .catch((err) => {
        // console.error(`질문 삭제 에러 발생: ${err}`);
        window.alert(`에러가 발생했습니다! :(\n잠시 후 다시 시도해주세요.`);
      });
  };
};

const setAnswerDB = (question_id, page) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    instance
      .get(`/questions/${questionId}/answers?page=${page}`)
      .then((response) => {
        dispatch(setAnswer(response.data));
        if (page !== 1 && response.data.length === 0) {
          window.alert('마지막 답변입니다.');
          return;
        }
      })
      .catch((err) => {
        console.error(`답변 불러오기 에러 발생 : ${err}`);
      });
  };
};

const setNextAnswerDB = (question_id, page) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    instance
      .get(`/questions/${questionId}/answers?page=${page}`)
      .then((response) => {
        dispatch(setNextAnswer(response.data));
        if (page !== 1 && response.data.length === 0) {
          window.alert('마지막 답변입니다.');
          return;
        }
      })
      .catch((err) => {
        console.error(`질문 불러오기 에러 발생 : ${err}`);
      });
  };
};

const createAnswerDB = (new_answer) => {
  return function (dispatch) {
    const questionId = parseInt(new_answer.questionId);
    const content = new_answer.content;
    const nickname = new_answer.nickname;
    instance
      .post(`/questions/${questionId}/answers`, {
        content: content,
        nickname: nickname,
        questionId: questionId,
      })
      .then((response) => {
        const new_answer_data = { ...response.data, answerLike: [], likeNumber: 0 }
        dispatch(createAnswer(new_answer_data));
      })
      .catch((err) => {
        console.error(`답변 작성하기 에러: ${err}`);
      });
  };
};

const setQuestionBookmarkDB = (nickname) => {
  return function (dispatch) {
    if (!nickname) {
      return;
    }
    instance
      .get(`/users/${nickname}/questionBookmarks`)
      .then((result) => {
        dispatch(setQuestionBookmark(result.data));
      })
      .catch((err) => {
        console.error(`QNA 북마크 목록 불러오기 에러: ${err}`);
      });
  };
};

const addQuestionBookmarkDB = (question_id, user_name) => {
  return function (dispatch) {
    instance
      .post(`/questions/${question_id}/questionBookmarks`, {
        nickname: user_name,
        questionId: parseInt(question_id),
      })
      .then((response) => {
        dispatch(addQuestionBookmark(response.data));
      })
      .catch((err) => {
        console.error(`질문 북마크 추가 에러: ${err.response}`);
      });
  };
};

const deleteQuestionBookmarkDB = (question_id, questionBookmarkId) => {
  return function (dispatch) {
    instance
      .delete(
        `/questions/${question_id}/questionBookmarks/`
      )
      .then((response) => {
        if (response.data.isDeleted === true) {
          dispatch(deleteQuestionBookmark(questionBookmarkId));
        }
      })
      .catch((err) => {
        console.error(`질문 북마크 삭제 에러: ${err}`);
      });
  };
};

const likeQuestionDB = (question_id, user_name) => {
  return function (dispatch) {
    instance
      .post(`/questions/${question_id}/questionLikes`, {
        nickname: user_name,
        questionId: question_id,
      })
      .then((response) => {
        dispatch(likeQuestion(response.data));
      })
      .catch((err) => {
        console.error(`질문 좋아요 추가 에러 : ${err}`);
      });
  };
};

const unlikeQuestionDB = (question_id, questionLikeId) => {
  return function (dispatch) {
    instance
      .delete(`/questions/${question_id}/questionLikes`)
      .then((response) => {
        if (response.data.isDeleted === true) {
          dispatch(unlikeQuestion(questionLikeId));
        }
      })
      .catch((err) => {
        console.error(`질문 좋아요 삭제 에러 : ${err}`);
      });
  };
};

const likeAnswerDB = (answer_id, user_name) => {
  return function (dispatch) {
    instance
      .post(`/answers/${answer_id}/answerLike`, {
        nickname: user_name,
        answerId: answer_id,
      })
      .then((response) => {
        dispatch(likeAnswer(response.data));
      })
      .catch((err) => {
        console.error(`답변 좋아요 추가 에러 : ${err}`);
      });
  };
};

const unlikeAnswerDB = (answer_id, answerLikeId, nickname) => {
  return function (dispatch) {
    instance
      .delete(`/answers/${answer_id}/answerLike`)
      .then((response) => {
        const like_info = {
          answer_id: answer_id,
          answerLikeId: answerLikeId,
        }
        if (response.data.isDeleted === true) {
          dispatch(unlikeAnswer(like_info));
        }
      })
      .catch((err) => {
        console.error(`답변 좋아요 삭제 에러 : ${err.response}`);
      });
  };
};

export default handleActions(
  {
    [SET_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.question_list;
      }),
    [SET_QUESTION_POP]: (state, action) =>
      produce(state, (draft) => {
        draft.popular_list = action.payload.question_list;
      }),
    [SET_ONE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.question];
        draft.question_like_list =
          action.payload.question.questionLike;
      }),
    [CREATE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.question); //배열 맨 앞에 배치
      }),
    [EDIT_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.question];
      }),
    [DELETE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((question) => question.questionId === action.payload.question_id);
        draft.list.splice(idx, 1);
      }),
    [SET_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list = action.payload.answer_list;
      }),
    [SET_NEXT_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list = draft.answer_list.concat(
          action.payload.answer_list
        );
      }),
    [CREATE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list.push(action.payload.answer);
      }),
    [SET_QUESTION_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmark_list = action.payload.bookmark_list;
      }),
    [ADD_QUESTION_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmark_list.push(action.payload.question_bookmark);
      }),
    [DELETE_QUESTION_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        let bookmark_idx = draft.bookmark_list.findIndex(
          (info) => info.questionBookmarkId === action.payload.bookmark_id
        );
        draft.bookmark_list.splice(bookmark_idx, 1);
      }),
    [LIKE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.question_like_list.push(action.payload.q_like);
      }),
    [UNLIKE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        let like_idx = draft.question_like_list.findIndex(
          (info) => info.questionLikeId === action.payload.q_like_id
        );
        draft.question_like_list.splice(like_idx, 1);
      }),
    [LIKE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        let like_answer_idx = draft.answer_list.findIndex(
          (answer) => answer.answerId === action.payload.a_like.answerId
        );
        draft.answer_list[like_answer_idx].likeNumber += 1;
        draft.answer_list[like_answer_idx].answerLike.push(action.payload.a_like);
      }),
    [UNLIKE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        let answer_idx = draft.answer_list.findIndex(
          (answer) => answer.answerId === action.payload.a_like.answer_id
        );
        let answerLike_idx = draft.answer_list[answer_idx].answerLike.findIndex(
          (info) =>
            info.answerLikeId === action.payload.a_like.answerLikeId
        );
        draft.answer_list[answer_idx].answerLike.splice(answerLike_idx, 1);
        draft.answer_list[answer_idx].likeNumber -= 1;
      }),
  },
  initialState
);

// 액션 생성자
const actionCreators = {
  setQuestionDB,
  setQuestionPopDB,
  setOneQuestionDB,
  createQuestionDB,
  deleteQuestionDB,
  editQuestionDB,
  setAnswerDB,
  setNextAnswerDB,
  createAnswerDB,
  setQuestionBookmarkDB,
  addQuestionBookmarkDB,
  deleteQuestionBookmarkDB,
  likeQuestionDB,
  unlikeQuestionDB,
  likeAnswerDB,
  unlikeAnswerDB,
};

export { actionCreators };

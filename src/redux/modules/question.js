import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';
import { actionCreators as statusActions } from './status';

// QUESTION 액션타입
const SET_QUESTION = 'question/SET_QUESTION';
const SET_QUESTION_POP = 'question/SET_QUESTION_POP'; // <-- 추가했습니다!!
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
const setQuestion = createAction(SET_QUESTION, (question_list) => ({
  question_list,
}));

const setQuestionPop = createAction(SET_QUESTION_POP, (question_list) => ({
  question_list,
})); // <-- 추가했습니다!!

const setOneQuestion = createAction(SET_ONE_QUESTION, (question) => ({
  question,
}));
const createQuestion = createAction(CREATE_QUESTION, (question) => ({
  question,
}));
const editQuestion = createAction(EDIT_QUESTION, (question) => ({ question }));
const deleteQuestion = createAction(DELETE_QUESTION, (question) => ({
  question,
}));

// ANSWER 액션생성함수
const setAnswer = createAction(SET_ANSWER, (answer_list) => ({ answer_list }));
const setNextAnswer = createAction(SET_NEXT_ANSWER, (answer_list) => ({
  answer_list,
}));
const createAnswer = createAction(CREATE_ANSWER, (answer) => ({ answer }));

// BOOKMARK 액션생성함수
const setQuestionBookmark = createAction(
  SET_QUESTION_BOOKMARK,
  (bookmark_list) => ({ bookmark_list })
);
const addQuestionBookmark = createAction(
  ADD_QUESTION_BOOKMARK,
  (question_bookmark) => ({ question_bookmark })
);
const deleteQuestionBookmark = createAction(
  DELETE_QUESTION_BOOKMARK,
  (bookmark_id) => ({ bookmark_id })
);

// 좋아요 액션생성함수
const likeQuestion = createAction(LIKE_QUESTION, (q_like) => ({ q_like }));
const unlikeQuestion = createAction(UNLIKE_QUESTION, (q_like_id) => ({
  q_like_id,
}));
const likeAnswer = createAction(LIKE_ANSWER, (a_like) => ({ a_like }));
const unlikeAnswer = createAction(UNLIKE_ANSWER, (a_like_info) => ({
  a_like_info,
}));

// 기본값 정하기
const initialState = {
  list: [],
  popular_list: [], // 인기순 정렬                                                    <-- 추가했습니다!!
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
        console.error(`모든 질문 불러오기 에러 발생: ${err}`);
      });
  };
};

const setQuestionPopDB = (page) => {
  // 질문글 인기순 정렬
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance
      .get(`/popular/questions?page=${page}`)
      .then((response) => {
        dispatch(setQuestionPop(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(
          `질문 인기순 불러오기 에러 발생: ${err} ### ${err.response}`
        );
      });
  };
};

const setOneQuestionDB = (question_id) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    instance
      .get(`/questions/${questionId}`)
      .then((response) => {
        dispatch(setOneQuestion(response.data));
      })
      .catch((err) => {
        console.error(`개별 질문 불러오기 에러 발생: ${err}`);
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
        // console.log(response.data);
        dispatch(createQuestion(response.data));
      })
      .catch((err) => {
        console.error(`질문 작성하기 에러: ${err}`);
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
      })
      .catch((err) => {
        console.error(`질문 작성하기 에러: ${err}`);
      });
  };
};

const deleteQuestionDB = (question_id) => {
  return function (dispatch) {
    const questionId = parseInt(question_id);
    instance
      .delete(`/questions/${questionId}`)
      .then((response) => {
        dispatch(deleteQuestion(response.data));
      })
      .catch((err) => {
        console.error(`질문 삭제 에러 발생: ${err}`);
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
        console.error(`질문 불러오기 에러 발생 : ${err}`);
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
        dispatch(createAnswer(response.data));
      })
      .catch((err) => {
        console.error(`답변 작성하기 에러: ${err}`);
      });
  };
};

const setQuestionBookmarkDB = () => {
  return function (dispatch) {
    instance.get('/tokenUser').then((response) => {
      const nickname = response.data.nickname;
      instance
        .get(`/users/${nickname}/questionBookmarks`)
        .then((result) => {
          dispatch(setQuestionBookmark(result.data));
        })
        .catch((err) => {
          console.error(`QNA 북마크 목록 불러오기 에러: ${err}`);
        });
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
        `/questions/${question_id}/questionBookmarks/${questionBookmarkId}`
      )
      .then((response) => {
        dispatch(deleteQuestionBookmark(questionBookmarkId));
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
        console.error(`질문 좋아요추가 에러 : ${err}`);
      });
  };
};

const unlikeQuestionDB = (question_id, questionLikeId) => {
  return function (dispatch) {
    instance
      .delete(`/questions/${question_id}/questionLikes/${questionLikeId}`)
      .then((response) => {
        dispatch(unlikeQuestion(questionLikeId));
      })
      .catch((err) => {
        console.error(`질문 좋아요삭제 에러 : ${err}`);
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
        console.error(`답변 좋아요추가 에러 : ${err}`);
      });
  };
};

const unlikeAnswerDB = (answer_id, answerLikeId) => {
  return function (dispatch) {
    const answer_info = {
      answer_id: answer_id,
      answerLikeId: answerLikeId,
    };
    instance
      .delete(`/answers/${answer_id}/answerLike/${answerLikeId}`)
      .then((response) => {
        dispatch(unlikeAnswer(answer_info));
      })
      .catch((err) => {
        console.error(`답변 좋아요삭제 에러 : ${err}`);
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
        draft.list = [action.payload.question.questionDetail];
        draft.question_like_list =
          action.payload.question.questionDetail.questionLike;
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
        const deleted_question = draft.list.filter((question) => {
          if (question.questionId !== action.payload.question) {
            return question;
          }
          draft.list = deleted_question;
        });
      }),
    [SET_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list = action.payload.answer_list;

        let answers_like_list = [];
        action.payload.answer_list.map((answer, idx) => {
          answers_like_list.push(answer.answerLike);
        });

        draft.answer_like_list = answers_like_list; //아니면 Push에러 뜬다
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
        // console.log(action.payload.bookmark_id);
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
        draft.answer_list[like_answer_idx].answerLike.push(
          action.payload.a_like
        );
      }),
    [UNLIKE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.a_like_info);
        let answer_idx = draft.answer_list.findIndex(
          (answer) => answer.answerId === action.payload.a_like_info.answer_id
        );
        let answerLike_idx = draft.answer_list[answer_idx].answerLike.findIndex(
          (info) =>
            info.answerLikeId === action.payload.a_like_info.answerLikeId
        );
        draft.answer_list[answer_idx].answerLike.splice(answerLike_idx, 1);
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

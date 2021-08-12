import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';
import { bindActionCreators } from 'redux';

// QUESTION 액션타입
const SET_QUESTION = 'SET_QUESTION';
const SET_ONE_QUESTION = 'SET_ONE_QUESTION';
const CREATE_QUESTION = 'CREATE_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';

//ANSWER 액션타입
const SET_ANSWER = 'SET_ANSWER';
const CREATE_ANSWER = 'CREATE_ANSWER';

// QUESTION 액션생성함수
const setQuestion = createAction(SET_QUESTION, (question_list) => ({
  question_list,
}));
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

// QUESTION 액션생성함수
const setAnswer = createAction(SET_ANSWER, (answer_list) => ({ answer_list }));
const createAnswer = createAction(CREATE_ANSWER, (answer) => ({ answer }));

// 기본값 정하기
const initialState = {
  list: [],
  answer_list: [],
};

// 액션함수
const setQuestionDB = (page) => {
  return function (dispatch) {
    instance
      .get(`/questions?page=${page}`)
      .then((response) => {
        dispatch(setQuestion(response.data));
      })
      .catch((err) => {
        console.error(`모든 질문 불러오기 에러 발생: ${err}`);
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
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    instance
      .post(
        `/questions`,
        {
          title: title,
          content: content,
          nickname: nickname,
          image: image,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response.data);
        // dispatch(createQuestion(response.data));
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
    const questionId = edit_question.questionId;
    const nickname = edit_question.nickname;
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    instance
      .patch(
        `/questions/${questionId}`,
        {
          title: title,
          content: content,
          nickname: nickname,
        },
        { headers: headers }
      )
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
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    instance
      .delete(`/questions/${questionId}`, { headers: headers })
      .then((response) => {
        dispatch(deleteQuestion(response.data));
      })
      .catch((err) => {
        console.log(`질문 삭제 에러 발생: ${err}`);
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
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    instance
      .post(
        `/questions/${questionId}/answers`,
        {
          content: content,
          nickname: nickname,
          questionId: questionId,
        },
        { headers: headers }
      )
      .then((response) => {
        dispatch(createAnswer(response.data));
      })
      .catch((err) => {
        console.error(`답변 작성하기 에러: ${err}`);
      });
  };
};
export default handleActions(
  {
    [SET_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.question_list;
      }),
    [SET_ONE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.question.questionDetail];
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
      }),
    [CREATE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list.unshift(action.payload.answer);
      }),
  },
  initialState
);

// 액션 생성자
const actionCreators = {
  setQuestionDB,
  setOneQuestionDB,
  createQuestionDB,
  deleteQuestionDB,
  editQuestionDB,
  setAnswerDB,
  createAnswerDB,
};

export { actionCreators };

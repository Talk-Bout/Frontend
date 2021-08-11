import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';
import { bindActionCreators } from 'redux';

// 액션타입
const SET_QUESTION = 'SET_QUESTION';
const SET_ONE_QUESTION = 'SET_ONE_QUESTION';
const CREATE_QUESTION = 'CREATE_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';

// 액션생성함수
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

// 기본값 정하기
const initialState = {
  list: [],
};

// 액션함수
const setQuestionDB = () => {
  return function (dispatch) {
    instance
      .get('/questions')
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
    instance
      .post(`/questions`, {
        title: title,
        content: content,
        nickname: nickname,
      })
      .then((response) => {
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
    const questionId = edit_question.questionId;
    instance
      .patch(`/questions/${questionId}`, {
        questionId: questionId,
        title: title,
        content: content,
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
        console.log(response.data);
        dispatch(deleteQuestion(response.data));
      })
      .catch((err) => {
        console.log(`질문 삭제 에러 발생: ${err}`);
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
  },
  initialState
);

// 액션 생성자
const actionCreators = {
  setQuestion,
  setQuestionDB,
  setOneQuestion,
  setOneQuestionDB,
  createQuestion,
  createQuestionDB,
  deleteQuestion,
  deleteQuestionDB,
  editQuestion,
  editQuestionDB,
};

export { actionCreators };

import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';

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
const SET_QUESTION_BOOKMARK = 'SET_QUESTION_BOOKMARK';
const ADD_QUESTION_BOOKMARK = 'ADD_QUESTION_BOOKMARK';
const DELETE_QUESTION_BOOKMARK = 'DELETE_QUESTION_BOOKMARK';

// QUESTION 액션생성함수
const setQuestion = createAction(SET_QUESTION, (question_list) => ({
  question_list,
}));
const setQuestionPop = createAction(SET_QUESTION_POP, (question_list) => ({question_list}));
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
const createAnswer = createAction(CREATE_ANSWER, (answer) => ({ answer }));
const setNextAnswer = createAction(SET_NEXT_ANSWER, (answer_list) => ({
  answer_list,
}));

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
  (question_bookmark) => ({ question_bookmark })
);

// 기본값 정하기
const initialState = {
  list: [],
  popular_list: [],
  answer_list: [],
  bookmark_list: [],
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

const setQuestionPopDB = () => {
  // 질문글 인기순 정렬
  return function (dispatch) {
    instance.get('/popular/questions').then((response) => {
    }).catch((err) => {
      console.error(`질문 인기순 불러오기 에러 발생: ${err} ### ${err.response}`);
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
    console.log(page);
    instance
      .get(`/questions/${questionId}/answers?page=${page}`)
      .then((response) => {
        page >= 2 && response.data.length > 0
          ? dispatch(setNextAnswer(response.data))
          : dispatch(setAnswer(response.data));
      })
      .catch((err) => {
        console.error(`질문 불러오기 에러 발생 : ${err}`);
      });
  };
};

// const setNextAnswerDB = (question_id, page) => {
//   return function (dispatch) {
//     const questionId = parseInt(question_id);
//     console.log(page);
//     instance
//       .get(`/questions/${questionId}/answers?page=${page}`)
//       .then((response) => {
//         console.log(response.data);
//         response.data.length > 5
//           ? dispatch(setNextAnswer(response.data))
//           : dispatch(setAnswer(response.data));
//       })
//       .catch((err) => {
//         console.error(`질문 불러오기 에러 발생 : ${err}`);
//       });
//   };
// };

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

// const setQuestionBookmarkDB = (nickname) => {
//   return function (dispatch){
//     instance
//     .get(`/`)
//   }
// }

// const addQuestionBookmarkDB = ()

export default handleActions(
  {
    [SET_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.question_list;
      }),
    [SET_QUESTION_POP]: (state, action) => produce(state, (draft) => {
      draft.popular_list = action.payload.question_list;
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
    [SET_NEXT_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list = draft.answer_list.concat(
          action.payload.answer_list
        );
        console.log(draft.answer_list);
      }),
    [CREATE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.answer_list.push(action.payload.answer);
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
  // setNextAnswerDB,
  createAnswerDB,
};

export { actionCreators };

import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_PREVIEW = 'SET_PREVIEW';  // 선택한 이미지 파일 프리뷰 생성
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'; // 선택한 이미지 파일 업로드

// 액션생성함수
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));

// 기본값 정하기
const initialState = {
    preview: null,
    image_url: null,
};

// 액션함수
const getPreview = (e) => {
  // 게시글 작성 페이지로부터 선택한 이미지 받아오는 함수
  return function (dispatch) {
    if (e === null) {
      dispatch(setPreview(null));
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setPreview(reader.result));
    }
  }
}

const uploadImageDB = (formData) => {
  return function (dispatch) {
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`,
  };
    instance.post('/images', formData, {headers: headers}).then((response) => {
      dispatch(uploadImage(response.data));
    })
    .catch((err) => {
      console.error(`이미지 업로드 에러 발생: ${err}`);
      if (err.response.status === 413) {
        window.alert('이미지 용량 한도를 초과했습니다!');
      }
    });
  };
};

export default handleActions({
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
      // state의 preview를 선택한 이미지로 설정
        draft.preview = action.payload.preview;
    }),
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
      // state의 image_url을 서버에 저장된 url로 설정
      draft.image_url = action.payload.image_url;
    })
}, initialState);


// 액션 생성자
const actionCreators = {
    getPreview,
    uploadImageDB,
}

export {
    actionCreators
};
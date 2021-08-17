import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';
import { actionCreators as statusActions } from './status';

// 액션타입
const SET_PREVIEW = 'image/SET_PREVIEW';  // 선택한 이미지 파일 프리뷰 생성
const UPLOAD_IMAGE = 'image/UPLOAD_IMAGE'; // 선택한 이미지 파일 업로드
const DELETE_IMAGE = 'image/DELETE_IMAGE'; // 이미지 파일 URL 삭제

// 액션생성함수
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const deleteImage = createAction(DELETE_IMAGE, () => ({}));

// 기본값 정하기
const initialState = {
    preview: null,
    image_url: null,
};

// 액션함수
const getPreview = (e) => {
  // 게시글 작성 페이지로부터 받은 이미지의 preview를 만드는 함수
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    if (e === null) {
      dispatch(setPreview(null));
      dispatch(statusActions.endLoading());
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setPreview(reader.result));
      dispatch(statusActions.endLoading());
    }
  }
}

const uploadImageDB = (formData) => {
  // 서버에 이미지를 저장하고, url을 반환하는 함수
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.post('/images', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
      // console.log(response);
      dispatch(uploadImage(response.data));
      dispatch(statusActions.endLoading());
    })
    .catch((err) => {
      console.error(`이미지 업로드 에러 발생: ${err}`);
      if (err.response.status === 413) {
        window.alert('이미지 용량 한도를 초과했습니다!');
      }
    });
  };
};

const DeleteImageUrl = () => {
  // 리덕스에 저장된 이미지 url 삭제하는 함수
  return function (dispatch) {
    dispatch(deleteImage());
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
    }),
    [DELETE_IMAGE]: (state, action) => produce(state, (draft) => {
      // state의 image_url을 null로 설정
      draft.image_url = null;
    })
}, initialState);


// 액션 생성자
const actionCreators = {
    getPreview,
    uploadImageDB,
    DeleteImageUrl,
}

export {
    actionCreators
};
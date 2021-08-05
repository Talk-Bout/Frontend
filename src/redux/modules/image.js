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
  // 선택한 이미지를 서버에 저장하는 함수(아직 구현 못함)
  return function (dispatch) {
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`,
    // 'content-type': 'multipart/form-data'     // formData 형식으로 보낼 때 사용하기
  };
    instance.post('/boottalk/images', formData, {headers: headers}).then((response) => {
      console.log(response);                  // 아직 404 에러 납니다...
      // dispatch(uploadImage(response.data));
    })
    .catch((err) => {
      console.error(`이미지 업로드 에러 발생: ${err}`);
    });
  };
};

export default handleActions({
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
      // state의 preview를 선택한 이미지로 설정
        draft.preview = action.payload.preview;
    }),
}, initialState);


// 액션 생성자
const actionCreators = {
    getPreview,
    uploadImageDB,
}

export {
    actionCreators
};
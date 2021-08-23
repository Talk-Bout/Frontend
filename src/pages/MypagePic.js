import React, { useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { Profile_medium } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';
import { history } from '../redux/ConfigureStore';
import { BsX } from 'react-icons/bs';
import { getCookie } from '../shared/cookie';

const MypagePic = (props) => {
  const dispatch = useDispatch();

  const user_image = getCookie(`http://13.209.12.149${(getCookie('profilePic'))}`);

  //이미지 불러오기
  const image_url = useSelector((state) => state.image.image_url);

  // 이미지 업로드
  const imageRef = useRef();
  const preview = useSelector((state) => state.image.preview);

  // 이미지 미리보기 실행 및 서버 업로드 함수
  const selectFile = (e) => {
    const uploaded_image = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('image', uploaded_image);
    dispatch(imageActions.getPreview(e));
    dispatch(imageActions.uploadImageDB(formData));
  };

  const SubmitPic = () => {
    // 프로필 사진 업로드 함수
  }

  // 이미지 미리보기 삭제 함수
  const exitPage = () => {
    if (window.confirm('변경사항이 저장되지 않을 수 있습니다.')) {
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl());
      history.goBack();
    }
  };

  return (
    <SmallWindow>
      <Grid height="100%" MOBheight='fit-content' is_center>
        <Grid display='flex' justifyContent='space-between' margin='-32px 0 0'>
          <Text fontSize='35px' TABfontSize='28px' MOBfontSize='20px' color='#e5e5e5' lineHeight='84px' MOBlineHeight='48px' cursor='pointer' _onClick={() => exitPage()}><BsX /></Text>
        </Grid>
        <Text color='#7879F1' fontSize='20px' MOBfontSize='14px' margin='0 auto'>프로필 사진을 변경하시려면</Text>
        <Text p color='#7879F1' fontSize='20px' MOBfontSize='14px' margin='0 auto'>아래 사진을 눌러주세요</Text>
        <Grid height='fit-content' width='80px' margin='36px auto'>
          {/* 이미지 추가 버튼 */}
          <form>
            <label htmlFor="file">
              <Image
                src={preview ? preview : user_image ? user_image : Profile_medium}
                height='80px'
                MOBheight='56px'
                cursor="pointer"
              />
              <ImgInput
                type="file"
                ref={imageRef}
                onChange={selectFile}
                accept="image/*"
                id="file"
              />
            </label>
          </form>
        </Grid>
        <Button onClick={() => SubmitPic()}><Text color='#f8f9fa' fontSize='14px'>프로필 사진 등록</Text></Button>
      </Grid>
      <Grid is_flex margin='330px 0 0' MOBmargin='30vh 0 0'>
        <Text fontSize='12px' color='#bdc1c6'>© 2021 Project Talk'bout</Text>
        <Text fontSize='12px' color='#bdc1c6' margin='0 24px'>All rights reserved.</Text>
      </Grid>
    </SmallWindow>
  );
};

// 이미지 파일 선택하는 기본 버튼 숨기기
const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

const Button = styled.button`
  margin-top: 36px;
  width: 100%;
  height: 48px;
  background-color: #a5a6f6;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;


export default MypagePic;

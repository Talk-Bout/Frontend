import React, { useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { Profile_medium } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';
import { actionCreators as mypageActions } from '../redux/modules/mypage';
import { history } from '../redux/ConfigureStore';
import { BsX } from 'react-icons/bs';
import { getCookie } from '../shared/cookie';
import { baseUrl } from '../shared/api';

const MypagePic = (props) => {
  const dispatch = useDispatch();
  const user_name = getCookie('nickname');
  const user_image = getCookie('profilePic');
  const user_image_url = `http://fw3efsadfcv.shop${user_image}`;

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

  const nameRef = useRef();

  // 개인정보 수정하는 함수
  const SubmitPic = () => {
    let image;
    if (image_url === null) {
      image = user_image;
    } else {
      image = image_url;
    }
    let nickname;
    if (!nameRef.current.value) {
      nickname = user_name;
    } else {
      nickname = nameRef.current.value;
      if (nickname.length <= 4) {
        window.alert('닉네임은 최소 4글자 이상 입력해주세요.');
        return;
      }
    }
    dispatch(mypageActions.editInfoDB(nickname, image));
  };

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
        <Grid display='flex' justifyContent='space-between' height='fit-content' margin='-70px 0 0 -20px'>
          <Text fontSize='35px' TABfontSize='28px' MOBfontSize='20px' color='#e5e5e5' lineHeight='84px' MOBlineHeight='48px' cursor='pointer' _onClick={() => exitPage()}><BsX /></Text>
        </Grid>
        <Text color='#e5e5e5' fontWeight='700' fontSize='20px' MOBfontSize='14px' margin='0 auto'>회원정보 수정</Text>
        <Text p color='#bdc1c6' fontSize='14px' MOBfontSize='10px' margin='8px auto 0'>프로필 사진을 변경하시려면</Text>
        <Text p color='#bdc1c6' fontSize='14px' MOBfontSize='10px' margin='0 auto'>아래 사진을 눌러주세요</Text>
        <Grid height='fit-content' width='80px' margin='36px auto 0'>
          {/* 이미지 추가 버튼 */}
          <form>
            <label htmlFor="file">
              <Image
                src={preview ? preview : user_image === 'null' ? Profile_medium : user_image_url}
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
        <Input ref={nameRef} placeholder='변경하실 닉네임을 입력해주세요' />
        <Button onClick={() => SubmitPic()}><Text color='#f8f9fa' fontSize='14px'>수정 완료</Text></Button>
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

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #5F6368;
  border-radius: 8px;
  background-color: transparent;
  color: #f8f9fa;
  caret-color: #f8f9fa;
  text-align: center;
  ::placeholder {
    font-size: 14px;
    text-align: center;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 18px;
  width: 100%;
  height: 48px;
  background-color: #a5a6f6;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  &:hover {
    opacity: 0.7;
  }
`;


export default MypagePic;

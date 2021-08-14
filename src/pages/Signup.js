import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SmallWindow from '../components/SmallWindow';
import { Grid, Text, Image } from '../elements';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import _ from 'lodash';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import talkbout_logo_title from '../image/talkbout_logo_title.png';
//toast notification
import toast, { Toaster } from 'react-hot-toast';

const Signup = (props) => {
  const dispatch = useDispatch();
  const email_exist = useSelector((state) => state.user.email_exist);
  const nickname_exist = useSelector((state) => state.user.nickname_exist);
  const [nickname, setNickname] = React.useState('');
  //닉네임을 바꿔주는 함수: setNickname은 이벤트가 일어날때마다 닉네임 0.5초마다 바뀜. (입력)
  const debounceNickname = _.debounce((e) => {
    setNickname(e.target.value);
  }, 500);
  // console.log(nickname);

  //닉네임이 실행되어야 요청(useEffectrk 0.5초마다 실행됨)
  useEffect(() => {
    if (nickname) {
      dispatch(userActions.nicknameCheckDB(nickname));
    }
  }, [nickname]);

  const notify = () => toast('가입이 완료되었습니다');
  //select 값 가져오기
  const selectMail = useRef(null);

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
      confirm_password: '',
      nickname: '',
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .min(4, ' 4자 이상 입력해주세요')
        .max(10, ' 10자 이하 입력해주세요')
        .required('아이디를 입력해주세요.'),
      // .concat(is_exist?)
      password: Yup.string()
        .min(8, '8자 이상 입력해주세요')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
          '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.'
        )
        .required('비밀번호를 입력해주세요'),
      confirm_password: Yup.string()
        .required('비밀번호를 한 번 더 입력해주세요')
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const user_mail = String(values.id + '@' + selectMail.current.value);
      //dictionary 안에 key를 만들고 value를 넣어줌
      //values['key'] = value;
      values['user_mail'] = user_mail;
      values['nickname'] = nickname;
      // console.log(values.nickname);

      dispatch(userActions.signUpDB(values));
      // notify();
    },
  });

  //로그인 중복 확인
  const emailCheck = (id) => {
    // console.log(id);
    const email = String(id + '@' + selectMail.current.value);
    dispatch(userActions.emailCheckDB(email));
  };

  return (
    <SmallWindow>
      <div>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#b2f37f',
            },
          }}
        />
      </div>
      <Grid height="100%">
        <Grid is_center height="10%">
          <Image
            src={talkbout_logo_title}
            width="60%"
            margin="auto"
            _onClick={() => history.push('/')}
            cursor="pointer"
          />
        </Grid>
        <Grid height="8%">
          <TextBox>
            <Text
              lineHeight="6vh"
              fontSize="2vh"
              fontWeight="700"
              color="#F8F9FA"
            >
              회원가입
            </Text>
          </TextBox>
        </Grid>
        {/* 회원가입 작성 폼 */}
        <form onSubmit={formik.handleSubmit}>
          <Grid>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
                  이메일
                </Text>
              </label>
            </TextBox>
            <TextBox>
              <Text fontSize="1.2vh" color="#80868b">
                (알파벳/숫자, 4 - 10자)
              </Text>
            </TextBox>
            {/* 이메일 입력 창 */}
            {/* 변수이름 = true, value 값이 있을때 */}
            {/* 값이 있음 - is_exist(중복여부) : true(이미 존재함) / false(사용가능함) */}
            {formik.values.id && email_exist ? (
              <InputBox>
                <Input
                  id="id"
                  name="id"
                  type="id"
                  placeholder="이메일"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                />
                <Text margin="0 5px" color="#80868b">
                  @
                </Text>
                <Select ref={selectMail}>
                  <option value="">선택해주세요</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                </Select>
                <Text fontSize="1.2vh" color="#ff7070">
                  이미 사용중인 이메일입니다.
                </Text>
              </InputBox>
            ) : (
              <InputBox>
                <Input
                  id="id"
                  name="id"
                  type="id"
                  placeholder="이메일"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                />
                <Text margin="0 5px" color="#80868b">
                  @
                </Text>
                <Select ref={selectMail}>
                  <option value="">선택해주세요</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                </Select>
                {formik.values.id ? (
                  <Text fontSize="1.2vh" color="#B2F37F">
                    사용가능한 이메일입니다.
                  </Text>
                ) : (
                  <Text fontSize="1.2vh" color="#ff7070">
                    {formik.errors.id}
                  </Text>
                )}
              </InputBox>
            )}
          </Grid>
          <Grid margin="2% 0%">
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
                  비밀번호
                </Text>
              </label>
            </TextBox>
            <TextBox>
              <Text fontSize="1.2vh" color="#80868b">
                (알파벳/ 숫자/ 특수문자(!@#$%^&*) 포함, 8자 이상)
              </Text>
            </TextBox>
            {/* 비밀번호 입력창 */}
            <InputBox>
              <Input
                style={{ width: '98%' }}
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={() => emailCheck(formik.values.id)}
              />
              {formik.errors.password && formik.touched.password && (
                <Text fontSize="1.2vh" color="#ff7070">
                  {formik.errors.password}
                </Text>
              )}
            </InputBox>
          </Grid>
          <Grid>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
                  비밀번호 확인
                </Text>
              </label>
            </TextBox>
            {/* 비밀번호 확인 입력창 */}
            <InputBox>
              <Input
                style={{ width: '98%' }}
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                placeholder="비밀번호 확인"
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <Text fontSize="1.2vh" color="#ff7070">
                    {formik.errors.confirm_password}
                  </Text>
                )}
              {formik.touched.confirm_password &&
                !formik.errors.confirm_password && (
                  <Text fontSize="1.2vh" color="#B2F37F">
                    비밀번호가 일치합니다.
                  </Text>
                )}
            </InputBox>
          </Grid>
          <Grid margin="2% 0%">
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
                  닉네임
                </Text>
              </label>
            </TextBox>
            {/* 닉네임 입력창 */}
            <InputBox>
              <Input
                style={{ width: '98%' }}
                placeholder="닉네임"
                id="nickname"
                // value={nickname} //실시간으로 들어감(setNickname: 변경시, 작동하면서 nickname이 변함)
                name="nickname"
                type="nickname"
                onChange={(e) => debounceNickname(e)}
              />
              {nickname.length === 0 ? null : nickname_exist ? (
                <Text fontSize="1.2vh" color="#ff7070">
                  이미 존재하는 닉네임입니다.
                </Text>
              ) : (
                <Text fontSize="1.2vh" color="#B2F37F">
                  사용가능한 닉네임입니다.
                </Text>
              )}
            </InputBox>
          </Grid>
          <Grid>
            <SingUpButton type="submit">
              <Text fontSize="1.5vh" fontWeight="600" color="white">
                회원가입 완료
              </Text>
            </SingUpButton>
          </Grid>
        </form>
      </Grid>
    </SmallWindow>
  );
};

const TextBox = styled.div`
  text-align: left;
  display: flex;
  margin: 4% 0%;
`;

const InputBox = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 43%;
  height: 3.5vh;
  border: 1px solid #80868b;
  border-radius: 5px;
  background-color: transparent;
  outline: none;
  caret-color: #80868b;
  color: #ffffff;
  padding: 1%;
`;

const Select = styled.select`
  width: 45%;
  height: 4vh;
  border: 1px solid #80868b;
  border-radius: 5px;
  background-color: transparent;
  color: #ffffff;
  :focus {
    outline: none;
  }
`;

const SingUpButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 7%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #a5a6f6;
  :hover {
    background-color: #7879f1;
  }
`;
/* :active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  } */

export default Signup;

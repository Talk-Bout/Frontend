// import React, { useRef } from 'react';
// import SmallWindow from '../components/SmallWindow';
// import { Grid, Text, Image } from '../elements';
// import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { actionCreators as userActions } from '../redux/modules/user';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// import Logo from '../image/Logo.png';

// const Signup = (props) => {
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       id: '',
//       password: '',
//       confirmPassword: '',
//       nickname: '',
//     },
//     validationSchema: Yup.object({
//       id: Yup.string().required('아이디를 입력해주세요.'),
//       password: Yup.string()
//         .min(8, '8자 이상 입력해주세요')
//         .matches(
//           /[a-zA-Z]/,
//           '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.'
//         )
//         .required('비밀번호를 입력해주세요'),
//       confirmPassword: Yup.string()
//         .min(8, '8자 이상 입력해주세요')
//         .matches(
//           /[a-zA-Z]/,
//           '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.'
//         )
//         .required('비밀번호를 한 번 더 입력해주세요')
//         .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//       // dispatch(userAcions.__signup(values));
//       // setLoginMode(true);
//     },
//   });
//   //select 값 가져오기
//   const selectMail = useRef(null);

//   const signup = () => {};

//   return (
//     <SmallWindow>
//       <Grid height="100%">
//         <Grid is_center height="13%">
//           <Image src={Logo} width="60%" margin="auto" />
//         </Grid>
//         <Grid height="8%">
//           <TextBox>
//             <Text
//               lineHeight="6vh"
//               fontSize="2vh"
//               fontWeight="700"
//               color="#F8F9FA"
//             >
//               회원가입
//             </Text>
//           </TextBox>
//         </Grid>
//         <Grid height="18%">
//           {/* 회원가입 작성 폼 */}
//           <form onSubmit={formik.handleSubmit}>
//             <TextBox>
//               <label>
//                 <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
//                   이메일
//                 </Text>
//               </label>
//             </TextBox>
//             <TextBox>
//               <Text fontSize="1.2vh" color="#80868b">
//                 (알파벳/숫자, 4 - 10자)
//               </Text>
//             </TextBox>
//             <InputBox>
//               <Input type="Email" placeholder="이메일" />
//               <Text margin="0 5px" color="#80868b">
//                 @
//               </Text>
//               <Select ref={selectMail}>
//                 <option value="">선택해주세요</option>
//                 <option value="gmail.com">gmail.com</option>
//                 <option value="naver.com">naver.com</option>
//                 <option value="hanmail.net">hanmail.net</option>
//               </Select>
//             </InputBox>
//           </form>
//           <Text fontSize="1.2vh" color="#ff7070">
//             이미 사용중인 이메일입니다.
//           </Text>
//         </Grid>
//         <Grid height="15%">
//           <form>
//             <TextBox>
//               <label>
//                 <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
//                   비밀번호
//                 </Text>
//               </label>
//             </TextBox>
//             <TextBox>
//               <Text fontSize="1.2vh" color="#80868b">
//                 (알파벳/ 숫자/ 특수문자(!@#$%^&*) 포함, 8자 이상)
//               </Text>
//             </TextBox>
//             <InputBox>
//               <Input
//                 style={{ width: '98%' }}
//                 type="password"
//                 placeholder="비밀번호"
//               />
//             </InputBox>
//           </form>
//         </Grid>
//         <Grid height="15%">
//           <form>
//             <TextBox>
//               <label>
//                 <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
//                   비밀번호 확인
//                 </Text>
//               </label>
//             </TextBox>
//             <InputBox>
//               <Input
//                 style={{ width: '98%' }}
//                 type="password"
//                 placeholder="비밀번호 확인"
//               />
//             </InputBox>
//           </form>
//         </Grid>
//         <Grid height="15%">
//           <form>
//             <TextBox>
//               <label>
//                 <Text fontSize="1.5vh" fontWeight="700" color="#80868b">
//                   닉네임
//                 </Text>
//               </label>
//             </TextBox>
//             <InputBox>
//               <Input
//                 style={{ width: '98%' }}
//                 placeholder="닉네임"
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     signup();
//                   }
//                 }}
//               />
//             </InputBox>
//           </form>
//           <Text fontSize="1.2vh" color="#ff7070">
//             이미 사용중인 닉네임입니다.
//           </Text>
//         </Grid>
//         <Grid height="10%">
//           <Button onClick={() => signup()}>
//             <Text fontSize="1.5vh" color="white">
//               회원가입 완료
//             </Text>
//           </Button>
//         </Grid>
//       </Grid>
//     </SmallWindow>
//   );
// };

// const TextBox = styled.div`
//   text-align: left;
// `;

// const InputBox = styled.div`
//   width: 100%;
// `;

// const Input = styled.input`
//   width: 43.5%;
//   height: 3.5vh;
//   border: 1px solid #80868b;
//   border-radius: 5px;
//   background-color: transparent;
//   outline: none;
//   caret-color: #80868b;
//   color: #ffffff;
//   padding: 1%;
// `;

// const Select = styled.select`
//   width: 45%;
//   height: 4vh;
//   border: 1px solid #80868b;
//   border-radius: 5px;
//   background-color: transparent;
//   color: #ffffff;
//   :focus {
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 90%;
//   background-color: #7879f1;
//   border: none;
//   border-radius: 5px;
//   margin-top: 2%;
//   cursor: pointer;
//   :active {
//     box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
//     position: relative;
//     top: 2px;
//   }
// `;

// export default Signup;

// import React from 'react';
// import styled from 'styled-components';
// import SmallWindow from '../components/SmallWindow';
// import { Grid, Input, Text, Image } from '../elements';
// import { TextField } from '@material-ui/core';
// import { AiFillGoogleCircle } from 'react-icons/ai';
// import { history } from '../redux/ConfigureStore';
// import { useDispatch } from 'react-redux';
// import { actionCreators as userActions } from '../redux/modules/user';

// //로고
// import Logo from '../image/Logo.png';
// import google_logo from '../image/google_logo.png';

// const Login = (props) => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = React.useState('');
//   const [password, setPwd] = React.useState('');

//   const login = () => {
//     if (email === '' || password === '') {
//       window.alert('이메일과 비밀번호를 입력해주세요');
//       return;
//     }
//     dispatch(userActions.logInDB(email, password));
//   };

//   //onChange의 e.target.value안찍힐때 버튼에 콘솔로그 해보기!
//   return (
//     <SmallWindow>
//       <Grid height="100%">
//         <Grid height="25%">
//           <Grid height="40%" />
//           <Grid is_center height="50%">
//             <Image src={Logo} width="60%" margin="auto" />
//           </Grid>
//         </Grid>
//         <Grid height="30%">
//           <form noValidate autoComplete="off">
//             <TextField
//               id="outlined-basic"
//               label="이메일"
//               variant="outlined"
//               fullWidth
//               required
//               margin="normal"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//             <TextField
//               id="outlined-basic"
//               label="비밀번호"
//               variant="outlined"
//               fullWidth
//               type="password"
//               required
//               onChange={(e) => {
//                 setPwd(e.target.value);
//               }}
//             />
//           </form>
//           <Text fontSize="1.2vh" color="red">
//             가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
//           </Text>
//         </Grid>
//         <Grid height="20%">
//           <Button onClick={() => login()}>
//             <Text fontSize="1.5vh" color="white">
//               로그인
//             </Text>
//           </Button>
//           <Grid is_flex padding="0 10px" margin="5px 0 0">
//             <HelpDiv>
//               <A onClick={() => {}}>
//                 <Text fontSize="1.3vh" color="#555">
//                   아이디 찾기
//                 </Text>
//               </A>
//             </HelpDiv>
//             <HelpDiv>
//               <A onClick={() => {}}>
//                 <Text fontSize="1.3vh" color="#555">
//                   비밀번호 찾기
//                 </Text>
//               </A>
//             </HelpDiv>
//             <HelpDiv>
//               <A onClick={() => history.push('/signup')}>
//                 <Text fontSize="1.3vh" color="#555">
//                   회원가입
//                 </Text>
//               </A>
//             </HelpDiv>
//           </Grid>
//         </Grid>
//         <Grid height="25%" backgroundColor="orange">
//           <Button style={{ backgroundColor: '#2e3134' }}>
//             {/* <AiFillGoogleCircle
//               size="2vh"
//               style={{ marginRight: '0.3vw', verticalAlign: 'middle' }}
//             /> */}
//             {/* <Image src={google_logo} /> */}
//             <Text fontSize="1.5vh" color="#ddd">
//               Google로 로그인
//             </Text>
//           </Button>
//         </Grid>
//       </Grid>
//     </SmallWindow>
//   );
// };

// const A = styled.a`
//   cursor: pointer;
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 30%;
//   background-color: #444;
//   border: none;
//   border-radius: 5px;
//   display: flex;
// `;

// const HelpDiv = styled.div`
//   padding: 0 10px;
//   display: inline;
// `;

// export default Login;

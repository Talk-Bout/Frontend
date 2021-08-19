import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, SmallWindow } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/ConfigureStore';

//체크박스
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { spacing } from '@material-ui/system';
import { borderColor } from '@material-ui/system';
import '../App.css';

const DeleteUser = (props) => {
  const dispatch = useDispatch();
  const user_name = useSelector((state) => state.user.user);

  const [state, setState] = useState({
    checked: false,
  });
  const [charcter, setCharcter] = useState(0);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const deleteUserBtn = () => {
    // console.log(user_name);
    if (state.checked === false) {
      window.alert('게시물 관리 조항을 확인해주세요.');
      return;
    }
    dispatch(userActions.userDeleteDB(user_name));
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <React.Fragment>
      <Grid display="flex" height="100vh">
        <Sidebar />
        <Body header>
          <Container>
            <Grid height="10%">
              <Text fontSize="2vh" fontWeight="700" color="#F8F9FA">
                회원탈퇴 신청
              </Text>
              <Text p fontSize="1.5vh" fontWeight="600" color="#F8F9FA">
                아래 내용을 반드시 확인해주세요.
              </Text>
            </Grid>
            <Grid height="30%">
              <Grid height="75%">
                <Warning>
                  <Text fontSize="1.6vh" fontWeight="600" color="#dbdce5">
                    회원탈퇴 시 게시물 관리
                  </Text>
                  <Text p fontSize="1.4vh" color="#dbdce5">
                    회원탈퇴 후 토크부트에 입력한 게시물 및 댓글은 삭제되지
                    않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수
                    없으므로 게시물 편집 및 삭제 처리가 원칙적으로 불가능합니다.
                    게시물 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제 하신
                    후, 탈퇴를 신청하시기 바랍니다.
                  </Text>
                </Warning>
              </Grid>
              <Grid diplay="flex" height="25%">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checked"
                      color="primary"
                      bordercolor="grey.500"
                    />
                  }
                />
                {/* {/* <input type="checkbox" name="my-checkbox" id="opt-in" /> */}
                <Text
                  fontSize="1.8vh"
                  fontWeight="600"
                  color="#ff7070"
                  margin="auto -8%"
                >
                  필수
                </Text>
                {/* <CheckBox class="keep_login_container">
                  <input
                    id="keep_login_checkbox"
                    type="checkbox"
                    name="keep_login"
                    value="TRUE"
                  />
                  <label for="keep_login_checkbox">필수</label>
                </CheckBox> */}
                {/* <div class="container">
                  <input type="checkbox" name="agree" value="agree" />
                </div> */}
                <Text
                  fontSize="1.5vh"
                  fontWeight="500"
                  color="#dbdce5"
                  margin="auto 10%"
                >
                  위 내용을 모두 확인하였습니다.
                </Text>
              </Grid>
            </Grid>
            <Grid height="45%">
              <Grid height="10%" />
              <Text fontSize="1.5vh" fontWeight="600" color="#F8F9FA">
                서비스 이용 중 어떤 부분이 불편하셨나요?
              </Text>
              <Text
                fontSize="1.5vh"
                fontWeight="600"
                color="#5f6368"
                margin="3%"
              >
                선택
              </Text>

              <FeedBackBox>
                <FeedBackInput
                  rows="9"
                  placeholder="불편하셨던 점이나 기능 등 전반적으로 개선되었으면 하는 부분을 자세하게 적어주세요. 다시 돌아오시는 그날엔 발전된 토크부트가 되어있을 수 있도록 부탁드립니다 =)"
                ></FeedBackInput>
                <span>
                  <Text fontSize="1.5vh" margin="0 90%" color="#dbdce5">
                    0/300
                  </Text>
                </span>
              </FeedBackBox>
            </Grid>
            <Grid height="15%" display="flex">
              <DeleteButton onClick={() => deleteUserBtn()}>
                탈퇴 신청
              </DeleteButton>
              <DeleteButton
                style={{ backgroundColor: '#2e3134' }}
                onClick={() => {
                  history.goBack();
                }}
              >
                취소
              </DeleteButton>
            </Grid>
          </Container>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: #212123;
  width: 25vw;
  height: 70vh;
  margin: auto;
  padding: 4.5vh 2.5vw;
`;

const Warning = styled.div`
  height: 100%;
  padding: 2% 3%;
  margin-top: 3%;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const FeedBackBox = styled.div`
  margin-top: 3%;
  padding: 2% 3%;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  border-radius: 5px;
`;

const FeedBackInput = styled.textarea`
  border: none;
  border-radius: 5px;
  background-color: transparent;
  resize: none;
  padding: 1%;
  width: 98%;
  color: #dadce0;
  font-size: 1.4vh;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #4e5357;
  }
`;

const DeleteButton = styled.button`
  width: 48%;
  height: 50px;
  margin: 5% 1%;
  border: none;
  border-radius: 7px;
  box-sizing: border-box;
  color: #ffffff;
  font-weight: 600;
  background-color: #a5a6f6;
  :hover {
    background-color: #7879f1;
  }
`;

export default DeleteUser;

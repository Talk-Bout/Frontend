import React, { useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { Grid, Text } from '../elements';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { RiAtLine } from 'react-icons/ri';
import { FiHash } from 'react-icons/fi';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const BootCommuWrite = (props) => {
  const dispatch = useDispatch();
  // const username = useSelector(state => state.user.user.user.nickname);
  const username = 'tester';
  const titleRef = useRef('');
  const contentRef = useRef('');
  const addPost = () => {
    const new_post = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      nickname: username,
      category: 'testing',
    }
    dispatch(postActions.addPostDB(new_post));
  }

  return (
    <React.Fragment>
      <Grid className='background' display='flex' backgroundColor='#17181b' minHeight='100vh'>
        <Sidebar />
        <Body>
          <Grid className='body-inner' height='110%' padding='5vh 0 0'>
            <Window>
              <Grid className='header-box' height='10%' display='flex' borderBottom='1px solid #8f9091'>
                <Grid className='exit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='4vh' color='#e5e5e5' lineHeight='7.5vh' cursor='pointer' _onClick={() => history.push('/boot/community')}><BsX /></Text>
                </Grid>
                <Grid className='title' width='53.33%' is_center>
                  <Text fontSize='2.5vh' fontWeight='700' color='#e5e5e5' lineHeight='7vh'>글쓰기</Text>
                </Grid>
                <Grid className='submit-button' width='23.33%' padding='0 25px'>
                  <Text fontSize='2.5vh' fontWeight='700' color='#848484' lineHeight='7vh' float='right' cursor='pointer' _onClick={() => addPost()}>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                <TitleBox><Input placeholder='제목을 입력해주세요' ref={titleRef}/></TitleBox>
                <ContentBox><Textarea rows='15' placeholder='내용을 입력해주세요' ref={contentRef}/></ContentBox>
              </BodyBox>
              <FooterBox>
                <Text fontSize='2.5vh' color='#b3b3b3' margin='0 10px 0 0' cursor='pointer'><BiImageAdd /></Text>
                <Text fontSize='2.5vh' color='#b3b3b3' margin='0 10px 0' cursor='pointer'><RiAtLine /></Text>
                <Text fontSize='2.5vh' color='#b3b3b3' margin='0 0 0 10px' cursor='pointer'><FiHash /></Text>
              </FooterBox>
            </Window>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Window = styled.div`
  background-color: #383838;
  width: 60%;
  height: 90%;
  margin: auto;
`;

const BodyBox = styled.div`
  height: 80%;
  padding: 40px 40px;
`;

const TitleBox = styled.div`
  height: 5vh;
  border-bottom: 1px solid #8f9091;
  padding-bottom: 20px;
`;

const ContentBox = styled.div`
  height: 40vh;
  padding-top: 20px;
`;

const Input = styled.input`
  background-color: #383838;
  padding: 10px;
  font-size: 1.7vh;
  color: #e5e5e5;
  width: 97.7%;
  border: none;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 97.7%;
  resize: none;
  padding: 10px;
  font-size: 1.7vh;
  background-color: #383838;
  border: none;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const FooterBox = styled.div`
  background-color: #414141;
  height: 10%;
  padding: 20px 40px 20px;
`;

export default BootCommuWrite;
import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import Logo from '../talkbout_logo.png';
import Home from '../Home.png';
import Boot from '../Bootcamp.png';
import Qna from '../Qna.png';
import News from '../News.png';
import Talk from '../Board.png';
import { history } from '../redux/ConfigureStore';


const Sidebar = (props) => {

  return (
    <React.Fragment>
      <Grid className='sidebar' backgroundColor='#3c4043' width='7vw' padding='30px 0' minWidth='100px'>
        <Grid className='sidebar-inner' is_center>
          <ImageBox className='logo' style={{marginBottom: '30px', paddingTop: '15px'}} onClick={() => history.push('/')}><LogoImg src={Logo} style={{width: '50px'}}></LogoImg></ImageBox>
          <ImageBox className='home' onClick={() => history.push('/')}><Image src={Home} /></ImageBox>
          <ImageBox className='boot' onClick={() => history.push('/boot')}><Image src={Boot}></Image></ImageBox>
          <ImageBox className='qna' onClick={() => history.push('/question')}><Image src={Qna}></Image></ImageBox>
          <ImageBox className='news'><Image src={News}></Image></ImageBox>
          <ImageBox className='talk' onClick={() => history.push('/common/list')}><Image src={Talk}></Image></ImageBox>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const ImageBox = styled.div`
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 50px;
`;                         
const Image = styled.img`
  cursor: pointer;
  width: 100px;
  -webkit-filter: opacity(.5) drop-shadow(0 0 0 #80868b);
  filter: opacity(.5) drop-shadow(0 0 0 #80868b);
  &:hover {
    -webkit-filter: opacity(.5) drop-shadow(0 0 0 white);
    filter: opacity(.5) drop-shadow(0 0 0 white);
  }
`;

export default Sidebar;
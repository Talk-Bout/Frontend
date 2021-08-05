import React, {useRef} from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import Logo from '../image/talkbout_logo.png';
import Home from '../image/Home.png';
import Home_white from '../image/Home_white.png';
import Boot from '../image/Bootcamp.png';
import Boot_white from '../image/Bootcamp_white.png';
import Qna from '../image/Qna.png';
import Qna_white from '../image/qna_white.png';
import News from '../image/News.png';
import News_white from '../image/News_white.png';
import Talk from '../image/Board.png';
import Talk_white from '../image/Board_white.png';
import { history } from '../redux/ConfigureStore';

const Sidebar = (props) => {
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid className='sidebar' backgroundColor='#3c4043' width='7vw' padding='30px 0' minWidth='100px'>
        <Grid className='sidebar-inner' is_center>
          <ImageBox className='logo' style={{marginBottom: '30px', paddingTop: '15px'}} onClick={() => history.push('/')}><LogoImg src={Logo} style={{width: '50px'}}></LogoImg></ImageBox>
          <ImageBox className='home' onClick={() => history.push('/')}>{url === '' ? <Image src={Home_white} /> : <Image src={Home} />}</ImageBox>
          <ImageBox className='boot' onClick={() => history.push('/boot')}>{url === 'boot' ? <Image src={Boot_white} /> : <Image src={Boot} />}</ImageBox>
          <ImageBox className='qna' onClick={() => history.push('/question')}>{url === 'question' ? <Image src={Qna_white} /> : <Image src={Qna} />}</ImageBox>
          <ImageBox className='news' onClick={() => history.push('/news/list')}>{url === 'news' ? <Image src={News_white} /> : <Image src={News} />}</ImageBox>
          <ImageBox className='talk' onClick={() => history.push('/common/list')}>{url === 'common' ? <Image src={Talk_white} /> : <Image src={Talk} />}</ImageBox>
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
`;

export default Sidebar;

import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { Little_home, Little_github } from '../image';

const Contact = (props) => {

  const info_list = {
    designer1: ['윤영미', 'https://www.yeongmi.info'],
    designer2: ['양서문', 'https://westdoor.creatorlink.net/Home'],
    frontend: ['이동민', 'https://github.com/leedmeen'],
    backend1: ['정창길', 'https://github.com/ombreman'],
    backend2: ['방민수', 'https://github.com/skylermbang'],
    backend3: ['송하영', 'https://github.com/Talk-Bout'],
    repo: ['Team', 'Repository', 'https://github.com/Talk-Bout']
  }

  return (
    <React.Fragment>
      <ContactBox>
        <Column>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Design</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.designer1[0]}<Icon src={Little_home} onClick={() => window.open(info_list.designer1[1], '_blank')} /></Text></div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.designer2[0]}<Icon src={Little_home} onClick={() => window.open(info_list.designer2[1], '_blank')} /></Text></div>
        </Column>
        <Column>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Front-end</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.frontend[0]}<Icon src={Little_github} onClick={() => window.open(info_list.frontend[1], '_blank')} /></Text>
          </div>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Back-end</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend1[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend1[1], '_blank')} /></Text>
          </div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend2[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend2[1], '_blank')} /></Text>
          </div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend3[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend3[1], '_blank')} /></Text>
          </div>
        </Column>
        <ColumnRepo>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>{info_list.repo[0]}</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px' cursor='pointer' _onClick={() => window.open(info_list.repo[2], '_blank')}>{info_list.repo[2]}</Text></div>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>{info_list.repo[1]}</Text></div>
        </ColumnRepo>
      </ContactBox>
      <ContactBoxTAB>
        <Column>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Design</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.designer1[0]}<Icon src={Little_home} onClick={() => window.open(info_list.designer1[1], '_blank')} /></Text></div>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Front-end</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.frontend[0]}<Icon src={Little_github} onClick={() => window.open(info_list.frontend[1], '_blank')} /></Text>
          </div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.designer2[0]}<Icon src={Little_home} onClick={() => window.open(info_list.designer2[1], '_blank')} /></Text></div>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Back-end</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend1[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend1[1], '_blank')} /></Text>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend2[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend2[1], '_blank')} /></Text>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div><Text color='#A5A6F6' fontSize='12px'>{info_list.backend3[0]}<Icon src={Little_github} onClick={() => window.open(info_list.backend3[1], '_blank')} /></Text>
          </div>
        </Column>
        <ColumnRepo>
          <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>{info_list.repo[0]} {info_list.repo[1]}</Text></div>
          <div><Text color='#A5A6F6' fontSize='12px' cursor='pointer' _onClick={() => window.open(info_list.repo[2], '_blank')}>{info_list.repo[2]}</Text></div>
        </ColumnRepo>
      </ContactBoxTAB>
    </React.Fragment>
  )
};

const ContactBox = styled.div`
  background-color: #17181B;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  column-gap: 40px;
  padding: 28px 23px;
  width: 100%;
  @media screen and (max-width: 1260px) {
    height: fit-content;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  width: fit-content;
  & > div {
    vertical-align: middle;
    text-align: right;
  }
  @media screen and (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    text-align: left;
  }
`;

const ColumnRepo = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  width: 100%;
  & > div {
    vertical-align: middle;
  }
  @media screen and (max-width: 1260px) {
    grid-template-rows: 1fr 1fr;
    padding: 0 23px;
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    text-align: center;
  }
`;

const Icon = styled.img`
  width: 16px;
  vertical-align: text-top;
  margin: 0 8px;
  cursor: pointer; 
`;

const ContactBoxTAB = styled.div`
  background-color: #17181B;
  padding: 20px 16px;
  position: absolute;
  left: 330px;
  @media screen and (min-width: 1201px) {
    display: none;
  }
  @media screen and (min-width: 1151px) {
    left: 500px;
  }
`;

export default Contact;
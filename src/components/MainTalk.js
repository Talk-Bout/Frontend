import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Emoji } from '../elements';
import { Megaphone_emoji, LogoIcon } from '../image';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const MainTalk = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.setPostPopDB(1));
  }, []);

  const post_list = useSelector(state => state.post.pop_list);
  const pop_posts = post_list.slice(0, 3);

  return (
    <React.Fragment>
      <Grid className="top-talk" height='fit-content' padding='49px 0 16px' TABmpadding='32px 0 16px'>
        {/* 인기 부트톡톡 */}
        <Text fontSize='24px' fontWeight='700' color='#F8F9FA' TABfontSize='20px' cursor='default'><Emoji src={Megaphone_emoji} alt='확성기' height='24px' TABheight='20px' margin='0 8px 0 0' />지금 이 순간, Hot! 부트톡톡</Text>
        <TextBox>
          {/* 부트캠퍼들이 가장 많이 추천한 게시물 */}
          <Text fontSize='14px' color='#BDC1C6' TABfontSize='12px' cursor='default'>지금 우리에게 가장 관심받는 주제는?!</Text>
          {/* 부트톡톡 더보기 버튼 */}
          <Text fontSize='14px' color='#BDC1C6' cursor='pointer' _onClick={() => history.push('/common/list')}>부트톡톡 더보기 &gt;</Text>
        </TextBox>
        {/* 부트톡톡 게시물 목록 */}
        <CardList>
          {pop_posts.map((pp, idx) => {
            return (
              <PostCard key={idx} onClick={() => history.push(`/common/detail/${pp.postId}`)}>
                <ImgBox>
                  <Img src={pp.image ? `http://13.209.12.149${pp.image}` : LogoIcon} />
                </ImgBox>
                {/* 질문 제목 */}
                <Text
                  fontSize="18px" TABfontSize='16px' fontWeight="700" color="#f1f3f4" margin="0 0 16px" TABmargin='0 0 11px' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'>{pp.title}
                </Text>
                {/* 질문 내용 */}
                <Content>
                  <Text p fontSize="14px" TABfontSize='12px' letterSpacing="0.2px" lineHeight='18px' TABlineHeight='16px' color="#9aa0a6" overflow="hidden" display="-webkit-box" wlc="4" wbo="vertical">{pp.content}
                  </Text>
                </Content>
              </PostCard>
            );
          })}
        </CardList>
      </Grid>
    </React.Fragment>
  );
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  margin-top: 3px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin-top: 4px;
    padding-bottom: 20px;
  }
`;

const CardList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 201px;
  }
`;

const PostCard = styled.div`
  background-color: #202124;
  width: 32.5%;
  height: 350px;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    padding: 16px 16px 12px;
  }
`;

const ImgBox = styled.div`
  border: 1px solid #333;
  width: 90%;
  height: 150px;
  margin: 0 auto 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Content = styled.div`
  margin: 0;
  padding: 0;
  height: 76px;
`;

export default MainTalk;

# Talk'Bout 토크부트
항해99 2기 대망의 실전 프로젝트!<br>
부트캠프를 찾아 헤매는 이들을 위한 유일무이한 대화의 장,<br>
토크 어바웃 부트캠프, 토크부트입니다💬<br>
🏡[토크부트](https://talkbout.camp)로 놀러오세요!<br>

# 토크부트 (Front-end)


![Img](https://github.com/skylermbang/Backend/blob/main/img/talkboot_insta_1200x628_2.jpg)

  
## 👾 토크부트 소개
- 실제 부트캠프 수강중인 학생과 수료자에게 듣는 리뷰.
- 자신에게 맞는 부트캠프 정보를 한눈에 찾아보세요.
- 부트캠프에 대한 질문과 답변도 확인할 수 있습니다.


## 📌 개요 
- 이름: talkbout 토크부트
- 기간: 2021.07.25. ~ 2021.09.03.
- 팀원
  - Front-end(React): 이동민
  - Back-end(Node.js): 정창길, 송하영, 방민수
  - Designer(UI/UX): 윤영미, 양서문
- [프로젝트 초기 기획 노션](https://www.notion.so/Talk-Bout-_-_5-90d8e8f4f3904dfb84b3892b94daa7d0)
- [Back-end(Node.js) 깃허브](https://github.com/Talk-Bout/Backend)


## 🛠Architecture 
![img](https://github.com/skylermbang/Backend/blob/main/img/architecture.png)


## 📚 사용한 라이브러리
- react-router-dom v5.2.0, connected-react-router v6.9.1, history v4.10.1
- redux v4.1.0, react-redux v7.2.4, redux-thunk v2.3.0, redux-logger v3.0.6, redux-actions v2.6.5, immer v9.0.5
- axios v0.21.1
- styled-components v5.3.0
- react-star-rating-component v1.4.1
- material-ui v4.12.2
- react-icons v4.2.0


## ✨ 주요 기능
#### 1. 로그인
- 구글, 카카오 계정 소셜 로그인 방식을 사용합니다.
- 리프레시 토큰과 액세스 토큰을 사용합니다.

#### 2. 부트캠프
- 11개의 부트캠프 정보와 리뷰를 조회할 수 있습니다.
- 마음에 드는 부트캠프를 찜할 수 있습니다.
- 부트캠프에 리뷰를 남기고 별점을 줄 수 있습니다.

#### 3. 자유게시판 
- 다양한 주제(정보, 잡담, 취업, 인터넷 강의 등)로 사진과 함께 글을 남길 수 있습니다.
- 주제별로 조회할 수 있으며, 최신순과 인기순으로 정렬할 수 있습니다.
- 글을 북마크할 수 있습니다.
- 댓글 및 좋아요 기능으로 소통할 수 있습니다.

#### 4. 질문게시판 
- 새로운 질문을 남기거나, 질문 글에 답변을 달 수 있습니다.
- 답변은 작성한 후 수정 또는 삭제할 수 없습니다.
- 마음에 드는 답변과 질문에 좋아요를 남길 수 있습니다.

#### 5. 마이페이지
- 자신의 닉네임과 프로필 사진을 수정할 수 있습니다.
- 질문과 답변 및 자유게시판에서 북마크한 글과 내가 찜한 부트캠프 목록을 확인할 수 있습니다. 
- 자신이 작성한 글 목록(리뷰, 질문, 답변, 자유게시판 글)을 확인할 수 있습니다.


## 🔨 주요 개선 사항
- 커뮤니티 특성상 모바일로 접속하는 사용자들의 편의성을 위해 데스크탑-태블릿-모바일로 이어지는 반응형 웹으로 제작했습니다.
- AWS Certificate Manager를 통해 SSL 인증서를 발급한 후 https를 적용하여 배포했습니다.
- 오류 수정 및 재배포가 잦은 기간에는, S3 버킷의 수정사항을 즉각 반영하기 위해 AWS CloudFront의 캐싱 기간을 0~30초로 낮추고, Github Actions를 통해 배포 자동화를 적용했습니다.
- 💥여러 개의 리덕스 모듈의 제각각 데이터를 로딩하므로 모든 로딩이 끝나지 않았음에도 로딩 스피너가 멈추는 현상 확인
  - 로딩이 1회 발생할 때마다 task를 1씩 증가시키면서 로딩이 1회 끝날 때마다 task를 1씩 감소시켰고,
  - task가 1 이상이 되면 is_loading: true, task가 0이 되면 is_loading: false로 전환하여,
  - 모든 데이터의 로딩이 끝난 후에 로딩 스피너를 멈출 수 있었습니다.
- 💥사용자의 프로필 사진 정보를 로그인 토큰과 함께 쿠키에 저장하면서 사용자가 직접 프로필 사진 정보에 접근하는 일 발생
  - 프로필 사진에는 사용자가 접근할 수 없도록 리덕스로 관리하고,
  - 마이페이지에서 프로필 사진을 삭제할 수 있도록 했습니다.

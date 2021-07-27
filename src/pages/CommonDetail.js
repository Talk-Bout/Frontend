import React from 'react';
import {Text, Button, Grid} from "../elements/index";

const CoomonBoardDetail = (props) => {

  return (
    <React.Fragment>
      <Grid padding="60px">
      <Grid>
          토픽 회사생활
          제목
          글쓴이
          날짜
      </Grid>
      <hr/>
      <Grid>
          내용
      </Grid>
      <Grid>
          댓글5
          댓글남겨주세요 / 등록
          댓글1개더보기
      </Grid>
      <Grid>
          댓글
      </Grid>
      </Grid>
    </React.Fragment>
  )
};

export default CoomonBoardDetail;
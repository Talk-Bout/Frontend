//정규식 체크
//이메일
export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);
};

//닉네임은 한글,영문,숫자만가능하며 2~6자리가능
export const nicknameCheck = (nickname) => {
  let _reg = /^[a-zA-Zㄱ-힣0-9]{2,6}$/;
  return _reg.test(nickname);
};

//비밀번호 영어숫자특수기호
export const pwMatch = (pw) => {
  //const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{4,20}$/;
  const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{4,20}$/;
  return _reg.test(pw) && pw.search(/\s/) === -1 ? true : false;
};

//비밀번호 연속3자리
export const pwContinuous = (pw) => {
  const _reg = /(\w)\1\1/;
  return _reg.test(pw);
};

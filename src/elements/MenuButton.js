import React from 'react';
import { Text } from '.';
import { CaretDown } from '../image';
import { Button, MenuItem, MenuList, ClickAwayListener, Grow, Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 'fit-content',
  },
  paper: {
    marginRight: theme.spacing(2),
    backgroundColor: '#2E3134',
    color: '#F1F3F4',
  },
}));

export default function MenuListComposition() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const logout = () => {
    dispatch(userActions.logOut());
  };

  return (
    // <div className={classes.root}>
    //   <Paper className={classes.paper}>
    //     <MenuList>
    //       <MenuItem>마이페이지</MenuItem>
    //       <MenuItem>로그아웃</MenuItem>
    //     </MenuList>
    //   </Paper>
    <div className={classes.root}>
      <Button style={{ width: '10px', padding: 0 }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Text color="#5F6368" fontSize="4.6px">
          <img src={CaretDown} alt="메뉴" />
        </Text>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => { handleClose(); history.push('/mypage') }}>마이페이지</MenuItem>
                  <MenuItem onClick={() => { handleClose(); logout() }}>로그아웃</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
    // </div>
  );
};
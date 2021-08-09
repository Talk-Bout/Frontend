// import React from 'react';
// import styled from 'styled-components';
// import { Text, Button, Grid, Image } from '../elements/index';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//       pageNumbers.push(i);
//     }
    
//   return (
//     <React.Fragment>
//       <div>
//       <PageBox>
//           {pageNumbers.map(number => (
//               <Text key={number} className="page-item"
//               margin="0 0.7%" fontSize="2.3vh" _onClick={() => paginate(number)}>
//               <Page><BsChevronLeft />{number}<BsChevronRight/></Page>
//               </Text>
//           ))}
//         </PageBox>
//       </div>
//     </React.Fragment>
//   )
// };

// const PageUl = styled.ul`
//   float:left;
//   list-style: none;
//   text-align:center;
//   border-radius:3px;
//   color:white;
//   padding:1px;
//   border-top:3px solid #186EAD;
//   border-bottom:3px solid #186EAD;
//   background-color: rgba( 0, 0, 0, 0.4 );
// `;

// const PageLi = styled.li`
//   display:inline-block;
//   font-size:17px;
//   font-weight:600;
//   padding:5px;
//   border-radius:5px;
//   width:25px;
//   &:hover{
//     cursor:pointer;
//     color:white;
//     background-color:#263A6C;
//   }
//   &:focus::after{
//     color:white;
//     background-color:#263A6C;
//   }
// `;

// const PageSpan = styled.span`
//   &:hover::after,
//   &:focus::after{
//     border-radius:100%;
//     color:white;
//     background-color:#263A6C;
//   }
// `;

// const PageBox = styled.div`
// text-align: center;
// font-size: 1.8vh;;
// /* margin: 2% 0 0 0; */
// `;

// const Page = styled.span`
// opacity: 0.5;
// cursor: pointer;
// color: #F8F9FA;
// &:hover {
//     opacity: 1;
//   }
// `;

// export default Pagination;
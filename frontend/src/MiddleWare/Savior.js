// import React, { useEffect } from 'react'
// import {useNavigate} from 'react-router-dom';

// function Protected(props) {
//    const navigate = useNavigate();

//     useEffect(() => {
        
//         let login = localStorage.getItem('login');
//         let signup = localStorage.getItem("signUp");
//         if ((!signup)&&(!login)) {
//             navigate("/");
//         } else if (signup||login) {
//             navigate("/home");
//         } 
//     },[])
//     const {Component } = props;

//   return (
//       <div>
//           <Component/>
//     </div>
//   )
// }

// export default Protected;
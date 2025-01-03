// // src/components/guards/LoginGuard.tsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store";
// import { checkUserVerification } from "@/store/slices/authSlice";

// const LoginGuard = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { unverifiedEmail } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const email = localStorage.getItem("unverifiedEmail");

//     if (email) {
//       dispatch(checkUserVerification(email)).then((result) => {
//         if (
//           checkUserVerification.fulfilled.match(result) &&
//           !result.payload.isVerified
//         ) {
//           navigate("/verify-email", { state: { email } });
//         }
//       });
//     }
//   }, [dispatch, navigate]);

//   return null;
// };

// export default LoginGuard;

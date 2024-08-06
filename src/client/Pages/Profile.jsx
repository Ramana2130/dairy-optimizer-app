// import React, { useEffect, useState } from 'react';
// import SideBar from '../Components/SideBar';
// import Statistics from './Statistics';
// import '../index.css';
// import Grey from '../assets/grey.png';
// import pink from '../assets/pink.png';
// import Graph from './Graph';
// import circle2 from '../assets/circle2.png';
// import circle from '../assets/circle.png';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState({
//     username: '',
//     password: '', // Changed from password to phoneNumber
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const userId = localStorage.getItem("userId");
//       console.log('Retrieved userId:', userId); // Debugging line

//       if (!userId) {
//         setError('User ID is missing. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:3000/admin/getuser/${userId}`);
//         if (response.status === 200 && response.data.user) {
//           setUserDetails({
//             username: response.data.user.username || '',
//             password: response.data.user.password || '',
//           });
//         } else {
//           toast.error('Failed to fetch user details: User not found');
//         }
//       } catch (error) {
//         toast.error(`Failed to fetch user details: ${error.message}`);
//         console.error('Error fetching user details:', error);
//       }
//       setLoading(false);
//     };

//     fetchUserDetails();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="h-[100vh] flex over">
//       <SideBar />
//       <div className="flex w-[70%] items-center bg-pink/10 backdrop-blur-3xl overflow-hidden justify-center relative">
//         <div className="absolute -top-20 -left-10">
//           <img src={Grey} alt="" className="h-[350px]" />
//         </div>
//         <div className="absolute -bottom-24 -right-16">
//           <img src={pink} alt="" className="h-[350px]" />
//         </div>
//         <div className="absolute -top-36 -right-24">
//           <img src={circle2} alt="" className="h-[350px]" />
//         </div>
//         <div className="absolute -bottom-36 -left-24">
//           <img src={circle} alt="" className="h-[350px]" />
//         </div>
//         <div className="w-full">
//           <div className="relative card py-1.5 w-72 rounded-xl -top-5 left-44 z-50">
//             <nav className="flex" aria-label="Breadcrumb">
//               <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                 <li className="inline-flex items-center">
//                   <a
//                     href="/admindashboard"
//                     className="ml-1 inline-flex text-sm font-medium text-white hover:underline md:ml-2"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="mr-4 h-4 w-4"
//                     >
//                       <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                       <polyline points="9 22 9 12 15 12 15 22"></polyline>
//                     </svg>
//                     Dashboard
//                   </a>
//                 </li>
//                 <li>
//                   <div className="flex items-center">
//                     <span className="mx-2.5 text-white">/</span>
//                     <a
//                       href="#"
//                       className="ml-1 text-sm font-medium text-white hover:underline md:ml-2"
//                     >
//                       Profile
//                     </a>
//                   </div>
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <div className="mx-auto shadow-lg card bg-lightWhite/20 rounded-xl backdrop-blur-xl p-10 py-10 w-[70%]">
//             <div className="mb-10 text-start">
//               <h1 className="font-light text-white text-3xl">Profile</h1>
//             </div>
//             <form>
//               <div className="mb-5 relative">
//                 <label
//                   htmlFor="username"
//                   className="absolute text-white bg-pink/5 -top-3 left-5 mb-3 block text-base font-medium"
//                 >
//                   Admin Name
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder="User Name"
//                   value={userDetails.username}
//                   className="w-full rounded-xl border-opacity-40 border-white border bg-transparent py-3 px-6 text-base font-medium text-white placeholder:text-white outline-none focus:border-pink focus:shadow-md"
//                 />
//               </div>
//               <div className="mb-5 relative">
//                 <label
//                   htmlFor="phoneNumber" // Updated
//                   className="absolute text-white bg-pink/5 -top-3 left-5 mb-3 block text-base font-medium"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   name="password" // Updated
//                   id="password" // Updated
//                   placeholder="Your password"
//                   value={userDetails.password}
//                   className="w-full rounded-xl border-opacity-40 border-white border bg-transparent py-3 px-6 text-base font-medium text-white placeholder:text-white outline-none focus:border-pink focus:shadow-md"
//                 />
//               </div>
//               <div>
//                 <button className="hover:shadow-form w-full rounded-md bg-rose-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
//                   Update Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="w-[30%] bg-pink/10 shadow-xl backdrop-blur-3xl pt-5">
//         <Statistics />
//         <div className="px-5">
//           <Graph />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

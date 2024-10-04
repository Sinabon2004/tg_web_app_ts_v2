// import clsx from "clsx";
// import React from "react";
// import Avatar from "@/components/avatar";
// import Image from "next/image";


// type userData = {
//     id?: number;
//     username?: string;
//     lastName?: string;
//     firstName?: string;
//     avatar_url?: string | null | undefined;
//     money?: number | undefined;
// }

// interface ProfileProps {
//     isOpen: boolean;
//     onClose: () => void; // Function type for onClose handler
//     user: userData; // Optional user object
// }

// const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user }) => {

//     let OpenClassWrapper = isOpen?"top-0":"top-[100%]";
//     let OpenClassContent = isOpen?"top-0":"top-[-100%]";

//     return (
//         <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]  duration-150  fixed inset-0 z-40 bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden")} >
//             <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-gray-700 p-6 w-full rounded-lg shadow-xl")}>

//                 <div className="w-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center flex-col">
//                     <div className="w-full rounded-t-lg h-32 overflow-hidden">
//                         <Image className="object-cover object-top w-full"  width={100}  height={100} src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'></Image>
//                     </div>
//                     <div className="relative z-10 w-32 h-32 -mt-16 p-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full">
//                         <Avatar user={user} className={"h-full w-full object-cover object-center rounded-full"} />
//                     </div>
//                     <div className="text-center mt-2 mb-6">
//                         <h2 className="font-semibold">{user?.firstName + " " + user?.lastName}  </h2>
//                         {/*<p className="text-gray-500">Freelance Web Designer</p>*/}
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Profile;
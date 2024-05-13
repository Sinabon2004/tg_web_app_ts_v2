import clsx from "clsx";
import React from "react";
import Avatar from "@/components/avatar";


type userData = {
    id?: number;
    username?: string;
    lastName?: string;
    firstName?: string;
    photo_url?: string;
    money?: number | undefined;
}

interface ProfileProps {
    isOpen: boolean;
    onClose: () => void; // Function type for onClose handler
    user: userData; // Optional user object
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user }) => {

    let OpenClassWrapper = isOpen?"top-0":"top-[100%]";
    let OpenClassContent = isOpen?"top-0":"top-[-100%]";

    return (
        <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]  duration-150  fixed inset-0 z-40 bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden")} >
            <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-gray-700 p-6 w-full rounded-lg shadow-xl")}>

                <div className="w-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center flex-col">
                    <div className="w-full rounded-t-lg h-32 overflow-hidden">
                        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'></img>
                    </div>
                    <div className="relative z-10 w-32 h-32 -mt-16 p-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full">
                        <Avatar user={user} className={"h-full w-full object-cover object-center rounded-full"} />
                    </div>
                    <div className="text-center mt-2 mb-6">
                        <h2 className="font-semibold">{user?.firstName + " " + user?.lastName}  </h2>
                        {/*<p className="text-gray-500">Freelance Web Designer</p>*/}
                    </div>
                    {/*<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">*/}
                    {/*    <li className="flex flex-col items-center justify-around">*/}
                    {/*        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">*/}
                    {/*            <path*/}
                    {/*                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />*/}
                    {/*        </svg>*/}
                    {/*        <div>2k</div>*/}
                    {/*    </li>*/}
                    {/*    <li class="flex flex-col items-center justify-between">*/}
                    {/*        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">*/}
                    {/*            <path*/}
                    {/*                d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />*/}
                    {/*        </svg>*/}
                    {/*        <div>10k</div>*/}
                    {/*    </li>*/}
                    {/*    <li className="flex flex-col items-center justify-around">*/}
                    {/*        <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">*/}
                    {/*            <path*/}
                    {/*                d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />*/}
                    {/*        </svg>*/}
                    {/*        <div>15</div>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>

            </div>

        </div>
    );
};

export default Profile;
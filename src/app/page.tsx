"use client"

import Header from "@/components/header";
import {SDKProvider} from "@tma.js/sdk-react";
import {BackButton, init, postEvent} from "@tma.js/sdk";

import Games from "@/components/games";
import {startEruda} from "@/services/eruda";
import {useEffect} from "react";
import {element} from "prop-types";
import {random} from "nanoid";


export default function Home() {
    const {viewport, miniApp,initData} = init();
    startEruda();
    viewport.expand();
    const backButton = new BackButton(true, '6.3', postEvent);
    backButton.hide();


    //
    // useEffect(() => {
    //     if (initData?.startParam) {
    //         console.log(initData?.startParam);
    //     }
    // }, [initData?.startParam]);

    const arr =[ String(random(1)[0]), String(random(1)[0]), String(random(1)[0]), String(random(1)[0]),   ];

    return (

        <SDKProvider>

            <div className="bg-gray-800  flex justify-center ">

                <Header/>
                <Games/>
                {/*<div className={"h-[100dvh] w-full flex justify-center mt-[80px] bg-gray-800"}>*/}
                
                {/*    <div className={"bg-gray-900 py-8 px-4 w-full max-w-[500px] flex flex-col gap-8"}>*/}


                {/*        <div className=" w-full flex flex-col gap-5 ">*/}
                {/*            <div className="bg-purple-100 p-2 h-fit rounded-lg">*/}

                {/*                <div className="flex h-fit flex-col gap-0 bg-gray-800">*/}
                {/*                    {*/}
                {/*                        arr.map(*/}
                {/*                            (elemento) => (*/}
                {/*                                <div key={elemento} className="flex gap-0 h-1/4">*/}
                {/*                                    {arr.map(*/}
                {/*                                        (element) => (*/}
                {/*                                            <div key={element}*/}
                {/*                                                 className="w-1/4  flex justify-center items-center p-5 border-2 border-purple-100"*/}
                {/*                                            >*/}
                {/*                                                {random(1)[0] % 2 == 0*/}
                {/*                                                    ?*/}
                {/*                                                    <svg xmlns="http://www.w3.org/2000/svg"*/}
                {/*                                                         fill="none"*/}
                {/*                                                         viewBox="0 0 24 24"*/}
                {/*                                                         strokeWidth="1.5" stroke="currentColor"*/}
                {/*                                                         className="w-full h-full">*/}
                {/*                                                        <path strokeLinecap="round"*/}
                {/*                                                              strokeLinejoin="round"*/}
                {/*                                                              d="M6 18 18 6M6 6l12 12"/>*/}
                {/*                                                    </svg>*/}
                {/*                                                    :*/}
                {/*                                                    <svg xmlns="http://www.w3.org/2000/svg"*/}
                {/*                                                         fill="none"*/}
                {/*                                                         viewBox="0 0 24 24"*/}
                {/*                                                         strokeWidth="1.5" stroke="currentColor"*/}
                {/*                                                         className="w-full opacity-0 h-full">*/}
                {/*                                                        <path strokeLinecap="round"*/}
                {/*                                                              strokeLinejoin="round"*/}
                {/*                                                              d="M6 18 18 6M6 6l12 12"/>*/}
                {/*                                                    </svg>}*/}

                {/*                                            </div>*/}
                {/*                                        )*/}
                {/*                                    )*/}
                {/*                                    }*/}


                {/*                                </div>*/}
                {/*                            )*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                    /!*<div>*!/*/}
                {/*                    /!*    <h4>Игра завершена</h4>*!/*/}
                {/*                    /!*    <h3>Победтеля нет, деньги не спишутся </h3>*!/*/}
                {/*                    /!*</div>*!/*/}

                {/*                </div>*/}

                {/*            </div>*/}

                {/*            <div className="flex justify-center items-center gap-4">*/}
                {/*                <div className="py-3 sm:py-4">*/}
                {/*                    <div className="flex flex-col gap-2 items-center">*/}
                {/*                        <div*/}
                {/*                            className="flex justify-center w-[20vw] h-[20vw] bg-gradient-to-br  from-purple-600 to-blue-500 p-0.5 rounded-full">*/}
                {/*                            <img className="w-full h-full rounded-full"*/}
                {/*                                 src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>*/}
                {/*                        </div>*/}
                {/*                        <div className=" flex flex-col items-center">*/}
                {/*                            <p className="text-md text-gray-500 truncate dark:text-gray-400">*/}
                {/*                                username*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div*/}
                {/*                    className="grow flex justify-center items-center text-base font-semibold text-gray-900 dark:text-white">*/}
                {/*                    320$*/}
                {/*                </div>*/}
                {/*                <div className="py-3 sm:py-4">*/}
                {/*                    <div className="flex flex-col gap-2 items-center">*/}
                {/*                        <div*/}
                {/*                            className="flex justify-center w-[20vw] h-[20vw] bg-gradient-to-br  from-purple-600 to-blue-500 p-1 rounded-full">*/}
                {/*                            <img className="w-full h-full rounded-full"*/}
                {/*                                 src="https://avatanplus.com/files/resources/mid/57d536b88e3e315718ddc107.png"*/}
                {/*                                 alt="Neil image"/>*/}
                {/*                        </div>*/}
                {/*                        <div className=" flex flex-col items-center">*/}
                {/*                            <p className="text-md text-gray-500 truncate dark:text-gray-400">*/}
                {/*                                username*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}


                {/*        </div>*/}


                {/*    </div>*/}
                {/*</div>*/}

            </div>

        </SDKProvider>

    );
}

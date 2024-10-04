import {useEffect, useMemo, useState} from "react";

type userData = {

    avatar_url: string ;
    money: number;
}
const useUserData = (userId: number | undefined) => {
    const [userData, setUserData] = useState<userData>();


    const url = useMemo(() => {
        return userId ? `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}` : null;
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            if (url) {
                try {
                    const response = await fetch(url, {
                        method: "get",
                        headers: new Headers({
                            "ngrok-skip-browser-warning": "69420",
                        }),
                    });
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error('Ошибка при загрузке данных кошелька:', error);
                    // Здесь можно добавить обработку ошибок, например, показать сообщение об ошибке
                }
            }
        };

        fetchData();
    }, [url]);

    return userData;
}

export default useUserData;
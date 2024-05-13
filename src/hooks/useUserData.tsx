import {useEffect, useMemo, useState} from "react";


const useUserData = (userId: number | undefined) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const url = useMemo(() => {
        return userId ? `https://tg-mini-app.local/user/${userId}` : null;
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            if (url) {
                setIsLoading(true);
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
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [url]);

    return userData;
}

export default useUserData;
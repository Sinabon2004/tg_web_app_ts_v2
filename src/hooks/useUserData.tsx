import {useEffect, useMemo, useState} from "react";

type userData = {
    // id: number;
    // username?: string;
    // lastName: string;
    // firstName: string;
    avatar_url: string | null;
    money: number;
}
const useUserData = (userId: number | undefined) => {
    const [userData, setUserData] = useState<userData>();
    const [isLoading, setIsLoading] = useState(false);

    const url = useMemo(() => {
        return userId ? `https://accepted-elephant-jolly.ngrok-free.app/user/${userId}` : null;
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
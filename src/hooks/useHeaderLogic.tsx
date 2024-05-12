import { useState } from 'react';

export default function useHeaderLogic() {
    const [user] = useState({ // Assuming user data is static
        username: "luvrikin",
        photo_url: "https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg",
        first_name: "tema",
        last_name: "chesy",
    });

    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleWalletClick = () => {
        setIsWalletOpen(!isWalletOpen);
        if (isProfileOpen) setIsProfileOpen(false);
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return {
        user,
        isWalletOpen,
        isProfileOpen,
        handleWalletClick,
        handleProfileClick,
    };
}

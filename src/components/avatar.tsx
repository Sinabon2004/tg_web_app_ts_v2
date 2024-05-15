import React from "react";
import Image from "next/image";

// Interface for User object
type userData = {
    id?: number;
    username?: string;
    lastName?: string;
    firstName?: string;
    avatar_url?: string | null | undefined;
    money?: number | undefined;
}

// Interface for Avatar component props
interface AvatarProps {
    user: userData;
    className?: string; // Optional property
}

export default function Avatar({ user, className }: AvatarProps) {
    let pic = user?.avatar_url;

    // Set a default fallback image for undefined or null user.photo_url
    if (pic === undefined || pic === null) {
        pic = "/images/avatar.png"; // Assuming the image is directly in the public directory
    }


    return (
        <Image
            src={pic}
            // Specify width and height if desired (recommended for performance)
            width={100}
            height={100}
            alt={"username"}
            className={className}
        />
    );
}

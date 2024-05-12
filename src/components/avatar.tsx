import React from "react";
import Image from "next/image";

// Interface for User object
interface User {
    username: string;
    photo_url?: string; // Optional property
    first_name?: string; // You can add other optional properties if needed
    last_name?: string;
}

// Interface for Avatar component props
interface AvatarProps {
    user: User;
    className?: string; // Optional property
}

export default function Avatar({ user, className }: AvatarProps) {
    let pic = user?.photo_url;

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
            alt={user?.username}
            className={className}
        />
    );
}

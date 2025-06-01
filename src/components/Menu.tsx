"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Avatar from "./avatar";
import ButtonChevron from "./ButtonChevron";
import MenuList from './MenuList'

type UserProps = {
  allowsWriteToPm: boolean;
  avatar_url: string | null;
  firstName: string;
  id: number;
  languageCode: string;
  lastName: string;
  money: number;
  photoUrl: string;
};

export default function Menu({ user }: { user: UserProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="overflow-hidden rounded-full"
      >
        {user?.photoUrl ? (
          <Avatar src={user.photoUrl} size={50} />
        ) : (
          <Avatar src="/images/avatar.png" size={50} />
        )}
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="flex flex-col items-center w-full gap-[8px]">
          {user?.photoUrl ? (
            <Avatar src={user.photoUrl} size={80} />
          ) : (
            <Avatar src="/images/avatar.png" size={80} />
          )}
          <h3 className="text-primary-white font-bold text-[26px]">
            {user.firstName} {user.lastName}
          </h3>
          <h4 className="text-[#9d9da3] font-regular text-[14px]">ID: {user.id}</h4>
          <div className="mt-3 w-full flex flex-col gap-[16px]">
            <h3 className="text-primary-white font-semibold text-[14px]">
              User Information
            </h3>
            <MenuList user={user} />
          </div>
        </div>
      </Modal>
    </>
  );
}

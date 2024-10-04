"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Avatar from "./avatar";
import ButtonChevron from "./ButtonChevron";
import MenuList from './MenuList'

export default function Menu({ user }: { user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="overflow-hidden rounded-full"
      >
        {user?.photo_url ? (
          <Avatar src={user?.photo_url} size={23} />
        ) : (
          <Avatar src="/images/avatar.png" size={23} />
        )}
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="flex flex-col items-center w-full gap-[8px]">
          {user?.photo_url ? (
            <Avatar src={user?.photo_url} size={80} />
          ) : (
            <Avatar src="/images/avatar.png" size={80} />
          )}
          <h3 className="text-primary-white font-bold text-[26px]">
            {user?.firstName + " " + user?.lastName}
          </h3>
          <h4 className="text-[#9d9da3] font-regular text-[14px]">@somename</h4>
          <ButtonChevron src="/images/pawns.png" title="Your Team" />
          <div className="mt-3 w-full flex flex-col gap-[16px]">
            <h3 className="text-primary-white font-semibold text-[14px]">
              Assets
            </h3>
            <ButtonChevron src="/images/wallet.png" title="Wallet" />
            <MenuList/>
          </div>
        </div>
      </Modal>
    </>
  );
}

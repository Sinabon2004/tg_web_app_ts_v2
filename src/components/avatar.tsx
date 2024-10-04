"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

export default function Avatar({ src, size }: { src: string; size: number }) {
  return (
    <div className='rounded-full overflow-hidden'>
      <Image src={src} width={size} height={size} alt="avatar" />
    </div>
  );
}

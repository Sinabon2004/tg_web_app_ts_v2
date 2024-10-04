import Image from "next/image";
export default function ButtonChevron({ title, src }: { title: string, src: string }) {
    return (
        <div className="bg-[#1C1C1D] w-full flex justify-between p-[16px] rounded-[16px]">
            <div className="flex gap-0.5">
              <Image
                className="aspect-square w-[24px]"
                width={24}
                height={24}
                src={src}
                alt="wat-logo"
              />
              <h3 className="text-primary-white font-regular text-[14px]">
                {title}
              </h3>
            </div>
            <div className="w-[24px] aspect-square fill-primary-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z"></path>
              </svg>
            </div>
          </div>
    )
}
import Image from "next/image";
export default function MenuListItem({title, price, src}:{title: string, price: string, src?: string}) {
  return (
    <div className=" w-full flex items-center justify-between py-[16px] ">
      <div className="flex items-center gap-1">
        {src && <Image
          className="aspect-square w-[24px]"
          width={24}
          height={24}
          src={src}
          alt={title}
        />
        }
        
        <h3 className="text-primary-white font-regular text-[14px]">
          {title}
        </h3>
      </div>
      <h4 className="text-primary-white font-semibold text-[14px]">
      {price}
      </h4>
    </div>
  );
}

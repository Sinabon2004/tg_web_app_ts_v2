import Image from 'next/image'
export default function ShowStat({ value, src }: { value: string, src: string }) {
  return (
    <div
      className="w-fit flex gap-0.5 items-center
                        py-[1px] pl-2 pr-0.5 backdrop-blur-sm bg-primary-white/15 rounded-[99px]"
    >
      <p className="text-xs uppercase font-inter font-semibold text-primary-white">
        {Math.round(parseFloat(value))}
      </p>
      <Image
        src={src}
        width={22}
        height={22}
        alt="stat"
      />
    </div>
  );
}

import Image from "next/image";
export default function QuickRoutes() {
  return (
    <div className="fixed bottom-0 left-0 right-0 m-3 py-4 rounded-[16px] backdrop-blur-[8px] bg-[#6857F0]/35">
      <div className="px-4 flex justify-between">
        <div className="flex flex-col items-center gap-1">
          <Image width={34} height={34} src="/images/pawns.png" alt="logo" />
          <h5 className="text-[#ffffff8f] uppercase font-semibold text-[8px]">
            invite
          </h5>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image width={34} height={34} src="/images/spin.png" alt="logo" />
          <h5 className="text-[#ffffff8f] uppercase font-semibold text-[8px]">
            spin
          </h5>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image width={34} height={34} src="/images/stick.png" alt="logo" />
          <h5 className="text-[#ffffff8f] uppercase font-semibold text-[8px]">
            mine
          </h5>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image width={34} height={34} src="/images/tickets.png" alt="logo" />
          <h5 className="text-[#ffffff8f] uppercase font-semibold text-[8px]">
            earn
          </h5>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image width={34} height={34} src="/images/watCoin.png" alt="logo" />
          <h5 className="text-[#ffffff8f] uppercase font-semibold text-[8px]">
            watdrop
          </h5>
        </div>
      </div>
    </div>
  );
}

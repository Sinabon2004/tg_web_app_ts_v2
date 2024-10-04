import MenuListItem from "./MenuListItem";
export default function MenuList() {
  return (
    <div className="bg-[#1C1C1D] w-full flex flex-col px-[16px] rounded-[16px] divide-y-[1px] divide-[#383838]">
      <MenuListItem title="USDT" price="$0.42" src="/images/usdt.png" />
      <MenuListItem title="Gem" price="0" src="/images/gem.png" />
      <MenuListItem title="Tickets" price="1,241" src="/images/tickets.png" />
      <MenuListItem title="Coins" price="0" src="/images/star.png" />
    </div>
  );
}

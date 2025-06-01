import MenuListItem from "./MenuListItem";

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

export default function MenuList({ user }: { user: UserProps }) {
  return (
    <div className="bg-[#1C1C1D] w-full flex flex-col px-[16px] rounded-[16px] divide-y-[1px] divide-[#383838]">
      <MenuListItem 
        title="ID" 
        price={user.id.toString()} 
        // src="/images/id.png" 
      />
      <MenuListItem 
        title="Balance" 
        price={`$${user.money.toFixed(2)}`} 
        src="/images/usdt.png" 
      />
      <MenuListItem 
        title="Name" 
        price={`${user.firstName} ${user.lastName}`} 
        // src="/images/user.png" 
      />
      <MenuListItem 
        title="Language" 
        price={user.languageCode.toUpperCase()} 
        // src="/images/lang.png" 
      />
      <MenuListItem 
        title="PM Allowed" 
        price={user.allowsWriteToPm ? "Yes" : "No"} 
        // src="/images/message.png" 
      />
    </div>
  );
}

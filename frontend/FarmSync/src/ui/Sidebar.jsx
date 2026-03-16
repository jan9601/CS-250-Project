import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="py-[3.2rem] px-[1.4rem] border-r border-border row-span-full ">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;

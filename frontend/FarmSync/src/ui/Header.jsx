import Button from "./Button";
import {CiUser} from "react-icons/ci";
import {HiArrowRightOnRectangle} from "react-icons/hi2";

function Header() {
  return (
    <header className=" py-[1.2rem] px-[4.8rem] border-b border-border">
      <div className="text-text-primary text-sm w-full justify-end flex items-center gap-4">
        <div className="w-7 h-7 bg-black/20 rounded-full"></div>
        <div>Matheus Zucchi</div>
        <Button variation="secondary">
          <CiUser className="text-lg" />
        </Button>
        <Button variation="secondary">
          <HiArrowRightOnRectangle className="text-lg" />
        </Button>
      </div>
    </header>
  );
}

export default Header;

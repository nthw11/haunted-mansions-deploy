import { FaHouseUser, FaGhost } from "react-icons/fa";
import Link from "next/link";
import { ButtonLink } from "components/ButtonLink";

export const MainMenu = ({
  callToActionDestination,
  callToActionLabel,
  menuItems,
}) => {
  // console.log("menuItems: ", props);
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
      <div className="py-4 pl-5 flex text-pink-600">
        <FaHouseUser size={30} />
        <FaGhost size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {(menuItems || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-slate-700 cursor-pointer relative group"
          >
            <div>
              <Link href={item.destination} className="p-5 block">
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                {item.subMenuItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.destination}
                    className="block p-5 whitespace-nowrap hover:bg-slate-700 "
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="ml-3 my-auto">
          <ButtonLink
            destination={callToActionDestination}
            label={callToActionLabel}
          />
        </div>
      </div>
    </div>
  );
};

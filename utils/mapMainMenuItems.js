import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  return menuItems.map((menuItem) => {
    return {
      id: uuid(),
      destination: menuItem.menuItem.destination?.uri,
      label: menuItem.menuItem.label,
      subMenuItems: (menuItem.items || []).map((subMenuItem) => {
        return {
          id: uuid(),
          destination: subMenuItem.destination?.uri,
          label: subMenuItem.label,
        };
      }),
    };
  });
};

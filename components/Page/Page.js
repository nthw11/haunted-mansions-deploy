import { MainMenu } from "../MainMenu/MainMenu";
import { BlockRenderer } from "../blockRenderer";

export const Page = (props) => {
  return (
    <div>
      <MainMenu
        menuItems={props.mainMenuItems}
        callToActionLabel={props.callToActionLabel}
        callToActionDestination={props.callToActionDestination}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};

import { gql } from "@apollo/client";
import client from "../client";
import { BlockRenderer } from "components/blockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "utils/mapMainMenuItems";
import { MainMenu } from "components/MainMenu";

export default function Home(props) {
  console.log("props: ", props);
  return (
    <div>
      <MainMenu menuItems={props.mainMenuItems} />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
  });
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  return {
    props: {
      blocks,
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.menuItems
      ),
    },
  };
};

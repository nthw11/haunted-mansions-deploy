import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/blockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Page(props) {
  // console.log("props", props);
  return (
  <div>
    <BlockRenderer blocks={props.blocks} />
  </div>);
}

export const getStaticProps = async (context) => {
  
  const uri = `/${context.params.slug.join("/")}/`;
  
  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks
            title
          }
        }
      }
    `,
    variables: { uri },
  });
  
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      title: data.nodeByUri.title,
    },
  };
}

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: data.pages.nodes.filter(page => page.uri !== "/").map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length - 1).split("/"),
      },
    })),
    fallback: "blocking",
  };
};

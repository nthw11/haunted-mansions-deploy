import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filters = await request.json();

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `{
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      },`;
    }
    if (filters.petFriendly) {
      petFriendlyFilter = `{
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      },`;
    }
    if (filters.minPrice) {
      minPriceFilter = `{
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      },`;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `{
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      },`;
    }
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query AllPropertiesQuery {
          properties(where: { offsetPagination: { size: 3, offset: ${
            ((filters.page || 1) - 1) * 3
          } }
          metaQuery: {
            relation: AND
            metaArray: [
              ${petFriendlyFilter}
              ${hasParkingFilter}
              ${minPriceFilter}
              ${maxPriceFilter}
            ]
          }
           } ) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              title
              uri
              databaseId
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
            }
          }
        }
      `,
      }),
    });

    const { data } = await response.json();
    return NextResponse.json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
}

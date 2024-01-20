"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;

  const search = async () => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } =
      queryString.parse(window.location.search);
    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (petFriendly === "true") {
      filters.petFriendly = true;
    }

    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page) || 1,
        ...filters,
      }),
    });
    const data = await response.json();
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    router.push(
      `
      ${pathname}?page=${pageNumber}&petFriendly=${
        petFriendly === "true"
      }&hasParking=${
        hasParking === "true"
      }&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };
  useEffect(() => {
    search();
  }, []);

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    router.push(
      `
      ${pathname}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div className="property-search">
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        totalPages={Math.ceil(totalResults / pageSize)}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

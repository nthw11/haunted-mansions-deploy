import { useState, useEffect } from "react";
import { Input } from "components/Input";
import queryString from "query-string";

export const Filters = ({ onSearch }) => {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    });
  };
  useEffect(() => {
    const {
      petFriendly: petFriendlyParam,
      hasParking: hasParkingParam,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
    } = queryString.parse(window.location.search);
    setPetFriendly(petFriendlyParam === "true");
    setHasParking(hasParkingParam === "true");
    setMinPrice(minPriceParam || "");
    setMaxPrice(maxPriceParam || "");
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking(!hasParking)}
            />
            <span className="pl-2">Has Parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly(!petFriendly)}
            />
            <span className="pl-2">Pet Friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="btn">
        <label className="cursor-pointer" onClick={handleSearch}>
          Search
        </label>
      </div>
    </div>
  );
};

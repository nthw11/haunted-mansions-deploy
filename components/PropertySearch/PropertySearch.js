import { useEffect, useState } from "react";
import { Results } from "./Results";

export const PropertySearch = () => {
  const [ properties, setProperties ] = useState([]);
  useEffect(() => {
    console.log("PropertySearch mounted");
    const search = async () => {
      const response = await fetch("/api/search");
      const data = await response.json();
      console.log('search data: ', data);
      setProperties(data.properties);
      
    };
    search();
    return () => console.log("PropertySearch unmounted");
  }, []);
  return (
    <div className="property-search">
      <Results properties={properties} />
    </div>
  );
};
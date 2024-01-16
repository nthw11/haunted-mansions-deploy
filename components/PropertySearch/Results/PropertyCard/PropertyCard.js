import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBathtub,
  faSquarePersonConfined,
  faBed,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({
  title,
  image,
  destination,
  price,
  bedrooms,
  bathrooms,
  hasParking,
  petFriendly,
}) => {
  return (
    <Link
      href={destination}
      className="border-2 border-slate-300 p-5 bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={250}
          className="mb-3 object-cover"
        />
      </div>
      <div className="mt-3 text-large font-bold">{title}</div>
      <div className="text-large">${numeral(price).format("0,0")}</div>
      {/* bed & bath */}
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FontAwesomeIcon icon={faBed} />
          <span className="pl-2">{bedrooms} bedrooms</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBathtub} />
          <span className="pl-2">{bathrooms} bathrooms</span>
        </div>
      </div>
      <div className="flex justify-between text-sm mt-3">
      {(!!hasParking || !!petFriendly) && (
          <div>
            {!!hasParking && (
              <div>
                <FontAwesomeIcon icon={faCar} />
                <span className="pl-2">Parking Available</span>
              </div>
            )}
            {!!petFriendly && (
              <div>
                <FontAwesomeIcon icon={faSquarePersonConfined} />
                <span className="pl-2">Pet Friendly</span>
              </div>
            )}
          </div>
      )}
      </div>
    </Link>
  );
};

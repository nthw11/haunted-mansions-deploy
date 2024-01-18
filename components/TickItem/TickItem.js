import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const TickItem = ({ children }) => {
  return (
    <div className="grid grid-cols-[50px_1fr] gap-3">
      <div>
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-green-500 text-3xl flex justify-center items-center"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

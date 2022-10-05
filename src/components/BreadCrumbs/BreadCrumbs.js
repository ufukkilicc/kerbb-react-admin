import React, { useEffect, useState } from "react";
import "./BreadCrumbs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlash } from "@fortawesome/free-solid-svg-icons";

const BreadCrumbs = () => {
  const [current_path, set_current_path] = useState([]);
  const MINUTE_MS = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const pathArray = window.location.pathname.split("/");
      const newPathArray = [];
      for (let i = 1; i < pathArray.length; i++) {
        newPathArray.push(pathArray[i]);
      }
      set_current_path(newPathArray);
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // This represents the unmount function,
    // in which you need to clear your interval to
    // prevent memory leaks.
  }, []);
  return (
    <ul className="breadcrumbs">
      {current_path.map((el) => {
        return (
          <li className="breadcrumbs-item" key={el}>
            <div className="item-icon">
              <FontAwesomeIcon icon={faSlash} />
            </div>
            <h4
              className={
                el === current_path[current_path.length - 1]
                  ? "item-header-active"
                  : "item-header"
              }
            >
              {el.charAt(0).toUpperCase() + el.slice(1)}
            </h4>
          </li>
        );
      })}
    </ul>
  );
};

export default BreadCrumbs;

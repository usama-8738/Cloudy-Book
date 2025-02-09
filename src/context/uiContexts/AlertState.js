import React from "react";
import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    visible: false,
    status: false,
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;

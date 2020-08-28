import React from "react";

export default function Installments({ children }) {
  const { installmentsStyle } = styles;
  return <div style={installmentsStyle}>{children}</div>;
}

const styles = {
  installmentsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};

import React from "react";

import { formatCurrency, formatPercentage } from "../helpers/formatter";

export default function Installment({ children }) {
  const { installmentStyle } = styles;
  const { month, total, balance, percentage } = children;

  return (
    <div style={installmentStyle}>
      <span>{month}</span>
      <p>{formatCurrency(total)}</p>
      <p>{formatCurrency(balance)}</p>
      <p>{formatPercentage(percentage)}</p>
    </div>
  );
}

const styles = {
  installmentStyle: {
    border: "1px solid lightgray",
    padding: "5px",
    margin: "5px",
    fontFamily: "'JetBrains Mono', Consolas, monospace",
    fontWeight: "bold",
  },
};

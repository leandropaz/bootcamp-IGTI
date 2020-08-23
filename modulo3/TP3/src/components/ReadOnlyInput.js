import React, { Component } from "react";

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value, color } = this.props;
    // const { labelStyle } = styles;
    return (
      <div className="info">
        <label>
          <span>{label}</span>
          <input
            type="text"
            style={{ color: color, fontWeight: "bold" }}
            readOnly
            disabled
            value={value}
          />
        </label>
      </div>
    );
  }
}

// const styles = {
//   labelStyle: {
//     display: "flex",
//     width: "300px",
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//   },
// };

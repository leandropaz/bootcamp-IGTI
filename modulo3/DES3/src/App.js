import React, { useState } from "react";
import Installments from "./components/Installments";
import { useEffect } from "react";
import Installment from "./components/Installment";
import calculate from "./helpers/calculations";

export default function App() {
  const [initialCapital, setInitialCapital] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(0.5);
  const [cycle, setCycle] = useState(1);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(calculate(initialCapital, monthlyInterest, cycle));
  }, [cycle, initialCapital, monthlyInterest]);

  const handleChangeCapital = (value) => {
    setInitialCapital(value);
  };

  const handleChangeInterest = (value) => {
    setMonthlyInterest(value);
  };

  const handleChangeCycle = (value) => {
    setCycle(value);
  };

  const { flexRowStyle } = styles;

  return (
    <div className="container center">
      <h1>React - Juros Compostos</h1>

      <div className="row" style={flexRowStyle}>
        <div className="input-field col s3">
          <input
            id="inputCapital"
            type="number"
            value={initialCapital}
            min="0"
            max="100000"
            step="100"
            onChange={({ target }) => handleChangeCapital(Number(target.value))}
          />
          <label htmlFor="inputCapital" className="active">
            Montante inicial:
          </label>
        </div>

        <div className="input-field col s3">
          <input
            id="inputInterest"
            type="number"
            value={monthlyInterest}
            min="-12"
            max="12"
            step={0.1}
            onChange={({ target }) =>
              handleChangeInterest(Number(target.value))
            }
          />
          <label htmlFor="inputInterest" className="active">
            Taxa de juros mensal:
          </label>
        </div>

        <div className="input-field col s3">
          <input
            id="inputCycle"
            type="number"
            min="1"
            max="36"
            value={cycle}
            onChange={({ target }) => handleChangeCycle(Number(target.value))}
          />
          <label htmlFor="inputCycle" className="active">
            Período (meses):
          </label>
        </div>
      </div>

      <Installments>
        {data.map((item, index) => (
          <Installment key={item + index}>{item}</Installment>
        ))}
      </Installments>
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
};

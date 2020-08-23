import React, { Component } from "react";
import ReadOnlyInput from "./components/ReadOnlyInput";
import Bar from "./components/ Bar";
import { calculateSalaryFrom } from "./helper/salary";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleSalaryChange = (event) => {
    const newSalary = Number(event.target.value);

    this.setState({ fullSalary: newSalary });
  };

  brFormat = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  calculatePercentage = (value) => {
    return `${((value * 100) / this.state.fullSalary).toFixed(2)}%`;
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);
    const IRPFPercentage = this.calculatePercentage(discountIRPF);
    const INSSPercentage = this.calculatePercentage(discountINSS);
    const netSalaryPercentage = this.calculatePercentage(netSalary);
    const INSSColor = "#e67e22";
    const IRPFColor = "#c0392b";
    const netSalaryColor = "#16a085";

    return (
      <div className="container">
        <h3>Cálculo com o teto do INSS</h3>
        <h1>React Salário</h1>
        <label style={{ textAlign: "start" }}>
          <span>Salário bruto</span>
          <input
            type="number"
            value={fullSalary}
            step={100}
            onChange={this.handleSalaryChange}
          />
        </label>
        <div className="infoInputs">
          <ReadOnlyInput label="Base INSS" value={this.brFormat(baseINSS)} />
          <ReadOnlyInput
            label="Desconto INSS"
            value={`${this.brFormat(discountINSS)} - (${INSSPercentage})`}
            color={INSSColor}
          />
          <ReadOnlyInput label="Base IRPF" value={this.brFormat(baseIRPF)} />
          <ReadOnlyInput
            label="Desconto IRPF"
            value={`${this.brFormat(discountIRPF)} - (${IRPFPercentage})`}
            color={IRPFColor}
          />
          <ReadOnlyInput
            label="Salário Liquido"
            value={`${this.brFormat(netSalary)} - (${netSalaryPercentage})`}
            color={netSalaryColor}
          />
        </div>
        <Bar value={INSSPercentage} color={INSSColor} />
        <Bar value={IRPFPercentage} color={IRPFColor} />
        <Bar value={netSalaryPercentage} color={netSalaryColor} />
      </div>
    );
  }
}

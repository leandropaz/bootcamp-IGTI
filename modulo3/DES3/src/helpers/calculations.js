const calculate = (initialCapital, monthlyInterest, cycle) => {
  const values = [];

  for (let month = 1; month <= cycle; month++) {
    const total = initialCapital * (1 + monthlyInterest / 100) ** month;
    const balance = total - initialCapital;

    values.push({
      month,
      total,
      balance,
      percentage: (balance * 100) / initialCapital,
    });
  }

  return values;
};

export default calculate;

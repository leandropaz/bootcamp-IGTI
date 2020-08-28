const formatCurrency = value => {
  return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
}

const formatPercentage = value => {
  return value.toFixed(2).replace('.', ',') + '%'
}

export { formatCurrency, formatPercentage }
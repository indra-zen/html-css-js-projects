const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.onload = async () => {
  // https://api.exchangerate-api.com/v4/latest/USD
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();

  // console.log(data);
  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option = `<option value="${currency}">${currency}</option>`;
    fromCurrency.innerHTML += option;
    toCurrency.innerHTML += option;
  });
}

converterForm.onsubmit = async (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0) {
    alert("Please ener a valid amount");
    return;
  }

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}
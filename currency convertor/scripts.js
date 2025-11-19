const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultBox = document.getElementById("result");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function loadCurrencies() {
    const res = await fetch(API_URL + "USD");
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(cur => {
        fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
        toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "IRR";
}

async function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount<=0) {
        resultBox.textContent = "Enter a valid amount";
        return;
    }

    const res = await fetch(API_URL + from);
    const data = await res.json();

    const rate = data.rates[to];
    const finalValue = amount * rate;

    resultBox.textContent = `${amount} ${from} = ${finalValue.toFixed(2)} ${to}`;
}

document.getElementById("convertBtn").addEventListener("click",convert);

loadCurrencies();
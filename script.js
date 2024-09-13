
async function getExchangeRate() {
    const API_KEY = "9cb22669a3c72e37977c00cd";
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await response.json();
    return data.conversion_rates.EGP;
}

async function updateExchangeRate() {
    const rate = await getExchangeRate();
    document.getElementById('rateTitle').textContent = `The Exchange Rate is ${rate.toFixed(2)}`;
    return rate;
}

async function convertCurrency() {
    const amount = document.getElementById('amountInput').value;
    const rate = await updateExchangeRate();
    let result = '';

    try {
        if (amount.startsWith('$')) {
            const usdAmount = parseFloat(amount.slice(1));
            const egpAmount = usdAmount * rate;
            result = `${usdAmount.toFixed(2)} USD = ${egpAmount.toFixed(2)} EGP`;
        } else {
            const egpAmount = parseFloat(amount);
            const usdAmount = egpAmount / rate;
            result = `${egpAmount.toFixed(2)} EGP = ${usdAmount.toFixed(2)} USD`;
        }
    } catch (error) {
        result = 'Please enter a valid number';
    }

    document.getElementById('result').textContent = result;
}

// Initialize the page
updateExchangeRate();
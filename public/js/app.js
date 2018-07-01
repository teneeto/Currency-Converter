if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
else {
  console.log("IndexedDB is supported");
}



fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response=> {
       return response.json();
    }).then(data =>{

    const currencyArray = Object.entries(data.results);
    let mainMap = new Map();
    for(const currency of currencyArray){
        let currencyName = currency[1].currencyName;
        let currencyId = currency[1].id;
        mainMap.set(currency[1].id, currency[1].currencyName);
    }
    return mainMap;
    })

    .then(currencyMap =>{
        firstCurrency = document.getElementById('current_currency');
        secondCurrency = document.getElementById('equivalent_currency');

        for (const curr of currencyMap) {
            let[id, name] = curr;
           firstCurrency.add(new Option(name, id));
           secondCurrency.add(new Option(name, id));
        }
    })
    .catch(err => {
        console.log("Encountered an error .", err);
    })


const form_element = document.getElementById('currency-form');
form_element.addEventListener('submit', event => {
  event.preventDefault();
  let currentField = document.getElementById('current_currency').value;
  let equivalentField = document.getElementById('equivalent_currency').value;
   urlQuery =  'https://free.currencyconverterapi.com/api/v5/convert?q='
   qString = urlQuery+currentField+'_'+equivalentField;
    fetch(qString)
    .then(response =>{
        return response.json();
    }).then(data => {
        // console.log(data);
        const queryResult = Object.entries(data.results);
        //  console.log(queryResult);
        let rate = queryResult[0][1].val;
        return rate;
    }).then(rate => {
        let amount_Field = document.getElementById('current_amount').value;
        let converted_Value = rate * amount_Field;
        document.getElementById('equivalent_amount').value = converted_Value;
    })
});

//SERVICE WORKER
  if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('https://teneeto.github.io/currencyconverter/public/js/sw.js').then((registration) => {
        console.log('Registration successful, scope is:', registration.scope);
       })
       .catch((error) => {
          console.log('Service worker registration failed, error:', error);
       });

  }

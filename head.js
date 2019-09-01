function errorCallback(error) {
        console.log(JSON.stringify(error));
}
function cancelCallback() {
        console.log('Payment cancelled');
}

function getQueryString(name) {
    var urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

function decode(codeRaw){
    let encodedCode = codeRaw.substring(2, codeRaw.length - 1)
    console.log(codeRaw)
    try {
        return atob(encodedCode)
    } catch (error) {
        window.location.replace("http://www.alnahdaawards.com")
    }
}

function getPrice(code) {
    var price = 0;
    switch (code) {
        case 'A1': price =  200; break;case 'A2': price =  150; break;case 'A3': price =  150; break;case 'A10': price =  150; break;case 'B1': price =  175; break;case 'B2': price =  200; break;case 'B10': price =  150; break;case 'C1': price =  200; break;case 'C2': price =  150; break;case 'C3': price =  150; break;case 'C4': price =  250; break;case 'C5': price =  125; break;case 'C10': price =  150; break;case 'D1': price =  200; break;case 'D2': price =  200; break;case 'D3': price =  150; break;case 'D10': price =  150; break;case 'E1': price =  100; break;case 'E2': price =  100; break;case 'E3': price =  100; break;case 'E10': price =  150; break;case 'F1': price =  275; break;case 'F2': price =  100; break;case 'F3': price =  250; break;case 'F10': price =  200; break;case 'G1': price =  150; break;case 'G2': price =  90; break;case 'G3': price =  150; break;case 'G4': price =  75; break;case 'G10': price =  125; break;case 'H1': price =  275; break;case 'H2': price =  225; break;case 'H10': price =  250; break;case 'J1': price =  250; break;case 'J2': price =  150; break;case 'J10': price =  200; break;case 'K1': price =  225; break;case 'K10': price =  200; break;case 'L1': price =  100; break;case 'L2': price =  100; break;case 'L3': price =  75; break;case 'L4': price =  100; break;case 'L5': price =  150; break;case 'L6': price =  65; break;case 'L10': price =  95; break;case 'M1': price =  250; break;case 'M2': price =  225; break;case 'M3': price =  200; break;case 'M10': price =  225; break;case 'N1': price =  75; break;case 'N10': price =  75; break;case 'P1': price = E; break;case 'P10': price = E; break;case 'Q1': price =  75; break;case 'Q10': price =  75; break;case 'R1': price =  225; break;case 'R10': price =  225; break;case 'S1': price =  250; break;case 'S10': price =  250; break;case 'T10': price =  150; break;case 'U10': price =  250; break;case 'W1': price =  350; break;
        default:
            window.location.replace("http://www.alnahdaawards.com")
            break;
    }

    return price;
}


Checkout.configure({
    merchant: 'TEST9800042500',
    order: {
        amount: function() {
            //Dynamic calculation of amount
            var code = decode(getQueryString('code'));
            price = getPrice(code)
            return price;
        },
        currency: 'JOD',
        description: 'Order for Alnahda Award application for the application with code ' + decode(getQueryString('code')) + '.',
        id: getQueryString('order_id'),
    },
    interaction: {
        operation: 'PURCHASE', // set this field to 'PURCHASE' for Hosted Checkout to perform a Pay Operation.
        merchant: {
            name: 'Pontoon FinTech'.toUpperCase(),
            address: {
                line1: 'Khalda Amman Jordan P.O. Box 942233',
                line2: '11194'            
            }    
        }
    }
});

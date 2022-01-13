
function barcodeScanner() {
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "Livestream",
            target : document.querySelector('#barcode-scan-display'),
                constraints : {
                    facingMode : "environment"
                }
        },
        decoder : {
            readers : ["upc_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err); 
            return
        }
        Quagga.start();
    })
}
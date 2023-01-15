var BrCode=document.querySelector('.BrCode');
var format=document.querySelector('.format');
var hidden=document.querySelector('.hidden');
var Idurl=document.querySelector('.Idurl');
var thumbnail=document.querySelector('.thumbnail');


function GetBarcode(){
  if(BrCode.value!=""){
     hidden.classList.add('active');
     var brcode =`https://barcodeapi.org/api/${format.value}/${BrCode.value}`
     document.querySelector('.result1').innerHTML = `<img src="${brcode}" class="thumbnail"/>`;
     document.querySelector('.result2').innerHTML = `<button class="Get" onclick="download()">Download Barcode</button>`;
     document.querySelector('.Idurl').value = brcode;
  }
  else {
    alert('Enter Your Text');
  }
}
const BarcodeInput = document.querySelector(".Idurl");

function download(){
    document.querySelector(".Get").innerText = "Downloading Barcode...";
    fetchBarcode(BarcodeInput.value);
}

function fetchBarcode(url) {
    fetch(url).then(res => res.blob()).then(Barcode => {
        let tempUrl = URL.createObjectURL(Barcode);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        document.querySelector(".Get").innerText = "Download Barcode";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download Barcode!");
        document.querySelector(".Get").innerText = "Download Barcode";
    });
}
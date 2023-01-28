const _saltString = saltString;
const _encryptString = encryptString;
const _hashString = hashString;
export { _saltString as saltString };
export { _encryptString as encryptString };
export { _hashString as hashString };

function saltString(pString) {
    let salt = 'BlbKKS2y4r1FeVfjkee0';
    let saltedString = pString;
    for (var idx = 0; saltedString.length < 20; idx++)
        saltedString += salt.charAt(idx);
    return saltedString;
}

function encryptString(pString) {
    let stringCharInt = '';
	let modulo = 70952713551039394465955034790943808459480690142438823904128627757210447577079n;
    let exponent = 65537n;
    for (var idx = 0; idx < pString.length; idx++) 
        stringCharInt += pString.charCodeAt(idx).toString();
    let stringIntEncrypted = (BigInt(stringCharInt) ** exponent) % modulo;
    return stringIntEncrypted.toString();
}

function hashString(pString) {
    let hash = 1n;
    let multiplicand = 327970756321988702593190524464565820263n;
    let modulo = 82586345904536973264402314161588489653348247498903562300518738125739186220113n;
    for (var idx = 0; idx < pString.length; idx++)
        hash = (multiplicand * hash + BigInt(pString.charCodeAt(idx))) % modulo;
    hash = hash.toString(16);
    while (hash.length < 64)
        hash = '0' + hash;
    return hash;
}

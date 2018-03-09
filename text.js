exports.encodeText = string => new Uint8Array(
  new Uint16Array(Array.prototype.map.call(string, (_, idx) => string.charCodeAt(idx))).buffer
);

// The last argument for the Uint16Array constructor is not the byte-length to use as the new range,
// but the intended length of the u16 array.  Because each element in a u16 array consumes two bytes,
// the byte-length must be divided by two.
exports.decodeText = u8 => {
    var data = new Uint16Array(u8.byteLength / 2);
    for (var i = 0, j = 0; j < u8.byteLength; i++, j+=2) {
         data[i] = u8[j + 1] | u8[j] << 8;
    }
//    console.log(data);
    return String.fromCharCode.apply(null, data);
    //String.fromCharCode(...(new Uint16Array(u8.buffer, u8.byteOffset, u8.byteLength / 2)));
}

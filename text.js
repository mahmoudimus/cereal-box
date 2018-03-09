exports.encodeText = string => new Uint8Array(
  new Uint16Array(Array.prototype.map.call(string, (_, idx) => string.charCodeAt(idx))).buffer
);

var returnSingle = function (input) {
    if (input.length === 1) {
        return input[0];
    }
    return input;
}

var getUint8Part = function (buffer, byteOffset, length, bytesPerInteger) {
    var srcU8 = new Uint8Array(buffer, byteOffset, length * bytesPerInteger);
    var dstU8 = new Uint8Array(length * bytesPerInteger);
    dstU8.set(srcU8);
    return dstU8.buffer;
}

// The last argument for the Uint16Array constructor is not the byte-length to use as the new range,
// but the intended length of the u16 array.  Because each element in a u16 array consumes two bytes,
// the byte-length must be divided by two.
exports.decodeText = u8 => {
    console.log('executing this code');
    var dstU8buffer = getUint8Part(u8.buffer, u8.byteOffset, u8.byteLength, 2);
    return String.fromCharCode(...(new Uint16Array(dstU8buffer, 0, dstU8buffer.byteLength)));
};

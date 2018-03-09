const TE = require('text-encoding');

exports.encodeText = string => new Uint8Array(
  new Uint16Array(Array.prototype.map.call(string, (_, idx) => string.charCodeAt(idx))).buffer
);

// The last argument for the Uint16Array constructor is not the byte-length to use as the new range,
// but the intended length of the u16 array.  Because each element in a u16 array consumes two bytes,
// the byte-length must be divided by two.
exports.decodeText = u8 => {
  let st;
  try {
    st = String.fromCharCode(...(new Uint16Array(u8.buffer,
                                                 u8.byteOffset,
                                                 u8.byteLength / 2)));
  }catch(exc) {
    st = new TE.TextDecoder("utf-8").decode(u8);
  }
  return st;
};

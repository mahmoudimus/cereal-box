exports.encodeInt = int => {
  const u32 = new Uint32Array(1);
  u32[0] = int;
  return new Uint8Array(u32.buffer);
};

exports.decodeInt = u8 => {
  let u32;
  if ((u8.byteOffset % Uint32Array.BYTES_PER_ELEMENT) !== 0) {
    u32 = new Uint32Array(u8.buffer.slice(
      u8.byteOffset,
      u8.byteOffset + Uint32Array.BYTES_PER_ELEMENT
    ));
  } else {
    u32 = new Uint32Array(u8.buffer, u8.byteOffset, 1);
  }
  return u32[0];
};

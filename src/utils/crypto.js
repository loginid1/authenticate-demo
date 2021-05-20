export const base64ToBuffer = (data) => {
  data = data.replace(/-/g, "+").replace(/_/g, "/");
  const binary = a2b(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
};

export const a2b = (a) => {
  let b,
    c,
    d,
    e = {},
    f = 0,
    g = 0,
    h = "",
    i = String.fromCharCode,
    j = a.length;
  for (b = 0; 64 > b; b++) {
    e[
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
        b
      )
    ] = b;
  }
  for (c = 0; j > c; c++) {
    for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) {
      ((d = 255 & (f >>> (g -= 8))) || j - 2 > c) && (h += i(d));
    }
  }
  return h;
};

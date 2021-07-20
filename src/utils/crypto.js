/* eslint-disable */
import { KJUR } from "jsrsasign"

export const base64EncodeUrl = (str) => {
    return str
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

const b2a = (a) => {
    let c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
    if (!a) return a;
    do {
      let c = a.charCodeAt(k++),
            d = a.charCodeAt(k++),
            e = a.charCodeAt(k++),
            j = c << 16 | d << 8 | e,
            f = 63 & j >> 18,
            g = 63 & j >> 12,
            h = 63 & j >> 6,
            i = 63 & j;
            n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i);
    } while (k < a.length);

    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
}

const a2b = (a) => {
    let b, c, d, e = {} , f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
    for (b = 0; 64 > b; b++) {
        e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    }
    for (c = 0; j > c; c++) {
        for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;) {
            ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
        }
    }
    return h;
}

export const bufferToBase64 = (data) => {
    let binary = "";
    const bytes = new Uint8Array(data);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    const base64 = b2a(binary);
    return base64EncodeUrl(base64);
}

export const base64ToBuffer = (data) => {
    data = data.replace(/-/g, "+").replace(/_/g, "/");
    const binary = a2b(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}

export const parseJWT = (token) => {
	const { headerObj: header, payloadObj: payload } = KJUR.jws.JWS.parse(token)
	return { header, payload }
}

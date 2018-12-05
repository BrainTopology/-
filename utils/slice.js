module.exports = function(r, n, e) {
    var t = null == r ? 0 : r.length;
    if (!t) return [];
    n = null == n ? 0 : n, e = void 0 === e ? t : e, n < 0 && (n = -n > t ? 0 : t + n), 
    (e = e > t ? t : e) < 0 && (e += t), t = n > e ? 0 : e - n >>> 0, n >>>= 0;
    for (var u = -1, l = new Array(t); ++u < t; ) l[u] = r[u + n];
    return l;
};
module.exports = function(f) {
    return .299 * f.r + .587 * f.g + .114 * f.b > 149 ? "#000000" : "#ffffff";
};
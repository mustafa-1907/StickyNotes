/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(char) {
    let prefix = char[0];

    for (let i = 1; i < char.length; i++) {
        while (!char[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
        }
    }

    return prefix;
};
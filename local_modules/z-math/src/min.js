const DEFAULT_CMP = (a, b) => (a - b);

/**
 * @param {Array(A)} list - list/array to search extremum for
 * @param {(A, A) -> number} cmp - comparator function
 * @return {number} minimal item index
 */
export function min(list, cmp = DEFAULT_CMP) {
    if (!list || !list.length) {
        return null;
    }
    if (list.length === 1) {
        return list[0];
    }
    return list.reduce(
        (extreme, item, i) => (cmp(list[extreme], item) <= 0 ? extreme : i),
        0
    );
}

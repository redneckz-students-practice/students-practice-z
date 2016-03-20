import {sigma} from 'z-math';

/**
 * @param k - hardness coefficient
 * @param offset - box offset
 * @param size - box size
 */
export function emptyBoxForce({
    k = 1000,
    offset,
    size
} = {}) {
    const lower = offset;
    const upper = offset.add(size);
    return ({position}) => {
        const dLow = lower.sub(position).map(sigma);
        const dUp = upper.sub(position).map(sigma.neg);
        const dr = dLow.add(dUp);
        return dr.dot(k);
    };
}

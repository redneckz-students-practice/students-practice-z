import {sigma, min} from 'z-math';

/**
 * @param k - hardness coefficient
 * @param offset - brick offset
 * @param size - brick size
 */
export function brickForce({
    k = 1000,
    offset,
    size
} = {}) {
    const lower = offset;
    const upper = offset.add(size);
    return ({position}) => {
        const dLow = lower.sub(position).map(sigma.neg);
        const dUp = upper.sub(position).map(sigma);
        const cond = dLow.abs().sub(dUp.abs())
            .map(sigma.neg);
        // Choose the closest to the point boundary
        const dr = cond.ifelse(dLow, dUp);
        // The only boudary should be "active"
        const ei = min(dr.abs().array);
        return dr.dot(dr.e(ei)).dot(k);
    };
}

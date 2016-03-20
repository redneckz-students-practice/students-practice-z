export function baseSpringForce({k = 10, len = 100}) {
    return (posA, posB) => {
        const dr = posB.sub(posA);
        return dr.dot(dr.length / len).sub(dr).dot(k);
    };
}

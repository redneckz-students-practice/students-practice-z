export function constantForce(a) {
    return ({point}) => a.dot(point.m);
}

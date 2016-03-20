import {inject} from 'z-dependency-injection';

/**
 * Maps window size to stage size
 * @return {{w: number, h: number}}
 */
export const stageSize = inject(
    () => ({
        w: window.innerWidth,
        h: window.innerHeight
    })
)();

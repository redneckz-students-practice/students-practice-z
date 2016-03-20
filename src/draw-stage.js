/**
 * TODO Read about MVC, MVVM, MV* patterns and compare to this architecture
 * TODO Implement alternative view based on HTML (absolutely positioned div-s)
 *      And control switching between views by means of this module
 */

import {inject} from 'z-dependency-injection';
import {draw} from 'z-canvas-primitives';
import {stageSize} from './stage-size-provider';
import {stageObjects} from './stage-objects-providers';
import {stageCanvasBasedView} from './stage-canvas-based-view';

/**
 * Stage canvas size is adjusted according to window size
 * @return {Canvas}
 */
const stageCanvas = inject(
    stageSize
)(
    ({w, h}) => {
        const canvas = document.querySelector('.stage');
        canvas.width = w;
        canvas.height = h;
        return canvas;
    }
);

/**
 * Maps points system state to canas primitives
 * @return {PointsSystemState -> CanvasPrimitive}
 */
const stageCanvasPrimitives = inject(
    () => ({
        stageSize: stageSize(),
        stageObjects: stageObjects()
    })
)(
    stageCanvasBasedView
);

/**
 * Provides function to draw points system state on canvas
 * @param {PointsSystemState} pointsSystemState
 * @return {Unit}
 */
export function drawStage(pointsSystemState) {
    // Imperative
    stageCanvas()::draw(
        stageCanvasPrimitives({pointsSystemState})
    );
}

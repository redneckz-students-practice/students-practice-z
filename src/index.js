import {pointsSystemStatesStream} from './points-system-states-stream';
import {drawStage} from './draw-stage';

pointsSystemStatesStream.forEach(drawStage);

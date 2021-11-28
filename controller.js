export function moveLeft(jetPosition, jetMoveDistance) {  
  return parseInt(jetPosition) - jetMoveDistance + 'px';
}

export function moveRight(jetPosition, jetMoveDistance) {
  return parseInt(jetPosition) + jetMoveDistance + 'px';
}
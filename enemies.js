export function renderEnemies(folder, files) {
  let enemies = new Array(files);

  for (let index = 0; index < files; index++) {
    enemies[index] = new Image();
    enemies[index].src = "imgs/" + folder + "/enemy_" + index + ".png";
  }
  
  return enemies;
}
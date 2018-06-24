'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_HEIGHT = 16;
var HEADER_HEIGHT = 3 * GAP + 2 * TEXT_HEIGHT;
var TIMES_HEIGHT = GAP + TEXT_HEIGHT;
var MAX_BARHEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr [0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomBlue = function () {
  var alpha = 0.1 + Math.random() * 0.9;
  return 'rgba(0, 0, 255, ' + alpha + ')';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 3,
      CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 3,
      CLOUD_Y + GAP * 2 + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);
  var barsAmount = players.length < times.length ?
    players.length : times.length;

  for (var i = 0; i < barsAmount; i++) {
    ctx.fillStyle = players[i] === 'Вы' ?
      'rgba(255, 0, 0, 1)' : getRandomBlue();

    var barHeight = MAX_BARHEIGHT * times[i] / maxTime;
    var xShift = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    ctx.fillRect(
        xShift,
        CLOUD_Y + HEADER_HEIGHT + TIMES_HEIGHT + MAX_BARHEIGHT - barHeight,
        BAR_WIDTH,
        barHeight
    );
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(
        Math.round(times[i]),
        xShift,
        CLOUD_Y + HEADER_HEIGHT + MAX_BARHEIGHT - barHeight
    );
    ctx.fillText(players[i], xShift, CLOUD_Y + CLOUD_HEIGHT - GAP * 2);
  }
};

'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandElement = function (arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
};

var getRandName = function () {
  return getRandElement(FIRST_NAME) + ' ' + getRandElement(SECOND_NAME);
};

var getRandomWizard = function () {
  var wizard = {
    name: getRandName(),
    coatColor: getRandElement(COAT_COLOR),
    eyesColor: getRandElement(EYES_COLOR)
  };
  return wizard;
};

var getWizards = function (amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    wizards[i] = getRandomWizard();
  }
  return wizards;
};

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = getWizards(4);
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

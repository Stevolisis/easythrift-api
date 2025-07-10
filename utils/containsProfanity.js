const Filter = require('bad-words');
const profanityFilter = new Filter();

// Profanity check for Konva design data
exports.containsProfanityInKonva = (konvaData) => {
  if (!konvaData || !konvaData.artboards) return false;

  for (const artboard of konvaData.artboards) {
    if (artboard.present?.shapes) {
      for (const shape of artboard.present.shapes) {
        if (shape.text && typeof shape.text === 'string' && profanityFilter.isProfane(shape.text)) {
          return true;
        }
      }
    }
  }
  return false;
};

// General text profanity check
exports.containsProfanity = (text) => {
  return text && profanityFilter.isProfane(text);
};
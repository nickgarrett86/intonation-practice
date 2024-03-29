const noteFromPitch = (frequency) => {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
};

const frequencyFromNoteNumber = (note) => {
  return 440 * Math.pow(2, (note - 69) / 12);
};

const centsOffFromPitch = (actualFrequency, wantedFrequency) => {
  return Math.floor(
    (1200 * Math.log(actualFrequency / wantedFrequency)) / Math.log(2)
  );
};

const centsOffFromNote = (frequency, note) =>
  centsOffFromPitch(frequency, frequencyFromNoteNumber(note));

const getDetunePercent = (detune) => {
  if (detune > 0) {
    return 50 + detune;
  } else {
    return 50 + detune;
  }
};

const getRandomIntInclusive = ([min, max]) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
  centsOffFromNote,
  frequencyFromNoteNumber,
  getRandomIntInclusive,
};

const boxen = require('boxen');

const mainMessage = "I am using my first external module!";
const roundMessage = "unicorns love rainbows";
const title = "Hurray!!!";


console.log(boxen(mainMessage, {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    borderStyle: 'classic',
    borderColor: 'blue',
    backgroundColor: 'black'
}));


console.log(boxen(mainMessage, {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    borderStyle: 'singleDouble',
    borderColor: 'yellow',
    backgroundColor: 'magenta'
}));


console.log(boxen(roundMessage, {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    backgroundColor: 'green'
}));
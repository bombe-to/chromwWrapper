const yargs = require('yargs');
const FileManager = require('./FileManager');
const Replacer = require('./Replacer');

const argv = yargs
    .option('path', {
      alias: 'p',
      describe: 'install target path',
      demandOption: true,
      type: 'string'
    })
   .option('name', {
     alias: 'n',
     describe: 'name der Anwendung',
     demandOption: true,
     type: 'string'
   })
  .option('os', {
    alias: 'o',
    describe: 'operating system',
    demandOption: true,
    type: 'string'
  })
    .option('site', {
      alias: 's',
      describe: 'website',
      demandOption: true,
      type: 'string'
    })
    .help()
    .argv;

class ConsoleApplication {
  constructor(option, param1, param2, param3) {
    this.option = option;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
  }

  run() {
    switch (this.option.toLowerCase()) {
      case 'linux':
        this.runLinux();
        break;
      case 'windows':
        this.runWindows();
        break;
      case 'android':
        this.runAndroid();
        break;
      default:
        console.log('Ungültige Option. Verwende "Linux", "Windows" oder "Android".');
    }
  }

  runLinux() {
    console.log(`Linux-Anwendung gestartet mit Parametern: ${this.param1}, ${this.param2}`);
  }

  runWindows() {
    console.log(`Windows-Anwendung gestartet mit Parametern: ${this.param1}, ${this.param2}`);

    var name="win.tar";

    //install chrome
    const fileManager = new FileManager();
    fileManager.verschiebeDateiQuellZiel("data/chrome/win", argv.path + "/" + argv.name + "/")
    fileManager.entpackeTarDatei(argv.path + "/" + argv.name + "/win/tar/" + name,  argv.path + "/" + argv.name + "/");

    fileManager.loescheVerzeichnisInhalt(argv.path + "/win/tar/");

    //replace Application Parameter
    const replacer = new Replacer();
    replacer.ersetzePlatzhalter(argv.path + + "/" + argv.name + '/win/start.bat', {appname: "argv.name"});


  }

  runAndroid() {
    console.log(`Android-Anwendung gestartet mit Parametern: ${this.param1}, ${this.param2}`);
  }
}

// Beispielverwendung der Klasse
const app = new ConsoleApplication(argv.os, argv.name, argv.path, argv.site);
app.run();
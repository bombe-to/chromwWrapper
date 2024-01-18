const yargs = require('yargs');
const fs = require('fs');
const FileManager = require('./FileManager');
const PlatzhalterErsetzer = require('./PlatzhalterErsetzer');

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

    const name = "win.tar";

    // Installiere Chrome
    const fileManager = new FileManager();

    fileManager.verschiebeDateiQuellZiel("data/chrome/win", `${argv.path}/${argv.name}/`);
    fileManager.entpackeTarDatei(`${argv.path}/${argv.name}/win/tar/${name}`, `${argv.path}/${argv.name}/`);

   
    // Beispielaufruf
const platzhalterErsetzer = new PlatzhalterErsetzer();
const dateiPfad = `${argv.path}/${argv.name}/win/start.bat`;
console.log("${argv.path}/${argv.name}/win/start.bat");
const platzhalterWerte = {
  'app-path': argv.path,
  'app-site': argv.site,
  'app-name': argv.name
};

platzhalterErsetzer.ersetzePlatzhalterInDatei(dateiPfad, platzhalterWerte);

    
  fileManager.loescheVerzeichnisInhalt("${argv.path}/${argv.name}/win/tar/");
  }

  runAndroid() {
    console.log(`Android-Anwendung gestartet mit Parametern: ${this.param1}, ${this.param2}`);
  }

}

// Beispielverwendung der Klasse
const app = new ConsoleApplication(argv.os, argv.name, argv.path, argv.site);
app.run();

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const tar = require('tar');

class FileManager {
  entpackeTarDatei(tarFilePath, extractTo) {
    fs.createReadStream(tarFilePath)
      .pipe(tar.x({
        C: extractTo,
      }))
      .on('finish', () => {
        console.log(`Die Tar-Datei wurde erfolgreich entpackt nach: ${extractTo}`);
      })
      .on('error', (error) => {
        console.error(`Fehler beim Entpacken der Tar-Datei: ${error.message}`);
      });
  }

  verschiebeDateiQuellZiel(quellpfad, zielverzeichnis, callback) {
    const zielPfad = path.join(zielverzeichnis, path.basename(quellpfad));

    if (!fs.existsSync(zielverzeichnis)) {
      fs.mkdirSync(zielverzeichnis, { recursive: true });
    }

     fsExtra.copySync(quellpfad, zielPfad);
  }

  loescheVerzeichnisInhalt(verzeichnis) {
    try {
      fs.rmdir(verzeichnis, { recursive: true }, console.log);
      return `Inhalt von ${verzeichnis} erfolgreich gelöscht.`;
    } catch (error) {
      throw new Error(`Fehler beim Löschen des Verzeichnisinhalts: ${error.message}`);
    }
  }
}

// Beispielaufruf
// const tarFilePath = 'pfad/zur/deiner/datei.tar';
// const extractTo = 'zielverzeichnis';
// FileManager.entpackeTarDatei(tarFilePath, extractTo);

module.exports = FileManager;
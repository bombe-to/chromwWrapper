const fs = require('fs');

class PlatzhalterErsetzer {
  constructor() {
    // Du könntest hier Konfigurationen oder Initialisierungen vornehmen, falls benötigt
  }

  ersetzePlatzhalterInDatei(dateiPfad, platzhalterWerte) {
    try {
      let dateiInhalt = fs.readFileSync(dateiPfad, 'utf8');

      // Iteriere über die Platzhalter und ersetze sie im Dateiinhalt
      for (const [platzhalter, ersetzung] of Object.entries(platzhalterWerte)) {
        const regex = new RegExp(`\\$\\{${platzhalter}\\}`, 'g');
        dateiInhalt = dateiInhalt.replace(regex, ersetzung);
      }

      // Schreibe den aktualisierten Inhalt zurück in die Datei
      fs.writeFileSync(dateiPfad, dateiInhalt, 'utf8');

      console.log(`Platzhalter in der Datei ${dateiPfad} erfolgreich ersetzt.`);
    } catch (error) {
      console.error(`Fehler beim Ersetzen der Platzhalter: ${error.message}`);
    }
  }
}


module.exports = PlatzhalterErsetzer;


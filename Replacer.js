const fs = require('fs');

class Replacer{
    constructor() {

    }

    ersetzePlatzhalter(dateiPfad, platzhalterObjekt) {
      try {
        // Lese den Inhalt der Datei
        let dateiInhalt = fs.readFileSync(dateiPfad, 'utf8');

        // Ersetze jeden Platzhalter durch seinen Wert im Objekt
        for (const platzhalter in platzhalterObjekt) {
          const regex = new RegExp(`{${platzhalter}}`, 'g');
          dateiInhalt = dateiInhalt.replace(regex, platzhalterObjekt[platzhalter]);
        }

        // Schreibe den modifizierten Inhalt zurück in die Datei
        fs.writeFileSync(dateiPfad, dateiInhalt, 'utf8');

        console.log(`Platzhalter in ${dateiPfad} erfolgreich ersetzt.`);
      } catch (error) {
        console.error(`Fehler beim Ersetzen der Platzhalter: ${error.message}`);
      }
    }
}

module.exports = Replacer;
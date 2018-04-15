'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');

const MAX_ROW = 30;
const MAX_COL = 30;

// /!\ Asynchrone...
class GSpreadSheet {
    
    constructor (req, resp) {
		this.doc = new GoogleSpreadsheet('1IX29gDAJI5aY0r3mNvWvCMOXf-Ok2RDUNg4aqrZktxo');
    }
    
	// Retourne la sheet n° sheetNumber du fichier
	getWorksheet(sheetNumber = 0, cb) {
		
		let cbToCall = (err, info) => {
			console.log('Loaded doc: '+info.title+' by '+info.author.email);
			cb(info.worksheets[sheetNumber]);
		};
		
		this.doc.getInfo(cbToCall);
	}
	
	// Cherche une colonne dans le tableau excel
	findColumn(columnName, cb) {
				
		// Callback de l'appel à getCells
		let cbGetCells = (err, cells) => {
			let colList = this._extractColumnFromCells(columnName, cells);
			// Return la liste de colonne dans le callBack...
			cb(colList);
		};
		
		// Callback de l'appel à this.getWorksheet
		let cbGetWorksheet = sheet => {
			let options = {	'min-row': 1,
							'max-row': Math.min(MAX_ROW,sheet.rowCount),
							'min-col' : 1,
							'max-col' : Math.min(MAX_COL,sheet.colCount),
							'return-empty': true
						  };
			sheet.getCells(options, cbGetCells);
			console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);			
		}
		
		let sheet = this.getWorksheet(0, cbGetWorksheet);
		
	}
	
	// Fonction privée dégeulasse pour transformer la liste de cellule sous la forme [C1, C2, C3, C4] en
	// |C1 | C2|
	// |C3 | c4|
	// puis extraire de la première ligne (C1, C2), la colonne qui contient la valeur "columnName"
	// puis former une nouvelle liste avec les valeurs de la colonne
	_extractColumnFromCells(columnName, cells) {
		// Transformation de cette liste en liste de liste pour représenter un tableau 2D...
		let tab2d = [];
		cells.forEach(cell => {
			if(cell.col - 1 === 0){
				tab2d[cell.row-1] = []
			}
			tab2d[cell.row-1].push(cell)
		});
		
		// On identifie dans les "en-têtes" (première ligne), laquelle porte le nom de la liste voulue
		let colIndex = tab2d[0].findIndex(cell => cell.value == columnName);
		
		// Et on construit la liste avec la colonne trouvée
		let colList = [];			
		tab2d.forEach((row) => {
			colList.push(row[colIndex]);
		});
		
		return colList;			
	}
	
	
}

module.exports = {
	GSpreadSheet: GSpreadSheet
};
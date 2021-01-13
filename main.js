function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}


function inputSheet(array_ss) {
  
  try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
      const lastrow = sheet.getLastRow();
      const lastColumn = sheet.getLastColumn();
      sheet.getRange(lastrow + 1, 1, 1, lastColumn).setValues(array_ss);
      } catch(e) {
          throw new Error('サーバエラーが発生しました');
  }
  
}


function deleteSheet(index) {
  
  try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
      sheet.deleteRows(index + 2, 1);
      } catch(e) {
          throw new Error('サーバエラーが発生しました');
  }

}


function changeState(index_Changestate) {
  
  try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
      let range   = sheet.getRange(index_Changestate + 2, 3).getValue();
      const lastColumn = sheet.getLastColumn();
      if (range === 0) {
          sheet.getRange(index_Changestate + 2, lastColumn).setValue(1)
          } else {
              sheet.getRange(index_Changestate + 2, lastColumn).setValue(0)
      }
      } catch(e) {
          throw new Error('サーバエラーが発生しました');    
  }

}



function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}


// 確認のため
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
    const range = sheet.getRange(index_Changestate + 2, 3).getValue();
    const lastColumn = sheet.getLastColumn();
    const sheet_setRange = sheet.getRange(index_Changestate + 2, lastColumn)
    if (range === 0) {
      sheet_setRange.setValue(1)
      } else {
        sheet_setRange.setValue(0)
      }
  } catch(e) {
    throw new Error('サーバエラーが発生しました');    
  }

}


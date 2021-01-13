function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function inputSheet(todosT) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
  let lastrow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  sheet.getRange(lastrow + 1, 1, 1, lastColumn).setValues(todosT);
}

function deleteSheet(index) {
 const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
 sheet.deleteRows(index + 2, 1);
}

function changeState(indexC) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('todoData');
  let range   = sheet.getRange(indexC + 2, 3).getValue();
  let lastColumn = sheet.getLastColumn();
  if (range === 0) {
    sheet.getRange(indexC + 2, lastColumn).setValue(1)
    } else {
      sheet.getRange(indexC + 2, lastColumn).setValue(0)
    }
}



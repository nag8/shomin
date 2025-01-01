function getSheetData(sheetConfig) {
  let data = getSheetDataFull(sheetConfig);
  [...Array(sheetConfig.row.data - 1)].forEach(_ => data.shift());
  return data;
}

function getSheetDataFull(sheetConfig) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  return sheet.getDataRange().getValues();
}

function setText(sheetConfig, row, column, text) {
  setList(sheetConfig, row, column, [[text]]);
}

function setList(sheetConfig, row, column, list) {
  if(!list.length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  sheet.getRange(row, column, list.length, list[0].length).setValues(list);
}

function addList(sheetConfig, column, list) {
  if(!list.length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  sheet.insertRows(sheetConfig.row.data, list.length);
  sheet.getRange(sheetConfig.row.data, column, list.length, list[0].length).setValues(list);
}

function refreshSheet(sheetName, outList, startColumn, startRow) {

  if (!outList[0].length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);

  startRow = startRow ? startRow : 2;
  startColumn = startColumn ? startColumn : 1;
  sheet.getRange(startRow, startColumn, sheet.getLastRow(), outList[0].length).clear();
  sheet.getRange(startRow, startColumn, outList.length, outList[0].length).setValues(outList);
}
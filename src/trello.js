// 
// trelloの情報をgoogleSpreadSheetに書き込むサンプル
//   ここでは ボードメンバーの名前とuserId, 指定したlistIDからカード名を書き込む
//
// author: tk-aria
//
// Help:
//   step1: apikeyとtokenの取得
//     以下ページを参考に「apikey」と「token」をメモしておく
//     (https://qiita.com/isseium/items/8eebac5b79ff6ed1a180)
//
//   step2: useridも確認する
//     useridとはユーザ名 trelloのメンバーを確認した時に @hogehoge と書かれているほうが「userid」
//
//   step3: trelloの「ボードId」, 取得したい「リストID」を調べる
//     下記関数を使うか,trello上のurlから調べる
//
//   step4: spreadsheetidの取得
//     スプレッドシートのURLの「https://docs.google.com/spreadsheets/d/」の後から「/」までの部分がシートのID
//     ex) https://docs.google.com/spreadsheets/d/xxxxxxxxxxxx/edit#gid=0 
//       　上のURLで例えると xxxxxxxxxxxx の部分
//
//   step5: googleAppsScriptから「test」関数を実行する
//     -> 終わり
//
//   ※注意点: test関数内でシート名を指定しているのでここは自分が使いたいシート名に変更する.
//  
//   参考:
//     SpreadSheetAPI: (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet)
//

const USER_ID = 'ariatk';
const API_KEY = '${API_KEY}';
const SERVER_TOKEN = '${SERVER_TOKEN}';
const SHEET_ID = '${SHEET_ID}';

function fetchUrlHelper(url) {
  
    var res = UrlFetchApp.fetch(url);
    var json = Utilities.jsonParse(res.getContentText());
    Logger.log(json);
    return json;
}

function getBoards() {
  
    return fetchUrlHelper(`https://trello.com/1/members/${USER_ID}/boards?key=${API_KEY}&token=${SERVER_TOKEN}&fields=name`);
}

function getBoardLists(boradID) {
      
    return fetchUrlHelper(`https://trello.com/1/boards/${boradID}/lists?key=${API_KEY}&token=${SERVER_TOKEN}&fields=name`);
}


function getListCards(listId) {

    return fetchUrlHelper(`https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${SERVER_TOKEN}&fields=name`);
}


function getboardMembers(boardId) {
  
    return fetchUrlHelper(`https://api.trello.com/1/boards/${boardId}/members?key=${API_KEY}&token=${SERVER_TOKEN}`);
}

function test() {
  
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('シート1');
    const boardId = '${BOARD_ID}';
    const listId = '${LIST_ID}';
  
    var cards = getListCards(listId);
    for(var index = 0; index < cards.length; index++){
        console.log(cards[index].name);
        sheet.appendRow([sheet.getLastRow(), cards[index].name ]);
    }
    sheet.appendRow([sheet.getLastRow()]);
  
    var members = getboardMembers(boardId);
    for(var index = 0; index < members.length; index++){
        console.log(`${members[index].username} / ${members[index].fullName}`);
        sheet.appendRow([sheet.getLastRow(), members[index].username, members[index].fullName ]);
    }
}


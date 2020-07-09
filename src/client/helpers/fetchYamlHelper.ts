export const composeFile = () => {

  const Url = "http://localhost:3001/docker/";

  const body = {
    projectName: `${activeProject}`,
  };
  //optional parameters
  const otheParam = {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
    method: "POST",
  };

  fetch(Url, otheParam)
    .then((data) => {
      setShowComposeModal(true)
      return data.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
};


//========================================================
// OPTION 1: USING NATIVE HTML FILE PICKER
// add file picker 
//accept yaml file
import React from 'react';
const filePicker: React.FC = () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    //to get access to the file that get selected inside the 'input'
    const file = document.querySelector('input').files[0];
  })

  return (
    <form>
    <div>
    <label>Open file < /label>
      < input type = "file" accept = "" />
        </div>
        < button type = "submit" > Get Info < /button>
          < /form>
  )
}

// OPTION 2: USING SHELL MODULE ========================
//You can open a file or folder through shell commands from the electron module. The commands work on both main and renderer process.
const { shell } = require('electron')

shell.openItem('filepath');
shell.openItem('folderpath');
shell.openItemInFolder('fullPath');

const openItem = (path) => {
  shell.openItem('filepath');
}

// OPTION 3: USING DIALOG MODULE =====================
//Note: The dialog.showOpenDialog() does not open a file or directory itself for reading its content. Instead it displays a dialog box that enable us to select files or directories and returns their absolute paths. We pass these returned paths to Node's fs's methods for reading their content.
//For display native system dialogs for opening and saving files, alerting, etc. you can use dialog module from electron package.
import { dialog } from 'electron';
import fs from 'fs';

// var filePath = __dirname;
// console.log(dialog.showOpenDialog)({
//   properties: ['openFile'],
//   filters: [
//     { name: 'Log', extentions: ['csv', 'log'] }
//   ]
// });

//open file
// ******* need to access to variable mainWindow from index.ts
const openFile = async () => {
  //open file dialog looking for yaml file
  const files = await dialog.showOpenDialog(mainWindow, {
    //filters
    fitters: [
      { name: 'Docker File', extensions: ['yml'] }
    ]
  })

  //if no files
  if (!files) return;

  const file = files[0];
  //store content of file that being picked
  const fileContent = fs.readFileSync(file).toString();
}


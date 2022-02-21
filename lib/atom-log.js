'use babel';

import { CompositeDisposable } from 'atom';

var atomLog  = {

    moment: null,

    activate(state) {
        this.moment = require('moment')
        this.moment.locale('ru');

        atom.workspace.observeTextEditors(this.observeTextEditor);

        this.subscriptions = new CompositeDisposable()
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-log:insert': () => this.insert(),
            'atom-log:insert-date': () => this.insertDate(),
            'atom-log:calculate-time-diff': () => this.calculateTimeDiff()
        }));
    },

    observeTextEditor: function(editor) {
       editor.onDidChangeSelectionRange(() => {
         atomLog.calculateTimeDiff()
       });
     },

    deactivate() {
        this.subscriptions.dispose();
    },

    insert() {
        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {
            let time = this.moment().format("HH:mm:ss")
            editor.insertText(time);
        }
    },

    insertDate() {
        const editor = atom.workspace.getActiveTextEditor()
        if (editor) {
            //  .format("D MMMM Y[.txt]") можно будет использовать для формата файла
            let time = this.moment().format("D MMMM Y года (dddd)")
            editor.insertText(time);
        }
    },
    
    calculateTimeDiff(){
      
      const editor = atom.workspace.getActiveTextEditor()
      if (editor) {

          // получаем выделенный текст
          selection = editor.getLastSelection();
          
          // ищем регуляркой все времена
          arrayOfTimes = selection.getText().match(/\d{2}:\d{2}:\d{2}/gm);

          // если не нашли двух дат то выходим
          if (arrayOfTimes === null || arrayOfTimes.length < 2){
            this.showInBottomPanel('')
            return
          }

          // получаем верхние и нижние время (строки)
          firstTime = arrayOfTimes[0] 
          lastTime = arrayOfTimes[arrayOfTimes.length - 1]          
          
          // конвертируем в момент
          begin = this.moment(firstTime,"HH:mm:ss")
          end = this.moment(lastTime,"HH:mm:ss")
          
          // разница в милисикундах 
          diff = end.diff(begin); 
          
          time =  this.moment.utc(diff).format("HH[h] mm[m] ss[s]");
          
          this.showInBottomPanel(time)
      }
      
    },
    
    // показать текст в нижней панели
    showInBottomPanel(text){
      let element = document.querySelector('atom-panel>status-bar>.flexbox-repaint-hack>.status-bar-left>status-bar-time-diff')
      if (element === null){
        element = document.createElement('status-bar-time-diff');
        let panel = document.querySelector('atom-panel>status-bar>.flexbox-repaint-hack>.status-bar-left');
        panel.appendChild(element)
      }
      
      element.textContent = text
    }
    
};


export default atomLog

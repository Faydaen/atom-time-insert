'use babel';

import { CompositeDisposable } from 'atom';

export default {

    moment: null,

    activate(state) {
        this.moment = require('moment')
        this.moment.locale('ru');


        this.subscriptions = new CompositeDisposable()
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-log:insert': () => this.insert(),
            'atom-log:insert-date': () => this.insertDate(),
            'atom-log:calculate-time-diff': () => this.calculateTimeDiff()
        }));
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
            let time = this.moment().format("D MMMM Y года (dddd) [d]")
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
          
          alert(time)
          
      }
      
      
      
    }
    
};

module.exports = {
    // включить плагин
    activate: function() {
        atom.commands.add('atom-workspace', {
          'insTime':this.insert,
          'insDate':this.insertDate,

          'insCheckMark':this.insertCheckMark,
          'insPoint':this.insertPoint,
          'insStartPeriud':this.insertStartPeriud,
          'insFinshPeriud':this.insertFinshPeriud,
          'insBorderPeriud':this.insertBorderPeriud,
          'insCheckTilda':this.insertCheckTilda,
        });
    },

    insert: function() {
      var editor = atom.workspace.getActivePaneItem();
      var date = new Date();

      var LeadingZeroHours = (date.getHours()<10?'0':'') + date.getHours();
      var LeadingZeroMinutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      var LeadingZeroSeconds = (date.getSeconds()<10?'0':'') + date.getSeconds();

      var time = LeadingZeroHours+':'+LeadingZeroMinutes+':'+LeadingZeroSeconds;
      editor.insertText(time);


    },
    insertCheckMark: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('✔');
    },
    insertPoint: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('■');
    },
    insertStartPeriud: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('◧');
    },
    insertFinshPeriud: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('◨');
    },
    insertBorderPeriud: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('◫');
    },
    insertCheckTilda: function(){
        var editor = atom.workspace.getActivePaneItem();
        editor.insertText('~');
    },
    insertDate: function(){
      var editor = atom.workspace.getActivePaneItem();
      var date = new Date();

      var day = date.getDate();
      var ruMounth = [
        'января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'
      ];
      var dayOfWeekDictionary = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
      
      var dayOfWeek = dayOfWeekDictionary[date.getDay()];
      
      
      var month = ruMounth[date.getMonth()];
      var year = date.getFullYear();

      var time = ''+day+' '+month+' '+year+' года (' + dayOfWeek + ')';
      editor.insertText(time);      
    }

}

module.exports = {
    // включить плагин
    activate: function() {
        atom.commands.add('atom-workspace', {
          'insTime':this.insert,
          'insDate':this.insertDate
        });
        alert("Включенно");
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

    insertDate: function(){
      var editor = atom.workspace.getActivePaneItem();
      var date = new Date();

      var day = date.getDate();
      var ruMounth = [
        'января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'
      ];
      var month = ruMounth[date.getMonth()];
      var year = date.getFullYear();

      var time = ''+day+' '+month+' '+year+' года';
      editor.insertText(time);      
    }

}

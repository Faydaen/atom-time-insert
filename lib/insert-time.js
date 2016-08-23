module.exports = {
    // включить плагин
    activate: function() {
        atom.commands.add('atom-workspace', {
          'insTime':this.insert
        });
        alert("Включенно");
    },

    insert: function() {
      var editor = atom.workspace.getActivePaneItem();
      var date = new Date();

      var LeadingZeroMinutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      var LeadingZeroSeconds = (date.getSeconds()<10?'0':'') + date.getSeconds();

      var time = date.getHours()+':'+LeadingZeroMinutes+':'+LeadingZeroSeconds;
      editor.insertText(time);
      // editor.insertText("Heil Hitler");
    }


}

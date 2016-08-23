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
      var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      editor.insertText(time);
      // editor.insertText("Heil Hitler");
    }


}

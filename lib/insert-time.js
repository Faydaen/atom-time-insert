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

      var LeadingZeroHours = (date.getHours()<10?'0':'') + date.getHours();
      var LeadingZeroMinutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      var LeadingZeroSeconds = (date.getSeconds()<10?'0':'') + date.getSeconds();

      var time = LeadingZeroHours+':'+LeadingZeroMinutes+':'+LeadingZeroSeconds;
      editor.insertText(time);

      // setTimeout(100,function(){
      //   var editor = atom.workspace.getActivePaneItem();
      //   var selection = editor.getLastSelection();
      //   editor.insertText(curText);
      // });

      // editor.insertText(curText);

      // var sss = selection.getText();
      // var sss = selection.getText();
      // var sss =  selection.getBufferRange();
      // var sss =  selection.getBufferRange();
      // var sss = editor.getSelecte23:56:55();
      // alert("1"+sss+"1");

      // editor.insertText("Heil Hitle23:56:23:57:59
    }


}

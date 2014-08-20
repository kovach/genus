var init = function() {
  editor = ace.edit("editor");

  //editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setTabSize(2);
  document.getElementById('editor').style.fontSize='20px';

  editor.setTheme("ace/theme/solarized_dark");
  editor.setKeyboardHandler("ace/keyboard/vim");

  editor.commands.addCommand({
    name: 'forward-chain',
    bindKey: {win: 'Ctrl-Space',  mac: 'Command-Space'},
    exec: function(editor) {
      console.log('forward-chain');
    }
  });

  editor.commands.addCommand({
    name: 'execute',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
    exec: function(editor) {
      console.log('execute');
    }
  });

  editor.getSession().on('change', function(e) {
    console.log(e);
  });
}

module.exports = {
  init: init,
}

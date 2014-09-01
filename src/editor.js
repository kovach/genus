// Global (to module) editor reference
var editor = ace.edit("editor");
var session = editor.getSession();
var env = require('./env');

var s = {
  env: env.empty,
};
var nothing = {tag: 'nothing'};
var mk_term = function(tag, name, val) {
  return {
    tag: tag,
    name: name,
    val: val,
  }
}
var eq_tag = function(name, val) {
  return mk_term('=', name, val);
}
var type_tag = function(name, val) {
  return mk_term(':', name, val);
}

var get_line = function() {
  var pos = editor.getCursorPosition();
  return session.doc.getLine(pos.row);
}
var move_next = function() {
  var pos = editor.getCursorPosition();
  editor.moveCursorTo(pos.row+1, pos.column);
}
var move_prev = function() {
  var pos = editor.getCursorPosition();
  editor.moveCursorTo(pos.row-1, pos.column);
}
var parse_tokens = function(str) {
  var tokens = str.trim().split(' ');
  // TODO look up in env?
  return tokens;
}
var parse_line = function(env, tokens) {
  console.log('parse_line. tokens: ', tokens);
  if (tokens.length === 0) {
    console.log('empty tokens');
    return nothing;
  }
  switch (tokens[0]) {
    case '=':
      if (tokens.length === 1) {
        console.log('= no tokens');
        return nothing;
      }
      var name = tokens[1];
      return parse_def(env, name, tokens.slice(2));
    case ':':
      if (tokens.length === 1) {
        console.log(': no tokens');
        return nothing;
      }
      var name = tokens[1];
      return parse_type(env, name, tokens.slice(2));
    default:
      console.log('DEFAULT');
  }
}
var parse_def = function(env, name, tokens) {
  var type = null;
  return parse_expr(env, '=', type, tokens);
}
var parse_type = function(env, name, tokens) {
  var type = null;
  return parse_expr(env, ':', type, tokens);
}
var parse_expr = function(env, tag, type, tokens) {
  if (tokens.length === 0) {
    // make a var
  } else {
    // TODO
    return mk_term(tag, name, tokens[0]);
  }
}
// TODO ??? 
var parse_something = function() {
  // This belongs inside a different routine
  var type = null; // context (type?) for current line
  var x1 = parse_line(s.env, type, tokens); // {tree, unused_tokens}
  var new_vars = null; // ???
  var env2 = null; // update environment
  var new_lines = null; // rewrite lines {row, new_text}
}

// Special commands
//  - execute line
//  - goto def
//  - ???

var command_read_line = function() {
  var line_text = get_line();
  var tokens = parse_tokens(line_text);
  var line = parse_line(env, tokens);
  console.log(line);
}

// Bind commands
var add_commands = function() {
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
      command_read_line();
    }
  });

  editor.commands.addCommand({
    name: 'escape',
    bindKey: {win: 'escape',  mac: 'escape'},
    exec: function(editor) {
      console.log('escape');
    }
  });
  editor.commands.addCommand({
    name: 'ctrl-p',
    bindKey: {win: 'Ctrl-p',  mac: 'Command-p'},
    exec: function(editor) {
      move_prev();
    }
  });
  editor.commands.addCommand({
    name: 'ctrl-n',
    bindKey: {win: 'tab',  mac: 'tab'},
    exec: function(editor) {
      move_next();
    }
  });
  editor.commands.addCommand({
    name: 'space',
    bindKey: {win: 'space',  mac: 'space'},
    exec: function(editor) {
      console.log('space');
      editor.insert(' ');
    }
  });
}

//TODO delete
//var user_change = true;
//textHandler = function(e) {
//  console.log(e);
//  if (e.data.action === "insertText") {
//    if (user_change) {
//      user_change = false;
//      editor.remove("left");
//      editor.insert(e.data.text.toLowerCase());
//      user_change = true;
//    }
//  } else {
//    console.log(e.data.action);
//  }
//}

var init = function() {

  //editor.getSession().setMode("ace/mode/javascript");
  session.setTabSize(2);
  document.getElementById('editor').style.fontSize='20px';

  editor.setTheme("ace/theme/solarized_dark");
  //editor.setKeyboardHandler("ace/keyboard/vim");

  add_commands();

  session.doc.setValue(': x num\n= x 22');

  //editor.getSession().on('change', textHandler);

  return editor;
}

module.exports = {
  init: init,
}

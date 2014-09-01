// type = {before: [type], after: [type], to: type}
//      | monad name
//
//// (tape)   [have] [need]               notes
// = x 22     []     []
// = : [ | name monad] -- def
// =| x 22   [def] [name monad]
// ' ' : [def | ] -- beginning            have to use top of have stack to disambiguate (see below)
// = |x 22 [beginning def] [name monad]
// (char) : [beginning |] -- _name
// = x| 22 [_name def] [name monad]
// ' ' : [_name | ] -- name beginning
// --> match [name] <--
// = x |22 [beginning def] [monad]
// (char) : [beginning |] --                 have to use top of need stack to disambiguate too
//
//
// are names just monads? need to add type to monad 'after' parse?
//  - parser that reads empty string (but matches on part of the stack)?
//
// parsers should be able to match
//  - input string
//  - stacks
//
//
// ' '    : [token|] -- monad beginning
// ' '    : [beginning|] -- beginning
// (char) : [beginning|] -- token
// (char) : [token|] -- token
// '='    : [|monad monad] -- monad
//
//
// FLAT PARSING
//
// atom = ([input-event-predicate], [stack-programs])
//   - second term is disjunction
//
// parser must compose atoms
//
// (START) : needs to match on totality of stack (empty stack)

var _ = require('mori');

var id_l = function(type) {
  return {l: [type], r:[], to: [type]};
}
var id_r = function(type) {
  return {l: [], r:[type], to: [type]};
}
var sp_t = {l: ['token'], r: [], to: ['monad', 'begin']};
var sp_b = id_l('begin');
var ch_t = id_l('token');
var ch_b = {l: ['begin'], r: [], to: ['token']};
var def  = {l: [], r: ['monad', 'monad'], to: ['monad']};

var is_ws = function(state) {
  var ch = state.str[0];
  return ch === ' ' || ch === '\n';
}
var is_ch = function(state) {
  var ch = state.str[0];
  return true;
}
var is_def = function(state) {
  var ch = state.str[0];
  return ch === '=';
}
var mk_p = function(obj, fn) {
  return {
    obj: {
      l: 
}
var parsers = [
  [def, is_def],
  [sp_t, is_ws],
  [sp_b, is_ws],
  [ch_t, is_ch],
  [ch_b, is_ch],
];

var match_prefix = function(pre, list) {
  return _.equals(_.take(_.count(pre), list), pre);
}

var run_parse = function(str, n) {
  var state = {
    str: str,
    have: _.list(),
    need: _.list(),
  };
  
  //while (state.str.length > 0) {
  while (n > 0) {
    n--;
    state = parse_step(state);
  }
  return print_state(state);
}
var print_state = function(state) {
  return null;
}
var parse_step = function(state) {
  var next = state.str[0];
  // 1. match the character
  var matches = _.filter(function(parser) {
    var ok = parser[1](state)
      && match_prefix(parser[0]
  }, parsers);
  // 2. match 
  pl(matches);
}

var pl = function(l) {
  console.log(_.into_array(l));
}


module.exports = {
  parse_step: parse_step,
  run_parse: run_parse,
  // todelete
  parsers: parsers,
}

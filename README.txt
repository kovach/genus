- dr is a simple environment for program synthesis
  - dr implements a simple type-directed synthesis system. Program scripts
    consist of nested bindings and type specifications. Programs are
    incrementally compiled into a lambda calculus with pattern matching; this
    language is then easily translated into Javascript.
  - Incomplete programs have explicit "holes", and the browser-based editor
    uses type information to help the user fill them in.
  - Programs can use explicit Javascript when needed.

- dr is a semi-structured editor
  - The "end result" of a dr program is regular Javascript code.  This code
    isn't directly editable. The dr script editor has some structured editing
    features, but a program is composed of ordinary text.  There are both
    structured and unstructured modes, so the special editing features can be
    disabled at any time.
  - There is very little syntax, and thus there are very few opportunities for
    syntax errors. These are simple enough that they can be automatically
    fixed.

- dr uses the Ace Javascript code editor.
  - It supports various key-binding modes and has a good API.

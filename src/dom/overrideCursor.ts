/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
import Disposable = require('../core/Disposable');
import IDisposable = require('../core/IDisposable');

export = overrideCursor;


/**
 * The class name added to the document body on cursor override.
 */
var CURSOR_CLASS = 'p-mod-cursor-override';


/**
 * The current disposable which owns the override.
 */
var current: IDisposable = null;


/**
 * Override the cursor for the entire document.
 *
 * Returns an IDisposable which will clear the override.
 */
function overrideCursor(cursor: string): IDisposable {
  if (current) current.dispose();
  var body = document.body;
  body.style.cursor = cursor;
  body.classList.add(CURSOR_CLASS);
  return current = new Disposable(clearOverride);
}


/**
 * Clear the cursor override.
 */
function clearOverride(): void {
  current = null;
  var body = document.body;
  body.style.cursor = '';
  body.classList.remove(CURSOR_CLASS);
}
import { Record as record } from 'immutable';
import BlockMap from './BlockMap';
import TreeMap from './TreeMap';
import SelectionState from './SelectionState';

const persistent = {
  treeMap: null,
  blockMap: null,
  selection: null
};

const StateRecord = record(persistent);

/**
 * The state for the whole editor.
 */
export default class EditorState {
  constructor (immutable) {
    if (!immutable || !(immutable instanceof StateRecord)) {
      throw new Error('EditorState requires an `StateRecord` instance');
    }
    this._immutable = immutable;
  }

  /**
   * Get the immutable object
   */
  getImmutable () {
    return this._immutable;
  }

  /**
   * @see {@link http://facebook.github.io/immutable-js}
   */
  toJS () {
    return this._immutable.toJS();
  }

  /**
   * @see {@link http://facebook.github.io/immutable-js}
   */
  toJSON () {
    return this._immutable.toJSON();
  }

  /**
   * Get blockMap from immutable
   */
  getBlockMap () {
    return this.getImmutable().get('blockMap');
  }

  /**
   * Get treeMap from immutable
   */
  getTreeMap () {
    return this.getImmutable().get('treeMap');
  }

  /**
   * from the treeMap, get a tree by a key.
   * @param {string} key
   */
  getBlockTreeForKey (key) {
    return this.getTreeMap().get(key);
  }

  /**
   * from the entityMap, get a entity by a key.
   * @param {string} key
   */
  getEntityForKey (key) {
    return this.getEntityMap().get(key);
  }

  /**
   * Get selection from the immutable
   */
  getSelection () {
    return this.getImmutable().get('selection');
  }

  /**
   * Accept a selection
   * @param {EditorState} editorState 
   * @param {SelectionState} selection
   * @return {EditorState}
   */
  static acceptSelection (editorState, selection) {
    return new EditorState(editorState.getImmutable().set('selection', selection));
  }

  /**
   * Create an `EditorState` object.
   * @param {DataAdater} adapter
   */
  static create (adapter) {
    let blockMap = BlockMap.create(adapter);
    let treeMap = TreeMap.createFromBlockMap(blockMap);
    let selection = SelectionState.create();

    return new EditorState(new StateRecord({blockMap, treeMap, selection}));
  }

  /**
   * Create an empty `EditorState` object
   */
  static createEmpty () {
  }
}


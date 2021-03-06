
import { OrderedMap as orderedMap } from 'immutable';
import BlockMap from './BlockMap';
import BlockTree from './BlockTree';

export default class TreeMap {

  constructor (immutable) {
    if (!immutable || !(immutable instanceof orderedMap)) {
      throw new Error('Please use the static methods');
    }

    this._immutable = immutable;
  }

  /** 
   * Get immutable for this treeMap
   */
  getImmutable () {
    return this._immutable;
  }

  toJS () {
    return this.getImmutable().toJS();
  }

  toJSON () {
    return this.getImmutable().toJSON();
  }

  toArray () {
    return this.getImmutable().toArray();
  }

  get () {
    return this.getImmutable().get(...arguments);
  }

  getIn () {
    return this.getImmutable().getIn(...arguments);
  }

  set () {
    let newImmutable = this.getImmutable().set(...arguments);
    this._immutable = newImmutable;
  }

  remove () {
    return this.getImmutable().delete(...arguments);
  }

  /**
   * Create from adapter
   * @param {DataAdapter} adapter
   */
  static create (adapter) {
    let blockMap = BlockMap.create(adapter);
    return TreeMap.createFromBlockMap(blockMap);
  }

  /**
   * create `treeMap` from `blockMap`
   * @param {BlockMap} blockMap
   */
  static createFromBlockMap (blockMap) {
    return new TreeMap(orderedMap(blockMap.getImmutable().map(function (block) {
      return BlockTree.create(block);
    })));
  }
} 

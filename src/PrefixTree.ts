/*
 * class for storing prefixes and their associated values
 * data is a map of prefixes to values
 * prefixes are stored in a trie
 * isWord indicates whether the prefix is a word
 * words are stored in a set
 * which will be used to generate autocomplete suggestions
 * */

class PrefixTree {
  data: Map<string, PrefixTree> = new Map();
  isWord: boolean = false;
  words: Set<string> = new Set();

  // constructor() {}

  /*
   * adds a word to the trie
   * @param word the word to be added
   * */
  public insert(word: string): void {
    this.add(word, 0, this);
  }

  /*
   * searches for a word in the trie
   * @param word the word to be searched for
   * */
  public search(word: string): boolean {
    return this.find(word, 0, this, true);
  }

  /*
   * checks if a word is in the trie
   * @param word the word to be checked
   * */
  public startsWith(word: string): boolean {
    return this.find(word, 0, this, false);
  }

  /*
   * adds a word to the trie
   * @param word the word to be added
   * @param index the index of the current character in the word
   * @param node the current node in the trie
   * */
  private add(word: string, index: number, letterMap: PrefixTree): void {
    if (index === word.length) {
      letterMap.isWord = true;
      return;
    }
    if (!letterMap.data.has(word.charAt(index))) {
      letterMap.data.set(word.charAt(index), new PrefixTree());
      if (index >= 2) {
        letterMap.words.add(word);
      }
    }
    // @ts-ignore
    return this.add(word, index + 1, letterMap.data.get(word.charAt(index)));
  }

  /*
   * searches for a word in the trie
   * @param word the word to be searched for
   * @param index the index of the current character in the word
   * @param node the current node in the trie
   * @param isWord whether the current node is a word
   * */
  private find(
    word: string,
    index: number,
    letterMap: PrefixTree,
    isWord: boolean
  ): boolean {
    if (index === word.length) {
      return letterMap.isWord || !isWord;
    }
    if (letterMap.data.has(word[index])) {
      return this.find(
        word,
        index + 1,
        // @ts-ignore
        letterMap.data.get(word.charAt(index)),
        isWord
      );
    }
    return false;
  }

  /*
   * prints the trie in a readable format
   * */
  public print(): void {
    this.printNode(this, '');
  }

  private printNode(node: PrefixTree, prefix: string): void {
    if (node.isWord) {
      console.log(prefix);
    }
    for (let key of node.data.keys()) {
      // @ts-ignore
      this.printNode(node.data.get(key), prefix + key);
    }
  }

  /*
   * prints the words in the trie in raw format (for debugging)
   * */
  public printRaw(): void {
    this.printRawNode(this, '');
  }

  private printRawNode(node: PrefixTree, prefix: string): void {
    const setToString = (set: Set<string>) => {
      let str = '[';

      for (let key of set.keys()) {
        str += key + ',';
      }
      str = str.substring(0, str.length - 1);
      str += ']';
      return str;
    };

    console.log(prefix + ': {' + setToString(node.words));
    for (let key of node.data.keys()) {
      // @ts-ignore
      this.printRawNode(node.data.get(key), prefix + '  ' + key);
    }
    console.log(prefix + '}' + (node.isWord ? ' (word)' : ''));
  }
}

const runProgramWithMap = () => {
  let obj = new PrefixTree();

  obj.insert('the');
  obj.insert('a');
  obj.insert('there');
  obj.insert('any');
  obj.insert('answer');
  obj.insert('by');
  obj.insert('bye');
  obj.insert('their');

  // obj.print()
  obj.printRaw();
};

runProgramWithMap();

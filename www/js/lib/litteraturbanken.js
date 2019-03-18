class Litteraturbanken {

  static normalizeString(string) {
    var source = string.split("");
    var result = '';

    var charTable = this.getCharTable();

    for (var i = 0; i < source.length; i++) {
      result += this.normalizeChar(source[i], charTable);
    }

    return result;
  }

  static normalizeChar(char, charTable){
    if (char in charTable) {
      return charTable[char];
    }

    return char;
  }

  static getCharTable() {
    var source = "ÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöøùúûüýÿ".split("")
                 .concat(["Æ", "æ", "Ð", "ð", "Þ", "þ", "ß", "Œ", "œ"]);
    var target = "AAAAACEEEEIIIINOOOOOOUUUUYaaaaaaceeeeiiiinoooooouuuuyy".split("")
                 .concat(["AE", "ae", "DH", "dh", "TH", "th", "ss", "OE", "oe"]);

    var charTable = {};

    for (var i = 0; i < source.length; i++) {
      charTable[source[i]] = target[i];
    }

    return charTable;
  }
}


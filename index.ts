import tinycolor from 'tinycolor2';

export default class TextReadabilityChecker {
    private readonly MIN_CONTRAST_RATIO_NORMAL_TEXT = 4.5;
    private readonly MIN_CONTRAST_RATIO_LARGE_TEXT = 3;
    private readonly MAX_WORDS_PER_SENTENCE = 20;
    private readonly MAX_SYLLABLES_PER_WORD = 3;
  
    private readonly text: string;
    private readonly fontSize: number;
    private readonly backgroundColor: string;
    private readonly textColor: string;
  
    constructor(text: string, fontSize: number, backgroundColor: string, textColor: string) {
      this.text = text;
      this.fontSize = fontSize;
      this.backgroundColor = backgroundColor;
      this.textColor = textColor;
    }
  
    private calculateContrastRatio(): number {
      const backgroundColor = tinycolor(this.backgroundColor);
      const textColor = tinycolor(this.textColor);
      const contrastRatio = tinycolor.readability(textColor, backgroundColor);
  
      return contrastRatio;
    }
  
    private countWords(text: string): number {
      return text.split(/\s+/).length;
    }
  
    private countSyllables(word: string): number {
      const syllableCount = word.match(/[aeiouy]{1,2}/g)?.length;
      return syllableCount ? syllableCount : 0;
    }
  
    private countSyllablesInText(text: string): number {
      const words = text.split(/\s+/);
      const syllables = words.map((word) => this.countSyllables(word));
      const totalSyllables = syllables.reduce((sum, syllableCount) => sum + syllableCount, 0);
      return totalSyllables;
    }
  
    private countSentences(text: string): number {
      const sentences = text.split(/[.|!|?]+/);
      return sentences.length;
    }
  
    private calculateAverageWordsPerSentence(text: string): number {
      const wordCount = this.countWords(text);
      const sentenceCount = this.countSentences(text);
      return wordCount / sentenceCount;
    }
  
    private calculateAverageSyllablesPerWord(text: string): number {
      const wordCount = this.countWords(text);
      const syllableCount = this.countSyllablesInText(text);
      return syllableCount / wordCount;
    }
  
    public isReadable(): boolean {
      const contrastRatio = this.calculateContrastRatio();
      const wordsPerSentence = this.calculateAverageWordsPerSentence(this.text);
      const syllablesPerWord = this.calculateAverageSyllablesPerWord(this.text);
  
      return (
        contrastRatio >=
          (this.fontSize >= 18 ? this.MIN_CONTRAST_RATIO_LARGE_TEXT : this.MIN_CONTRAST_RATIO_NORMAL_TEXT) &&
        wordsPerSentence <= this.MAX_WORDS_PER_SENTENCE &&
        syllablesPerWord <= this.MAX_SYLLABLES_PER_WORD
      );
    }
  }
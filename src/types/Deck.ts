import { readFileSync } from "node:fs";
import path from "node:path";
import { Card } from "./Card";

export default class Deck {
  cards: Card[];
  constructor() {
    this.cards = JSON.parse(
      readFileSync(path.join(__dirname, "../../data/cards.json"), "utf8"),
    );
    this.shuffle();
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  drawCard() {
    return this.cards.shift();
  }
}

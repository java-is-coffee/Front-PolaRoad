export interface ICardListDTO {
  cards: Card[];
  maxPage: number;
}

export interface Card {
  cardId: number;
  location: string;
  image: string;
}

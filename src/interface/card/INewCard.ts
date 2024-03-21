interface INewCard {
  cardIndex: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | undefined;
  content: string | null;
}

export default INewCard;

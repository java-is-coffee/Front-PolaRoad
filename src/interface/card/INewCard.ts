interface INewCard {
  cardIndex: number | null;
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  imageUrl: string | undefined;
  content: string | null;
}

export default INewCard;

interface INewCard {
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  image: File | null;
  previewUrl: string | undefined;
  content: string | null;
}

export default INewCard;

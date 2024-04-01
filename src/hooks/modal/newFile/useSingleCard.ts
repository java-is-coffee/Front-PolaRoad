import useKakaoMap from "hooks/map/useKakaoMap";
import INewCard from "interface/card/INewCard";
import { useState } from "react";

export const useSingleCard = (initialCard: INewCard) => {
  const [newCard, setNewCard] = useState<INewCard>(initialCard);
  const { getLatLng } = useKakaoMap();

  const handleImageChange = (imageUrl: string) => {
    setNewCard({ ...newCard, image: imageUrl });
  };

  const handleImageRemove = () => {
    setNewCard({ ...newCard, image: undefined });
  };

  const handlePlaceChange = (place: any) => {
    if (!place) return;
    const placeLatLng = getLatLng(place.y, place.x);
    console.log(placeLatLng);
    setNewCard({
      ...newCard,
      location: place.address_name,
      longitude: placeLatLng.La,
      latitude: placeLatLng.Ma,
    });
  };

  const handleContentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCard({ ...newCard, content: event.target.value });
  };

  return {
    newCard,
    handleImageChange,
    handleContentsChange,
    handlePlaceChange,
    handleImageRemove,
  };
};

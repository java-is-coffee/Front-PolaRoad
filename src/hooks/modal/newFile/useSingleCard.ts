import INewCard from "interface/card/INewCard";
import { useState } from "react";

export const useSingleCard = (initialCard: INewCard) => {
  const [newCard, setNewCard] = useState<INewCard>(initialCard);

  const handleImageChange = (imageUrl: string) => {
    setNewCard({ ...newCard, image: imageUrl });
  };

  const handlePlaceChange = (place: any) => {
    if (!place) return;
    setNewCard({
      ...newCard,
      location: place.address_name,
      latitude: place.x,
      longitude: place.y,
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
  };
};

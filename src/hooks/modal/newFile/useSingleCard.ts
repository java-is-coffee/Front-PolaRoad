import INewCard from "interface/card/INewCard";
import { useState } from "react";

export const useSingleCard = (initialFile: INewCard) => {
  const [newCard, setNewCard] = useState(initialFile);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const newFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(newFile);
    setNewCard({ ...newCard, image: newFile, previewUrl: fileUrl });
  };

  const handlePlaceChange = (place: any) => {
    if (!place) return;
    setNewCard({
      ...newCard,
      location: place.place_name,
      latitude: place.x,
      longitude: place.y,
    });
  };

  const handleContentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCard({ ...newCard, content: event.target.value });
  };

  return { newCard, handleFileChange, handleContentsChange, handlePlaceChange };
};

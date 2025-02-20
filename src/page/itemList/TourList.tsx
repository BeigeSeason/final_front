import { TourItem } from "../../component/ItemComponent";

export const TourList = () => {
  const spotsData = [
    {
      id: "1",
      image: "url_to_image_1",
      description: "관광지 1 설명",
    },
    {
      id: "2",
      image: "url_to_image_2",
      description: "관광지 2 설명",
    },
    {
      id: "3",
      image: "url_to_image_3",
      description: "관광지 3 설명",
    },
    {
      id: "4",
      image: "url_to_image_4",
      description: "관광지 4 설명",
    },
    {
      id: "5",
      image: "url_to_image_5",
      description: "관광지 5 설명",
    },
  ];
  return (
    <div>
      {spotsData.map((spot) => (
        <TourItem
          key={spot.id}
          image={spot.image}
          description={spot.description}
          id={spot.id}
        />
      ))}
    </div>
  );
};

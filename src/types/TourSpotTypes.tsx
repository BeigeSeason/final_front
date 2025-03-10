import { NearSpots } from "./ItemTypes";

export interface TourSpotDetail {
  contentId: string;
  title: string;
  addr1: string;
  contact: string;
  mapX: number;
  mapY: number;
  images: string[];
  nearSpots: NearSpots;
  overview: string;
  homepage: string;
  useTime: string;
  parking: string;
}

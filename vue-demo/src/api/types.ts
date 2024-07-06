export interface Listing {
  id: number;
  title: string;
  seller: string;
  condition: string;
  minifigCount: string;
  locations: string[];
  minifiguresIncluded: string[];
  randomText: string[];
  description: string[];
  dateAdded: string;
}

export interface Location {
  id: number;
  locations: string[];
}

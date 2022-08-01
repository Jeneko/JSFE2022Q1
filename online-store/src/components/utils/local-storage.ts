export function getFavouritesIds(): number[] {
  const favourites = localStorage.getItem('favourites');
  const favouritesIds = favourites ? JSON.parse(favourites) : [];
  return favouritesIds;
}

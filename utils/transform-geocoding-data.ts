export default function (data: any): { lat: number; lon: number } | null {
  return data?.results?.length ? { lat: data.results[0].lat, lon: data.results[0].lon } : null;
};

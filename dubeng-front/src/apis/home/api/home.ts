import axios from "axios";

export async function getHomePopularity() {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/home/popularity`);

  return data;
}

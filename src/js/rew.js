import axios from 'axios';

export async function getReviews() {
  const result = await axios('https://portfolio-js.b.goit.study/api/reviews');
  console.log(result);
  return result;
}
getReviews();

import { NUM_OF_VIDEO_PER_FETCH, ERROR_MESSAGE } from '../constants/index.js';

const END_POINT = 'https://yungo1846-youtube-demo.netlify.app/';

export const getSearchVideoByKeyword = async (keyword, pageToken = '') => {
  const searchURL = new URL('/.netlify/functions/youtube/search', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    q: keyword,
    maxResults: NUM_OF_VIDEO_PER_FETCH,
    type: 'video',
    videoEmbeddable: true,
    pageToken,
  });
  searchURL.search = params.toString();

  try {
    const response = await fetch(searchURL.href);

    if (response.ok) {
      return response.json();
    }

    if (response.status === 403) {
      throw new Error(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(response.status));
    } else {
      throw new Error(ERROR_MESSAGE.API_REQUEST_ERROR(response.status));
    }
  } catch (error) {
    throw new Error(error);
  }

  // fetch dummy data for test
  //return await fetch('http://localhost:5500/src/js/dummy.json').then(Response => Response.json());
};

export const getVideoByIdList = async idList => {
  const videoURL = new URL('/.netlify/functions/youtube/videos', END_POINT);
  const params = new URLSearchParams({
    part: 'snippet',
    id: Array.isArray(idList) ? idList.join(',') : idList,
  });
  videoURL.search = params.toString();

  try {
    const response = await fetch(videoURL.href);

    if (response.ok) {
      return response.json();
    }

    if (response.status === 403) {
      throw new Error(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(response.status));
    } else {
      throw new Error(ERROR_MESSAGE.API_REQUEST_ERROR(response.status));
    }
  } catch (error) {
    throw new Error(error);
  }
};

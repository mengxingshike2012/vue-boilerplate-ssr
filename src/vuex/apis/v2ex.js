import fetch from 'isomorphic-fetch';

const port = 8080;

export async function fetchHotTopics() {
  return await fetch(`http://localhost:${port}/api/topics/hot.json`).then(res => res.json());
}

export async function fetchTopicDetail(id) {
  const datas = await fetch(`http://localhost:${port}/api/topic/${id}`).then(res => res.json());
  return datas[0];
}

import { type Post } from '@/types/Post';

import { posts } from './data/posts';
import { companies } from './data/companies';

// let _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const jitter = () => 200 + Math.random() * 600;

const maybeFail = () => Math.random() < 0.15;

// export async function fetchCountries() {
//   await delay(jitter());
//   return _countries;
// }

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  // 날짜 기준으로 최신순 정렬
  return _posts.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
}

export async function createOrUpdatePost(p: Omit<Post, 'id'> & { id?: string }) {
  await delay(jitter());

  if (maybeFail()) throw new Error('Save failed');

  if (p.id) {
    const index = _posts.findIndex((x) => x.id === p.id);
    if (index === -1) throw new Error('Post not found');

    _posts[index] = p as Post;
    return p as Post;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

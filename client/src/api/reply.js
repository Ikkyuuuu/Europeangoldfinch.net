// src/api/reply.js
export async function listByPost(postId, { limit = 200, page = 1 } = {}) {
    const res = await fetch(`/api/posts/${postId}/replies?limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to load replies');
    return res.json();
}

export async function create(post_id, detail, token) {
    const res = await fetch(`/api/replies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ post_id, detail }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Failed to create reply');
    return data; // { id, post_id, user_username, detail, created_at, ... }
}

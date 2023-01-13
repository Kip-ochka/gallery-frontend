export {}
class TestApi {
  async getPhotos() {
    const res = await fetch(`http://localhost:5000/images`)
    return this._getResponse(res)
  }
  _getResponse(res: { ok: any; json: () => any }) {
    if (!res.ok) {
      return Promise.reject(res.json())
    }
    return res.json()
  }
  async getTags() {
    const res = await fetch(`http://localhost:5000/tags`)
    return this._getResponse(res)
  }
  async renameTag(tagId: number, newName: string, token: string | null) {
    console.log('test')

    const res = await fetch(
      `http://localhost:5000/tags/${tagId}?edited_name=${newName}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      }
    )
    return this._getResponse(res)
  }
  async removeTag(tagId: number, token: string | null) {
    const res = await fetch(`http://localhost:5000/tags/${tagId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    })
    return this._getResponse(res)
  }
}

const testApi = new TestApi()
export default testApi

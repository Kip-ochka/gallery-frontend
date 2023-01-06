export {}
class TestApi {
  async getPhotos() {
    const res = await fetch(`https://picsum.photos/v2/list`)
    return this._getResponse(res)
  }
  _getResponse(res: { ok: any; json: () => any }) {
    if (!res.ok) {
      return Promise.reject(res.json())
    }
    return res.json()
  }
}

const testApi = new TestApi()
export default testApi

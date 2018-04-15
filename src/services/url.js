export default {
  subreddits: () => {
    let m = location.search.match(/subs=([^&]+)/)
    let subs = (m && m[1] && m[1].split(',').map((s) => s.trim())) || []
    return subs.filter((s) => s.match(/^[a-z0-9_-]{1,22}$/))
  }
}

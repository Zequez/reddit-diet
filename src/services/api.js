import unique from 'array-unique'

// It uses localStorage for now, but in the future we might
// want to use a backend to be able to sync with mobile.

const Api = {
  userSettings: {
    get: () => Promise.resolve(JSON.parse(localStorage.getItem('userSettings') || '{}')),
    set: (settings) => {
      localStorage.setItem('userSettings', JSON.stringify(settings))
      return Promise.resolve(settings)
    }
  }
}

export default Api

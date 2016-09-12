const localStorageMock = () => {
  let store = {}

  window.localStorage = {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = value },
    clean: store = {},
    dump: () => store
  }
}

localStorageMock()

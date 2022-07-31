import storage from './storage'

const TOKEN = 'HEIMA_HAOKE_TOKEN'

export const setToken = (value) => {
  storage.set(TOKEN, value)
}

export const getToken = () => {
  return storage.get(TOKEN)
}

export const removeToken = () => {
  storage.remove(TOKEN)
}

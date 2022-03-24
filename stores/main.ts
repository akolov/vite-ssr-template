import { defineStore } from "pinia"


const myLocalStorage = () => localStorage

export const useMainStore = defineStore("main", {
  state: () => ({
    // state variables
  }),
  actions: {
    reset() {
      // reset state
    }
  },
  persist: {
    storage: {
      getItem: (key) => { return myLocalStorage().getItem(key) },
      setItem:  (key, value) => { myLocalStorage().setItem(key, value) }
    }
  }
})

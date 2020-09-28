export const waitFor = (test = () => true, timeoutInMilliseconds = 10000) => new Promise((resolve, reject) => {
  const check = () => {
    if (test()) {
      resolve()
    } else if ((timeoutInMilliseconds -= 100) < 0) {
      reject(new Error('Timed out waiting!'))
    } else {
      setTimeout(check, 100)
    }
  }
  setTimeout(check, 100)
})

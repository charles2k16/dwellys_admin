const url = () => {
  let url
  if (process.env.NODE_ENV === 'development') {
    url = `http://127.0.0.1:8000`
  } else {
    url = `https://newapi.dwellys.com/api`
  }
  return url
}
export default url

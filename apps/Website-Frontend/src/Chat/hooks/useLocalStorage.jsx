import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';


export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = Cookies.get(key);
    console.log(jsonValue);
    if (!isEmpty(jsonValue)) return jsonValue;
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

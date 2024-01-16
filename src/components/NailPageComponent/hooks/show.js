import { useState } from "react";


export default function useShow(value) {
   let [show, setShow] = useState(value)
   let toggle = () => {
      setShow(!show)
   }
   return [show, toggle]
}

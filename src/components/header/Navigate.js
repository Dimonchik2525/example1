import { useEffect, useState } from "react"



export default function Navigate(props) {
   let [active, setActive] = useState(true)
   let [color, setColor] = useState('.wrapper')
   //let [scroll, setScroll] = useState(false)

   useEffect(() => {
      let timeout;
      const handleScroll = function () {

         setActive(true)
         clearTimeout(timeout)
         timeout = setTimeout(() => {
            setActive(false)
         }, 2000)
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup event listener on component unmount
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {
      if (window.pageYOffset < 200) {
         setActive(true)
      }
   }, [active])

   function click(block) {
      let current = document.querySelector(block)
      current.scrollIntoView({
         top: 0,
         left: 0,
         behavior: "smooth"
      })
      setColor(block)
   }
   return (
      <div className={`header__navigate  ${active ? 'visible ' : "invisible"}`}>
         <div className="header__navigate__container">
            <div className="navigate">
               <ul className="navigate__list">
                  <li onClick={() => click('.wrapper')} style={color == '.wrapper' ? { color: 'red' } : {}} className="navigate__item">Header</li>
                  <li onClick={() => click(".statistic__wrapper")} style={color == ".statistic__wrapper" ? { color: 'red' } : {}} className="navigate__item">Whole statistics</li>
                  <li onClick={() => click('.clients__content')} style={color == '.clients__content' ? { color: 'red' } : {}} className="navigate__item">LeaderBoard</li>
                  <li onClick={() => click('.short-stat__content')} style={color == '.short-stat__content' ? { color: 'red' } : {}} className="navigate__item">ClientStatistic</li>
               </ul>
            </div>
         </div>
      </div>
   )
}
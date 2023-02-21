import { MutableRefObject, useEffect, useRef, useState } from "react";

// export function useIntersectionObserver(ref: MutableRefObject<Element | null>) {
//   const [element, setElement] = useState<Element | null>(null);
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const observer = useRef<null | IntersectionObserver>(null);

//   const cleanOb = () => {
//     if (observer.current) {
//       observer.current.disconnect();
//     }
//   };

//   useEffect(() => {
//     setElement(ref.current);
//   }, [ref]);

//   useEffect(() => {
//     if (!element) return;
//     cleanOb();
//     const ob = (observer.current = new IntersectionObserver(([entry]) => {
//       const isElementIntersecting = entry.isIntersecting;
//       console.log("intersection", isElementIntersecting);
//       if (!isIntersecting && isElementIntersecting) {
//         setIsIntersecting(isElementIntersecting);
//         cleanOb();
//       }
//     }));
//     ob.observe(element);
//     return () => {
//       cleanOb();
//     };
//   }, [element]);

//   return isIntersecting;
// }

export function useIntersectionObserver(ref: MutableRefObject<Element | null>) {
  const [element, setElement] = useState<Element | null>(null);
  //   const [isIntersecting, setIsIntersecting] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    cleanOb();
    const ob = (observer.current = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      //   console.log("is el", isIntersecting, isElementIntersecting);
      //   if (!isIntersecting && isElementIntersecting) {
      //     setIsIntersecting(isElementIntersecting);
      //     cleanOb();
      //   }
      setShowNav(!isElementIntersecting);
    }));
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element]);

  return showNav;
}

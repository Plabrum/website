import { MutableRefObject, useEffect, useRef, useState } from "react";

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
      setShowNav(!isElementIntersecting);
    }));
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element]);

  return showNav;
}

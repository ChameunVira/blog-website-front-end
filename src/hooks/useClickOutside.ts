import { useEffect, type RefObject } from "react"

type clickOutsideHandler = () => void;

export function useClickOutside<E extends HTMLElement>(ref: RefObject<E> , handler: clickOutsideHandler) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {   
            if(ref.current && ref.current.contains(e.target as Node)) return;
            handler();
        }
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown" , listener);
    } , [ref , handler]);
}
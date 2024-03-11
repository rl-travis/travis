import { RefObject } from "react";

let timeout: any;
const regex = /^[a-z0-9_]+$/i;

export function changeUsernameRef(ref: RefObject<HTMLInputElement>) {
  if (ref.current) {
    const parentElement = ref.current.parentElement as HTMLElement;
    const subtitle = parentElement.firstChild as HTMLElement;
    const count = parentElement.lastChild as HTMLElement;

    if (ref.current.value.length === 0) {
      parentElement.style.border = "";
      subtitle.style.color = "";
      count.style.color = "";
      return;
    }

    if (!regex.test(ref.current.value)) {
      clearTimeout(timeout);
      parentElement.style.border = "1px solid #FF3232";
      subtitle.style.color = "#FF3232";
      count.style.color = "#FF3232";
      timeout = setTimeout(() => {
        if (ref.current && ref.current.value.length >= 5) {
          parentElement.style.border = "";
          subtitle.style.color = "";
          count.style.color = "";
        }
      }, 300);
      const length = ref.current.value.length;
      ref.current.value = ref.current.value.slice(0, length - 1);
    } else if (ref.current.value.length < 5) {
      parentElement.style.border = "1px solid #FF3232";
      subtitle.style.color = "#FF3232";
      count.style.color = "#FF3232";
      ref.current.value = ref.current.value.slice(0, 52);
    } else if (ref.current.value.length > 52) {
      parentElement.style.border = "1px solid #FF3232";
      subtitle.style.color = "#FF3232";
      count.style.color = "#FF3232";
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        parentElement.style.border = "";
        subtitle.style.color = "";
        count.style.color = "";
      }, 300);
      ref.current.value = ref.current.value.slice(0, 52);
    } else {
      parentElement.style.border = "";
      subtitle.style.color = "";
      count.style.color = "";
      ref.current.value = ref.current.value.slice(0, 52);
    }
  }
}

export function changeRef(ref: RefObject<HTMLInputElement>, length: number) {
  if (ref.current) {
    const parentElement = ref.current.parentElement as HTMLElement;
    const subtitle = parentElement.firstChild as HTMLElement;
    const count = parentElement.lastChild as HTMLElement;

    if (ref.current.value.length > length) {
      clearTimeout(timeout);
      parentElement.style.border = "1px solid red";
      subtitle.style.color = "#FF3232";
      count.style.color = "#FF3232";
      timeout = setTimeout(() => {
        parentElement.style.border = "";
        subtitle.style.color = "";
        count.style.color = "";
      }, 300);
    } else {
      parentElement.style.border = "";
      subtitle.style.color = "";
      count.style.color = "";
    }
    ref.current.value = ref.current.value.slice(0, length);
  }
}

export function resetRefs(refs: RefObject<HTMLInputElement>[]) {
  refs.map((ref) => {
    if (ref.current) {
      const parentElement = ref.current.parentElement as HTMLElement;
      const subtitle = parentElement.firstChild as HTMLElement;
      const count = parentElement.lastChild as HTMLElement;

      parentElement.style.border = "";
      subtitle.style.color = "";
      count.style.color = "";
    }
  });
}

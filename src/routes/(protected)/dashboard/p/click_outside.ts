/* eslint-disable @typescript-eslint/no-explicit-any */

/** Dispatch event on click outside of node */
export const clickOutside = (node: any) => {
  const handleClick = (event: { target: any; defaultPrevented: any; }) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

  document.addEventListener('mousedown', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', handleClick, true);
    }
  }
}

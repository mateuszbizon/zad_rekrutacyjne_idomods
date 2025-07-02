export function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    return isVisible;
}
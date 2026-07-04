export const scrollToSection = (
  id: string,
  behavior: ScrollBehavior = 'smooth'
): void => {
  const headerHeight = 80;
  const target = document.getElementById(id);

  if (!target) return;

  window.scrollTo({
    top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight,
    behavior,
  });
};

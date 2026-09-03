const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('[data-prototype-form]').forEach((form) => {
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please complete the required fields.';
      status.dataset.state = 'error';
      form.reportValidity();
      return;
    }

    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = 'Preparing inquiry...';
    status.textContent = 'Checking your details.';
    status.dataset.state = 'loading';

    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = originalLabel;
      status.textContent = 'Prototype complete. Connect this form to the Gulfalts inquiry workflow before launch.';
      status.dataset.state = 'success';
    }, 650);
  });
});

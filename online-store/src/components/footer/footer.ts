import { IComponent } from 'types';

export class Footer implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('footer');
    this.element.className = "footer";
    this.element.innerHTML = `
      <ul class="footer-links">
        <li class="footer-links__item">
          <a class="footer-links__link" href="https://rs.school/js/" target="_blank" title="Link to The Course">
            <img class="footer-links__rss-logo" src="images/assets/rsschool-logo.svg" alt="RSSchool Logo">
          </a>
        </li>
        <li class="footer-links__item">
          <a class="footer-links__link" href="https://github.com/jeneko/" target="_blank" title="My Github">
            <img class="footer-links__github-logo" src="images/assets/github-logo.svg" alt="Github Logo">
          </a>
        </li>
      </ul>
      <p>2022</p>
    `;
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}

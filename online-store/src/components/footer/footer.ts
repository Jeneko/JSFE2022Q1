import { IComponent } from 'types';
import githubLogoUrl from './github-logo.svg';
import rsschoolLogoUrl from './rsschool-logo.svg';

export class Footer implements IComponent {
  element: HTMLElement;

  constructor() {
    this.element = document.createElement('footer');
    this.element.className = "footer";
    this.element.innerHTML = `
      <ul class="footer-links">
        <li class="footer-links__item">
          <a class="footer-links__link" href="https://rs.school/js/" target="_blank" title="Link to the Course">
            <img class="footer-links__rss-logo" src="${rsschoolLogoUrl}" alt="RSSchool Logo">
          </a>
        </li>
        <li class="footer-links__item">
          <a class="footer-links__link" href="https://github.com/jeneko/" target="_blank" title="My Github">
            <img class="footer-links__github-logo" src="${githubLogoUrl}" alt="Github Logo">
          </a>
        </li>
      </ul>
      <div class="footer__year">2022</div>
    `;
  }

  render(root: HTMLElement): void {
    root.replaceWith(this.element);
  }
}

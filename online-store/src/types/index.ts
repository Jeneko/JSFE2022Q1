export interface IApp {
  element: HTMLElement;
  start(): void;
}

export interface IComponent {
  element: HTMLElement;
  render(root: HTMLElement): void;
}

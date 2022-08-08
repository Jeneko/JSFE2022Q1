import generateCar from 'components/car/car';
import './winner-message.css';

export default function getWinnerMessage(id: number, name: string, color: string, time: string): HTMLElement {
  const winner = document.createElement('div');
  winner.className = 'winner';

  winner.innerHTML = `
    ${generateCar(color, id, name)}
    <div class="winner-info" style="background-color: ${color};">
      ${name} is the winner!
    </div>
    <div class="winner-time">
      Time: [${time}s]
    </div>
  `;

  const btnClose = document.createElement('button');
  btnClose.className = 'btn-remove-winner';
  btnClose.innerText = 'Ok';
  btnClose.onclick = () => winner.remove();
  winner.append(btnClose);

  return winner;
}

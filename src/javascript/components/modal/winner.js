import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function
  showModal({
    title: 'FLAWLESS VICTORY!!!',
    bodyElement: fighter.name,
    onClose: () => {
      document.location.reload();
    }
  });
}

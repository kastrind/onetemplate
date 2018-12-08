
import $ from 'jquery';
window.jQuery = $;

class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton = $(".modal-close");
    this.events();
  }

  events() {
    //clicking the open modal button
    this.openModalButton.click(this.openModal.bind(this));

    //clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));

    //pushing esc key closes modal
    $(document).keyup(this.keypressHandler.bind(this));

    //clicking out of modal closes it
    $(document).click(function(e) {
      if(!$(e.target).is(this.modal) && !this.modal.find($(e.target)).length ) {
        this.closeModal(e);
      }
    }.bind(this));
  }

  keypressHandler(e) {
    if (e.keyCode == 27) {
      this.closeModal(e);
    }
  }

  openModal(e) {
    e.preventDefault();
    this.modal.addClass("modal-is-visible");
    return false;
  }

  closeModal(e) {
    e.preventDefault();
    this.modal.removeClass("modal-is-visible");
  }
}

export default Modal;


import $ from 'jquery';
window.jQuery = $;

class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.modalContent = this.modal.find(".modal-content");
    this.closeModalButton = $(".modal-close");
    this.events();
  }

  events() {
    //clicking the open modal button
    var that = this;
    this.openModalButton.click(function(e) {
      e.preventDefault();
      var modalId = $(this).attr("data-open-modal-id");
      if (modalId) $(modalId).addClass("modal-is-visible");
      else {that.openModal(e).bind(that);}
    }).bind(that);

    //clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));

    //pushing esc key closes modal
    $(document).keyup(this.keypressHandler.bind(this));

    //clicking out of modal closes it
    this.modal.on("click", function(e) {
      if (!$(e.target).is(this.modalContent) && !$(this.modalContent).find(e.target).length) {
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

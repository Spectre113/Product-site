import React, { useEffect } from "react";

const Contacts: React.FC = () => {
  useEffect(() => {
    let lastClickedButton: HTMLElement | null = null;

    document.querySelectorAll(".about__contact-copy").forEach((button) => {
      button.addEventListener("click", function (this: HTMLElement) {
        const textToCopy = this.getAttribute("data-copy-text")!;
        const tempInput = document.createElement("input");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        if (!this.getAttribute("data-original-text")) {
          this.setAttribute("data-original-text", this.textContent!);
        }

        if (lastClickedButton && lastClickedButton !== this) {
          lastClickedButton.textContent =
            lastClickedButton.getAttribute("data-original-text")!;
        }

        lastClickedButton = this;
        this.textContent = "Copied";
      });
    });
  }, []);
  return (
    <div className="about__contact-block">
      <p className="about__contact-info">You may wright to us in tg.</p>
      <p className="about__contact-info">Tg: @BAZZAR_MARKET</p>
      <button className="about__contact-copy btn-reset" data-copy-text="ID">
        Copy Tg id
      </button>
    </div>
  );
};

export default Contacts;

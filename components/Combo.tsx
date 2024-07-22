"use client"

import React, {useEffect} from 'react';

const Combo: React.FC = () => {
    useEffect(() => {
        let lastClickedButton: HTMLElement | null = null;
    
        document.querySelectorAll('.combo__copy').forEach(button => {
          button.addEventListener('click', function (this: HTMLElement) {
            const textToCopy = this.getAttribute('data-copy-text')!;
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
    
            if (!this.getAttribute('data-original-text')) {
              this.setAttribute('data-original-text', this.textContent!);
            }
    
            if (lastClickedButton && lastClickedButton !== this) {
              lastClickedButton.textContent = lastClickedButton.getAttribute('data-original-text')!;
            }
    
            lastClickedButton = this;
            this.textContent = 'Copied';
          });

        });

      }, []);

    return (
        <section className="combo">
            <div className="container">
                <h2 className="combo__title">
                    Combo
                </h2>
                <p className="combo__info">
                    For more details, write to us in telegramm.
                </p>
                <p className="combo__info">
                    Tg: @BAZZAR_MARKET
                </p>
                <button className="combo__copy btn-reset" data-copy-text="ID">
                    Copy Tg id
                </button>
            </div>
        </section>
    );
};

export default Combo;
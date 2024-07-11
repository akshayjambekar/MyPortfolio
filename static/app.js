document.addEventListener('DOMContentLoaded', () => {
    class Chatbox {
        constructor() {
            this.args = {
                openButton: document.querySelector('.chatbox__button'),
                chatBox: document.querySelector('.chatbox__support'),
                sendButton: document.querySelector('.send__button')
            };

            this.state = false;
            this.messages = []; // Corrected the typo: this.message to this.messages
        }

        display() {
            const { openButton, chatBox, sendButton } = this.args;

            if (openButton) {
            openButton.addEventListener('click', () => this.toggleState(chatBox))
            } else {
                console.error('Open button not found');
            }

            if (sendButton) {
            sendButton.addEventListener('click', () => this.onSendButton(chatBox))
            } else {
                console.error('Send button not found');
            }

            const node = chatBox.querySelector('input');
            if (node) {
                node.addEventListener('keyup', ({ key }) => {
                    if (key === 'Enter') {
                        this.onSendButton(chatBox);
                    }
                })
            } else {
                console.error('Input node not found in chatBox');
            }
        }

        toggleState(chatBox) {
            this.state = !this.state;
            if (this.state) {
                chatBox.classList.add('chatbox--active');
            } else {
                chatBox.classList.remove('chatbox--active');
            }
        }

        onSendButton(chatBox) {
            const textField = chatBox.querySelector('input');
            const text1 = textField.value;

            if (text1 === "") {
                return;
            }

            const msg1 = { name: 'User', message: text1 };
            this.messages.push(msg1);

            fetch($SCRIPT_ROOT + '/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(r => r.json())
            .then(r => {
                const msg2 = { name: "Akshay", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatBox);
                textField.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatBox);
                textField.value = '';
            });
        }

        updateChatText(chatBox) {
            let html = '';
            this.messages.slice().reverse().forEach((item) => {
                if (item.name === 'Akshay') {
                    html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
                } else {
                    html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
                }
            });

            const chatMessage = chatBox.querySelector('.chatbox__messages');
            if (chatMessage) {
                chatMessage.innerHTML = html;
            } else {
                console.error('Chat messages container not found in chatBox');
            }
        }
    }

    const chatbox = new Chatbox();
    chatbox.display();
});

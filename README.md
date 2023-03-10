# pm-gpt

A PM tool chrome extension powered by ChatGPT

## Usage

- On any webpage, select the text to be run through ChatGPT.
- Add, edit text and generate a response from chatgpt
- Copy chatgpt response to clipboard
- Click on the extension button in your toolbar and wait for the result to load.

## Installation

- Download the code using

  ```
  git clone https://github.com/GlennPatrickMurphy/pm-gpt.git
  ```

- Go to the extensions page for your browser. For Chrome, go to `chrome://extensions/`.
- Turn on developer mode by toggling it on the top right.
- Click on Load Unpacked and navigate to the folder downloaded from GitHub.
  
The extension will now be visible in the extensions panel in the toolbar; it can be pinned and used from there.

> After installing the extension, you will need to close and reopen the browser for the very first use.

## Troubleshooting

- Using the extension requires having created an account on [ChatGPT](https://chat.openai.com). Once in a while, the extension will redirect to that page to pass the cloudflare check.

- Since the extension gets the response as a readable stream, it shouldn't take too long to load. If it does so, simply close the popup and run it again.

## References

- <https://github.com/wong2/chat-gpt-google-extension>
- Cloned from <https://github.com/mihiraggarwal/select-gpt.git>

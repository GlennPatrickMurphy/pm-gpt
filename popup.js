document.addEventListener("DOMContentLoaded", async () => {

    const sleep = ms => new Promise(r => setTimeout(r, ms))

    const getActiveTab = async () => {
        const tabs = await chrome.tabs.query({
            currentWindow: true,
            active: true
        })
        return tabs[0]
    }

    const showPopup = async (answer) => {
        if (answer !== "CLOUDFLARE" && answer !== "ERROR") {
            try {
                let res = await answer.split("data:")
                try {
                    const detail = JSON.parse(res[0]).detail
                    document.getElementById('output').style.opacity = 1
                    document.getElementById('output').innerHTML = detail
                    return;
                } catch (e) {
                    try {
                        res = res[1].trim()
                        if (res === "[DONE]") return
                        answer = JSON.parse(res)
                        let final = answer.message.content.parts[0]
                        final = final.replace(/\n/g,'<br>')
                        document.getElementById('output').style.opacity = 1
                        document.getElementById('output').innerHTML = final
                    } catch (e) {}
                }
            } catch (e) {
                document.getElementById('output').style.opacity = 1
                document.getElementById('output').innerHTML = "Something went wrong. Please try in a few minutes."
            }

        } else if (answer === "CLOUDFLARE") {
            document.getElementById('input').style.opacity = 1
            document.getElementById('input').innerHTML = 'You need to once visit <a target="_blank" href="https://chat.openai.com/chat">chat.openai.com</a> and check if the connection is secure. Redirecting...'
            await sleep(3000)
            chrome.tabs.create({url: "https://chat.openai.com/chat"})
        } else {
            document.getElementById('output').style.opacity = 1
            document.getElementById('output').innerHTML = 'Something went wrong. Are you logged in to <a target="_blank" href="https://chat.openai.com/chat">chat.openai.com</a>? Try logging out and logging in again.'
        }
    }

    var checkPageButton = document.getElementById('cb1');
    checkPageButton.addEventListener('click', function() {  
        const port = chrome.runtime.connect();
        let selection = document.getElementById('input').innerHTML
        port.postMessage({question: selection})
        port.onMessage.addListener((msg) => showPopup(msg))
    }, false);

    const getData = async (selection) => {
        if (!selection.length == 0) {
            document.getElementById('input').style.opacity = 1
            document.getElementById('input').innerHTML = selection
            document.getElementById('output').style.opacity = 0.5
            document.getElementById('output').innerHTML = "Loading..."
        } else {
            document.getElementById('input').style.opacity = 0.5
            document.getElementById('input').innerHTML = "You have to first select some text"
        }
    }

    var copyResponse = document.getElementById('cb4');
    copyResponse.addEventListener('click', function() {  
        console.log("clicked")
        let copyFrom = document.getElementById("output").innerText;

        var myTemporaryInputElement = document.createElement("input");
        myTemporaryInputElement.type = "text";
        myTemporaryInputElement.value = copyFrom;

        document.body.appendChild(myTemporaryInputElement);

        myTemporaryInputElement.select();
        document.execCommand("Copy");

        document.body.removeChild(myTemporaryInputElement);
      
    })

    const getSelectedText = async () => {
        const activeTab = await getActiveTab()
        chrome.tabs.sendMessage(activeTab.id, {type: "LOAD"}, getData)
    }

    getSelectedText()

    const barOuter = document.querySelector(".bar-outer");
    const options = document.querySelectorAll(".bar-grey .option");
    let current = 1;
    options.forEach((option, i) => (option.index = i + 1));
    options.forEach(option =>
                    option.addEventListener("click", function() {
    barOuter.className = "bar-outer";
    barOuter.classList.add(`pos${option.index}`);
    if (option.index > current) {
        barOuter.classList.add("right");
    } else if (option.index < current) {
        barOuter.classList.add("left");
    }
    current = option.index;
    }));
})


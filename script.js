async function sendMessage() {

    const input = document.getElementById("message");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Show user's message
    const userMessage = document.createElement("div");

    userMessage.className = "message user";
    userMessage.textContent = message;

    chatBox.appendChild(userMessage);

    input.value = "";

    // Show loading message
    const loading = document.createElement("div");

    loading.className = "message ai";
    loading.textContent = "Thinking...";

    chatBox.appendChild(loading);

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        loading.textContent = data.reply;

    } catch (error) {

        loading.textContent =
            "Error connecting to the AI.";

        console.log(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
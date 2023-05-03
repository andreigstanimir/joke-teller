const btn = document.querySelector(".btn");
const audioElement = document.querySelector(".audio");

// Disable/Enable Button
const toggleButton = function () {
  btn.disabled = !btn.disabled;
};

// Passing Jjoke to VoiceRSS API
const tellMe = function (joke) {
  VoiceRSS.speech({
    key: "2aeeeebf872b4cdb9e34551f47527135",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Joke from Joke API
const getJoke = async function () {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    joke = data?.setup ? `${data.setup} ... ${data.delivery}` : data.joke;

    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Event Listeners
btn.addEventListener("click", () => {
  btn.textContent = "Wait...";
  getJoke();
});
audioElement.addEventListener("ended", () => {
  btn.textContent = "Tell me a joke";
  toggleButton();
});

document.getElementById("pipButton").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("https://www.youtube.com/watch")) {
    alert("Please open a YouTube video page first.");
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      const video = document.querySelector("video");
      if (video) {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else {
          await video.requestPictureInPicture();
        }
      } else {
        alert("No video found on this page.");
      }
    },
  });
});

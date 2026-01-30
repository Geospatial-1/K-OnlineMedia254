function update() {
  const data = {
    live: {
      isLive: document.getElementById('live').value === 'true',
      topic: document.getElementById('topic').value,
      guest: document.getElementById('guest').value,
      date: document.getElementById('date').value,
      youtubeEmbed: document.getElementById('yt').value
    }
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.json';
  a.click();
}

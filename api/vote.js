const formWidget = document.getElementById('vote-form-widget');
const messageWidget = document.getElementById('vote-message-widget');

formWidget.addEventListener('submit', async (e) => {
  e.preventDefault();
  const selected = Array.from(formWidget.querySelectorAll('input[name="nominee"]:checked')).map(cb => cb.value);

  if(selected.length === 0){
    messageWidget.textContent = "Выберите хотя бы одного номинанта";
    messageWidget.style.color = "red";
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyRGLLI8-uxZ6LqA4JvS1HytOniKZV7HoP8QniGRwIj7r-rx7-nHTaIEmRyjtXG9moEmQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nominees: selected,
        category: "Онлайн спикер года", // <- название номинации
        ip: "0.0.0.0"
      })
    });

    const data = await response.json();

    if(data.result === "success"){
      messageWidget.textContent = "Спасибо! Ваш голос учтён";
      messageWidget.style.color = "#628373";
      formWidget.reset();
    } else {
      messageWidget.textContent = "Ошибка, не удалось сохранить голос";
      messageWidget.style.color = "red";
      console.error("App Script error:", data.message);
    }
  } catch(err){
    console.error(err);
    messageWidget.textContent = "Ошибка, не удалось сохранить голос";
    messageWidget.style.color = "red";
  }
});

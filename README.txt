🚀 Инструкция по запуску

1. Перейди на https://vercel.com
2. Авторизуйся через GitHub или Google
3. Нажми "Add New Project" → "Deploy from Folder"
4. Загрузите архив russian-interior-vote.zip
5. После деплоя ты получишь URL вроде:
   https://russian-interior-vote.vercel.app/api/vote

6. Замени в своем HTML коде fetch URL:
   fetch('https://russian-interior-vote.vercel.app/api/vote', { ... })

🎉 Готово — теперь CORS не будет, и всё пойдёт прямо в таблицу.

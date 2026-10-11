const getToday = () => {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const borrowBook = async (userId, bookId) => {
  try {
    const bookResponse = await fetch(`${booksAPI}/${bookId}`);
    if (!bookResponse.ok) {
      throw new Error(`HTTP error: ${bookResponse.status}`);
    }
    const book = await bookResponse.json();

    if (book.status !== "available") {
      throw new Error("ეს წიგნი უკვე გაცემულია");
    }

    const response = await fetch(borrowingAPI, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId,
        bookId,
        borrowDate: getToday(),
        returnDate: null,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    await fetch(`${booksAPI}/${bookId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "borrowed" }),
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const returnBook = async (borrowingId) => {
  try {
    const response = await fetch(`${borrowingAPI}/${borrowingId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ returnDate: getToday() }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    await fetch(`${booksAPI}/${data.bookId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: "available" }),
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

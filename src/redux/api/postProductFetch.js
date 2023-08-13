const postProductFetch = async (products) => {
  try {
    const formData = new FormData();

    // добавление данных о товарах в форму
    products.forEach((product) => {
      formData.append(
        `product[${product.gid}]`,
        product.quantity ? product.quantity : 1
      );
    });

    const response = await fetch(process.env.REACT_APP_POST_DATA_API, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(
      'Результат оформления заказа, ключ это ID товара, значение это количество',
      data
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default postProductFetch;

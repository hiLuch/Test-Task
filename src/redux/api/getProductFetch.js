const getProductFetch = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_GET_DATA_API, {
      method: 'GET',
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default getProductFetch;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getNewCollectionItems() {
  const response = await fetch('newCollectionProducts.json');
  const request = await response.json();

  await new Promise((resolve) => {
    setTimeout(resolve, getRandomArbitrary(1000, 5000));
  });

  if (getRandomArbitrary(1, 3) === 1) {
    throw new Error('Network problems');
  }

  return request;
}

// eslint-disable-next-line import/prefer-default-export
export { getNewCollectionItems };

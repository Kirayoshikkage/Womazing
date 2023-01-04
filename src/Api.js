function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const functionsFiltration = {
  colors: (paramValue, { availability }) => {
    const colors = new Set(Object.values(availability).flat());

    return paramValue.some((paramColor) => colors.has(paramColor));
  },
  category: ([paramValue], { category }) => paramValue === category,
  newCollection: (paramValue, { newCollection = false }) =>
    paramValue === newCollection,
};
const formattingList = ["page", "amount"];

function filtersData(data, params) {
  return data.reduce((filteredData, item) => {
    const isPassesFilter = Object.keys(params).every((key) => {
      const functionFiltration = functionsFiltration[key];

      if (!functionFiltration) return true;

      return functionFiltration(params[key], item);
    });

    if (isPassesFilter) {
      filteredData.push(item);
    }

    return filteredData;
  }, []);
}

function formatsData(data, params) {
  const { page = null, amount = null } = Object.fromEntries(
    Object.entries(params).filter(([key]) => formattingList.includes(key))
  );

  const startIdx = (page - 1) * amount;
  const endIdx = amount * page;

  return {
    data: data.slice(startIdx, endIdx),
    total: data.length,
  };
}

async function getItems(params = {}) {
  const data = [
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c",
      title: "Футболка USA",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde15",
      title: "Купальник Glow",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e",
      title: "Свитшот Sweet Shot",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
      newCollection: true,
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c1",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde152",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e3",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c14",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde1525",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e36",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c141",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde15251",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e361",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c1411",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde152511",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e3611",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde15",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c1",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c14",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde1525",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c141",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
      newCollection: true,
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde15251",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
      newCollection: true,
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e361",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
      newCollection: true,
    },
    //
    {
      id: "fb62624c-ce10-44c9-9ce5-7d259b20741c1411",
      title: "Lorem ipsum",
      category: "Футболки",
      price: 90,
      discount: 25,
      gallery: {
        path: {
          "1x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@1x.webp",
          "2x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@2x.webp",
          "3x": "productImgs/fb62624c-ce10-44c9-9ce5-7d259b20741c@3x.webp",
        },
        alt: "Серая облегающая футболка с чёрной надписью USA на груди",
      },
      availability: {
        XXS: ["Белый"],
        XS: ["Чёрный", "Белый"],
        S: ["Чёрный"],
        M: ["Серый", "Чёрный", "Белый"],
        L: ["Серый", "Чёрный", "Белый"],
        XL: ["Белый"],
        XXL: ["Серый", "Чёрный", "Белый"],
      },
      newCollection: true,
    },
    {
      id: "07c41167-ac05-4850-8d8d-fcd2914dde152511",
      title: "Lorem ipsum",
      category: "Купальники",
      price: 70,
      discount: 30,
      gallery: {
        path: {
          "1x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@1x.webp",
          "2x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@2x.webp",
          "3x": "productImgs/07c41167-ac05-4850-8d8d-fcd2914dde15@3x.webp",
        },
        alt: "Чёрный сплошной купальник с формованными чашками",
      },
      availability: {
        XS: ["Чёрный", "Белый"],
        M: ["Чёрный"],
        L: ["Чёрный", "Белый"],
        XL: ["Чёрный", "Белый"],
      },
      newCollection: true,
    },
    {
      id: "7150e4ba-2b80-4d02-a91c-3a098a67914e3611",
      title: "Lorem ipsum",
      category: "Свитшоты",
      price: 120,
      discount: 20,
      gallery: {
        path: {
          "1x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@1x.webp",
          "2x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@2x.webp",
          "3x": "productImgs/7150e4ba-2b80-4d02-a91c-3a098a67914e@3x.webp",
        },
        alt: "Укороченный оверсайз свитшот белого цвета с манжетами",
      },
      availability: {
        XXS: ["Белый", "Бежевый"],
        XS: ["Белый"],
        XL: ["Белый", "Фиолетовый"],
      },
      newCollection: true,
    },
  ];
  const filteredData = filtersData(data, params);
  const formattedData = formatsData(filteredData, params);

  // Delay
  await new Promise((resolve) => {
    setTimeout(resolve, getRandomArbitrary(500, 1500));
  });

  // Network error
  if (getRandomArbitrary(1, 25) === 1) {
    throw new Error("Network error");
  }

  // Empty data
  if (getRandomArbitrary(1, 25) === 1) {
    return {};
  }

  // Broken data
  if (getRandomArbitrary(1, 25) === 1) {
    return {
      total: 3,
    };
  }

  return formattedData;
}

async function getValuesForFilters() {
  const data = {
    colors: ["Чёрный", "Белый", "Серый", "Бежевый", "Фиолетовый"],
    category: ["Футболки", "Купальники", "Свитшоты"],
  };

  // Delay
  await new Promise((resolve) => {
    setTimeout(resolve, getRandomArbitrary(1000, 3000));
  });

  // Network error
  if (getRandomArbitrary(1, 15) === 1) {
    throw new Error("Network error");
  }

  // Empty data
  if (getRandomArbitrary(1, 15) === 1) {
    return {};
  }

  // Broken data
  if (getRandomArbitrary(1, 15) === 1) {
    return {
      colors: ["Чёрный", "Белый", "Серый", "Бежевый", "Фиолетовый"],
    };
  }

  return data;
}

export { getValuesForFilters, getItems };

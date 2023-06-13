import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
      image:
        'https://www.instrukcjaobslugipdf.pl/thumbs/products/l/239156-canon-eos-50d.jpg',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
      image:
        'https://www.fotosoft.pl/images/APARATY_CANON/5D_MARK_IV/DSC_0781.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
      image:
        'https://i1.adis.ws/i/canon/eos-r-frt-canon-rf-35mm-f-1-8-macro-is-stm-lens_ae816c2239d3411c8ccfffa03c6d47e3',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
      image:
        'https://www.megamedia.pl/_p/13/aparaty-cyfrowe-lustrzanki-nikon-d50-kit-af-28-80-mm-p13696.jpg',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
      image: 'https://leicastore.pl/wp-content/uploads/2020/12/Q2-skala.jpg',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      address: '123 Main Street, London',
      userId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      phoneNumber: '123-456-789',
      notesForCurier: 'Floor 3',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      address: '123 Main Street, London',
      userId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      phoneNumber: '123-456-789',
      notesForCurier: 'Floor 3',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      address: 'Baker Street 12B, New York',
      userId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      phoneNumber: '978-786-909',
      notesForCurier: 'Floor 2',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ userId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          user: {
            connect: { id: userId },
          },
        },
      });
    }),
  );
}

seed();

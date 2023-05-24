export async function searchProducts(searchTerm) {
    const query = `
      {
        products(first: 10, query: "title:${searchTerm}") {
          edges {
            node {
              id
              title
              handle
              description
            }
          }
        }
      }
    `;
  
    const response = await fetch('https://f32f7c.myshopify.com/api/2021-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: query,
    });
  
    const data = await response.json();
  
    return data.data.products.edges.map(edge => edge.node);
  }
  
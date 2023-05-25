
  
  import { request } from 'graphql-request';

const searchProducts = async (query) => {
    const data = await request(
        'https://f32f7c.myshopify.com/api/2023-04/graphql.json',
        `
        {
            products(query: "${query}", first: 10) {
                edges {
                    node {
                        id
                        title
                        images(first: 1) {
                            edges {
                                node {
                                    originalSrc
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        },
    );

    return data.products.edges.map(edge => edge.node);
};

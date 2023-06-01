import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder, Builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import builderConfig from '@config/builder';
import { resolveBuilderContent } from '@lib/resolve-builder-content';
import '../blocks/ProductGrid/ProductGrid.builder';
import '../blocks/CollectionView/CollectionView.builder';
import { useThemeUI } from '@theme-ui/core';
import { getLayoutProps } from '@lib/get-layout-props';
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks';
import { useUI } from '@components/common/context';
import Link from '@components/common/Link';

const isProduction = process.env.NODE_ENV === 'production';

builder.init(builderConfig.apiKey);

Builder.registerComponent(
  dynamic(() => import("../components/common/Searchbardemo.tsx")),
  {
    name: 'Search Bar',
    inputs: [],
    image: 'IconSearch'
  }
)

export async function getStaticProps({ params, locale }: GetStaticPropsContext<{ path: string[] }>) {
  const page = await resolveBuilderContent('page', locale, {
    urlPath: '/' + (params?.path?.join('/') || ''),
  })

  return {
    props: {
      page,
      locale,
      ...(await getLayoutProps()),
    },
    revalidate: 5,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const pages = await builder.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page, locale }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();
  const { theme } = useThemeUI();
  const addToCart = useAddItemToCart();
  const isPreviewing = useIsPreviewing();
  const { openSidebar } = useUI();

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  if (!page && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        {Builder.isBrowser && <DefaultErrorPage statusCode={404} />}
      </>
    )
  }

  const { title, description, image } = page?.data! || {};
  return (
    <div>
      {title && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title,
            description,
            locale,
            ...(image && {
              images: [
                {
                  url: image,
                  width: 800,
                  height: 600,
                  alt: title,
                },
              ],
            }),
          }}
        />
      )}
      <Head>
        <title>{page?.data.title}</title>
      </Head>
      <BuilderComponent
        options={{ includeRefs: true }}
        model="page"
        data={{ theme }}
        context={{
          productBoxService: {
            addToCart,
            navigateToCart() {
              openSidebar()
            },
            navigateToProductPage(product: { handle: string }) {
              router.push(`/product/${product.handle}`)
            },
          },
        }}
        renderLink={(props: any) => {
          if (props.target === '_blank' || props.href?.startsWith('#')) {
            return <Link as="a" {...props} />
          }
          return <Link {...props} as={Link} />
        }}
        content={page}
      />
    </div>
  );
}

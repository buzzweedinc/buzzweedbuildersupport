import { builder } from '@builder.io/react';
import Searchbar from './Searchbardemo';

builder.registerComponent(Searchbar, {
  name: 'SearchbarDemo',
  description: 'This is a search bar component',
  inputs: [
    // Define the editable props that you want to expose in the builder.io editor.
    // Note: For this example, no editable props are given. Adjust this based on your actual component props.
    // { name: 'label', type: 'string' },
  ],
});

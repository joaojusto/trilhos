import Component from './index.svelte';

export default {
  title: 'TextInput',
  component: Component,
  argTypes: {
    placeholder: { action: 'onClick' },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component,
  props: args,
  on: {
    click: onClick,
  },
});

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Email',
};

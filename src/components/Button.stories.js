import Button from './Button.svelte';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Button,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});

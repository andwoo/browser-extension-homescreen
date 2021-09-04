import templateOnly from '@ember/component/template-only';
export default templateOnly();

// interface Args {
//   imageSrc: string;
//   imageAlt: string;
//   imageUrl: string;
//   url: string;
//   tags?: Tags[];
// }

export interface Tags {
  label: string;
  icon: string;
  type: 'warning' | 'info';
}

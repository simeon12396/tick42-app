interface IFooter {
  title: string;
  className?: string;
}

const Footer = ({ title, className }: IFooter): JSX.Element => {
  return <footer className={className}>{title}</footer>;
};

export default Footer;

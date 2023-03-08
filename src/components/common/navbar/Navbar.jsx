import { Layout, Menu } from 'antd';
import logo from "../../../assets/sniffspot-logo.png";
import "./navbar.css"
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const items = [
    {
      key: 0,
      label: "Our dog parks"
    },
    {
      key: 1,
      label: "Blog"
    },
    {
      key: 2,
      label: "Top dog trainers"
    },
    {
      key: 3,
      label: "Become a host"
    }
  ]

  return (
    <Layout className='navbar-layout'>
      <Header className='navbar-header'>
        <Link to="/" className="sniffspot-link">
          <img src={logo} alt="sniffspot-logo" className="logo-img" />
        </Link>
        <Menu
          theme="light"
          mode="horizontal"
          items={items}
        />
      </Header>
    </Layout>
  );
};
export default Navbar;
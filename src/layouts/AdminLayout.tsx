import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Header style={{ color: "#fff" }}>Admin Header</Header>
      <Content style={{ padding: "20px" }}>{children}</Content>
      <Footer>Admin Footer</Footer>
    </Layout>
  );
};

export default AdminLayout;

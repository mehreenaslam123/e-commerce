import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const HostLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Header style={{ color: "#fff" }}>Host Header</Header>
      <Content style={{ padding: "20px" }}>{children}</Content>
      <Footer>Host Footer</Footer>
    </Layout>
  );
};

export default HostLayout;

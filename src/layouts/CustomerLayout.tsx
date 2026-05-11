import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ background: "#fff" }}>
      {/* <Header style={{ color: "#fff" }}>Customer Header</Header> */}
      <Content style={{ padding: "14px", background: "#fff" }}>{children}</Content>
      {/* <Footer>Customer Footer</Footer> */}
    </Layout>
  );
};

export default CustomerLayout;

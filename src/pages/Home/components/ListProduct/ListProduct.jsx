import "./ListProduct.scss";
import { Row, Col, Flex, Button } from "antd";
import { Product } from "../../../../components/Product/Product";
import { Container } from "../../../../components/Container/Container";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="listProduct">
      <Container>
        <h2 className="listProduct-title">DANH SÁCH SẢN PHẨM</h2>
        <Row gutter={16}>
          {products.slice(0, 6).map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4} style={{ height: "100%" }}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
        <Flex justify="center">
          <Button className="listProduct-btn" onClick={() => navigate("/category")}>
            Xem tất cả sản phẩm
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

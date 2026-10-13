import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/Slices/cartSlice";
import axios from "axios";
import heroimage1 from "../assets/Image 1.webp";
import heroimage2 from "../assets/Image 2.webp";
import heroimage3 from "../assets/Image 3.webp";
import CategoryList from "../components/CategoryList";
import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiCreditCard,
  FiArrowRight,
  FiShoppingCart,
  FiStar,
  FiEye,
} from "react-icons/fi";

export default function Home() {
  const dispatch = useDispatch();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const HeroImages = [
    {
      image: heroimage1,
      badge: "Exclusive Collection",
      title: "Elevate Your Everyday Style & Gadgets",
      description: "Discover curated collections from top global brands with up to 40% discount.",
      btnText: "Explore Collection",
    },
    {
      image: heroimage2,
      badge: "New Season Arrivals",
      title: "Cutting-Edge Electronics & Gear",
      description: "Smartphones, laptops, and smart accessories engineered for modern life.",
      btnText: "Shop Electronics",
    },
    {
      image: heroimage3,
      badge: "Limited Time Offers",
      title: "Unbeatable Deals on Home & Essentials",
      description: "Quality goods delivered swiftly to your doorstep with guaranteed customer satisfaction.",
      btnText: "Browse All Deals",
    },
  ];

  const features = [
    {
      icon: <FiTruck size={28} className="text-primary" />,
      title: "Free Fast Shipping",
      desc: "On orders over $50 with live tracking",
    },
    {
      icon: <FiShield size={28} className="text-success" />,
      title: "Money-Back Guarantee",
      desc: "30-day hassle-free return policy",
    },
    {
      icon: <FiHeadphones size={28} className="text-warning" />,
      title: "24/7 Priority Support",
      desc: "Friendly assistance anytime you need",
    },
    {
      icon: <FiCreditCard size={28} className="text-info" />,
      title: "Secure Payments",
      desc: "100% encrypted & protected checkouts",
    },
  ];

  const categories = [
    { name: "Beauty & Cosmetics", slug: "beauty", emoji: "💄" },
    { name: "Fragrances & Perfumes", slug: "fragrances", emoji: "✨" },
    { name: "Furniture & Decor", slug: "furniture", emoji: "🛋️" },
    { name: "Groceries & Food", slug: "groceries", emoji: "🥑" },
  ];

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoadingFeatured(true);
        const response = await axios.get("https://dummyjson.com/products?limit=4&skip=0");
        setFeaturedProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="pb-5">
      {/* Hero Carousel */}
      <Container fluid className="px-0 mb-4">
        <Carousel className="hero-carousel" interval={5000}>
          {HeroImages.map((img, index) => (
            <Carousel.Item key={index}>
              <div className="position-relative" style={{ height: "480px" }}>
                <img
                  src={img.image}
                  alt={img.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)",
                  }}
                  className="d-block"
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-center p-3"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <div style={{ maxWidth: "700px" }} className="text-white">
                    <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill fs-6">
                      {img.badge}
                    </Badge>
                    <h1 className="fw-bold display-5 mb-3">{img.title}</h1>
                    <p className="lead mb-4 text-light opacity-90">{img.description}</p>
                    <Button
                      as={Link}
                      to="/products"
                      variant="light"
                      size="lg"
                      className="rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow"
                    >
                      {img.btnText} <FiArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container fluid className="my-5">
        <CategoryList />
      </Container>

      <Container>
        {/* Features Row */}
        <Row className="g-3 my-4">
          {features.map((item, idx) => (
            <Col md={3} sm={6} key={idx}>
              <Card className="h-100 border-0 shadow-sm p-3 rounded-4 bg-body text-center feature-card">
                <div className="mb-2">{item.icon}</div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Categories Section */}
        <div className="my-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold mb-1">Shop by Popular Categories</h3>
              <p className="text-muted mb-0">Browse through our most loved shopping categories</p>
            </div>
            <Button
              as={Link}
              to="/products"
              variant="outline-primary"
              size="sm"
              className="rounded-pill px-3"
            >
              All Categories →
            </Button>
          </div>

          <Row className="g-3">
            {categories.map((cat, idx) => (
              <Col md={3} sm={6} key={idx}>
                <Card
                  as={Link}
                  to={`/products`}
                  className="p-4 border-0 shadow-sm rounded-4 text-center text-decoration-none text-reset bg-body h-100 category-box"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="display-4 mb-2">{cat.emoji}</div>
                  <h6 className="fw-bold mb-1">{cat.name}</h6>
                  <span className="text-primary small fw-semibold">Discover items →</span>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Featured Products Section */}
        <div className="my-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold mb-1">Featured Products</h3>
              <p className="text-muted mb-0">Handpicked top deals and trending selections</p>
            </div>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              className="rounded-pill px-4 shadow-sm"
            >
              View All Products
            </Button>
          </div>

          {loadingFeatured ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="text-muted mt-2">Loading featured items...</p>
            </div>
          ) : (
            <Row className="g-4">
              {featuredProducts.map((product) => (
                <Col lg={3} md={6} key={product.id}>
                  <Card className="shadow-sm h-100 border-0 rounded-4 overflow-hidden product-card d-flex flex-column">
                    <div
                      className="bg-body-tertiary d-flex align-items-center justify-content-center p-3 position-relative"
                      style={{ height: "200px" }}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ maxHeight: "160px", objectFit: "contain" }}
                      />
                      {product.discountPercentage && (
                        <Badge
                          bg="danger"
                          className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded-pill"
                        >
                          -{Math.round(product.discountPercentage)}%
                        </Badge>
                      )}
                    </div>
                    <Card.Body className="p-3 d-flex flex-column flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted text-capitalize small">
                          {product.category}
                        </span>
                        <span className="badge bg-warning text-dark d-flex align-items-center gap-1">
                          <FiStar size={12} /> {product.rating}
                        </span>
                      </div>
                      <Card.Title className="fs-6 fw-bold text-truncate mb-1" title={product.title}>
                        {product.title}
                      </Card.Title>
                      <div className="d-flex align-items-baseline gap-2 mt-auto mb-2">
                        <span className="fs-5 fw-bold text-success">${product.price}</span>
                        {product.discountPercentage && (
                          <span className="text-muted small text-decoration-line-through">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 pt-0 pb-3 px-3 d-flex gap-2">
                      <Button
                        as={Link}
                        variant="outline-secondary"
                        size="sm"
                        to={`/product-details/${product.id}`}
                        className="flex-fill d-flex align-items-center justify-content-center gap-1 rounded-pill"
                      >
                        <FiEye size={14} /> Details
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => dispatch(addToCart(product))}
                        className="flex-fill d-flex align-items-center justify-content-center gap-1 rounded-pill"
                      >
                        <FiShoppingCart size={14} /> Add
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Promo Banner */}
        <div className="my-5 p-4 p-md-5 rounded-4 bg-gradient text-white text-center shadow-lg position-relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)" }}>
          <h2 className="fw-bold mb-2">Get 20% Off Your Entire Order!</h2>
          <p className="lead mb-4 opacity-90">
            Use promo coupon code <strong className="badge bg-warning text-dark px-3 py-2 fs-6">SUPER20</strong> at checkout to claim your savings.
          </p>
          <Button
            as={Link}
            to="/products"
            variant="light"
            size="lg"
            className="rounded-pill px-5 fw-semibold shadow"
          >
            Start Shopping Now
          </Button>
        </div>
      </Container>
    </div>
  );
}

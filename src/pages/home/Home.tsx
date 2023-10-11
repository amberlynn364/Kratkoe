import { useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AlertView from "../../components/alertView/AlertView";
import Header from "../../components/header/Header";
import isSuccess from "../../store/features/registration/registrationSelector";
import Footer from "../../components/footer/Footer";
import getProductCountFromCart from "../../utils/getProductCountFromCart";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Home.module.scss";
import RouterPaths from "../../router/routes";
import promoCodes from "../../data/promoCodes";

export default function Home() {
  const dispatch = useAppDispatch();
  const isSuccessSelector = useSelector(isSuccess);

  useEffect(() => {
    const updateCountFromCart = async () => {
      dispatch(setCount(await getProductCountFromCart()));
    };

    updateCountFromCart();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        className={styles.container}
      >
        <div className={styles["promo-code-wrapper"]}>
          <h1 className={styles.title}>Available promo codes:</h1>
          <div className={styles["card-wrapper"]}>
            {promoCodes.map((promoCode) => (
              <Card
                sx={{ maxWidth: 345 }}
                key={promoCode.name}
              >
                <CardMedia
                  sx={{ height: 140, backgroundSize: "100% 100%" }}
                  image={promoCode.image}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {promoCode.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {promoCode.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    fullWidth
                    component={Link}
                    to={RouterPaths.Basket}
                  >
                    go to Shopping Cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      {isSuccessSelector && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="outlined"
          textContent="Registration successful! You're now logged in!"
        />
      )}
      <Footer />
    </>
  );
}

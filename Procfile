import { useState, useEffect, useCallback, useRef } from "react";
import styles from '../../styles/main.module.css'
import Head from 'next/head';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import NotificationList from "../components/notification";
import ShimmerDownListLoading from "../components/list_down";
// import ToggleButton from "../components/toggleButton";
import { sleep } from "../utils/fn";
import logo from "../../public/images/icon.png";
import loading from "../../public/images/loading.gif";
// import useMetadata from "../hooks/useMetadata"; // Adjust path as needed
import EditProfile from "../components/home/editProfile";
import ReferPolicys from "../components/home/refer";
import SellerInfo from "../components/home/sellerInfo";
import TypeRefer from "../components/home/typeRefer";
import Address from "../components/home/address";
import Sales from "../components/home/sale";
import Earnig from "../components/home/earning";

import { FaRegCircleUser, FaMoneyBillTrendUp } from "react-icons/fa6";
import {
  CiLocationOn,
  CiShoppingCart,
  CiShop,
  CiUser,
} from "react-icons/ci";
import { RiSecurePaymentLine, RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  IoIosPricetag,
  IoMdSearch,
  IoIosNotificationsOutline,
  IoIosHeart,
} from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FaExchangeAlt, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoHeart, IoClose } from "react-icons/io5";
import {
  MdDownloadDone,
  MdOutlineSupportAgent,
  MdOutlineRateReview,
} from "react-icons/md";
import { LuMapPin, LuTruck } from "react-icons/lu";

const ToggleButton = dynamic(() => import('../components/toggleButton'), {
  ssr: false, // Disable SSR for this component
});

const Home = ({ socket, SERVER_URL }) => {
  // const helmet = useMetadata("home");
  const router = useRouter();
  const [User, setUser] = useState(null);
  const [accInfo, setAcc] = useState(false);
  const [categoryList, setCategoryList] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [deliveryToggle, setDeliveryToggle] = useState(false);
  const [sellerToggle, setSellerToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [earnigToggle, setEarnigToggle] = useState(false);
  const [cartMsg, setcartMsg] = useState({
    status: false,
    msg: "not found",
    list: [],
  });
  const [topImg, setTopImg] = useState({
    status: false,
    img: [],
  });
  const [offers, setOffers] = useState({
    status: false,
    price: "not found",
    title: "not found",
    desc: "not found",
    img: "not found",
    id: false,
  });
  const [product, setProduct] = useState({
    status: false,
    1: {
      scroll: 1,
      px: 0,
      head: "Today Offer's",
      list: [],
    },
    2: {
      scroll: 1,
      px: 0,
      head: "Shoes",
      list: [],
    },
    3: {
      scroll: 1,
      px: 0,
      head: "Watches",
      list: [],
    },
  });
  const [events, setEvents] = useState({
      1: {}, // data be like
      2: {}, // img: for image, {status: must}
      3: {}  // go: to redirect when clikes
  });
  const [notification, setNotification] = useState({
    status: false,
    list: [],
  });
  const [notifications, setNotifications] = useState({
    status: true,
    data: [],
  });
  const [bhpup, setBhpup] = useState({
    status: false,
    for: "",
  });
  const [menu, setMenu] = useState(false);
  const contentRefs = useRef([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const getCurrPath = sessionStorage.getItem("currentUrl");
      if (!getCurrPath) {
        sessionStorage.setItem("currentUrl", router.pathname);
        sessionStorage.setItem("previousUrl", "undefined");
      } else if (router.pathname !== getCurrPath) {
        sessionStorage.setItem("previousUrl", getCurrPath);
        sessionStorage.setItem("currentUrl", router.pathname);
      }
    }
  }, [router.pathname]);
  useEffect(() => {
    const storedUser = localStorage.getItem("AUTH-T");
    const User = storedUser ? JSON.parse(storedUser) : {};
    setUser(User);
    const rootes = ["cart", "notification", "account"];
    const h_m_cart_cart = sessionStorage.getItem("h_m_cart_cart");
    const h_m_notitification = sessionStorage.getItem("h_m_notitification");
    if(h_m_cart_cart !== null)  {
      setcartMsg(h_m_cart_cart);
    };
    if(h_m_notitification !== null) {
      setNotification(h_m_notitification);
    };
    const h_m_data_product = sessionStorage.getItem("h_m_data_product");
    const h_m_data_top_img = sessionStorage.getItem("h_m_data_top_img");
    const h_m_data_offer = sessionStorage.getItem("h_m_data_offer");
    const h_m_data_category = sessionStorage.getItem("h_m_data_category");
    const h_m_data_latestProductsList = sessionStorage.getItem("h_m_data_latestProductsList");
    const h_m_data_events = sessionStorage.getItem("h_m_data_events");
    if(!h_m_data_top_img ||
       !h_m_data_product ||
       !h_m_data_offer ||
       !h_m_data_category ||
       !h_m_data_latestProductsList ||
       !h_m_data_events) {
        socket.emit("home-updates", {
          auth: User,
          pr: h_m_data_product !== null,
          of: h_m_data_offer !== null,
          ti: h_m_data_top_img !== null,
          ca: h_m_data_category !== null,
          la: h_m_data_latestProductsList !== null,
          ev: h_m_data_events !== null,
        });
       } else {
        document.querySelector(".loading_home").style.display = "none";
        document.querySelector(".loading_main_homepage").style.display = "block";
        if(h_m_data_product) setProduct(JSON.parse(h_m_data_product));
        if(h_m_data_top_img) setTopImg(JSON.parse(h_m_data_top_img));
        if(h_m_data_offer) setOffers(JSON.parse(h_m_data_offer));
        if(h_m_data_category) setCategoryList(JSON.parse(h_m_data_category));
        if(h_m_data_latestProductsList) setLatestProducts(JSON.parse(h_m_data_latestProductsList));
        if(h_m_data_events) setEvents(JSON.parse(h_m_data_events));
       };
    const animation = document.querySelector(".loading_home");
    const head = document.querySelector(".head_home");
    const mainDiv = document.querySelector(".main_homepage");
    const cart = document.querySelector(".home_cart");
    const notification = document.querySelector(".home_notification");
    const profile = document.querySelector(".home_profile");

    const isSharedBy = location.search
      ? new URLSearchParams(location.search)
      : false;
    const sharedAddress = isSharedBy ? isSharedBy.get("refer_smr_id") : false;
    if (!User || !User.reg_pkocd) {
      if (sharedAddress) {
        localStorage.setItem(
          "AUTH-T",
          JSON.stringify({
            from_ref_id: sharedAddress,
            reg_pkocd: false,
            next_my_ref: undefined,
          })
        );
      }
    }
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (rootes.includes(hash)) {
        if (hash === "cart") {
          animation.style.display = "none";
          head.style.display = "flex";
          mainDiv.style.display = "none";
          cart.style.display = "block";
          notification.style.display = "none";
          profile.style.display = "none";
          socket.emit("cart-update", {
            auth: User,
          });
        } else if (hash === "notification") {
          head.style.display = "flex";
          mainDiv.style.display = "none";
          cart.style.display = "none";
          notification.style.display = "block";
          profile.style.display = "none";
          socket.emit("notification-update", {
            auth: User,
          });
        } else {
        }
      }
    };
    socket.on("lists-of-products-home", (product) => {
      const animation = document.querySelector(".loading_home");
      document.querySelector(".loading_main_homepage").style.display = "block";
      sessionStorage.setItem("h_m_data_product", JSON.stringify(product.product));
      sessionStorage.setItem("h_m_data_top_img", JSON.stringify(product.top_img));
      sessionStorage.setItem("h_m_data_offer", JSON.stringify(product.offer));
      sessionStorage.setItem("h_m_data_category", JSON.stringify(product.category));
      sessionStorage.setItem("h_m_data_latestProductsList", JSON.stringify(product.latestProductsList));
      sessionStorage.setItem("h_m_data_events", JSON.stringify(product.events));
      setProduct(product.product);
      setTopImg(product.top_img);
      setOffers(product.offer);
      setCategoryList(product.category);
      setLatestProducts(product.latestProductsList);
      setEvents(product.events);
      if (!product.client && User && User.reg_pkocd) {
        let b = User;
        b.reg_pkocd = false;
        localStorage.setItem("AUTH-T", JSON.stringify(b));
        const error = document.querySelector(".error_home");
        error.style.display = "block";
        error.innerText = "Internal server Error!";
        setTimeout(() => {
          error.style.display = "none";
        }, 2250);
      } else {
        setAcc(product.client);
      }
    });
    if (User && User.reg_pkocd) {
      socket.on("cart-updates", (list) => {
        sessionStorage.setItem("h_m_cart_cart", JSON.stringify(list));
        setcartMsg(list);
      });
      socket.on("notification-updates", (list) => {
        sessionStorage.setItem("h_m_notitification", JSON.stringify(list));
        setNotification(list);
      });
    } else {
      const dateTimeNow = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });
      const dateNow = dateTimeNow.split(",")[0].trim();
      const timeNow = dateTimeNow.split(",")[1].trim();

      setNotification({
        status: true,
        list: [
          {
            title: "Signup & get extra offer",
            date: dateNow,
            time: timeNow,
            send: "inrl",
            description:
              "Sign up for your first product today and unlock exclusive extra offers on all our products!",
          },
          {
            title: "Purchase & get Extra Upto 20%",
            date: dateNow,
            time: timeNow,
            send: "inrl",
            description:
              "Sign up now and get up to 20% off on your first purchase!",
          },
        ],
      });
    };
  }, []);
  useEffect(() => {
    if(!product.status) return;
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Observe each content element
    contentRefs.current.forEach((ref) => ref && observer.observe(ref));

    // Cleanup function to unobserve on component unmount
    return () => observer.disconnect();
  }, [product]);
  useEffect(() => {
    const divScrollOne = document.querySelector(".three_div_one");
    const divScrollTwo = document.querySelector(".three_div_two");
    const divScrollThree = document.querySelector(".three_div_three");
    socket.on("new-more-products-home", (newProduct) => {
      if (newProduct.id === 1) {
        let list = [...product["1"].list];
        list.pop();
        list = list.concat(newProduct.list);
        setProduct((a) => ({
          description: a.description,
          1: {
            scroll: newProduct.scroll,
            px: newProduct.px,
            head: a["1"].head,
            list: [...list],
          },
          2: {
            ...a["2"],
          },
          3: {
            ...a["3"],
          },
        }));
      } else if (newProduct.id === 2) {
        let list = [...product["2"].list];
        list.pop();
        list = list.concat(newProduct.list);
        setProduct((a) => ({
          description: a.description,
          1: {
            ...a["1"],
          },
          2: {
            scroll: newProduct.scroll,
            px: newProduct.px,
            head: a["2"].head,
            list: [...list],
          },
          3: {
            ...a["3"],
          },
        }));
      } else if (newProduct.id === 3) {
        let list = [...product["3"].list];
        list.pop();
        list = list.concat(newProduct.list);
        setProduct((a) => ({
          description: a.description,
          1: {
            ...a["1"],
          },
          2: {
            ...a["2"],
          },
          3: {
            scroll: newProduct.scroll,
            px: newProduct.px,
            head: a["3"].head,
            list: [...list],
          },
        }));
      }
    });
    const scrollEventOne = (e) => {
      const storedUser = localStorage.getItem("AUTH-T");
      const User = storedUser ? JSON.parse(storedUser) : {};
      const scrolled = e.target.scrollLeft + divScrollOne.clientWidth;
      if (
        scrolled === divScrollOne.scrollWidth &&
        scrolled !== product["1"].px &&
        product["1"].list.slice(-1)[0].type !== "done"
      ) {
        socket.emit("show-more-product-home", {
          px: scrolled,
          scroll: product["1"].scroll,
          list: 1,
          auth: User,
          heading: product["1"].head,
        });
      }
    };
    const scrollEventTwo = (e) => {
      const storedUser = localStorage.getItem("AUTH-T");
      const User = storedUser ? JSON.parse(storedUser) : {};
      const scrolled = e.target.scrollLeft + divScrollTwo.clientWidth;
      if (
        scrolled === divScrollTwo.scrollWidth &&
        scrolled !== product["2"].px &&
        product["2"].list.slice(-1)[0].type !== "done"
      ) {
        socket.emit("show-more-product-home", {
          px: scrolled,
          scroll: product["2"].scroll,
          list: 2,
          auth: User,
          heading: product["2"].head,
        });
      }
    };
    const scrollEventThree = (e) => {
      const storedUser = localStorage.getItem("AUTH-T");
      const User = storedUser ? JSON.parse(storedUser) : {};
      const scrolled = e.target.scrollLeft + divScrollThree.clientWidth;
      if (
        scrolled === divScrollThree.scrollWidth &&
        scrolled !== product["3"].px &&
        product["3"].list.slice(-1)[0].type !== "done"
      ) {
        socket.emit("show-more-product-home", {
          px: scrolled,
          scroll: product["3"].scroll,
          list: 3,
          auth: User,
          heading: product["3"].head,
        });
      }
    };
    divScrollOne.addEventListener("scroll", scrollEventOne);
    divScrollTwo.addEventListener("scroll", scrollEventTwo);
    divScrollThree.addEventListener("scroll", scrollEventThree);
    return () => {
      divScrollOne.removeEventListener("scroll", scrollEventOne);
      divScrollTwo.removeEventListener("scroll", scrollEventTwo);
      divScrollThree.removeEventListener("scroll", scrollEventThree);
    };
  }, [product]);
  useEffect(() => {
    const main = document.querySelector(".top_offers_home");
    if (!main) return;
    const price = document.querySelector(".top-offers-home #price");
    const time = document.querySelector(".top-offers-home #time");
    let interval;
    if (offers.status) {
      interval = setInterval(() => {
        const time1 = new Date();
        const timeNow = new Date()
          .toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })
          .split(",")[1]
          .replace(/[^0-9:]/g, "")
          .split(":");
        time1.setHours(timeNow[0], timeNow[1], timeNow[2]);
        const time2 = new Date();
        time2.setHours(
          offers.time.split(":")[0],
          offers.time.split(":")[1],
          offers.time.split(":")[2]
        );
        const timeDiff = time2.getTime() - time1.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        price.innerText = offers.price;
        time.innerText = `offer ends in ${hours} hour's,${minutes} minutes, ${seconds} seconds.`;
        main.style.display = "flex";
        if ((hours === 0 && minutes === 0 && seconds === 0) || seconds < 0) {
          main.style.display = "none";
          setOffers({
            status: false,
            price: "not found",
            title: "not found",
            desc: "not found",
            img: "not found",
          });
          clearInterval(interval);
        }
      }, 1000);
    } else if (!offers.status) {
      main.style.display = "none";
      //clearInterval(interval)
    }
  }, [offers]);
  useEffect(() => {
    if (topImg.status !== true) return;
    const mD = document.querySelector(".list_fortop_imgs");
    if (!mD) return;
    const maxScroll = mD.scrollWidth - mD.clientWidth;
    let i = 0,
      isInTouch = false;

    const interval = setInterval(() => {
      if (isInTouch === false) {
        const previousDot = document.querySelector(".topdots" + i);
        if (previousDot) previousDot.classList.remove("new_classfordot");
        i = (i + 1) % topImg.img.length;

        const currentDot = document.querySelector(".topdots" + i);
        if (currentDot) currentDot.classList.add("new_classfordot");

        const scrollAmount = mD.clientWidth * i;
        if (scrollAmount > maxScroll) {
          mD.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          mD.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }, 2000);
    function handleMouseOver() {
      isInTouch = true;
    }
    function handleMouseOut() {
      isInTouch = false;
    }
    mD.addEventListener("touchstart", handleMouseOver);
    mD.addEventListener("touchend", handleMouseOut);
    return () => clearInterval(interval);
  }, [topImg]);
  useEffect(() => {
    const mD = document.querySelector(".scrl_ctgy_hm");
    const element = document.querySelector(".scrl-ctgy-hm div");
    if (!mD || !categoryList || !element) return;
    let i = 0,
      isInTouch = false;
    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (isInTouch === false) {
        i = (i + 1) % categoryList.length;

        scrollAmount += element.offsetWidth;
        if (scrollAmount >= mD.scrollWidth) {
          scrollAmount = 0;
          mD.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          mD.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }, 2000);
    function handleMouseOver() {
      isInTouch = true;
    }
    function handleMouseOut() {
      isInTouch = false;
    }
    mD.addEventListener("touchstart", handleMouseOver);
    mD.addEventListener("touchend", handleMouseOut);
    return () => clearInterval(interval);
  }, [categoryList]);
  const checkMenu = useCallback(() => {
    if (menu === false) {
      document.querySelector(".menu_home").style.width = "250px";
      setTimeout(function () {
        document.querySelector(".menu_home").classList.add("load-menu");
      }, 400);
    } else {
      document.querySelector(".menu_home").classList.remove("load-menu");
      document.querySelector(".menu_home").style.width = "0";
    }
    setMenu((a) => !a);
  }, [menu]);
  const cartUpdate = (id, f, a) => {
    a.isOnCart = f;
    const element = document.getElementById("cart-p" + id);
    element.style.color = f ? "red" : "gray";
    if(User && User.reg_pkocd) {
      f ? socket.emit("add-to-cart", { auth: User, id }) : socket.emit("remove-from-cart", { id, auth: User });
    }
  };
  const inputHome = async (e) => {
    e.preventDefault();
    const text = document.querySelector(".home-search #input");
    if (!text.value) {
      text.placeholder = "Enter something to search...";
      text.style.border = "1px solid red";
      await sleep(2000);
      text.style.border = "1px solid #000";
      text.placeholder = "Search for Products...";
    } else {
      router.push(`/search`, { state: { id: text.value } });
    }
  };
  const switchPage = useCallback(
    (page) => {
      const animation = document.querySelector(".loading_home");
      const head = document.querySelector(".head_home");
      const mainDiv = document.querySelector(".main_homepage");
      const cart = document.querySelector(".home_cart");
      const notification = document.querySelector(".home_notification");
      const profile = document.querySelector(".home_profile");
      if (page === "home") {
        head.style.display = "flex";
        mainDiv.style.display = "block";
        cart.style.display = "none";
        notification.style.display = "none";
        profile.style.display = "none";
        if (!product.status) {
          socket.emit("home-updates", { auth: User });
          animation.style.display = "block";
        }
      } else if (page === "cart") {
        head.style.display = "flex";
        mainDiv.style.display = "none";
        cart.style.display = "block";
        notification.style.display = "none";
        profile.style.display = "none";
        if (!cartMsg.status) {
          socket.emit("cart-update", {
            auth: User,
          });
        }
      } else if (page === "notification") {
        head.style.display = "flex";
        mainDiv.style.display = "none";
        cart.style.display = "none";
        notification.style.display = "block";
        profile.style.display = "none";
        if (!notification.status) {
          socket.emit("notification-update", {
            auth: User,
          });
        }
      } else if (page === "profile") {
        head.style.display = "none";
        mainDiv.style.display = "none";
        cart.style.display = "none";
        notification.style.display = "none";
        profile.style.display = "block";
      }
    },
    [product, notification, cartMsg, User]
  );

  const removeFromCart = useCallback(
    (id) => {
      const icon = document.getElementById(id);
      if (icon.style.color === "gray") {
        icon.style.color = "red";
        socket.emit("add-to-cart", {
          id: id.replace("cart-cc", ""),
          auth: User,
        });
      } else {
        icon.style.color = "gray";
        socket.emit("remove-from-cart", {
          id: id.replace("cart-cc", ""),
          auth: User,
        });
      }
    },
    [User]
  );
  const loginNow = () => {
    localStorage.removeItem("AUTH-T")
    router.push("/login");
  };
  const myOrder = (id) => {
    return router.push("/myorders", { state: { id } });
  };
  const loadProduct = (id) => {
    router.push("/product", { state: { id } });
  };
  const goToNewOffers = (id) => {
    id ? router.push(`/offer/${id}`) : router.push(`/offer`);
  };
  const openB = (For) => {
    const div = document.querySelector(".btm_ph");
    const bg = document.querySelector(".f_b_hp");
    if (For === "edit") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "edit",
      });
    } else if (For === "sale") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "sale",
      });
    } else if (For === "refer") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "refer",
      });
    } else if (For === "address") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "address",
      });
    } else if (For === "reviews") {
      //return router.push('/activities/reviews');
    } else if (For === "terms") {
      //return router.push('/support/terms');
    } else if (For === "right us") {
      // return router.push('/support/rightus');
    } else if (For === "earn") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "earn",
      });
    } else if (For === "typeRefer") {
      div.style.display = "block";
      bg.style.filter = "blur(1px)";
      setBhpup({
        status: true,
        for: "typeRefer",
      });
    }
  };
  const closeB = () => {
    document.querySelector(".btm_ph").style.display = "none";
    document.querySelector(".f_b_hp").style.filter = "none";
  };
  const openPp = () => {
    document.querySelector(".popup_hp").style.display = "block";
    document.querySelector(".f_b_hp").style.filter = "blur(3px)";
  };
  const closePp = () => {
    setBhpup({
      status: false,
      for: "",
    });
  };
  const dltAcc = () => {};
  const renderTo = (i) => {
    return router.push(i);
  };

  return (
    <>
    <Head>
        <style>{`
          img {
            transition: transform 0.3s ease;
          }
        `}</style>
      </Head>
      <div>
      {/* {helmet} */}
      <NotificationList
        socket={socket}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <header className={styles.head_home}>
        {menu ? (
          <IoClose onClick={checkMenu} className={styles.close} />
        ) : (
          <AiOutlineMenu onClick={checkMenu} className={styles.icon} />
        )}
        <img loading="lazy" className={styles.home_logo} src={logo} alt="Logo" />
        <div className={styles.home_top_admin}></div>
        <IoIosHeart className={styles.wish} />
        <MdOutlineSupportAgent
          className={styles.support}
          onClick={() => renderTo("/support")}
        />
        {accInfo && accInfo.img ? (
          <img loading="lazy" className={styles.user_logo} src={accInfo.img} />
        ) : (
          <FaRegCircleUser className={styles.show_user_info_home}></FaRegCircleUser>
        )}
      </header>
      <div className={styles.menu_home}>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#sale">Sale Items</a>
        <a href="#new-arrivals">New Arrivals</a>
        <a href="#popular">Popular</a>
        <a href="#categories">Categories</a>
        <a href="#cart">Cart</a>
        <a href="#wishlist">Wishlist</a>
        <a href="#profile">Profile</a>
      </div>
      <div className={styles.main_homepage}>
        <img loading="lazy" alt="Loading" className={styles.loading_home} src={loading} />
        <div className={styles.loading_main_homepage}>
          <form className={styles.home_search} onSubmit={inputHome}>
            <input
              type="text"
              id="input"
              placeholder="Search for Products..."
            />
            <IoMdSearch id="search" onClick={inputHome} />
          </form>
          <p className={styles.discount_msg}>
            <CiLocationOn id="location" /> Add delivery location to check extra
            discount
          </p>
          <div className={styles.users_attract}>
            <div className={styles.secure_ua}>
              <RiSecurePaymentLine className={styles.icon_ua} />
              <p>secure transaction</p>
            </div>
            <div className={styles.delivery_ua}>
              <LuTruck className={styles.icon_ua} />
              <p>fast delivery</p>
            </div>
            <div className={styles.price_ua}>
              <IoIosPricetag className={styles.icon_ua} />
              <p>affordable price</p>
            </div>
            <div className={styles.support_ua}>
              <BiSupport className={styles.icon_ua} />
              <p>customer support</p>
            </div>
            <div className={styles.exchange_ua}>
              <FaExchangeAlt className={styles.icon_ua} />
              <p>easy exchange</p>
            </div>
          </div>
          {topImg.status === true && topImg.img.length !== 0 ? (
            <div className={styles.scrollable_imgs}>
              <div className={styles.list_fortop_imgs}>
                {topImg.img.map((a, i) => (
                  <div
                    className={styles.imgs_tos}
                    key={i}
                    onClick={() => renderTo(a.to)}
                  >
                    <img loading="lazy" src={a.img} alt={a.to.replace(/_/g, " ")} />
                  </div>
                ))}
              </div>
              <div className={styles.for_list_dots}>
                <div className={styles.for_shadow_todot}>
                  {topImg.img.map((_, i) => (
                    <p key={i} className={`topdots${i} dotslist-all`}></p>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {
            events[1] && <img loading="lazy" className={styles.events_img} src={events[1].img} alt={events[1].go} onClick={() => renderTo(events[1].go)} />
          }
          {offers.status === true ? (
            <div
              className={styles.top_offers_home}
              onClick={() => goToNewOffers(offers.id)}
            >
              <img loading="lazy" src={offers.img} alt="today offer" />
              <div id="infos">
                <p id="title">{offers.title}</p>
                <p id="desc">{offers.desc}</p>
                <p id="price">loading...</p>
                <p id="time">not found</p>
              </div>
            </div>
          ) : null}
          <div className={styles.three_div_one}>
          <h2 className={styles.catogery_div_one}>{product["1"].head}</h2>
          <div className={styles.divsion}>
          {product["1"].list.map((a, index) =>
              a.type === "loading" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <img loading="lazy"
                    alt="Loading"
                    className={styles.last_loading_product}
                    src={loading}
                  />
                </div>
              ) : a.type === "done" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <h3>There have no more products to load</h3>
                </div>
              ) : (
                <div
                  key={index}
                  className={styles.prodcts_list_home}
                  id={"infoPLH" + a.id}
                >
                  <div
                    className={styles.product_info_home}
                    id={"infoPIH" + a.id}
                  >
                    <div className={styles.image}>
                    <IoIosHeart
                        className={styles.heart}
                        id={"cart-p" + a.id}
                        onClick={() => cartUpdate(a.id, a.isOnCart ? false : true, a)}
                        size={25}
                        style={{
                          color: a.isOnCart ? "red" : "gray",
                        }}
                      />
                      <img loading="lazy" 
                      alt={a.name} 
                      src={a.img}
                      onClick={() => loadProduct(a.id)}
                      />
                      <p>{Math.ceil(((a.price-a.discountPrice) / a.price) * 100)}% discount</p>
                    </div>
                    <div onClick={() => loadProduct(a.id)}>
                    <p id="name">{a.name}</p>
                    <p id="price">
                      Price: ₹{a.price}
                      <del>₹{a.discountPrice}</del>
                    </p>
                    <p
                      id="desc"
                      dangerouslySetInnerHTML={{ __html: a.description }}
                    />
                    </div>
                  </div>
                  <div className={styles.product_onclick_hm} id={"infoANH" + a.id}>
                    <img loading="lazy"
                      alt="p-bh"
                      src={loading}
                      className={styles.last_loading_product}
                    />
                  </div>
                </div>
              )
            )}
          </div>
          </div>
          {
            events[2] && <img loading="lazy" className={styles.events_img} src={events[2].img} alt={events[2].go} onClick={() => renderTo(events[2].go)} />
          }
          <div className={styles.top_category_home_sl}>
            <h2>Trending Categorys</h2>
            <div className={styles.scrl_ctgy_hm}>
              {categoryList &&
                categoryList.map((a, i) => (
                  <div key={i} onClick={() => renderTo(`/category/${a.to}`)}>
                    <img loading="lazy" src={a.img} alt={a.to} />
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.three_div_two}>
          <h2 className={styles.catogery_div}>{product["2"].head}</h2>
          <div className={styles.divsion}>
          {product["2"].list.map((a, index) =>
              a.type === "loading" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <img loading="lazy"
                    alt="Loading"
                    className={styles.last_loading_product}
                    src={loading}
                  />
                </div>
              ) : a.type === "done" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <h3>There have no more products to load</h3>
                </div>
              ) : (
                <div
                  key={index}
                  className={styles.prodcts_list_home}
                  id={"infoPLH" + a.id}
                >
                  <div
                    className={styles.product_info_home}
                    id={"infoPIH" + a.id}
                  >
                    <div className={styles.image}>
                    <IoIosHeart
                        className={styles.heart}
                        id={"cart-p" + a.id}
                        onClick={() => cartUpdate(a.id, a.isOnCart ? false : true, a)}
                        size={25}
                        style={{
                          color: a.isOnCart ? "red" : "gray",
                        }}
                      />
                      <img loading="lazy" 
                      alt={a.name} 
                      src={a.img}
                      onClick={() => loadProduct(a.id)}
                      />
                      <p>{Math.ceil(((a.price-a.discountPrice) / a.price) * 100)}% discount</p>
                    </div>
                    <div onClick={() => loadProduct(a.id)}>
                    <p id="name">{a.name}</p>
                    <p id="price">
                      Price: ₹{a.price}
                      <del>₹{a.discountPrice}</del>
                    </p>
                    <p
                      id="desc"
                      dangerouslySetInnerHTML={{ __html: a.description }}
                    />
                    </div>
                  </div>
                  <div className={styles.product_onclick_hm} id={"infoANH" + a.id}>
                    <img loading="lazy"
                      alt="Loading"
                      src={loading}
                      className={styles.last_loading_product}
                    />
                  </div>
                </div>
              )
            )}
          </div>
          </div>
          <div className={styles.three_div_three}>
          <h2 className={styles.catogery_div}>{product["3"].head}</h2>
          <div className={styles.divsion}>
          {product["3"].list.map((a, index) =>
              a.type === "loading" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <img loading="lazy"
                    alt="Loading"
                    className={styles.last_loading_product}
                    src={loading}
                  />
                </div>
              ) : a.type === "done" ? (
                <div key={index} className={styles.prodcts_list_home}>
                  <h3>There have no more products to load</h3>
                </div>
              ) : (
                <div
                  key={index}
                  className={styles.prodcts_list_home}
                  id={"infoPLH" + a.id}
                >
                  <div
                    className={styles.product_info_home}
                    id={"infoPIH" + a.id}
                  >
                    <div className={styles.image}>
                      <IoIosHeart
                        className={styles.heart}
                        id={"cart-p" + a.id}
                        onClick={() => cartUpdate(a.id, a.isOnCart ? false : true, a)}
                        size={25}
                        style={{
                          color: a.isOnCart ? "red" : "gray",
                        }}
                      />
                      <img loading="lazy" 
                      alt={a.name} 
                      src={a.img}
                      onClick={() => loadProduct(a.id)}
                      />
                      <p>{Math.ceil(((a.price-a.discountPrice) / a.price) * 100)}% discount</p>
                    </div>
                    <div onClick={() => loadProduct(a.id)}>
                    <p id="name">{a.name}</p>
                    <p id="price">
                      Price: ₹{a.price}
                      <del>₹{a.discountPrice}</del>
                    </p>
                    <p
                      id="desc"
                      dangerouslySetInnerHTML={{ __html: a.description }}
                    />
                    </div>
                  </div>
                  <div className={styles.product_onclick_hm} id={"infoANH" + a.id}>
                    <img loading="lazy"
                      alt="Loading"
                      src={loading}
                      className={styles.last_loading_product}
                    />
                  </div>
                </div>
              )
            )}
          </div>
          </div>
          <div className={styles.ltst_pr_hm}>
            <h2>Latest Products</h2>
            {latestProducts.map((a, i) => (
              <div className={styles.listed_letst_p_hm} key={i} ref={(el) => (contentRefs.current[i] = el)}>
                <IoIosHeart
                  className={styles.heart}
                  style={{
                    color: a.isOnCart ? "red" : "gray",
                  }}
                />
                {!a.isAvailable && <div id="non-ltst">item not available</div>}
                <div className={styles.tlist_img_ltst_hm}>
                  <img loading="lazy"
                    src={a.img}
                    alt={a.subtitle}
                    style={{
                      filter: a.isAvailable ? "none" : "blur(1px)",
                    }}
                  />
                </div>
                <div
                  className={styles.data_ltst_hm}
                  style={{
                    filter: a.isAvailable ? "none" : "blur(1px)",
                  }}
                >
                  <p id="name-ltst">{a.subtitle}</p>
                  <p id="prs-lts">
                    ₹ {a.discountPrice}
                    <del>₹ {a.price}</del>
                  </p>
                  <p id="buy" onClick={() => loadProduct(a.pid)}>buy</p>
                </div>
              </div>
            ))}
          </div>
          <footer>
            <div>
              <h3>About Inrl.online</h3>
              <p>
                Your trusted online shopping destination for shoes, watches,
                AirPods, toys, and more. Fast 2-day delivery across Kerala.
              </p>
            </div>

            <div>
              <h4>Contact Us</h4>
              <p>
                Email:{" "}
                <a href="mailto:inrlwabots@gmail.com">support@inrl.online</a>
              </p>
              <p>
                Phone: <a href="tel:+917025099154">+91-702-509-9154</a>
              </p>
              <p>Address: Mavoor, kozikode , Kerala, India</p>
            </div>

            <div className={styles.social_links}>
              <h4>Follow Us</h4>
              <a href="https://www.instagram.com/inrl.cc" className={styles.instagram}>
              <FaInstagram className={styles.icon} size={20} />Instagram
              </a>
              <a href="https://github.com/i-nrl" className={styles.github}>
              <FaGithub className={styles.icon} size={20}/>Github
              </a>
              <a
                href="https://chat.whatsapp.com/K61qQwFg00L2xOlqZqzoNn"
                className={styles.wa}
              >
                <FaWhatsapp className={styles.icon} size={20}/>WhatsApp Group
              </a>
            </div>

            <div>
              <h4>Trending Categories</h4>
              <div className={styles.trending_links}>
                <a href="/category/shoes">Shoes</a>
                <a href="/category/watches">Watches</a>
                <a href="/category/airpods">AirPods</a>
                <a href="/category/toys">Toys</a>
              </div>
            </div>

            <div>
              <h4>Important Information</h4>
              <p>
                <span className={styles.important_icon}>⚠️</span>We collaborate with
                various Instagram resellers. Please ensure the reseller is
                trusted by verifying the Inrl badge. We are not responsible for
                transactions with unverified resellers. If there is no Inrl
                badge, trust yourself by checking their official Instagram
                account, note thet the information provided by the seller.
              </p>
            </div>

            <div className={styles.divider}>
              <p>
                &copy; 2024 <span className={styles.inrl_bold}>INRL</span>. All Rights
                Reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
      <div className={styles.home_cart}>
        {!User || !User.reg_pkocd ? (
          <div className={styles.login_first}>
            <h3>
              For our records, we do not store any of your information before
              you sign up.
            </h3>
            <button onClick={loginNow}>sign up.</button>
          </div>
        ) : !cartMsg.status ? (
           <ShimmerDownListLoading />
        ) : cartMsg.status && cartMsg.msg === "nothing" ? (
          <h3 className={styles.null_cart}>
            Explore our page further and shop for incredible deals today! Don't
            miss out on our amazing products with nothing in your cart - start
            adding items now!
          </h3>
        ) : cartMsg.status && cartMsg.list ? (
          cartMsg.list.map((list, index) =>
            list.type.includes("pending") ? (
              <div
                className={styles.pending_cart_b_hm}
                key={index}
                onClick={() => myOrder(list.id)}
              >
                <div className={styles.img_c_p_hm}>
                  <img loading="lazy" alt={list.name} src={list.img} />
                </div>
                <div className={styles.info_c_p_hm}>
                  <p className={styles.name_ca}>{list.name}</p>
                  <p className={styles.ordr_at_hc}>
                    ordered At: <span>{list.ordered}</span>
                  </p>
                  <p className={styles.dlvry_at_hc}>
                    delivery At: <span>{list.delivery}</span>
                  </p>
                  {list.type === "pending:bot" ? (
                    <p className={styles.wrn_hc}>this date may be change</p>
                  ) : null}
                  {list.discount ? (
                    <div className={styles.pricess_ca}>
                      <p className={styles.price_ca}>
                        <span>₹</span> {list.total}
                      </p>
                      <p className={styles.actul_ca}>
                        <del>{list.price}</del>
                      </p>
                    </div>
                  ) : (
                    <p className={styles.actul_ca}>
                      <span>₹</span> {list.price}
                    </p>
                  )}
                  <p className={styles.quantity_ca}>Qty: {list.quantity}</p>
                </div>
                <p
                  className={styles.desc_ca}
                  dangerouslySetInnerHTML={{ __html: list.desc }}
                />
              </div>
            ) : (
              <div key={index} className={styles.cart_list_home}>
                <div
                  className={styles.img_cart_fiv_hm}
                  onClick={() => loadProduct(list.id)}
                >
                  <img loading="lazy" alt={list.name} src={list.img} />
                </div>
                <div className={styles.cart_infos}>
                  <p className={styles.name_ca}>{list.name}</p>
                  {list.type === "done" ? (
                    <p className={styles.delivered_ca}>
                      delivered <MdDownloadDone className={styles.icon_ca} />
                    </p>
                  ) : list.discount ? (
                    <div className={styles.pricess_ca}>
                      <p className={styles.price_ca}>
                        <span>₹</span> {list.total}
                      </p>
                      <p className={styles.actul_ca}>
                        <del>{list.price}</del>
                      </p>
                    </div>
                  ) : (
                    <p className={styles.actul_ca}>
                      <span>₹</span> {list.price}
                    </p>
                  )}
                  <p
                    className={styles.desc_ca}
                    dangerouslySetInnerHTML={{ __html: list.desc }}
                    onClick={() => loadProduct(list.id)}
                  />
                  <p className={styles.quantity_ca}>Qty: {list.quantity}</p>
                </div>
                {list.type === "cart" ? (
                  <IoHeart
                    className={styles.save_ca}
                    id={"cart-cc" + list.id}
                    onClick={() => removeFromCart("cart-cc" + list.id)}
                  />
                ) : null}
              </div>
            )
          )
        ) : null}
      </div>
      <div className={styles.home_notification}>
        {notification.status === false ? (
          <img loading="lazy" alt="Loading" className={styles.loading_home} src={loading} />
        ) : notification.status === null ? (
          <h3>There are currently no notifications to display</h3>
        ) : (
          <div>
            <h1>Notifications</h1>
            {notification.list.map((a, i) => (
              <div className={styles.notification_hm} key={i}>
                <h2>{a.title}</h2>
                <p className={styles.date_time}>{a.date + " " + a.time}</p>
                <p className={styles.sent_by}>Sent by: {a.send}</p>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.home_profile}>
        <div className={styles.popup_hp}>
          <div className={styles.cnt_pp_hp}>
            <p className={styles.cls_pp_hp} onClick={closePp}>
              &times;
            </p>
            <h3>this action can't be retrievable!</h3>
            <p className={styles.desc_pp_hp}>
              do you really want remove your account?{" "}
            </p>
            <button onClick={closePp}>No</button>
            <button onClick={dltAcc}>Yes</button>
          </div>
        </div>
        <div className={styles.f_b_hp}>
          <h2>Basic info</h2>
          <p className={styles.info_hp}>you are not logind</p>
          <div className={styles.container_hp}>
            <div className={styles.profile_header_hp}>
              <img loading="lazy"
                src={
                  accInfo && accInfo.img
                    ? accInfo.img
                    : "https://i.imgur.com/JOkWGYr.jpeg"
                }
                alt="Profile Picture"
              />
              <div className={styles.user_info_hp}>
                <p>
                  <span>Name: </span>
                  {accInfo ? accInfo.username : "not found"}
                </p>
                <p>
                  <span>Email: </span>
                  {accInfo ? accInfo.mail : "not found"}
                </p>
                <button
                  className={styles.edit_button_hp}
                  onClick={() => openB("edit")}
                >
                  {User && User.reg_pkocd ? "Edit Profile" : "Login"}
                </button>
              </div>
            </div>
          </div>
          <h2>activities</h2>
          <div className={styles.hm_act_pr}>
            <button onClick={() => openB("sale")}>
              <FaMoneyBillTrendUp className={styles.icon} />
              sell through <span>INRL</span>
            </button>
            <button onClick={() => openB("refer")}>
              <RiMoneyRupeeCircleLine className={styles.icon} />
              refers and earn through <span>INRL</span>
            </button>
            <button onClick={() => openB("address")}>
              <LuMapPin className={styles.icon} />
              Update Address
            </button>
            <button onClick={() => openB("reviews")}>
              <MdOutlineRateReview className={styles.icon} />
              update my reviews
            </button>
          </div>
          <h2>Feedback & Information</h2>
          <div className={styles.notification_hm}>
                <p>
                    Delivery Notification{" "}
                    <ToggleButton
                        socket={socket}
                        auth={User}
                        toggle={deliveryToggle}
                        setToggle={setDeliveryToggle}
                        For="delivery_notification"
                        className={styles.toggle}
                    />
                </p>
                <p>
                    Account Info{" "}
                    <ToggleButton
                        socket={socket}
                        auth={User}
                        toggle={accountToggle}
                        setToggle={setAccountToggle}
                        For="account_notification"
                        className={styles.toggle}
                    />
                </p>
                <p>
                    Seller Notification{" "}
                    <ToggleButton
                        socket={socket}
                        auth={User}
                        toggle={sellerToggle}
                        setToggle={setSellerToggle}
                        For="seller_notification"
                        className={styles.toggle}
                    />
                </p>
                <p>
                    My Earnings{" "}
                    <ToggleButton
                        socket={socket}
                        auth={User}
                        toggle={earnigToggle}
                        setToggle={setEarnigToggle}
                        For="earnigs_notification"
                        className={styles.toggle}
                    />
                </p>
            </div>
          <h2>Danger Zone</h2>
          <div className={styles.dngr_hm}>
            <button onClick={loginNow}>Logout</button>
            <button onClick={openPp}>delete my account</button>
          </div>
        </div>
        <div className={styles.btm_ph}>
          <p className={styles.cls_hp} onClick={closeB}>
            &times;
          </p>
          <div className={styles.bt_cnt_hp}>
            {bhpup.status === true ? (
              <div className={styles.contents_hp}>
                {bhpup.for === "edit" ? (
                  <EditProfile
                    auth={User}
                    isLogind={!!User.reg_pkocd}
                    userInfo={accInfo ? accInfo : {}}
                    save={setBhpup}
                    SERVER_URL={SERVER_URL}
                    socket={socket}
                  />
                ) : bhpup.for === "refer" ? (
                  <ReferPolicys
                    auth={User}
                    isLogind={!!User.reg_pkocd}
                    save={setBhpup}
                  />
                ) : bhpup.for === "seller" ? (
                  <SellerInfo isSeller={false} save={setBhpup} />
                ) : bhpup.for === "typeRefer" ? (
                  <TypeRefer isLogind={!!User.reg_pkocd} save={setBhpup} />
                ) : bhpup.for === "address" ? (
                  <Address />
                ) : bhpup.for === "sale" ? (
                  <Sales isLogind={!!User.reg_pkocd} save={setBhpup} />
                ) : bhpup.for === "earn" ? (
                  <Earnig isLogind={!!User.reg_pkocd} save={setBhpup} />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.bottom_home}>
        <div className={styles.icon_bo}>
          <CiShop
            className={styles.icon}
            id="home-icon-home"
            onClick={() => switchPage("home")}
          />
          <p>Home</p>
        </div>
        <div className={styles.icon_bo}>
          <CiShoppingCart
            className={styles.icon}
            id="home-icon-cart"
            onClick={() => switchPage("cart")}
          />
          <p>Cart</p>
        </div>
        <div className={styles.icon_bo}>
          <IoIosNotificationsOutline
            className={styles.icon}
            id="home-icon-notification"
            onClick={() => switchPage("notification")}
          />
          <p>notification</p>
        </div>
        <div className={styles.icon_bo}>
          <CiUser
            className={styles.icon}
            id="home-icon-profile"
            onClick={() => switchPage("profile")}
          />
          <p>Profile</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;

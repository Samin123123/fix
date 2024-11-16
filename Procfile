import React, { useState, useCallback, useEffect } from "react";
import { sleep } from "../../fn/fn";
import './order.css';
import loading from "../../assets/loading.gif";
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";


import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import { FaAddressCard, FaLocationDot } from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaSearch } from "react-icons/fa"
import { LuSend } from "react-icons/lu";


export default function PlaceOrder({ socket, SERVER_URL }) {
  const location = useLocation();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("AUTH-T");
  const User = storedUser ? JSON.parse(storedUser) : {};
  const {id} = useParams();
  const [up, setUp] = useState({
    pd: false,
    resave: false,
    list: [],
  });
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(0);
  const [updated, setUpdated] = useState({});
  const [addOff, setAddOff] = useState([]);
  const [checkedOffers, setCheckedOffers] = useState({});
  const [product, setProduct] = useState({
    status: false,
    info: {
      subtitle: "idk",
      img: "https://imgur.com/lVVR1Nb.jpeg",
      desc: "idk",
      discountPrice: 1,
      size: [],
      color: [],
    },
    offers: [],
    contact: '+917025099154'
  });
  const [select, setSelect] = useState("kerala");
  const [town, setTown] = useState("");
  const [an, setAn] = useState(false);
  const [res, setRes] = useState([]);
  const [page, setPage] = useState(1);
  const [coupon, setCoupon] = useState(false);
  useEffect(()=> {
    const getCurrPath = sessionStorage.getItem("currentUrl");
    if (!getCurrPath) {
      sessionStorage.setItem("currentUrl", location.pathname);
      sessionStorage.setItem("previousUrl", undefined);
    } else if (location.pathname !== getCurrPath) {
      sessionStorage.setItem("currentUrl", location.pathname);
      sessionStorage.setItem("previousUrl", getCurrPath);
    };
    if(!id) return navigate('/');
    socket.emit('place-order-get-info', {auth: User, pid: id});
    socket.on('place-order-info', (data) => {
      if(data.status === true) document.querySelector('.lists-placeorder').style.display = 'block';
      setPrice(data.info.discountPrice);
      setProduct(data)
    });
    socket.on('coupon-response', (data) => {
    	if(data.status === true) {
        setPrice(a=> (a - data.amount));
        setCoupon(data.coupon);
      } else {
        const info = document.querySelector('.qick-info-buy');
        info.innerText = `the ${data.coupon} coupon not found!`;
        info.style.display = 'block';
        setTimeout(()=>{info.style.display = 'none';}, 3000);
      };
    });
    socket.on('result-offers', (data) => {
      if(data.status === true) {
        setPrice(a=> (a - data.amount));
      } else {
        const info = document.querySelector('.qick-info-buy');
        info.innerText = 'unable to add offers at the moment!';
        info.style.display = 'block';
        setTimeout(()=>{info.style.display = 'none';}, 3000);
      };
    });
  }, []);
  useEffect(()=> {
    const defaultValue = sessionStorage.getItem("set-done-info");
  	if(defaultValue) {
      const value = JSON.parse(defaultValue);
      if(value.basic && value.id === id) {
        const {color, size} = value.basic;
        if(color) {
          const element = document.getElementById(`s-color-buy${color}`);
          setSelectedColor(color);
          if(element) element.checked = true;
        };
        if(size) {
          const element = document.getElementById(`s-size-buy${size}`);
          setSelectedSize(size);
          if(element) element.checked = true;
        };
      };
    };
  }, [product]);
  useEffect(()=> {
    const p1p = document.querySelector('.adrs-t-by');
    const p1i = document.querySelector('.adrs-slct-by');
    const p2p = document.querySelector('.prdct-t-by');
    const p2i = document.querySelector('.prdct-i-by');
    const p3p = document.querySelector('.pymt-t-by');
    const p3i = document.querySelector('.pymt-i-by');
    if(page === 1) {
      p1p.style.color = 'blue';
      p1i.style.color = 'blue';
      p2p.style.color = '#000';
      p2i.style.color = '#000';
      p3p.style.color = '#000';
      p3i.style.color = '#000';
    } else if(page === 2) {
      p2p.style.color = 'blue';
      p2i.style.color = 'blue';
      p3p.style.color = '#000';
      p3i.style.color = '#000';
      p1p.style.color = '#000';
      p1i.style.color = '#000';
    } else if(page === 3) {
      p3p.style.color = 'blue';
      p3i.style.color = 'blue';
      p2p.style.color = '#000';
      p2i.style.color = '#000';
      p1p.style.color = '#000';
      p1i.style.color = '#000';
    }
  }, [page]);
  useEffect(() => {
    const popup = document.querySelector(`.${styles.bottom_buy}`);
    const line = document.querySelector(`.${styles.line_bt_by}`);
    const close = document.querySelector(".bottom-buy span");
    const db = localStorage.getItem("adrs");
    const json = db ? JSON.parse(db) : {};
    if (json.location && !up.pd) {
      setUp({
        pd: true,
        resave: false,
        list: [...json.location],
      });
      popup.style.height = "max-content";
      close.style.display = "block";
      line.style.display = "none";
    }

    const locations = document.querySelectorAll(".l-i-d-buy");
    const handleClick = (e) => {
      const nameBuy = document.getElementById("name-buy");
      const numberBuy = document.getElementById("number-buy");
      const pincodeBuy = document.getElementById("pincode-buy");
      const stateBuy = document.getElementById("state-buy");
      const cityBuy = document.getElementById("city-buy");
      const townBuy = document.getElementById("town-buy");
      const lndMrkBuy = document.getElementById("lndmrk-buy");
      const adrsBuy = document.getElementById("adrs-buy");
      const element = e.target.id.replace("radioButtonBuyBottom", "");
      const data = json.location[element];
      nameBuy.value = data.name;
      numberBuy.value = data.number;
      pincodeBuy.value = data.pincode;
      stateBuy.value = data.state;
      cityBuy.value = data.city;
      townBuy.value = data.town;
      lndMrkBuy.value = data.landMark;
      adrsBuy.value = data.address;
      popup.style.height = "35px";
      line.style.display = "block";
      close.style.display = "none";
      setUp((a) => ({
        ...a,
        resave: true,
      }));
    };

    if (locations) {
      locations.forEach((a) => {
        a.addEventListener("click", handleClick);
      });
    }
    return () => {
      if (locations) {
        locations.forEach((a) => {
          a.removeEventListener("click", handleClick);
        });
      }
    };
  }, [up]);
  
  const handleCheckboxChange = useCallback((id, oid, title) => {
    if(title === 'login discount' && !User) {
      return navigate('/login', {replace: true});
    } else if(title === 'first purchase discount' && !User) {
      return navigate('/login', {replace: true});
    } else {
  const offer = [...addOff]
  if(!offer.includes(oid)) {
    setAddOff([...offer, oid]);
  } else {
    setAddOff(offer.filter(a=>a!==oid));
  };
    setCheckedOffers(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
    }
  }, [addOff]);
  
  const saveSize = useCallback(
    (id) => {
      const size = [...product.info.size][id];
      setUpdated((a) => ({
        ...a,
        size: size,
      }));
    },
    [product, updated],
  );
  const submit = useCallback((e) => {
      e.preventDefault();
      const nameBuy = document.getElementById("name-buy").value;
      const numberBuy = document.getElementById("number-buy").value;
      const pincodeBuy = document.getElementById("pincode-buy").value;
      const stateBuy = document.getElementById("state-buy").value;
      const cityBuy = document.getElementById("city-buy").value;
      const townBuy = document.getElementById("town-buy").value;
      const lndMrkBuy = document.getElementById("lndmrk-buy").value;
      const adrsBuy = document.getElementById("adrs-buy").value;
      if (
        !nameBuy ||
        !numberBuy ||
        !pincodeBuy ||
        !stateBuy ||
        !cityBuy ||
        !townBuy ||
        !lndMrkBuy ||
        !adrsBuy
      ) {
        alert("Please fill in all the fields.");
      } else {
        const local = localStorage.getItem("adrs");
        if (local && !up.resave) {
          const data = {
            location: [
              ...JSON.parse(local).location,
              {
                name: nameBuy,
                number: numberBuy,
                pincode: pincodeBuy,
                state: stateBuy,
                city: cityBuy,
                town: townBuy,
                landMark: lndMrkBuy,
                address: adrsBuy,
              },
            ],
          };
          localStorage.setItem("adrs", JSON.stringify(data));
        } else if (!up.resave) {
          const data = {
            location: [
              {
                name: nameBuy,
                number: numberBuy,
                pincode: pincodeBuy,
                state: stateBuy,
                city: cityBuy,
                town: townBuy,
                landMark: lndMrkBuy,
                address: adrsBuy,
              },
            ],
          };
          localStorage.setItem("adrs", JSON.stringify(data));
        }
        document.querySelector(`.${styles.address_buy}`).style.display = "none";
        document.querySelector(`.${styles.payment_f_buy}`).style.display = "none";
        document.querySelector(`.${styles.pr_info_buy}`).style.display = "block";
        document.querySelector(`.${styles.bottom_buy}`).style.display = "none";
        setPage(a=>(a+1))
      }
    },
    [up]);
  const compleate = () => {
    document.querySelector(`.${styles.address_buy}`).style.display = "none";
      document.querySelector(`.${styles.payment_f_buy}`).style.display = "block";
      document.querySelector(`.${styles.pr_info_buy}`).style.display = "none";
      document.querySelector(`.${styles.bottom_buy}`).style.display = "none";
     setPage(a=>(a+1))
  };
  const loocap = useCallback(async () => {
    const not = document.querySelector(`.${styles.qick_info_buy}`);
    const value = document.getElementById("pincode-buy");
    const label = document.querySelector(`label[for="pincode-buy"]`);
    not.innerText = "looking up please wait";
    if (!value.value) {
      label.innerText = "Pincode cannot be empty.";
      label.style.color = "red";
    } else if (value.value.length !== 6) {
      label.innerText = "Pincode must be exactly 6 digits.";
      label.style.color = "red";
    } else {
      label.style.color = "#000";
      not.style.display = "block";
      not.style.animation = "poptob 3s";
      if (an) {
        not.style.animation = "none";
        clearTimeout(an);
        setAn(false);
      }
      setAn(setTimeout(() => {}, 3000));
      not.style.animation = "vibrate 1s infinite";

try {
  const response = await axios.post(`${SERVER_URL}/api/grablocation`, {
    pincode: value.value,
    auth: {},
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.data;
  if (!data.result.length) {
    not.innerText = "no result found";
  } else {
    setSelect(data.result[0].State.toLowerCase());
    document.getElementById("city-buy").value = data.result[0].City;
    const office = data.result.map((a) => a.PostOfficeName);
    setRes([...office]);
    setTown(office[0]);
    not.style.display = "none";
  }
} catch (error) {
  console.log(error);
}
    }
  }, [an]);
  const code = useCallback((e) => {
    e.preventDefault();
    const code = document.querySelector('.input-c-buy input');
    const info = document.querySelector('.qick-info-buy');
    if(!code.value) {
      info.style.display = 'block';
      info.innerText = "sponsor code can't be empty";
      setTimeout(()=>{info.style.display = 'none'}, 3000);
    } else {
    	socket.emit('check-coupon', {pid: id, auth: User, coupon: code.value});
      code.value = "";
      info.style.display = 'block';
      info.innerText = "please Wait a minut we are proceeding your request";
      setTimeout(()=>{info.style.display = 'none'}, 3000);
    }
  }, [id, User]);
  const toUp = () => {
    document.querySelector(`.${styles.bottom_buy}`).style.height = "max-content";
    document.querySelector(".bottom-buy span").style.display = "block";
    document.querySelector(`.${styles.line_bt_by}`).style.display = "none";
  };
  const closePopup = () => {
    document.querySelector(`.${styles.bottom_buy}`).style.height = "35px";
    document.querySelector(".bottom-buy span").style.display = "none";
    document.querySelector(`.${styles.line_bt_by}`).style.display = "block";
  };
  const townChange = (event) => {
    setTown(event.target.value);
  };
  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  const getLocation = useCallback(async () => {
    const not = document.querySelector(`.${styles.qick_info_buy}`);
    if (an) {
      not.style.animation = "none";
      clearTimeout(an);
      setAn(false);
    }

    if (navigator.geolocation) {
      not.style.display = "block";
      not.style.animation = "poptob 1s";
      not.innerText = "please wait, locating your address!";
      await sleep(1000);
      not.style.animation = "vibrate 1s infinite";
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          if (!lat || !lon) {
            not.style.display = "block";
            not.style.animation = "poptob 3s";
            not.innerText = "Unable to retrieve your location";

            await sleep(3000);
            not.style.display = "none";
          } else {
try {
  const response = await axios.post(`${SERVER_URL}/api/getlocation`, {
    lat,
    lon,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.data;

  if (data.error) {
    not.innerText = "no result found";
    setAn(
      setTimeout(() => {
        not.style.animation = "none";
        not.style.display = "none";
      }, 3000),
    );
  } else {
    not.style.animation = "none";
    not.style.display = "none";
    const pincodeBuy = document.getElementById("pincode-buy");
    const stateBuy = document.getElementById("state-buy");
    const cityBuy = document.getElementById("city-buy");
    const townBuy = document.getElementById("town-buy");
    const adrsBuy = document.getElementById("adrs-buy");
    if (!pincodeBuy.value) {
      pincodeBuy.value = data.address.postcode;
    }
    if (!stateBuy.value) {
      stateBuy.value = data.address.state.toLowerCase();
    }
    if (!cityBuy.value) {
      cityBuy.value = data.address.county;
    }
    if (!townBuy.value) {
      townBuy.value = data.address.town;
    }
    adrsBuy.value = data.display_name;
  }
} catch (error) {
  console.log(error);
  alert("service unavailable");
}

          }
        },
        async (error) => {
          not.style.display = "block";
          not.style.animation = "poptob 3s";
          not.innerText = "Unable to retrieve your location";

          await sleep(3000);
          not.style.display = "none";
        },
      );
    } else {
      not.style.display = "block";
      not.style.animation = "poptob 3s";
      not.innerText = "Geolocation is not supported by this browser";

      await sleep(3000);
      not.style.display = "none";
    }
  }, [an]);
  const toWa = useCallback(() => {
    const local = localStorage.getItem("adrs");
    const adrsBuy = document.getElementById("adrs-buy").value;
    const location = JSON.parse(local).location.filter(a=>a.address === adrsBuy);
    const quantityInput = document.getElementById("quantity-buy");
    const currentValue = parseInt(quantityInput.value);
    socket.emit('place-order', {
      info: {
        color: selectedColor,
        size: selectedSize,
        quantity: currentValue,
        ofr: addOff,
        coupon: coupon
      },
      auth: User,
      address: location[0],
      pid: id
    });
    window.location.href = `https://wa.me/${product.contact}?text=done`;
  }, [coupon, addOff, selectedColor, selectedSize, product]);
  const increase = useCallback(() => {
    const quantityInput = document.getElementById("quantity-buy");
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    setPrice((a) => a + product.info.discountPrice);
  }, [product]);

  const decrease = useCallback(() => {
    const quantityInput = document.getElementById("quantity-buy");
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      setPrice((a) => a - product.info.discountPrice);
    }
  }, [price, product]);
  const setOffer = useCallback(() => {
      const button = document.querySelector('.ofr-acpt-p-o');
      const ofDiv = document.querySelector('.ofr-buy');
      const info = document. querySelector('.qick-info-buy');
    if(button.innerText !== 'add offerss') {
      ofDiv.style.display = 'none';
      info.innerText = 'new offers added';
      info.style.display = 'block';
      socket.emit('apply-offers', {ofr: addOff, pid: id});
      setTimeout(()=>{info.style.display = 'none';}, 3000)
    }
  }, [addOff]);
  return (
    <div>
    <div className={styles.qick_info_buy}>Inrl is the best</div>
      {product.status === false ? (
        <img className={styles.loading_buy} src={loading} alt="loading" />
      ) : product.status === "error" ? (
        <h4 className={styles.e_s_e_buy}>Internal server error!</h4>
      ) : null}
      <div className={styles.lists_placeorder}>
      <div className={styles.buy_now}>
        <div className={styles.hd_buy}>
          <div className={styles.hd_b_t}>
            <FaAddressCard className={styles.address_icon_buy}/>
            <p>Add your Address</p>
          </div>
          <div className={styles.list_f_buy}>
            <hr />
            <Bs1CircleFill className={styles.adrs_slct_by}/>
            <p className={styles.adrs_t_by}>address</p>
            <Bs2CircleFill className={styles.prdct_i_by}/>
            <p className={styles.prdct_t_by}>product info</p>
            <Bs3CircleFill className={styles.pymt_i_by}/>
            <p className={styles.pymt_t_by}>payment</p>
          </div>
        </div>
        <form className={styles.address_buy} onSubmit={submit}>
          <label htmlFor="name-buy">Enter your name</label>
          <input type="text" id="name-buy" required={true} />
          <label htmlFor="number-buy">Enter your number</label>
          <input type="number" id="number-buy" required={true} />
          <div className={styles.input_cl_buy}>
            <div className={styles.pin_cd_d_buy}>
              <label htmlFor="pincode-buy">Enter your pincode</label>
              <input type="number" id="pincode-buy" required={true} />
            </div>
            <div className={styles.pin_cd_d_buy}>
             <div className={styles.lookup_div_buy}>
              <FaSearch className={styles.pincode_lookup_buy} onClick={loocap}/>
             </div>
              <div className={styles.loc_i_buy}>
                <FaLocationDot className={styles.lctn_i_buy}/>
                <button className={styles.location_buy} onClick={getLocation}>
                  add location
                </button>
              </div>
            </div>
          </div>
          <div className={styles.input_group_buy}>
            <div className={styles.stt_buy}>
              <label htmlFor="state-buy">select your state</label>
              <select id="state-buy" value={select} onChange={handleChange}>
                <option value="andhra-pradesh">Andhra Pradesh</option>
                <option value="arunachal-pradesh">Arunachal Pradesh</option>
                <option value="assam">Assam</option>
                <option value="bihar">Bihar</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="goa">Goa</option>
                <option value="gujarat">Gujarat</option>
                <option value="haryana">Haryana</option>
                <option value="himachal-pradesh">Himachal Pradesh</option>
                <option value="jharkhand">Jharkhand</option>
                <option value="karnataka">Karnataka</option>
                <option value="kerala">Kerala</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="manipur">Manipur</option>
                <option value="meghalaya">Meghalaya</option>
                <option value="mizoram">Mizoram</option>
                <option value="nagaland">Nagaland</option>
                <option value="odisha">Odisha</option>
                <option value="punjab">Punjab</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="sikkim">Sikkim</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="telangana">Telangana</option>
                <option value="tripura">Tripura</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="west-bengal">West Bengal</option>
                <option value="andaman-and-nicobar-islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="chandigarh">Chandigarh</option>
                <option value="dadra-and-nagar-haveli-and-daman-and-diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="delhi">Delhi</option>
                <option value="lakshadweep">Lakshadweep</option>
                <option value="puducherry">Puducherry</option>
              </select>
            </div>
            <div className={styles.stt_buy}>
              <label htmlFor="city-buy">Enter your district</label>
              <input type="text" id="city-buy" />
            </div>
          </div>
          <label htmlFor="town-buy">Enter your Hometown</label>
          {res.length === 0 ? (
            <input type="text" id="town-buy" required={true} />
          ) : res.length === 1 ? (
            <input type="text" id="town-buy" required={true} />
          ) : (
            <select value={town} onChange={townChange} id="town-buy">
              {res.map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="lndmrk-buy">Land Mark</label>
          <input type="text" id="lndmrk-buy" placeholder="land mark of your destination" required={true} />
          <label htmlFor="adrs-buy">Enter your address</label>
          <input type="text" id="adrs-buy" required={true} />
          <div className={styles.next_to_info_buy}>
            <MdOutlineNavigateNext className={styles.next_page_buy}/>
            <button className={styles.btn_nxt_ad_by} type="submit">
            Next
          </button>
          </div>
        </form>
        <div className={styles.pr_info_buy}>
            <div className={styles.img_aln_po}>
          <img src={product.info.img} alt="reinfo" />
            </div>
          <div className={styles.s_i_buy_pr}>
            <h3>{product.info.subtitle}</h3>
            <p className={styles.dngrs_desc_po} dangerouslySetInnerHTML={{ __html: product.info.desc }} />
            <hr />
            <div className={styles.color_s_buy}>
              <h4>color selection</h4>
              {product.info.color !== "no" ? (
                product.info.color.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${a}`,
                      color: a,
                    }}
                  >
                    {a}
                    <input
                      className={styles.clr_s_buy}
                      type="radio"
                      name="colorz-buy"
                      value={a}
                      id={`s-color-buy${a}`}
                      onChange={()=>setSelectedColor(a)}
                    />
                  </div>
                ))
              ) : (
                <p>color selections not available</p>
              )}
            </div>
            <div className={styles.size_s_buy}>
              <h4>sizes selection</h4>
              {product.info.size === "no" ? (
                <p>size of this product not available</p>
              ) : (
                product.info.size.map((a, i) => (
                  <div key={i}>
                    {a}
                    <input
                      className={styles.size_i_buy}
                      type="radio"
                      name="sizes-buy"
                      value={a}
                      id={`s-size-buy${a}`}
                      onChange={()=>setSelectedSize(a)}
                    />
                  </div>
                ))
              )}
            </div>
            {
    product.offers.length ?
            <div className={styles.ofr_buy}>
          <div className={styles.li_ofr_po}>
      {product.offers.map((a, i) => (
        <div key={i} className={styles.offers_list_buy}>
          <h4>{a.title}</h4>
          <p>₹{a.price}</p>
          <input
            type="checkbox"
            id={`offer-${i}`}
            checked={!!checkedOffers[`offer-${i}`]}
            onChange={() => handleCheckboxChange(`offer-${i}`, a.id, a.title)}
          />
        </div>
      ))}
    </div>
              <button className={styles.ofr_acpt_p_o} onClick={setOffer}>{addOff.length ? `add ${addOff.length} offers` : 'add offers'}</button>
        </div> : null
            }
            <form className={styles.code_aply_buy} onSubmit={code}>
              <h4>enter code if you have</h4>
          <div className={styles.code_apllay_buy}>
            <div className={styles.input_c_buy}>
                <input type="text" />               
              </div>
              <div className={styles.btn_u_cd_buy}>
                <LuSend className={styles.send_code_buy} onClick={code}/>
              </div>
          </div>
            </form>
            <hr />
            <div className={styles.quantity_selector}>
              <h4>select quantity:</h4>
              <div className={styles.toupord_b}>
                <button type="button" onClick={decrease}>
                  -
                </button>
                <input type="number" id="quantity-buy" defaultValue={1} />
                <button type="button" onClick={increase}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.pay_mant_buy}>
              total amount: <span>₹{price}</span>
            </div>
            <div className={styles.next_to_info_buy}>
                <MdOutlineNavigateNext className={styles.next_page_buy}/>
                <button className={styles.btn_nxt_ad_by} onClick={compleate}>Next</button>
            </div>
          </div>
        </div>
        <div className={styles.payment_f_buy}>
          <button className={styles.sent_updt_buy} onClick={toWa}>done</button></div>
        <div className={styles.bottom_buy}>
          <button className={styles.line_bt_by} onClick={toUp}></button>
          <span onClick={closePopup}>&times;</span>
          <div className={styles.list_l_buy}>
            {up.list.map((a, i) => (
              <div className={styles.l_i_d_buy} key={i}>
                <h4>{a.number}</h4>
                <p>{a.address}</p>
                <input
                  type="radio"
                  className={styles.radio_button_b_buy}
                  id={`radioButtonBuyBottom${i}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button, Avatar } from "antd";
import { SearchOutlined, HeartOutlined, HeartFilled, AudioOutlined, MenuOutlined, UserOutlined, EnvironmentOutlined, CompassOutlined } from "@ant-design/icons";
import CustomerLayout from "../../layouts/CustomerLayout";
import { useNavigate } from "react-router-dom";
import filtericon from "../../assets/images/filterIcon.png";
import hot from "../../assets/images/hot.png";
import trending from "../../assets/images/trending.png";
import notification from "../../assets/images/notification.png";
import mapPin from "../../assets/images/map-pinpoint-icon.png";
import collectionImg1 from "../../assets/images/collectionsCardImg01.png";
import collectionImg2 from "../../assets/images/collectionsCardImg02.png";
import collectionImg3 from "../../assets/images/collectionsCardImg03.png";
import trendingImg01 from "../../assets/images/trendingImg01.png"
import trendingImg02 from "../../assets/images/trendingImg02.png"
import trendingImg03 from "../../assets/images/trendingImg03.png"
import trendingImg04 from "../../assets/images/trendingImg04.png"



const recentSearches: Array<{ label: string; bg: string; img: string }> = [
  { label: "Beachfront Retreats", bg: "bg-blue-50", img: mapPin },
  { label: "New York, NY", bg: "bg-green-50", img: mapPin },
  { label: "Los Angeles, CA", bg: "bg-rose-50", img: mapPin },
];

const collections = [
  {
    title: "Romantic Escapes",
    subtitle: "150+ Stays",
    image: collectionImg1,
  },
  {
    title: "Ultra Luxury",
    subtitle: "80+ Stays",
    image: collectionImg3,
  },
  {
    title: "Beach Gateways",
    subtitle: "300+ Stays",
    image: collectionImg2,
  },
];

const destinations = [
  { label: "Kyrenia", sub: "North Cyprus", badge: "Hot", image: trendingImg01 },
  { label: "Antalya", sub: "Turkey", badge: "Trending", image: trendingImg02 },
  { label: "Mykonos", sub: "Greece", badge: "Trending", image: trendingImg03 },
  { label: "Santorini", sub: "Greece", badge: "Hot", image: trendingImg04 },
];

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-sm font-semibold text-gray-900 mb-2">{title}</h2>
);

const ExploreHome: React.FC = () => {

  const navigate = useNavigate();
  
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-screen-md px-0">

        {/* Top Bar */}
        <div className="sticky top-0 z-10  py-3">
          <div className="flex items-center justify-between mb-3">
            <button className="flex items-center justify-center">
              <img
                src={notification}
                alt="Notifications"
                className="h-9 w-9 object-contain"
              />
            </button>


            <div className="text-center">
              <div className="text-lg font-semibold">Explore</div>
              <div className="text-[12px] text-gray-500">Find your perfect stay</div>
            </div>

            <Avatar
              size={36}
              icon={<UserOutlined style={{ color: "black" }} />}
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e1e1",
                cursor: "pointer",
              }}
              
            />
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
           
            <div className="flex items-center justify-between gap-2 rounded-[8px] border border-gray-200 bg-white px-3 py-3 flex-1">
              <div className="flex items-center gap-2">
                <SearchOutlined style={{ color: '#6B7280' }} />
                <input
                  className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                  placeholder="Where are you going?"
                />
              </div>
              <AudioOutlined className="cursor-pointer" style={{ color: '#6B7280' }} />
            </div>

            {/* Filter Button */}
            <Button
              size="large"
              icon={<img src={filtericon} alt="filtericon" className="w-5 h-5 object-contain" />}
              className="rounded-[8px]"
              style={{
                backgroundColor: 'black',
              }}
              onClick={() => navigate("/customer/filterSearch")}
            />
          </div>

        </div>

        {/* Recent Searches */}
        <div className="py-3">
          <SectionTitle title="Recent Searches" />
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1 px-2 py-1 ${item.bg} rounded-full `}
              >
                <img src={item.img} alt={item.label} className="h-auto w-auto inline-block" />
                <span className="text-[11px] font-small">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="py-3">
          <SectionTitle title="Collections" />
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 scrollbar-hide">
            {collections.map((c) => {
              const [liked, setLiked] = useState(false);

              return (
                <div key={c.title} className="min-w-[70%] snap-start">
                  <div className="relative rounded-2xl overflow-hidden shadow-sm">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-36 w-full object-cover"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


                    <button
                      onClick={() => setLiked(!liked)}
                      className="absolute top-2 right-2 rounded-full  !p-1.5  flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {liked ? (
                        <HeartFilled style={{ color: "red", fontSize: 14 }} />
                      ) : (
                        <HeartOutlined style={{ color: "white", fontSize: 14 }} />
                      )}
                    </button>

            
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <div className="text-sm  "><h4>{c.title}</h4></div>
                      <div className="text-xs opacity-90"><p>{c.subtitle}</p></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trending Destinations */}
        <div className="py-3">
          <SectionTitle title="Trending Destinations" />
          <div className="grid grid-cols-2 gap-3">
            {destinations.map((d) => (
              <div
                key={d.label}
                className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
          
                <img
                  src={d.image}
                  alt={d.label}
                  className="h-28 w-full object-cover"
                />

              
                <div className="absolute bottom-0 left-0 right-0 h-1/3">
                  <div className="w-full h-full bg-gradient-to-t from-black/10 to-transparent backdrop-blur-[2px]"></div>
                </div>

             
                {d.badge === "Hot" ? (
                  <img
                    src={hot}
                    alt="Hot"
                    className="absolute top-2 left-2 h-5 w-auto"
                  />
                ) : (
                  <img
                    src={trending}
                    alt="Trending"
                    className="absolute top-2 left-2 h-5 w-auto"
                  />
                )}

                 
                <div className="absolute bottom-2 left-2 right-2 text-white drop-shadow">
                  <div className="text-sm  "><h4>{d.label}</h4></div>
                  <div className="text-xs opacity-90"><p>{d.sub}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Last-minute Deals */}
        <div className="py-3">
          <div className="rounded-2xl border border-gray-200 p-4 "
            style={{
              background: 'linear-gradient(to right, #EEEDFF, #FFF6E6)'
            }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold"><h3 className="mb-0">Last-minute Deals</h3></div>
                <div className="text-xs text-gray-600"><p>Save up to 30% on bookings today</p></div>
              </div>
              <Button type="primary" className="rounded-full "
                style={{
                  background: 'linear-gradient(to right, #7BBCEE, #3195E2, #0D67AC)',
                  border: 'none'
                }} >View details</Button>
            </div>
          </div>
        </div>

        {/* Extended Stays */}
        <div className="pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold"><h3>Extended Stays</h3></div>
              <div className="text-xs text-gray-600"><p>Special rates for stays 7+ nights</p></div>
            </div>
            <Button
              className="rounded-full text-white"
              style={{
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'black')}
            >
              Explore
            </Button>
          </div>
        </div>

      </div>
    </CustomerLayout>
  );
};

export default ExploreHome;

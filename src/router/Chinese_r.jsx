import React from "react";
import Chinease from "../components/chinease";
import Layout from "../components/Layout";
const Chinese_r = () => {
  const items = [
    {
      id: "001",
      item_name: "Sushi Balls",
      current_price: 606,
      item_description: "Delicious rice and seafood sushi balls, a popular Japanese-inspired delicacy.",
      image: "pictures/sushi-balls-5878892_1280.jpg",
      quantity:0
    },
    {
      id: "002",
      item_name: "Japanese Ramen Bowl",
      current_price: 1507,
      item_description: "A rich and flavorful noodle soup topped with sliced pork, egg, and fresh vegetables.",
      image: "pictures/japanese-food-222255_1280.jpg",
      quantity:0
    },
    {
      id: "003",
      item_name: "Sweet and Sour Pork",
      current_price: 495,
      item_description: "Crispy pork chunks coated in a tangy sweet and sour sauce, served with bell peppers and pineapple.",
      image: "pictures/pork-1690696_1280.jpg",
      quantity:0
    },
    {
      id: "004",
      item_name: "Steamed Dim Sum Platter",
      current_price: 999,
      item_description: "A variety of bite-sized dumplings filled with shrimp, pork, and vegetables, served with dipping sauce.",
      image: "pictures/food-715542_1280 - Copy.jpg",
      quantity:0
    },
    {
      id: "005",
      item_name: "Dragon Roll Sushi",
      current_price: 489,
      item_description: "A beautifully presented sushi roll filled with eel, avocado, and cucumber, topped with thinly sliced avocado and eel sauce.",
      image: "pictures/sushi-2370265_1280.jpg",
      quantity:0
    }
];



    return (
      <Layout>
        <main>
            <div className="items-container">
                {items.map((item) => (
                    <Chinease key={item.id} item={item} />
                ))}
            </div>
        </main>
        </Layout>
    );
};

export default Chinese_r;
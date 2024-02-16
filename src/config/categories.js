import { BiBasket, BiCategoryAlt } from "react-icons/bi";
import { CgAdd, CgSmartphone } from "react-icons/cg";
import { MdAddShoppingCart } from "react-icons/md";

const categoriesBtnsData = [
    {
        id: 1,
        icon: BiCategoryAlt,
        title: "Categories",
        path: '/',
    },

   
    {
        id: 2,
        icon: BiBasket,
        title: "Products",
        path: '/allproducts',
    },

    {
        id: 3,
        icon: MdAddShoppingCart,
        title: "New category",
        path: '/createcategory',
    },

    {
        id: 4,
        icon: CgAdd,
        title: "New product",
        path: '/createproduct',
    },
]

export default categoriesBtnsData
// 載入vue模組(如createApp)
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

// 路由(所有API網址的開頭)
const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'jenny7532';

// 把應用程式掛載在這個app上面
const app = {
    data() {
        return {
            // 從API取回的產品資料放到data的products
            products: [],
            // 點擊畫面產品的"查看細節"按鈕，將其資料儲存到data的tempProduct
            tempProduct: {},
        };
    },
    methods: {
        checkLogin() {
            const loginCheckurl = `${site}api/user/check`;
            axios.post(loginCheckurl)
                .then(response => {
                    // 觸發函式getProducts()
                    this.getProducts();
                })
                .catch((error) => {
                    // 驗證登入是否具有此api_path權限，若否跳出登入失敗視窗
                    alert(error.data.message);
                    // 轉址(轉跳到指定頁面)
                    window.location = './login.html';
                });
        },
        getProducts() {
            const getProducturl = `${site}api/${api_path}/admin/products`;
            axios.get(getProducturl)
                .then(response => {
                    console.log(response);
                    // 把產品列表API資料儲存到data的products屬性裡
                    this.products=response.data.products;
                })
                .catch(error => {
                    console.dir(error);
                });
        },
    },
    mounted() {
        // 當cookie有儲存資料時，就能從cookie取出token
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        // 將Token內容夾帶到headers裡
        // 加入一次即可!!!後續axios會採用預設方式登入API
        // defaults表示每次發出token時，在headers加入屬性'Authorization'後方代入值(token)
        axios.defaults.headers.common['Authorization'] = myCookie;
        this.checkLogin();
    },
};

createApp(app)
    .mount('#app')  // 生成在app這個位置

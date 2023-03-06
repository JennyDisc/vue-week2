// 載入vue模組(如createApp)
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

// 路由(所有API網址的開頭)
const site = 'https://vue3-course-api.hexschool.io/v2/';

// 生成在app這個位置
const app = {
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const loginUrl = `${site}admin/signin`;
            // axios.post(,)發送請求。第二個參數紀錄要傳送給對方伺服器的資料內容
            axios.post(loginUrl, this.user)
                .then(response => {
                    // console.log(response);

                    // 儲存 Token
                    const { expired, token } = response.data; // 解構寫法。表示expired與token來自response.data
                    // hexToken自定義名稱，把這個cookies儲存起來時要用什麼名稱
                    // expires是一般時間格式。可以用new Date() 轉型成時間格式
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

                    // 轉址(轉跳到指定頁面)
                    window.location = './products.html';
                })
                .catch(error => {
                    // 驗證登入失敗跳出視窗
                    alert(error.data.message);
                    // console.dir(error);
                });
        },
    },
};

createApp(app)
    .mount('#app')  // 生成在app這個位置
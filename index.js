new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 'bread1',
        category: '吐司系列',
        title: '蜜汁吐司',
        unit: '片',
        origin_price: 40,
        price: 36,
        description: '麵體浸漬特調的鮮奶蛋蜜汁，外層抹上厚厚的奶油糖霜，外皮甜蜜香脆。',
        content: '商品屬性｜蛋奶素、商品熱量｜375大卡(片)、保存方式｜冷藏2天、冷凍14天',
        is_enabled: true,
        imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1640&q=80',
        customer_reviews: [
          {
            stars: 5,
            name: '小明',
            time: '2020-5-27 13:00',
            comment: '甜而不膩，非常美味'
          },
          {
            stars: 4,
            name: '華美',
            time: '2020-5-28 10:00',
            comment: '吃不膩的好味道'
          },
        ]
      },
      {
        id: 'bread2',
        category: '丹麥可頌',
        title: '牛角可頌',
        unit: '個',
        origin_price: 45,
        price: 40,
        description: '經典法式早餐可頌，16層推疊出香酥鬆脆的金黃酥皮。',
        content: '商品屬性｜蛋奶素、商品熱量｜237大卡(片)、保存方式｜冷藏2天、冷凍14天',
        is_enabled: false,
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1252&q=80',
        customer_reviews: [
          {
            stars: 5,
            name: '尪仔',
            time: '2020-6-27 08:00',
            comment: '早餐絕對不能錯過的美食'
          },
          {
            stars: 3,
            name: '悠姍',
            time: '2020-6-20 11:00',
            comment: '味道普通，免強能接受'
          },
        ]
      }
    ],
    interim: {
      index: 0,
      status: '',
      product: {},
      addComment: {
        name: '',
        comment: '',
        time: '',
        stars: 0
      }
    },
  },
  methods:{
    openModal (status, item, index) {
      const vm = this.interim;
      switch (status) {
        case 'create':
          vm.status = 'create'
          vm.product = {}
          vm.product.id = 'bread' + (Number(this.products.length) + 1)
          break;
        case 'edit':
          vm.index = index
          vm.status = 'edit'
          vm.product = Object.assign({}, item);
          break;
        case 'delete':
          vm.index = index
          break;
        case 'comment':
          vm.index = index
          vm.status = 'comment'
          vm.product = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    deleteProduct () {
      this.products.splice(this.interim.index, 1);
    },
    updataProduct () {
      const vmTem = this.interim;
      const vmPd = this.products;
      if(vmTem.status === 'edit') {
        vmPd.splice(vmTem.index, 1, vmTem.product)
      } else {
        vmPd.push(vmTem.product)
      }
    },
    openAddCommentModal () {
      this.interim.addComment = {
        name: '',
        comment: '',
        time: '',
        stars: 0
      }
      UIkit.modal('#modal-addComment').show();
    },
    updataComment () {
      const vmTem = this.interim;
      const vmPd = this.products;
      
      var dt = new Date();
      vmTem.addComment.time = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes();
      vmTem.addComment.stars = Number(vmTem.addComment.stars);
      vmPd[vmTem.index].customer_reviews.push(vmTem.addComment)
      UIkit.modal('#modal-addComment').hide();
      UIkit.modal('#modal-productComments').show();
    },
    checkForm () {
      const vm = this.interim.product;
      if(vm.category && vm.title && vm.unit && vm.origin_price && vm.price) {
        this.updataProduct();
        UIkit.modal('#modal-productInfo').hide();
        return true;
      }
      const notification = {status:'danger', pos: 'top-right', timeout: 1500}
      if(!vm.category) {
        UIkit.notification('<div class="uk-text-center">產品分類未填寫</div>', notification);
      }
      else if(!vm.title) {
        UIkit.notification('<div class="uk-text-center">產品名稱未填寫</div>', notification);
      }
      else if(!vm.unit) {
        UIkit.notification('<div class="uk-text-center">單位未填寫</div>',  notification);
      }
      else if(!vm.origin_price) {
        UIkit.notification('<div class="uk-text-center">原價未填寫</div>',  notification);
      }
      else if(!vm.price) {
        UIkit.notification('<div class="uk-text-center">售價未填寫</div>',  notification);
      }
    }
  }
})
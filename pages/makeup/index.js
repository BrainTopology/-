Page({ data: {  
  text:" " ,
  tip1: 'c',
  tip2:'', 
  userName: '',
    }, 
   formBindsubmit: function (e) {
    this.setData({ 
      tip1: '迪奥999', 
      tip2:'dior',
      userName:  e.detail.value.userName, 
      }) 
      }
})
